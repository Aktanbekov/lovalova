// Renders the private /print route to a print-ready PDF with headless Chromium.
import path from "node:path";
import fs from "node:fs";
import { printToken } from "./printToken";
import { siteUrl } from "./stripe";
import { setOrderPdf } from "./store";

// On Vercel only /tmp is writable (and not durable); see README → Deploy.
export const PDF_DIR = process.env.VERCEL
  ? "/tmp/lovalova/pdfs"
  : path.resolve(/* turbopackIgnore: true */ process.cwd(), "storage/pdfs");

export function pdfPathFor(orderId: string) {
  return path.join(PDF_DIR, `${orderId}.pdf`);
}

export async function generateOrderPdf(orderId: string): Promise<string> {
  const { chromium } = await import("playwright-core");
  fs.mkdirSync(PDF_DIR, { recursive: true });
  const out = pdfPathFor(orderId);
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    const url = `${siteUrl()}/print/${orderId}?token=${printToken(orderId)}`;
    const res = await page.goto(url, { waitUntil: "networkidle" });
    if (!res || !res.ok()) throw new Error(`Print page returned ${res?.status()}`);
    await page.evaluate(() => document.fonts.ready);
    await page.pdf({ path: out, printBackground: true, preferCSSPageSize: true });
  } finally {
    await browser.close();
  }
  setOrderPdf(orderId, out);
  return out;
}
