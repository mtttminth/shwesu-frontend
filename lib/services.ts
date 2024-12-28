export const formatPrice = (price: number | string): string => {
  const parsedPrice = typeof price === "string" ? parseFloat(price) : price;
  return new Intl.NumberFormat().format(parsedPrice);
};

export const getPerPage = (): number => {
  return 24;
};
