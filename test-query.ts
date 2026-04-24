import { createClient } from "next-sanity";
import dotenv from "dotenv";

dotenv.config({ path: "apps/web/.env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "e9u838w0",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function main() {
  const result = await client.fetch(`*[_type == "footer" && _id == "footer"][0]{
    _id,
    newsletterText,
    columns[]{
      _key,
      title,
      topText,
      showNewsletter,
      groups[]{
        _key,
        title,
        links[]{
          _key,
          name,
          "openInNewTab": url.openInNewTab,
          "href": select(
            url.type == "internal" => url.internal->slug.current,
            url.type == "external" => url.external,
            url.href
          ),
        }
      }
    }
  }`);
  console.log(JSON.stringify(result, null, 2));
}

main().catch(console.error);
