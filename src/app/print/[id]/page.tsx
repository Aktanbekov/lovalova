import { notFound } from "next/navigation";
import { BookPage, CoverPage } from "@/components/book/BookPage";
import { verifyPrintToken } from "@/lib/printToken";
import { getOrder } from "@/lib/store";

export const metadata = { robots: { index: false, follow: false } };

/** Private print layout used by the PDF generator. One 8.5x5.5in page each. */
export default async function PrintPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ token?: string }> }) {
  const { id } = await params;
  const { token } = await searchParams;
  const order = getOrder(id);
  if (!order || !verifyPrintToken(id, token)) notFound();
  const book = order.book;
  const sheet = "print-sheet";
  return (
    <>
      <style>{`
        @page { size: 8.5in 5.5in; margin: 0; }
        html, body { background: #fff !important; margin: 0; }
        .${sheet} { width: 8.5in; height: 5.5in; overflow: hidden; }
        .${sheet} + .${sheet} { break-before: page; }
      `}</style>
      <div className={sheet}><CoverPage book={book} /></div>
      {book.pages.map((p) => (
        <div key={p.key} className={sheet}>
          <BookPage book={book} page={p} />
        </div>
      ))}
    </>
  );
}
