"use client";

import { cn } from "@workspace/ui/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import type { PagebuilderType } from "@/types";
import { SanityImage } from "../elements/sanity-image";

type FeaturedGridProps = PagebuilderType<"featuredGrid">;

const ASPECT_RATIO_MAP: Record<string, string> = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function FeaturedGrid({ title, subtitle, cards }: FeaturedGridProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [cards]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const clientWidth = scrollRef.current.clientWidth;
      const scrollAmount =
        direction === "left" ? -clientWidth * 0.8 : clientWidth * 0.8;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const showNavigation = Array.isArray(cards) && cards.length > 5;

  return (
    <section
      className="py-8 md:py-10 overflow-hidden bg-[#e3e2e2]"
      id="featured-grid"
    >
      <div className="w-full px-4 md:px-8 lg:px-12 relative">
        {/* Section Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {title && (
            <h2 className="text-balance font-medium text-2xl tracking-tight md:text-3xl">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-3 text-balance text-base text-muted-foreground md:text-lg">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Grid / Carousel */}
        {Array.isArray(cards) && cards.length > 0 && (
          <div className="relative group">
            {showNavigation && (
              <>
                <button
                  type="button"
                  className={cn(
                    "absolute -left-4 top-[35%] z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background border border-border shadow-md transition-opacity duration-300 md:-left-5 lg:-left-6",
                    canScrollLeft
                      ? "opacity-100"
                      : "opacity-0 pointer-events-none"
                  )}
                  onClick={() => scroll("left")}
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  className={cn(
                    "absolute -right-4 top-[35%] z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background border border-border shadow-md transition-opacity duration-300 md:-right-5 lg:-right-6",
                    canScrollRight
                      ? "opacity-100"
                      : "opacity-0 pointer-events-none"
                  )}
                  onClick={() => scroll("right")}
                  aria-label="Scroll right"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            <motion.div
              className={cn(
                showNavigation
                  ? "flex overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-8 -mb-8 gap-4 sm:gap-6 lg:gap-8 items-stretch"
                  : cn(
                      "grid gap-4 sm:gap-6 lg:gap-8 mx-auto items-stretch w-full",
                      cards.length === 1 && "grid-cols-1 max-w-sm",
                      cards.length === 2 && "grid-cols-2 max-w-4xl",
                      cards.length === 3 &&
                        "grid-cols-2 md:grid-cols-3 max-w-7xl",
                      cards.length === 4 && "grid-cols-2 md:grid-cols-4",
                      cards.length === 5 &&
                        "grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
                    )
              )}
              ref={showNavigation ? scrollRef : undefined}
              onScroll={showNavigation ? checkScroll : undefined}
              initial="hidden"
              variants={container}
              viewport={{ once: true, margin: "-50px" }}
              whileInView="show"
            >
              {cards.map((card) => {
                const aspectClass =
                  ASPECT_RATIO_MAP[card.aspectRatio ?? "square"] ??
                  ASPECT_RATIO_MAP.square;

                return (
                  <motion.div
                    className={cn(
                      "group/card flex flex-col h-full",
                      showNavigation
                        ? "snap-start shrink-0 w-[80vw] sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(20%-25.6px)]"
                        : "w-full"
                    )}
                    key={card._key}
                    variants={item}
                  >
                    {/* Image Container */}
                    {card.image && (
                      <div className="flex-1 flex flex-col justify-end">
                        <div
                          className={cn(
                            "relative w-full overflow-hidden rounded-sm bg-muted shrink-0",
                            aspectClass
                          )}
                        >
                          <SanityImage
                            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover/card:scale-105"
                            height={600}
                            image={card.image}
                            width={600}
                          />
                        </div>
                      </div>
                    )}

                    {/* Card Text */}
                    {(card.title || card.description) && (
                      <div className="mt-4 space-y-1 text-center shrink-0">
                        {card.title && (
                          <h3 className="text-base font-serif font-medium leading-snug md:text-lg text-foreground">
                            {card.title}
                          </h3>
                        )}
                        {card.description && (
                          <p className="text-sm font-serif text-muted-foreground md:text-base">
                            {card.description}
                          </p>
                        )}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
