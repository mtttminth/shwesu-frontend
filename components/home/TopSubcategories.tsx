"use client";
import { useEffect, useState, useCallback, FC } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { styled } from "@mui/material/styles";
import { Box, ButtonBase, Typography } from "@mui/material";
import { Subcategory } from "@/lib/types";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";

/**
 * Fetches and displays top-selling subcategories in a responsive carousel.
 */
interface TopSubcategoriesProps {
  topSubcategories: Subcategory[];
}

const TopSubcategory: FC<TopSubcategoriesProps> = ({ topSubcategories }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true });
  const [slidesPerPage, setSlidesPerPage] = useState(6); // Initial value for larger screens

  /**
   * Calculates the flex basis for each slide based on the number of slides per page.
   */
  const calculateSlideFlexBasis = useCallback((slidesPerPage: number) => {
    return `${100 / slidesPerPage}%`;
  }, []);

  const [slideFlexBasis, setSlideFlexBasis] = useState(
    calculateSlideFlexBasis(slidesPerPage)
  );

  /**
   * Updates the number of slides per page based on screen size.
   */
  const updateSlidesPerPage = useCallback(() => {
    let newSlidesPerPage = 6;
    if (isMobile) {
      newSlidesPerPage = 4;
    } else if (isTablet) {
      newSlidesPerPage = 5;
    }
    setSlidesPerPage(newSlidesPerPage);
    setSlideFlexBasis(calculateSlideFlexBasis(newSlidesPerPage));
  }, [calculateSlideFlexBasis, isMobile, isTablet]);

  useEffect(() => {
    updateSlidesPerPage();

    const handleResize = () => {
      updateSlidesPerPage();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      emblaApi?.off("resize", updateSlidesPerPage);
    };
  }, [emblaApi, updateSlidesPerPage]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [emblaApi, slidesPerPage]);
  const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: "relative",
    height: 200,
    [theme.breakpoints.down("sm")]: {
      width: "100% !important", // Overrides inline-style
      height: 100,
    },
    "&:hover, &.Mui-focusVisible": {
      zIndex: 1,
      "& .MuiImageBackdrop-root": {
        opacity: 0.15,
      },
      "& .MuiImageMarked-root": {
        opacity: 0,
      },
      "& .MuiTypography-root": {
        border: "4px solid currentColor",
      },
    },
  }));
  const ImageSrc = styled("span")({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  });
  const Image = styled("span")(({ theme }) => ({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  }));
  const ImageBackdrop = styled("span")(({ theme }) => ({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity"),
  }));
  const ImageMarked = styled("span")(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  }));
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">Top Categories</Typography>

      <Box
        component="div"
        ref={emblaRef}
        className="embla"
        sx={{
          overflow: "hidden",
          mt: 2,
          "& .embla__container": {
            display: "flex",
            gap: 2,
          },
          "& .embla__slide": {
            flex: `0 0 ${slideFlexBasis}`,
            minWidth: 0,
            position: "relative",
          },
        }}
      >
        <Box component="div" className="embla__container">
          {topSubcategories.map((subcategory, index) => (
            <Box
              key={index}
              component={Link}
              href={`/categories/${subcategory.slug}`}
              className="embla__slide"
              sx={{
                width: "100%",
              }}
            >
              <ImageButton
                focusRipple
                key={subcategory.name}
                style={{
                  width: "100%",
                }}
              >
                <ImageSrc
                  style={{ backgroundImage: `url(${subcategory.image_url})` }}
                />
                <ImageBackdrop className="MuiImageBackdrop-root" />
                <Image>
                  <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    sx={(theme) => ({
                      position: "relative",
                      p: 4,
                      pt: 2,
                      pb: `calc(${theme.spacing(1)} + 6px)`,
                    })}
                  >
                    {subcategory.name}
                    <ImageMarked className="MuiImageMarked-root" />
                  </Typography>
                </Image>
              </ImageButton>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default TopSubcategory;
