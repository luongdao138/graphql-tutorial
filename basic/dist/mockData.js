"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const categories = new Array(5).fill(1).map(() => ({
    id: faker_1.faker.datatype.uuid(),
    name: faker_1.faker.commerce.productAdjective(),
}));
const mockProducts = new Array(20).fill(1).map(() => {
    const randomCategoryId = Math.floor(Math.random() * 5);
    return {
        id: faker_1.faker.datatype.uuid(),
        name: faker_1.faker.commerce.productName(),
        description: faker_1.faker.commerce.productDescription(),
        price: faker_1.faker.commerce.price(),
        image: faker_1.faker.image.imageUrl(),
        isSale: faker_1.faker.datatype.boolean(),
        categoryId: categories[randomCategoryId].id,
    };
});
exports.default = {
    products: mockProducts,
    categories,
};
//# sourceMappingURL=mockData.js.map