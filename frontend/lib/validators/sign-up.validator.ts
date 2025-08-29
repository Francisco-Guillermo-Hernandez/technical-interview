'use client';

import { z } from 'zod';

export type User = {
  name: string;
  lastName: string;
  gender: 'male' | 'female' | 'other';
  email: string;
  password: string;
  phone: string;
  birthdate: string; 
  repeatPassword?: string;
}

export const userSchema = z.object({
  name: z.string().min(5, "El nombre es requerido"),
  lastName: z.string().min(5, "El apellido es requerido"),
  gender: z.enum(['male', 'female', 'other']),
  email: z.email("Direccion de email invalida"),
  password: z.string().min(8, "La contraseña debe de tener almenos 8 caracteres"),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Numero de telefono invalido"),
  birthdate: z.string().refine((date) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(date);
  }, "Formato invalido YYYY-MM-DD")
});
