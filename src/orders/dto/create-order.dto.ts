import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const createOrderSchema = z.object({
  dish_id: z.string({
    required_error: 'Dish is required',
  }),
  quantity: z.number({
    required_error: 'Quantity is required',
  }),
  delivery_address: z.string({
    required_error: 'Delivery address is required',
  }),
  payment_method: z.string({
    required_error: 'Payment is required',
  }),
});

export class CreateOrderDto extends createZodDto(createOrderSchema) {}
