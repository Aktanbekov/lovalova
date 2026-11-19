// One printed page (8.5 x 5.5 in landscape). Sized by its container, with
// text in container-query units so thumbnails, preview and PDF match.

import type { CSSProperties } from "react";
import { getTemplate, type SceneId } from "@/content/pages";
import { pageText, textContext, fillText } from "@/lib/book/assemble";
import type { BookData, PageRef } from "@/lib/book/schema";
import type { Pose } from "@/components/avatar/Avatar";
import { Scene, isDarkScene } from "./scenes";

export type BookView = Pick<BookData, "characters" | "relationship" | "answers" | "cover" | "occasion">;

const frame: CSSProperties = { containerType: "inline-size", aspectRatio: "850 / 550" };

export function PageFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative w-full overflow-hidden bg-cream ${className}`} style={frame}>
      {children}
    </div>
  );
}

export function BookPage({ book, page, className }: { book: BookView; page: PageRef; className?: string }) {
  const tpl = getTemplate(page.templateId);
  const scene: SceneId = tpl?.scene ?? "hearts";
  const poses: [Pose, Pose] = tpl?.poses ?? ["stand", "stand"];
  const text = pageText(page, book);
  const dark = isDarkScene(scene);
  const [A, B] = book.characters;

  if (scene === "letter") {
    return (
      <PageFrame className={className}>
        <Scene id="letter" A={A.traits} B={B.traits} poses={poses} />
        <div className="absolute inset-[14%] flex items-center justify-center text-center">
          <p className="font-display italic text-ink whitespace-pre-line" style={{ fontSize: "3.4cqw", lineHeight: 1.35 }}>
            {text || "Здесь будет ваше посвящение."}
          </p>
        </div>
      </PageFrame>
    );
  }

  return (
    <PageFrame className={className}>
      <Scene id={scene} A={A.traits} B={B.traits} poses={poses} />
      <div className="absolute left-[7%] right-[7%] top-[5%] flex h-[30%] items-center justify-center text-center">
        <p
          className={`font-display whitespace-pre-line ${dark ? "text-cream" : "text-ink"}`}
          style={{ fontSize: "3.3cqw", lineHeight: 1.28 }}
        >
          {text}
        </p>
      </div>
    </PageFrame>
  );
}

const COVER_SCENE: Record<BookData["cover"]["id"], { scene: SceneId; poses: [Pose, Pose] }> = {
  hearts: { scene: "hearts", poses: ["reachRight", "reachLeft"] },
  stars: { scene: "stars", poses: ["reachRight", "reachLeft"] },
  bigheart: { scene: "bigheart", poses: ["hugRight", "hugLeft"] },
  sunrise: { scene: "sunrise", poses: ["reachRight", "reachLeft"] },
  city: { scene: "city", poses: ["hugRight", "hugLeft"] },
  garden: { scene: "garden", poses: ["reachRight", "reachLeft"] },
  beach: { scene: "beach", poses: ["wave", "reachLeft"] },
  snow: { scene: "snow", poses: ["hugRight", "hugLeft"] },
};

export function CoverPage({ book, coverId, className }: { book: BookView; coverId?: BookData["cover"]["id"]; className?: string }) {
  const id = coverId ?? book.cover.id;
  const { scene, poses } = COVER_SCENE[id];
  const dark = isDarkScene(scene);
  const ctx = textContext(book);
  const [A, B] = book.characters;
  return (
    <PageFrame className={className}>
      <Scene id={scene} A={A.traits} B={B.traits} poses={poses} />
      <div className={`absolute left-[6%] right-[6%] top-[5%] flex h-[32%] flex-col items-center justify-center text-center ${dark ? "text-cream" : "text-plum"}`}>
        <h3 className="font-display font-semibold" style={{ fontSize: "6.2cqw", lineHeight: 1.05 }}>
          {fillText(book.cover.title || "Почему я тебя люблю", ctx)}
        </h3>
        <p className="mt-[1.2cqw] font-sans uppercase tracking-[0.18em]" style={{ fontSize: "1.7cqw" }}>
          для: {ctx.B} · от: {ctx.A}
        </p>
      </div>
    </PageFrame>
  );
}
