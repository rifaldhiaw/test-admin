import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export const UserSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  maidenName: z.string(),
  age: z.number(),
  gender: z.string(),
  email: z.string(),
  phone: z.string(),
  birthDate: z.string(),
  image: z.string(),
});

export type User = z.infer<typeof UserSchema>;

export const userContract = c.router({
  // Get a single user https://dummyjson.com/users/1
  getUserById: {
    method: "GET",
    path: "/users/:id",
    pathParams: z.object({
      id: z.number(),
    }),
    responses: {
      200: UserSchema.nullable(),
    },
    summary: "Get a user by id",
  },
});
