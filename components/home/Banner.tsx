"use client";
import { FC } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Box from "@mui/material/Box";
import { Banner as BannerType } from "@/lib/types";
import { useMediaQuery, useTheme } from "@mui/material";

interface BannerProps {
  banners: BannerType[];
}

const Banner: FC<BannerProps> = ({ banners }) => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ playOnInit: true, delay: 5000 }),
  ]);

  const theme = useTheme();
  const imageUrls = banners.map(
    (banner: BannerType) => banner.image_url[0] || "/default-banner.jpg"
  );
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <Box
      component="div"
      ref={emblaRef}
      className="embla"
      sx={{
        overflow: "hidden",
        "& .embla__container": {
          display: "flex",
        },
        "& .embla__slide": {
          flex: "0 0 100%",
          minWidth: 0,
        },
      }}
    >
      <Box component="div" className="embla__container">
        {imageUrls.map((url, index) => (
          <Box
            key={index}
            component="div"
            className="embla__slide"
            sx={{
              position: "relative",
              width: "100%",
              aspectRatio: isMobile ? "2/1" : isTablet ? "3/1" : "4/1",
            }}
          >
            <Image
              src={url}
              alt={`Banner ${index + 1}`}
              fill
              priority
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Banner;
