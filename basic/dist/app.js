"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const mockData_1 = __importDefault(require("./mockData"));
const fruits = ["Banana", "Orange", "Apple"];
const typeDefs = `#graphql
    type Category {
     id: ID!
     name: String!
     products: [Product!]!
    }

    type Product {
     id:   ID!      
     name: String!
     image: String!
     price: Int!
     description: String
     isSale: Boolean!
     categoryId: String!
     category: Category
  }

    type Query {
       name: String!
       age: Int
       isMarried: Boolean
       id: Int
       fruits: [String!]!
       products(data: FilterProductParams): [Product!]!
       product: Product!
       categories: [Category!]!
    }

    type Mutation {
       addCategory(name: String!): Category
    }

    input FilterProductParams {
       limit: Int
       offset: Int
       name: String
       order: String
    }
`;
const resolvers = {
    Mutation: {
        addCategory(_, { name }) {
            const cat = {
                id: new Date().toISOString(),
                name,
            };
            mockData_1.default.categories.push(cat);
            return cat;
        },
    },
    Query: {
        name() {
            return null;
        },
        age() {
            return 21;
        },
        isMarried() {
            return false;
        },
        id() {
            return 1;
        },
        fruits() {
            return fruits;
        },
        products(_, args, __) {
            console.log(args.data);
            return mockData_1.default.products;
        },
        product() {
            return mockData_1.default.products[0];
        },
        categories() {
            return mockData_1.default.categories;
        },
    },
    Category: {
        products(parent, args, ctx) {
            return mockData_1.default.products.filter((product) => product.categoryId === parent.id);
        },
    },
    Product: {
        category(parent, args, ctx) {
            var _a;
            return (_a = mockData_1.default.categories.find((c) => c.id === parent.categoryId)) !== null && _a !== void 0 ? _a : null;
        },
    },
};
const server = new server_1.ApolloServer({
    typeDefs,
    resolvers,
});
(async () => {
    const PORT = Number(process.env.PORT || 4000);
    const { url } = await (0, standalone_1.startStandaloneServer)(server, {
        listen: { port: PORT },
    });
    console.log(`Server is up and running on port ${PORT}`);
    console.log(`Server is up and running at url ${url}`);
})().catch(console.log);
//# sourceMappingURL=app.js.map