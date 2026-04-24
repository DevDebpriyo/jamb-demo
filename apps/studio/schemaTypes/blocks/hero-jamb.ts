import { Star } from "lucide-react";
import { defineField, defineType } from "sanity";

import { imageWithAltField } from "@/schemaTypes/common";

export const heroJamb = defineType({
  name: "heroJamb",
  title: "Hero Jamb",
  icon: Star,
  type: "object",
  fields: [
    imageWithAltField(),
    defineField({
      name: "links",
      type: "array",
      title: "Navigation Links",
      description: "List of text links to display below the hero image (e.g., Fireplaces | Lighting | Furniture | Journal)",
      of: [
        defineType({
          type: "object",
          name: "linkItem",
          fields: [
            defineField({
              name: "label",
              type: "string",
              title: "Label",
            }),
            defineField({
              name: "href",
              type: "string",
              title: "URL",
            }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "href",
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      media: "image",
    },
    prepare({ media }) {
      return {
        title: "Hero Jamb Block",
        media,
      };
    },
  },
});
