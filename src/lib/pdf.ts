// Renders the private /print route to a print-ready PDF with headless Chromium.
//
// Chromium: the Playwright browser locally; on Vercel, @sparticuz/chromium (a build made for
// serverless functions).
// Storage: Vercel Blob (private) when BLOB_READ_WRITE_TOKEN is set, else storage/pdfs on disk.
// orders.pdf_path holds either the blob URL or the local file path.
import path from "node:path";
import fs from "node:fs";
import { printToken } from "./printToken";
import { siteUrl } from "./stripe";
import { setOrderPdf } from "./store";

const LOCAL_DIR = process.env.VERCEL
  ? "/tmp/lovalova/pdfs" // only /tmp is writable on Vercel, and it isn't durable: set up Blob
  : path.resolve(/* turbopackIgnore: true */ process.cwd(), "storage/pdfs");

const blobConfigured = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);
const isBlobUrl = (p: string) => /^https?:\/\//.test(p);

async function launchBrowser() {
  const { chromium } = await import("playwright-core");
  if (!process.env.VERCEL) return chromium.launch();
  const serverless = (await import("@sparticuz/chromium")).default;
  return chromium.launch({ executablePath: await serverless.executablePath(), args: serverless.args, headless: true });
}

async function renderPdf(orderId: string): Promise<Buffer> {
  const browser = await launchBrowser();
  try {
    const page = await browser.newPage();
    const url = `${siteUrl()}/print/${orderId}?token=${printToken(orderId)}`;
    const res = await page.goto(url, { waitUntil: "networkidle" });
    if (!res || !res.ok()) throw new Error(`Print page returned ${res?.status()}`);
    await page.evaluate(() => document.fonts.ready);
    return await page.pdf({ printBackground: true, preferCSSPageSize: true });
  } finally {
    await browser.close();
  }
}

export async function generateOrderPdf(orderId: string): Promise<string> {
  const pdf = await renderPdf(orderId);
  let location: string;
  if (blobConfigured()) {
    const { put } = await import("@vercel/blob");
    const blob = await put(`pdfs/${orderId}.pdf`, pdf, {
      access: "private",
      contentType: "application/pdf",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    location = blob.url;
  } else {
    fs.mkdirSync(LOCAL_DIR, { recursive: true });
    location = path.join(LOCAL_DIR, `${orderId}.pdf`);
    fs.writeFileSync(location, pdf);
  }
  await setOrderPdf(orderId, location);
  return location;
}

/** True once the order's PDF exists where pdf_path says. */
export function pdfReady(pdfPath: string | null): boolean {
  if (!pdfPath) return false;
  return isBlobUrl(pdfPath) || fs.existsSync(pdfPath);
}

/** The PDF bytes as a stream, or null if it isn't there (yet). */
export async function readPdf(pdfPath: string | null): Promise<ReadableStream<Uint8Array> | Uint8Array<ArrayBuffer> | null> {
  if (!pdfPath) return null;
  if (isBlobUrl(pdfPath)) {
    const { get } = await import("@vercel/blob");
    const res = await get(pdfPath, { access: "private" });
    return res?.stream ?? null;
  }
  return fs.existsSync(pdfPath) ? new Uint8Array(fs.readFileSync(pdfPath)) : null;
}
