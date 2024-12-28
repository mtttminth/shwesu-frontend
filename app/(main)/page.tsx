import Banner from "@/components/home/Banner";
import Collections from "@/components/home/Collections";
import TopSubcategories from "@/components/home/TopSubcategories";
import {
  getBanners,
  getCollections,
  getTopSubcategories,
} from "@/lib/apis/home";
import { Box } from "@mui/material";

export default async function Home() {
  const bannersData = await getBanners();
  const topSubcategoriesData = await getTopSubcategories();
  const collectionsData = await getCollections();

  return (
    <Box sx={{ width: "100%" }}>
      <Banner banners={bannersData} />
      <Box className="px-12 mb-20">
        <TopSubcategories topSubcategories={topSubcategoriesData} />
        <Collections collections={collectionsData} />
      </Box>
    </Box>
  );
}
