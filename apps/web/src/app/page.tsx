import { sanityFetch } from "@workspace/sanity/live";
import { queryHomePageData } from "@workspace/sanity/query";
import { redirect } from "next/navigation";

import { PageBuilder } from "@/components/pagebuilder";
import { getSEOMetadata } from "@/lib/seo";

async function fetchHomePageData() {
  try {
    return await sanityFetch({
      query: queryHomePageData,
    });
  } catch {
    return { data: null };
  }
}

export async function generateMetadata() {
  const { data: homePageData } = await fetchHomePageData();
  if (!homePageData) {
    return {
      title: "Jamb — Homepage",
      description: "Jamb homepage",
    };
  }
  return getSEOMetadata({
    title: homePageData?.title ?? homePageData?.seoTitle,
    description: homePageData?.description ?? homePageData?.seoDescription,
    slug: "/",
    contentId: homePageData?._id,
    contentType: homePageData?._type,
  });
}

export default async function Page() {
  const { data: homePageData } = await fetchHomePageData();

  if (!homePageData) {
    // Redirect to the static preview when no Sanity data is available
    redirect("/preview");
  }

  const { _id, _type, pageBuilder } = homePageData ?? {};

  return <PageBuilder id={_id} pageBuilder={pageBuilder ?? []} type={_type} />;
}
