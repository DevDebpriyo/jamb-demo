import Link from "next/link";
import { SanityImage } from "@/components/elements/sanity-image";
import type { SanityImageProps } from "@/types";

export type HeroJambProps = {
  readonly _type: "heroJamb";
  readonly _key: string;
  readonly image?: SanityImageProps & { alt?: string };
  readonly links?: {
    _key: string;
    label?: string;
    href?: string;
  }[];
};

export function HeroJamb({ image, links }: HeroJambProps) {
  return (
    <section className="w-full  pb-12">
      <div className="container mx-auto px-4 pt-4">
        <div className="w-full">
          {image ? (
            <SanityImage
              image={image}
              alt={image.alt || "Hero Image"}
              className="w-full h-auto object-cover max-h-[85vh]"
              fetchPriority="high"
            />
          ) : (
            <div className="w-full h-[60vh] bg-muted/20" />
          )}
        </div>

        {links && links.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center justify-center text-muted-foreground font-serif">
            {links.map((link, index) => (
              <div key={link._key} className="flex items-center">
                <Link
                  href={link.href || "#"}
                  className="hover:text-foreground transition-colors font-medium text-lg px-2"
                >
                  {link.label}
                </Link>
                {index < links.length - 1 && (
                  <span className="text-muted-foreground/50 mx-2 text-lg">
                    |
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
