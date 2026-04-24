import { LayoutPanelLeft, Link, PanelBottom } from "lucide-react";
import { defineField, defineType } from "sanity";

const footerColumnLink = defineField({
  name: "footerColumnLink",
  type: "object",
  icon: Link,
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name",
      description: "Name for the link",
    }),
    defineField({
      name: "url",
      type: "customUrl",
    }),
  ],
  preview: {
    select: {
      title: "name",
      externalUrl: "url.external",
      urlType: "url.type",
      internalUrl: "url.internal.slug.current",
      openInNewTab: "url.openInNewTab",
    },
    prepare({ title, externalUrl, urlType, internalUrl, openInNewTab }) {
      const url = urlType === "external" ? externalUrl : internalUrl;
      const newTabIndicator = openInNewTab ? " ↗" : "";
      const truncatedUrl =
        url?.length > 30 ? `${url.substring(0, 30)}...` : url;

      return {
        title: title || "Untitled Link",
        subtitle: `${urlType === "external" ? "External" : "Internal"} • ${truncatedUrl}${newTabIndicator}`,
        media: Link,
      };
    },
  },
});

const footerLinkGroup = defineField({
  name: "footerLinkGroup",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
    }),
    defineField({
      name: "links",
      type: "array",
      title: "Links",
      of: [footerColumnLink],
    }),
  ],
  preview: {
    select: {
      title: "title",
      links: "links",
    },
    prepare({ title, links = [] }) {
      return {
        title: title || "Untitled Group",
        subtitle: `${links.length} link${links.length === 1 ? "" : "s"}`,
      };
    },
  },
});

const footerColumn = defineField({
  name: "footerColumn",
  type: "object",
  icon: LayoutPanelLeft,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Admin Title",
      description: "For internal use in the CMS",
    }),
    defineField({
      name: "topText",
      type: "text",
      title: "Top Text",
      rows: 3,
      description:
        "Text appearing at the very top of the column (e.g. Address or Email)",
    }),
    defineField({
      name: "showNewsletter",
      type: "boolean",
      title: "Show Newsletter Form",
      initialValue: false,
    }),
    defineField({
      name: "groups",
      type: "array",
      title: "Link Groups",
      of: [footerLinkGroup],
    }),
  ],
  preview: {
    select: {
      title: "title",
      groups: "groups",
    },
    prepare({ title, groups = [] }) {
      return {
        title: title || "Untitled Column",
        subtitle: `${groups.length} group${groups.length === 1 ? "" : "s"}`,
      };
    },
  },
});

export const footer = defineType({
  name: "footer",
  type: "document",
  title: "Footer",
  description: "Footer content for your website",
  fields: [
    defineField({
      name: "label",
      type: "string",
      initialValue: "Footer",
      title: "Label",
      description: "Label used to identify footer in the CMS",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "newsletterText",
      type: "string",
      title: "Newsletter Text",
      description: "Title above the newsletter form",
      initialValue: "Newsletter",
    }),
    defineField({
      name: "columns",
      type: "array",
      title: "Columns",
      description: "Columns for the footer",
      of: [footerColumn],
    }),
  ],
  preview: {
    select: {
      title: "label",
    },
    prepare: ({ title }) => ({
      title: title || "Untitled Footer",
      media: PanelBottom,
    }),
  },
});
