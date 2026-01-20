import { z } from 'zod';

const addressSchema = z.object({
  street: z.string().min(1, 'Street is required'),
  number: z.string().min(1, 'Number is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().length(2, 'State must be 2 characters'),
  zipCode: z.string().regex(/^\d{5}-\d{3}$/, 'Invalid zipCode format (xxxxx-xxx)'),
});

export const createDriverSchema = z.object({
  body: z.object({
    name: z.string().min(3, 'Name must have at least 3 characters'),
    cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'Invalid CPF format (xxx.xxx.xxx-xx)'),
    birthDate: z.string().datetime('Invalid date format'),
    gender: z.enum(['MALE', 'FEMALE', 'OTHER'], {
      message: 'Gender must be MALE, FEMALE or OTHER',
    }),
    address: addressSchema,
  }),
});

export const updateDriverSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid driver ID format'),
  }),
  body: z.object({
    name: z.string().min(3, 'Name must have at least 3 characters'),
    cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'Invalid CPF format (xxx.xxx.xxx-xx)'),
    birthDate: z.string().datetime('Invalid date format'),
    gender: z.enum(['MALE', 'FEMALE', 'OTHER'], {
      message: 'Gender must be MALE, FEMALE or OTHER',
    }),
    address: addressSchema,
  }),
});

export const getDriverSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid driver ID format'),
  }),
});

export const deleteDriverSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid driver ID format'),
  }),
});
