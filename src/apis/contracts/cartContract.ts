import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { ProductSchema } from "./productContract";

const c = initContract();

export const CartSchema = z.object({
  id: z.number(),
  products: z.array(ProductSchema),
  total: z.number(),
  discountedTotal: z.number(),
  userId: z.number(),
  totalProducts: z.number(),
  totalQuantity: z.number(),
});

export type Cart = z.infer<typeof CartSchema>;

export const cartContract = c.router({
  // Get all carts https://dummyjson.com/carts
  getAllCarts: {
    method: "GET",
    path: "/carts",
    query: z.object({
      limit: z.number().optional(),
      skip: z.number().optional(),
    }),
    responses: {
      200: z.object({
        total: z.number(),
        skip: z.number(),
        limit: z.number(),
        carts: z.array(CartSchema),
      }),
    },
    summary: "Get all carts",
  },
  // Get a single cart https://dummyjson.com/carts/1
  getCartById: {
    method: "GET",
    path: "/carts/:id",
    pathParams: z.object({
      id: z.number(),
    }),
    responses: {
      200: CartSchema.nullable(),
    },
    summary: "Get a cart by id",
  },
  // Get carts of a user https://dummyjson.com/carts/user/5'
  getCartsByUserId: {
    method: "GET",
    path: "/carts/user/:id",
    pathParams: z.object({
      id: z.number(),
    }),
    responses: {
      200: z.array(CartSchema),
    },
    summary: "Get carts of a user",
  },
});
