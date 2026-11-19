import type { Metadata, Viewport } from "next";
import { Lora, Onest } from "next/font/google";
import "./globals.css";

// Both faces carry full Cyrillic. Lora sets headings and the printed book; Onest the interface.
const lora = Lora({ variable: "--font-book", subsets: ["latin", "cyrillic"] });
const onest = Onest({ variable: "--font-ui", subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: { default: "Lovalova: книга о вас двоих, с вашими героями", template: "%s · Lovalova" },
  description:
    "Нарисуйте себя и свою половинку, ответьте на пять вопросов, и мы напечатаем книгу обо всём, за что вы любите друг друга. От 3 990 сом.",
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${lora.variable} ${onest.variable} h-full antialiased`}>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
