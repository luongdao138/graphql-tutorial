"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
 
  # Object type
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

  type Category {
     id: ID!
     name: String!
     products: [Product!]!
  }
  
  type Query {
    name: String!
    age: Int!
    isMarried: Boolean!
    id: ID!
    fruits: [String!]!
    products(input: FilterProductParams): [Product!]!
    product(id: String!): Product
    categories: [Category!]!
  }


  type Mutation {
     addCategory(data: AddCategoryReq!): Category
  }

  input AddCategoryReq {
     name: String!
  }

  input FilterProductParams { 
    limit: Int
    offset: Int
    minPrice: Int
    isSale: Boolean     
  }
`;
//# sourceMappingURL=schema.js.map