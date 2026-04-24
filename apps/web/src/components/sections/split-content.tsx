"use client";

import { cn } from "@workspace/ui/lib/utils";
import { motion } from "motion/react";

import { urlFor } from "@workspace/sanity/client";
import type { PagebuilderType } from "@/types";
import { RichText } from "../elements/rich-text";
import { SanityButtons } from "../elements/sanity-buttons";
import TiltedCard from "../TiltedCard";

type SplitContentProps = PagebuilderType<"splitContent">;

export function SplitContent({
  eyebrow,
  title,
  richText,
  image,
  reverseLayout,
  buttons,
}: SplitContentProps) {
  const imageSrc = image?.id ? urlFor({ ...image, _id: image.id }).url() : "";

  return (
    <section className="py-16 md:py-24" id="split-content">
      <div className="container mx-auto px-4 md:px-6">
        <div
          className={cn(
            "grid items-center gap-12 lg:grid-cols-2 lg:gap-16",
            reverseLayout && "lg:[&>*:first-child]:order-2"
          )}
        >
          {/* Text Content */}
          <motion.div
            className="flex flex-col items-center justify-center text-center gap-6 bg-[#F5F2EE] p-8 md:p-12 lg:p-16 h-full w-full rounded-sm"
            initial={{ opacity: 0, y: 32 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            {eyebrow && (
              <motion.span
                className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground"
                initial={{ opacity: 0, y: 12 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                {eyebrow}
              </motion.span>
            )}

            {title && (
              <h2 className="text-balance font-serif font-normal text-4xl leading-[1.15] md:text-5xl lg:text-6xl text-foreground">
                {title}
              </h2>
            )}

            {richText && (
              <div className="text-base leading-relaxed text-muted-foreground font-serif md:text-lg max-w-[45ch]">
                <RichText richText={richText} />
              </div>
            )}

            {buttons && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                transition={{
                  duration: 0.5,
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
                className="mt-2 w-full"
              >
                <SanityButtons
                  buttonClassName="font-serif !bg-transparent !text-muted-foreground !rounded-none border border-muted-foreground/30 hover:!bg-black/5 transition-colors px-6 w-full max-w-[280px]"
                  buttons={buttons}
                  className="flex !flex-col items-center justify-center w-full gap-2"
                />
              </motion.div>
            )}
          </motion.div>

          {/* Image */}
          
          {image && imageSrc && (
            <motion.div
              className="relative aspect-[4/5] w-full rounded-sm z-10"
              initial={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              whileInView={{ opacity: 1, scale: 1 }}
            >
              <TiltedCard
                imageSrc={imageSrc}
                altText={image.alt || "Split content image"}
                containerHeight="100%"
                containerWidth="100%"
                imageHeight="100%"
                imageWidth="100%"
                scaleOnHover={1.05}
                rotateAmplitude={2}
                showMobileWarning={false}
                showTooltip={false}
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
