import { Role } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const createAuthSchema = z
  .object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email(),
    password: z.string({
      required_error: 'Password is required',
    }),
    role: z.nativeEnum(Role, {
      required_error: 'Role is required',
    }),
  })
  .required();

export class CreateAuthDto extends createZodDto(createAuthSchema) {}
