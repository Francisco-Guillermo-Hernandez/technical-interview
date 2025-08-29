import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email('Por favor ingresa un correo válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres')
});

export type LoginFormData = z.infer<typeof loginSchema>;

type CustomZodError = {
  email?: Array<string> | string;
  password?: Array<string> | string;
}

export const validateLogin = (data: Partial<LoginFormData>) => {
  try {
    loginSchema.parse(data);
    return { isValid: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: CustomZodError = {};
  
      const ff = error.flatten().fieldErrors as CustomZodError
      if (ff?.email) {
        errors.email = ff?.email?? '';
      }

      if (ff?.password) {
        errors.password = ff?.password?? '';
      }

      console.log(errors)
      return { isValid: false, errors };
    }
    return { isValid: false, errors: { general: 'Validation failed' } };
  }
};