import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import db from "./mockData";

// scalar types: Int, Float, String, Boolean, ID
// object type

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

      db.categories.push(cat);

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
      return db.products;
    },
    product() {
      return db.products[0];
    },
    categories() {
      return db.categories;
    },
  },
  Category: {
    products(parent, args, ctx) {
      return db.products.filter((product) => product.categoryId === parent.id);
    },
  },
  Product: {
    category(parent, args, ctx) {
      return db.categories.find((c) => c.id === parent.categoryId) ?? null;
    },
  },
};

// init apollo server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

(async () => {
  const PORT = Number(process.env.PORT || 4000);

  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
  });

  console.log(`Server is up and running on port ${PORT}`);
  console.log(`Server is up and running at url ${url}`);
})().catch(console.log);
