"use client";

import { Button } from "@workspace/ui/components/button";
import { ChevronRight, LoaderCircle } from "lucide-react";
import { motion } from "motion/react";
import { useFormStatus } from "react-dom";

import type { PagebuilderType } from "@/types";
import { RichText } from "../elements/rich-text";
import { SanityImage } from "../elements/sanity-image";

type JournalNewsletterProps = PagebuilderType<"journalNewsletter">;

function JournalSubscribeButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      aria-label={pending ? "Subscribing..." : "Subscribe to the journal"}
      className="aspect-square size-8 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700"
      disabled={pending}
      size="icon"
      type="submit"
    >
      <span className="flex items-center justify-center">
        {pending ? (
          <LoaderCircle
            aria-hidden="true"
            className="animate-spin text-black"
            size={16}
            strokeWidth={2}
          />
        ) : (
          <ChevronRight
            aria-hidden="true"
            className="text-black dark:text-neutral-300"
            size={16}
            strokeWidth={2}
          />
        )}
      </span>
    </Button>
  );
}

export function JournalNewsletter({
  title,
  description,
  embeddedImage,
  placeholderText,
}: JournalNewsletterProps) {
  return (
    <section className="py-16 md:py-24" id="journal-newsletter">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text Content */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, y: 32 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            {title && (
              <h2 className="text-balance font-medium text-3xl leading-[1.15] tracking-tight md:text-4xl lg:text-5xl">
                {title}
              </h2>
            )}

            {description && (
              <div className="text-base leading-relaxed text-muted-foreground md:text-lg">
                <RichText richText={description as any} />
              </div>
            )}

            {/* Email Form */}
            <form
              className="mt-2 flex flex-col gap-3 sm:flex-row sm:gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                // custom submit logic
              }}
            >
              <div className="flex items-center justify-between rounded-xl border bg-white p-2 pl-4 drop-shadow-lg sm:w-full md:max-w-md dark:bg-zinc-200">
                <input
                  className="w-full rounded-e-none border-e-0 bg-transparent text-sm outline-none focus-visible:ring-0 dark:text-zinc-900 dark:placeholder:text-zinc-900"
                  name="email"
                  placeholder={placeholderText ?? "Enter your email address"}
                  required
                  type="email"
                />
                <JournalSubscribeButton />
              </div>
            </form>
          </motion.div>

          {/* Journal Image */}
          {embeddedImage && (
            <motion.div
              className="relative mx-auto w-full max-w-md lg:max-w-none"
              initial={{ opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.7,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true, margin: "-100px" }}
              whileInView={{ opacity: 1, scale: 1 }}
            >
              <SanityImage
                className="h-auto w-full rounded-sm object-cover"
                height={800}
                image={embeddedImage}
                width={640}
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
