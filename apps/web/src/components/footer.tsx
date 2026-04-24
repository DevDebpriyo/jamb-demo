import { sanityFetch } from "@workspace/sanity/live";
import {
  queryFooterData,
  queryGlobalSeoSettings,
} from "@workspace/sanity/query";
import type {
  QueryFooterDataResult,
  QueryGlobalSeoSettingsResult,
} from "@workspace/sanity/types";
import Link from "next/link";

import { Logo } from "./logo";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
  YoutubeIcon,
} from "./social-icons";

type SocialLinksProps = {
  data: NonNullable<QueryGlobalSeoSettingsResult>["socialLinks"];
};

type FooterProps = {
  data: NonNullable<QueryFooterDataResult>;
  settingsData: NonNullable<QueryGlobalSeoSettingsResult>;
};

export async function FooterServer() {
  try {
    const [response, settingsResponse] = await Promise.all([
      sanityFetch({
        query: queryFooterData,
      }),
      sanityFetch({
        query: queryGlobalSeoSettings,
      }),
    ]);

    if (!(response?.data && settingsResponse?.data)) {
      console.log("Missing data:", { footer: !!response?.data, settings: !!settingsResponse?.data });
      return <FooterSkeleton />;
    }
    return <Footer data={response.data} settingsData={settingsResponse.data} />;
  } catch (error) {
    console.error("Footer fetch error:", error);
    return <FooterSkeleton />;
  }
}

function SocialLinks({ data }: SocialLinksProps) {
  if (!data) {
    return null;
  }

  const { facebook, twitter, instagram, youtube, linkedin } = data;

  const socialLinks = [
    {
      url: instagram,
      Icon: InstagramIcon,
      label: "Follow us on Instagram",
    },
    {
      url: facebook,
      Icon: FacebookIcon,
      label: "Follow us on Facebook",
    },
    { url: twitter, Icon: XIcon, label: "Follow us on Twitter" },
    {
      url: linkedin,
      Icon: LinkedinIcon,
      label: "Follow us on LinkedIn",
    },
    {
      url: youtube,
      Icon: YoutubeIcon,
      label: "Subscribe to our YouTube channel",
    },
  ].filter((link) => link.url);

  return (
    <ul className="flex items-center space-x-6 text-muted-foreground">
      {socialLinks.map(({ url, Icon, label }, index) => (
        <li
          className="font-medium hover:text-primary"
          key={`social-link-${url}-${index.toString()}`}
        >
          <Link
            aria-label={label}
            href={url ?? "#"}
            prefetch={false}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icon className="fill-muted-foreground hover:fill-primary/80 dark:fill-zinc-400 dark:hover:fill-primary" />
            <span className="sr-only">{label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function FooterSkeleton() {
  return (
    <footer className="mt-16 pb-8">
      <section className="container mx-auto px-4 md:px-6">
        <div className="h-[500px] lg:h-auto">
          <div className="flex flex-col items-center justify-between gap-10 text-center lg:flex-row lg:text-left">
            <div className="flex w-full max-w-96 shrink flex-col items-center justify-between gap-6 lg:items-start">
              <div>
                <span className="flex items-center justify-center gap-4 lg:justify-start">
                  <div className="h-[40px] w-[80px] animate-pulse rounded bg-muted" />
                </span>
                <div className="mt-6 h-16 w-full animate-pulse rounded bg-muted" />
              </div>
              <div className="flex items-center space-x-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    className="h-6 w-6 animate-pulse rounded bg-muted"
                    key={i}
                  />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6 lg:gap-20">
              {[1, 2, 3].map((col) => (
                <div key={col}>
                  <div className="mb-6 h-6 w-24 animate-pulse rounded bg-muted" />
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((item) => (
                      <div
                        className="h-4 w-full animate-pulse rounded bg-muted"
                        key={item}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-20 flex flex-col justify-between gap-4 border-t pt-8 text-center lg:flex-row lg:items-center lg:text-left">
            <div className="h-4 w-48 animate-pulse rounded bg-muted" />
            <div className="flex justify-center gap-4 lg:justify-start">
              <div className="h-4 w-32 animate-pulse rounded bg-muted" />
              <div className="h-4 w-24 animate-pulse rounded bg-muted" />
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}

function Footer({ data, settingsData }: FooterProps) {
  const { newsletterText, columns } = data;
  const { siteTitle } = settingsData;

  return (
    <footer className="mt-20 bg-[#e3e2e2] pb-16 pt-16">
      <section className="container mx-auto px-4 md:px-6">
        {Array.isArray(columns) && columns.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
            {columns.map((column, index) => (
              <div key={`column-${column?._key}-${index}`} className="flex flex-col">
                {/* Top Section */}
                <div className="min-h-[140px] mb-8">
                  {column.topText && (
                    <div className="font-serif text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">
                      {column.topText}
                    </div>
                  )}
                  {column.showNewsletter && (
                    <div className="flex flex-col gap-3">
                      <h3 className="font-serif text-muted-foreground text-sm">
                        {newsletterText || "Newsletter"}
                      </h3>
                      <div className="flex bg-background h-10 w-full rounded-sm overflow-hidden">
                        <input
                          type="text"
                          placeholder="Search"
                          className="w-full bg-transparent px-3 py-2 text-sm outline-none font-serif text-foreground placeholder:text-muted-foreground/60"
                        />
                        <button className="bg-background px-4 py-2 text-sm font-serif border-l text-muted-foreground hover:text-foreground transition-colors shrink-0">
                          Subscribe
                        </button>
                      </div>
                      <label className="flex items-center gap-2 text-sm font-serif text-muted-foreground mt-1 cursor-pointer">
                        <input
                          type="checkbox"
                          className="appearance-none h-3 w-3 border border-muted-foreground rounded-full checked:bg-foreground checked:border-foreground"
                        />
                        I agree to our Privacy Policy
                      </label>
                    </div>
                  )}
                </div>

                {/* Groups Section */}
                {Array.isArray(column.groups) && column.groups.length > 0 && (
                  <div className="flex flex-col gap-8">
                    {column.groups.map((group, groupIndex) => (
                      <div
                        key={`group-${group?._key}-${groupIndex}`}
                        className="border-t border-muted-foreground/30 pt-6"
                      >
                        {group.title && (
                          <h3 className="mb-4 font-serif font-medium text-foreground text-base tracking-tight">
                            {group.title}
                          </h3>
                        )}
                        {Array.isArray(group.links) && group.links.length > 0 && (
                          <ul className="space-y-3 font-serif text-muted-foreground text-sm">
                            {group.links.map((link, linkIndex) => (
                              <li
                                className="hover:text-foreground transition-colors"
                                key={`${link?._key}-${linkIndex}`}
                              >
                                <Link
                                  href={link.href ?? "#"}
                                  rel={
                                    link.openInNewTab
                                      ? "noopener noreferrer"
                                      : undefined
                                  }
                                  target={
                                    link.openInNewTab ? "_blank" : undefined
                                  }
                                >
                                  {link.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </footer>
  );
}
