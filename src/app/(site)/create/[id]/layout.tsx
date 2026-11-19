import Link from "next/link";
import { Progress } from "@/components/builder/Progress";
import { currentUser } from "@/lib/auth";
import { loadOwnedBook } from "@/lib/loadBook";

export default async function BuilderLayout({ children, params }: { children: React.ReactNode; params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [book, user] = await Promise.all([loadOwnedBook(id), currentUser()]);
  return (
    <div>
      {!user && (
        <div className="bg-blush">
          <p className="mx-auto max-w-6xl px-4 py-2 text-center text-sm sm:px-6">
            Книга сохраняется в этом браузере.{" "}
            <Link href={`/account/sign-in?mode=signup&next=/create/${id}/characters`} className="font-bold text-wine underline underline-offset-2">
              Сохранить в аккаунт
            </Link>
          </p>
        </div>
      )}
      <Progress bookId={id} assembled={book.data.assembled} previewed={book.data.previewed} />
      {children}
    </div>
  );
}
