import { faker } from "@faker-js/faker";
import { Category, Product } from "./types";

const categories: Category[] = new Array(5).fill(1).map(() => ({
  id: faker.datatype.uuid(),
  name: faker.commerce.productAdjective(),
}));

const mockProducts: Product[] = new Array(20).fill(1).map(() => {
  const randomCategoryId = Math.floor(Math.random() * 5);

  return {
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    image: faker.image.imageUrl(),
    isSale: faker.datatype.boolean(),
    categoryId: categories[randomCategoryId].id,
  };
});

export default {
  products: mockProducts,
  categories,
};
