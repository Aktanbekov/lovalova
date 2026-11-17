import fs from "node:fs";
import { readOwner } from "@/lib/owner";
import { getOrder } from "@/lib/store";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const owner = await readOwner();
  const order = getOrder(id);
  if (!order || !owner || order.owner !== owner) return new Response("Not found", { status: 404 });
  if (order.status !== "paid" || !order.selection.digital) return new Response("Not available", { status: 403 });
  if (!order.pdfPath || !fs.existsSync(order.pdfPath)) return new Response("Still preparing", { status: 409 });
  const file = fs.readFileSync(order.pdfPath);
  const name = `lovalova-${order.book.characters[1].name || "book"}`.replace(/[^a-z0-9-]+/gi, "-").toLowerCase();
  return new Response(file, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${name}.pdf"`,
      "Cache-Control": "private, no-store",
    },
  });
}
