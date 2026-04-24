import { Newspaper } from "lucide-react";
import { defineField, defineType } from "sanity";

import { imageWithAltField } from "@/schemaTypes/common";
import { customRichText } from "@/schemaTypes/definitions/rich-text";

export const journalNewsletter = defineType({
  name: "journalNewsletter",
  title: "Journal Newsletter",
  type: "object",
  icon: Newspaper,
  description:
    "A newsletter signup section with text content and an embedded journal image",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "The heading for the newsletter section",
      validation: (Rule) => Rule.required(),
    }),
    customRichText(["block"], {
      name: "description",
      title: "Description",
      description: "The body text for the newsletter section",
    }),
    imageWithAltField({
      name: "embeddedImage",
      title: "Embedded Image",
      description:
        "A featured image displayed alongside the newsletter content, such as a journal cover",
    }),
    defineField({
      name: "placeholderText",
      title: "Input Placeholder",
      type: "string",
      description: "Placeholder text for the email input field",
      initialValue: "Enter your email address",
    }),
    defineField({
      name: "buttonText",
      title: "Button Text",
      type: "string",
      description: "Text for the subscribe button",
      initialValue: "Subscribe",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "embeddedImage",
    },
    prepare: ({ title, media }) => ({
      title: title ?? "Journal Newsletter",
      subtitle: "Journal Newsletter Block",
      media,
    }),
  },
});
