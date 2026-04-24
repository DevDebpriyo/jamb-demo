import { SplitSquareHorizontal } from "lucide-react";
import { defineField, defineType } from "sanity";

import { buttonsField, imageWithAltField } from "@/schemaTypes/common";
import { customRichText } from "@/schemaTypes/definitions/rich-text";

export const splitContent = defineType({
  name: "splitContent",
  title: "Split Content",
  type: "object",
  icon: SplitSquareHorizontal,
  description:
    "A 50/50 split layout with text on one side and an image on the other",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      description:
        "Optional small text displayed above the title for additional context",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "text",
      rows: 2,
      description: "The main heading for this content section",
      validation: (Rule) => Rule.required(),
    }),
    customRichText(["block"]),
    imageWithAltField({
      description:
        "The featured image for this section, displayed alongside the text content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "reverseLayout",
      title: "Reverse Layout",
      type: "boolean",
      description:
        "When enabled, the image will appear on the left and text on the right",
      initialValue: false,
    }),
    buttonsField,
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
    prepare: ({ title, media }) => ({
      title: title ?? "Untitled",
      subtitle: "Split Content Block",
      media,
    }),
  },
});
