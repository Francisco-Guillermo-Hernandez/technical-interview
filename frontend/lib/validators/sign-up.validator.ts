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
  area: string;
}

type CustomZodError = {
  name?: string;
  lastName?: string;
  gender?: string
  email?: string;
  password?: string;
  phone?: string;
  birthdate?: string; 
  repeatPassword?: string;
  area?: string;
}

export const signUpSchema = z.object({
  name: z.string().min(5, "El nombre es requerido"),
  lastName: z.string().min(5, "El apellido es requerido"),
  gender: z.enum(['male', 'female', 'other']),
  email: z.email("Direccion de email invalida"),
  password: z.string().min(8, "La contraseña debe de tener almenos 8 caracteres"),
  repeatPassword: z.string().min(8, "La contraseña debe de tener almenos 8 caracteres"),
  phone: z.string().regex(/^\+?[1-9]\d{7,14}$/, "Numero de telefono invalido"),
  birthdate: z.string().refine((date) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(date);
  }, "Formato invalido YYYY-MM-DD")
}).refine((data) => data.password === data.repeatPassword, {
  message: "Las contraseñas no coinciden",
  path: ["repeatPassword"]
})
export type SignUpFormData = z.infer<typeof signUpSchema>;

export const validateSignUp = (data: Partial<SignUpFormData>) => {
  try {
    signUpSchema.parse(data);
    return { isValid: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
  
      const ff = error.flatten().fieldErrors as CustomZodError
      const errors: CustomZodError = {
        name: ff.name,
        lastName: ff.lastName,
        gender: ff.gender,
        email: ff.email,
        password: ff.password,
        phone: ff.phone,
        birthdate: ff.birthdate,
        repeatPassword: ff.repeatPassword,
      }

      console.log(errors)
      return { isValid: false, errors };
    }
    return { isValid: false, errors: { general: 'Validation failed' } };
  }
};