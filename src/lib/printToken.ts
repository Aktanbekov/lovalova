import { createHmac, timingSafeEqual } from "node:crypto";

function secret() {
  return process.env.PRINT_TOKEN_SECRET || "dev-only-print-secret";
}

export function printToken(orderId: string): string {
  return createHmac("sha256", secret()).update(`print:${orderId}`).digest("base64url");
}

export function verifyPrintToken(orderId: string, token: string | null | undefined): boolean {
  if (!token) return false;
  const a = Buffer.from(printToken(orderId));
  const b = Buffer.from(token);
  return a.length === b.length && timingSafeEqual(a, b);
}
