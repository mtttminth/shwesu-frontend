"use client";
import { useEffect, useState, useCallback, FC } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Box, useMediaQuery, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Product } from "@/lib/types";
import Link from "next/link";
import { formatPrice } from "@/lib/services";
import { FaShoppingCart } from "react-icons/fa";

interface ProductCarouselProps {
  products: Product[];
}

const ProductCarousel: FC<ProductCarouselProps> = ({ products }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "lg"));

  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true });
  const [slidesPerPage, setSlidesPerPage] = useState(5);

  const calculateSlideFlexBasis = useCallback((slidesPerPage: number) => {
    return `${100 / slidesPerPage}%`;
  }, []);

  const [slideFlexBasis, setSlideFlexBasis] = useState(
    calculateSlideFlexBasis(slidesPerPage)
  );

  const updateSlidesPerPage = useCallback(() => {
    let newSlidesPerPage = 6;
    if (isMobile) {
      newSlidesPerPage = 3;
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
  return (
    <Box
      component="div"
      ref={emblaRef}
      className="embla"
      sx={{
        overflow: "hidden",
        mt: 2,
        "& .embla__container": {
          display: "flex",
          gap: { xs: 1, md: 2 },
        },
        "& .embla__slide": {
          flex: `0 0 ${slideFlexBasis}`,
          minWidth: 0,
          position: "relative",
        },
      }}
    >
      <Box component="div" className="embla__container">
        {products.map((product) => (
          <Box
            key={product.id}
            component="div"
            className="embla__slide"
            sx={{
              width: "100%",
              backgroundColor: "#ffffff",
              padding: "10px",
            }}
          >
            <Link href={`/products/${product.slug}`}>
              <div className="grid place-items-center pb-2 relative">
                <img
                  src={product.image_url || "/default-product.jpg"}
                  alt="name"
                  className="h-auto max-w-full"
                />
              </div>
              <div className="flex justify-between items-center">
                <p className="truncate text-slate-900 text-sm leading-7">
                  {product.name}
                </p>
                <IconButton color="primary">
                  <FaShoppingCart />
                </IconButton>
              </div>
              {product.unit_price !== product.discounted_price ? (
                <p className="text-sm text-gray-500 leading-10">
                  <span className="text-xs text-red-500 pr-2 line-through">
                    {formatPrice(product.unit_price)}
                  </span>
                  {formatPrice(product.discounted_price)} MMK
                </p>
              ) : (
                <p className="text-sm text-gray-500 leading-10">
                  {formatPrice(product.unit_price)} MMK
                </p>
              )}
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
export default ProductCarousel;
