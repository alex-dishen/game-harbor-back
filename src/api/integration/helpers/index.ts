export const getPrice = (added: number) => {
  let minPrice = 1;
  let maxPrice: number;

  if (added > 1300) {
    maxPrice = 5;
    minPrice = 3;
  } else {
    maxPrice = 3;
  }

  const randomPrice = Math.random() * (maxPrice - minPrice) + minPrice;

  const roundedPrice = Math.round(randomPrice * 100) / 100;

  return roundedPrice;
};
