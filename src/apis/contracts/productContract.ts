import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  discountPercentage: z.number(),
  rating: z.number(),
  stock: z.number(),
  brand: z.string(),
  category: z.string(),
  thumbnail: z.string(),
  images: z.array(z.string()),
});

export type Product = z.infer<typeof ProductSchema>;

export const productContract = c.router({
  getAllProducts: {
    method: "GET",
    path: "/products",
    query: z.object({
      limit: z.number().optional(),
      skip: z.number().optional(),
    }),
    responses: {
      200: z.object({
        total: z.number(),
        skip: z.number(),
        limit: z.number(),
        products: z.array(ProductSchema),
      }),
    },
    summary: "Get all products",
  },
  getProductById: {
    method: "GET",
    path: "/products/:id",
    pathParams: {
      id: z.number(),
    },
    responses: {
      200: ProductSchema.nullable(),
    },
    summary: "Get a product by id",
  },
  searchProducts: {
    method: "GET",
    path: "/products/search",
    query: z.object({
      q: z.string(),
    }),
    responses: {
      200: z.array(ProductSchema),
    },
    summary: "Search products",
  },

  getAllProductsCategories: {
    method: "GET",
    path: "/products/categories",
    responses: {
      200: z.array(z.string()),
    },
    summary: "Get all products categories",
  },
  getProductsByCategory: {
    method: "GET",
    path: "/products/category/:category",
    pathParams: z.object({
      category: z.string(),
    }),
    responses: {
      200: z.array(ProductSchema),
    },
    summary: "Get products of a category",
  },
});
