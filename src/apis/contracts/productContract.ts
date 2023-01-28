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
  getProducts: {
    method: "GET",
    path: "/products",
    query: z.object({
      limit: z.string().transform(Number).default("10"),
      skip: z.string().transform(Number).default("0"),
      category: z.string().optional(),
      brand: z.string().optional(),
      minPrice: z.string().transform(Number).optional(),
      maxPrice: z.string().transform(Number).optional(),
      q: z.string().optional(),
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
});
