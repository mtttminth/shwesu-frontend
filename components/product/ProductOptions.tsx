"use client";

import { ProductAttribute, ProductVariant } from "@/lib/types";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";

interface ProductOptionsProps {
  variants: ProductVariant[];
  attributes: ProductAttribute[];
  onVariantSelect: (variant: ProductVariant | undefined) => void;
}

const ProductOptions: React.FC<ProductOptionsProps> = ({
  variants,
  attributes,
  onVariantSelect,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});
  const [selectedVariant, setSelectedVariant] = useState<
    ProductVariant | undefined
  >();

  const theme = useTheme();

  useEffect(() => {
    const variant = variants.find((v) => {
      const variantValues = v.values;
      if (!variantValues) return false;
      return Object.entries(selectedOptions).every(([key, value]) =>
        variantValues.some(
          (variantValue) =>
            attributes.find((attr) => attr.name === key)?.id ===
              variantValue.attribute_id && variantValue.value === value
        )
      );
    });

    // Only update selectedVariant if it has changed
    if (variant !== selectedVariant) {
      setSelectedVariant(variant);
      onVariantSelect(variant);
    }
  }, [selectedOptions, variants, attributes, onVariantSelect, selectedVariant]);

  const handleOptionSelect = (optionType: string, choice: string) => {
    setSelectedOptions((prev) => ({ ...prev, [optionType]: choice }));
  };

  const isVariantInStock = (choices: { [key: string]: string }) => {
    return variants.some((variant) => {
      const variantValues = variant.values;
      if (!variantValues) return false;

      return (
        Object.entries(choices).every(([key, value]) =>
          variantValues.some(
            (variantValue) =>
              attributes.find((attr) => attr.name === key)?.id ===
                variantValue.attribute_id && variantValue.value === value
          )
        ) &&
        variant.stock !== null &&
        variant.stock > 0
      );
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {attributes.map((option) => (
        <div className="flex flex-col gap-4" key={option.name}>
          <h4 className="font-medium">Choose a {option.name}</h4>
          <ul className="flex items-center gap-3">
            {option?.values?.map((choice) => {
              const disabled = !isVariantInStock({
                ...selectedOptions,
                [option.name!]: choice.value!,
              });

              const selected = selectedOptions[option.name!] === choice.value;

              const clickHandler = disabled
                ? undefined
                : () => handleOptionSelect(option.name!, choice.value!);

              return option.name === "Color" ? (
                <li
                  className="w-8 h-8 rounded-full ring-1 ring-gray-300 relative"
                  style={{
                    backgroundColor: choice.value,
                    cursor: disabled ? "not-allowed" : "pointer",
                  }}
                  onClick={clickHandler}
                  key={choice.value}
                >
                  {selected && (
                    <div className="absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  )}
                  {disabled && (
                    <div className="absolute w-10 h-[2px] bg-red-400 rotate-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  )}
                </li>
              ) : (
                <li
                  className="ring-1 ring-lama text-lama rounded-md py-1 px-4 text-sm"
                  style={{
                    cursor: disabled ? "not-allowed" : "pointer",
                    backgroundColor: selected
                      ? theme.palette.primary.main
                      : disabled
                      ? "#C0C0C0"
                      : "white",
                    color:
                      selected || disabled
                        ? "white"
                        : theme.palette.primary.main,
                    boxShadow: disabled ? "none" : "",
                  }}
                  key={choice.value}
                  onClick={clickHandler}
                >
                  {choice.value}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ProductOptions;
