import { IncomingMessage, ServerResponse } from "http";

export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  price: string;
  description: string;
  isSale: boolean;
  categoryId: string;
  category?: Category;
}

export interface MyContext {
  db: {
    products: Product[];
    categories: Category[];
  };
  fruits: string[];
  req: IncomingMessage;
  res: ServerResponse<IncomingMessage>;
}
