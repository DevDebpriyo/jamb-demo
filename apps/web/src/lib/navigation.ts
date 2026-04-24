import { sanityFetch } from "@workspace/sanity/live";
import {
  queryGlobalSeoSettings,
  queryNavbarData,
} from "@workspace/sanity/query";

export const getNavigationData = async () => {
  try {
    const [navbarData, settingsData] = await Promise.all([
      sanityFetch({ query: queryNavbarData }),
      sanityFetch({ query: queryGlobalSeoSettings }),
    ]);

    return { navbarData: navbarData.data, settingsData: settingsData.data };
  } catch {
    return { navbarData: null, settingsData: null };
  }
};
