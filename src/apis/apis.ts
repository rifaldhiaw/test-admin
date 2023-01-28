import { initQueryClient } from "@ts-rest/react-query";
import { cartContract } from "./contracts/cartContract";
import { productContract } from "./contracts/productContract";
import { userContract } from "./contracts/userContract";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://dummyjson.com";

export const cartApi = initQueryClient(cartContract, {
  baseUrl: baseUrl,
  baseHeaders: {},
});

export const productApi = initQueryClient(productContract, {
  baseUrl: baseUrl,
  baseHeaders: {},
});

export const userApi = initQueryClient(userContract, {
  baseUrl: baseUrl,
  baseHeaders: {},
});
