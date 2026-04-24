import { LayoutGrid } from "lucide-react";
import { defineField, defineType } from "sanity";

import { imageWithAltField } from "@/schemaTypes/common";

const featuredGridCard = defineField({
  name: "featuredGridCard",
  type: "object",
  fields: [
    imageWithAltField({
      description: "The image for this grid card",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "aspectRatio",
      title: "Aspect Ratio",
      type: "string",
      description:
        "Choose the aspect ratio for this card's image display",
      options: {
        list: [
          { title: "Square (1:1)", value: "square" },
          { title: "Portrait (3:4)", value: "portrait" },
          { title: "Landscape (4:3)", value: "landscape" },
        ],
        layout: "radio",
      },
      initialValue: "square",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Card Title",
      type: "string",
      description: "The title displayed below the image",
    }),
    defineField({
      name: "description",
      title: "Card Description",
      type: "text",
      rows: 2,
      description: "A short description for this card",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      aspectRatio: "aspectRatio",
    },
    prepare: ({ title, media, aspectRatio }) => ({
      title: title ?? "Untitled Card",
      subtitle: `Aspect: ${aspectRatio ?? "square"}`,
      media,
    }),
  },
});

export const featuredGrid = defineType({
  name: "featuredGrid",
  title: "Featured Grid",
  type: "object",
  icon: LayoutGrid,
  description:
    "A responsive grid of featured items with configurable aspect ratios",
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      description: "The heading for this grid section",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 2,
      description: "Optional subtitle displayed below the title",
    }),
    defineField({
      name: "cards",
      title: "Grid Cards",
      type: "array",
      of: [featuredGridCard],
      description: "Add cards to the grid, each with their own aspect ratio",
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: {
      title: "title",
      cards: "cards",
    },
    prepare: ({ title, cards = [] }) => ({
      title: title ?? "Featured Grid",
      subtitle: `${cards.length} card${cards.length === 1 ? "" : "s"}`,
    }),
  },
});
