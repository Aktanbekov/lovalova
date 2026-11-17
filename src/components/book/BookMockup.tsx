// A printed-book look for cover examples: board edge, spine shading, page
// block, gloss and a soft floor shadow. Pure CSS around the real CoverPage.

import type { CSSProperties } from "react";
import { CoverPage, type BookView } from "./BookPage";
import type { BookData } from "@/lib/book/schema";

type Tilt = "left" | "right" | "flat";

const TILT: Record<Tilt, string> = {
  left: "rotateY(16deg) rotateX(3deg)",
  right: "rotateY(-16deg) rotateX(3deg)",
  flat: "none",
};

export function BookMockup({
  book,
  coverId,
  tilt = "right",
  soft = false,
  className = "",
  style,
}: {
  book: BookView;
  coverId?: BookData["cover"]["id"];
  tilt?: Tilt;
  /** Softcover: thinner page block, no board edge. */
  soft?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const pagesOnRight = tilt !== "left";
  return (
    <div className={`relative ${className}`} style={{ perspective: "1600px", ...style }}>
      <div className="relative" style={{ transform: TILT[tilt], transformStyle: "preserve-3d" }}>
        {/* page block */}
        <div
          aria-hidden="true"
          className={`absolute top-[2.5%] bottom-[2.5%] ${pagesOnRight ? "-right-[2.2%] rounded-r-[4px]" : "-left-[2.2%] rounded-l-[4px]"} w-[3%]`}
          style={{
            background: "repeating-linear-gradient(90deg, #fff 0 2px, #e9e1da 2px 3px)",
            boxShadow: "inset 0 0 0 1px rgb(0 0 0 / 0.06)",
            width: soft ? "1.6%" : "3%",
          }}
        />
        {/* cover board */}
        <div
          className={`relative overflow-hidden ${soft ? "rounded-[2px_5px_5px_2px]" : "rounded-[3px_9px_9px_3px] ring-[3px] ring-black/10"}`}
          style={{ boxShadow: "0 30px 45px -22px rgb(30 10 25 / 0.55), 0 8px 14px -8px rgb(30 10 25 / 0.35)" }}
        >
          <CoverPage book={book} coverId={coverId} />
          {/* spine/hinge shading */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-[7%]"
            style={{ background: "linear-gradient(90deg, rgb(0 0 0 / 0.28), rgb(0 0 0 / 0.06) 45%, rgb(255 255 255 / 0.18) 60%, transparent)" }}
          />
          {/* gloss */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(115deg, transparent 35%, rgb(255 255 255 / 0.22) 48%, transparent 62%)" }}
          />
        </div>
      </div>
      {/* floor shadow */}
      <div aria-hidden="true" className="mx-auto mt-[3%] h-[5%] min-h-2 w-[85%] rounded-[50%] bg-black/25 blur-md" />
    </div>
  );
}
