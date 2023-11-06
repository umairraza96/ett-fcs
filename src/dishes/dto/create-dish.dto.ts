import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const createDishSchema = z.object({
  name: z.string({
    required_error: "dish's name is required",
  }),

  description: z.string({
    required_error: "dish's description is required",
  }),

  price: z
    .number({
      required_error: "dish's price is required",
    })
    .nonnegative({
      message: "dish's price must be a non-negative number",
    }),
});

export class CreateDishDto extends createZodDto(createDishSchema) {}
