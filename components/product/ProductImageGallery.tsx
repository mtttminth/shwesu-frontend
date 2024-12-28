"use client";

import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

interface ProductImageGalleryProps {
  items: { original: string; thumbnail: string }[];
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ items }) => {
  return (
    <ImageGallery
      showBullets={false}
      showFullscreenButton={true}
      showPlayButton={false}
      items={items}
    />
  );
};

export default ProductImageGallery;
