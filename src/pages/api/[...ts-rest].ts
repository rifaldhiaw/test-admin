import { Product, productContract } from "@/apis/contracts/productContract";
import { createNextRoute, createNextRouter } from "@ts-rest/next";
import cacheData from "memory-cache";

const PRODUCT_CACHE_KEY = "products";
const PRODUCT_CACHE_HOUR = 24;

const productsRouter = createNextRoute(productContract, {
  getProducts: async (args) => {
    const dataInMemory: Product[] = cacheData.get(PRODUCT_CACHE_KEY) || [];

    if (dataInMemory.length === 0) {
      const response = await fetch("https://dummyjson.com/products?limit=100");
      const data = await response.json();

      cacheData.put(
        PRODUCT_CACHE_KEY,
        data.products,
        PRODUCT_CACHE_HOUR * 1000 * 60 * 60
      );
    }

    let products = dataInMemory;
    const { skip, limit, minPrice, maxPrice, q } = args.query;

    if (args.query.category) {
      products = products.filter(
        (product) => product.category === args.query.category
      );
    }

    if (args.query.brand) {
      products = products.filter(
        (product) => product.brand === args.query.brand
      );
    }

    if (minPrice) {
      products = products.filter((product) => product.price >= minPrice);
    }

    if (maxPrice) {
      products = products.filter((product) => product.price <= maxPrice);
    }

    if (q) {
      products = products.filter((product) =>
        product.title.toLowerCase().includes(q.toLowerCase())
      );
    }

    const slicedProducts = products.slice(skip, skip + limit);

    return {
      status: 200,
      body: {
        products: slicedProducts,
        total: products.length,
        skip: args.query.skip,
        limit: args.query.limit,
      },
    };
  },
});

export default createNextRouter(productContract, productsRouter);
