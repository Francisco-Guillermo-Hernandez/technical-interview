'use client';

import { useFormState, useFormStatus } from "react-dom";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import axios from 'axios';
import { Spinner, type SpinnerProps } from '@/components/ui/spinner';
import { Toaster, toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { validateLogin } from '@/lib/validators/login.validator';
import { loginAction } from '@/controllers/auth/login.controller';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { isValid, errors } = validateLogin({ email, password });
    setErrors(errors);

    if (!isValid) return;

    try {
      setIsLoading(true);
      loginAction(email, password)
        .then((data) => {
          console.log(data);
          toast('Bienvenido', { description: `Saludos ${data.user}` });
          router.push('/dashboard');
        })
        .catch((error) => {
          if (axios.isAxiosError(error)) {
            console.log(error?.response?.status);

            if (error.response?.status == 401) {
              toast('Credenciales inválidas', {
                description: 'Por favor ingrese las credenciales de nuevo',
              });
            }
          }
        });
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
      <Toaster position="top-center" />
      <Card className="overflow-hidden p-0 " {...props}>
        <CardContent className="grid p-0 md:grid-cols-2 h-screen">
          <form
            className="p-6 md:p-8 flex items-center justify-center"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-6 w-full md:w-full xl:max-w-md sm:w-full xs:w-full">
              <div className="flex flex-col text-left">
                <h1 className="text-2xl font-bold font-mona-sans">
                  Bienvenido
                </h1>
                <p className="text-muted-foreground text-balance font-mona-sans mt-3">
                  Por favor ingresa tus credenciales
                </p>
              </div>
              <div className="grid gap-3 mt-10">
                <Label htmlFor="email">Correo electr&oacute;nico</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`h-12 ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="Digita tu correo"
                  required
                />
                {errors.email && (<p className="text-red-500 text-sm mt-1">{errors.email}</p>)}
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Contraseña</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digita tu contraseña"
                  className={`h-12 ${errors.password ? 'border-red-500' : ''}`}
                  required
                />
                {errors.password && (<p className="text-red-500 text-sm mt-1">{errors.password}</p> )}
              </div>

              <Button
                type="submit"
                // onClick={() => logIn(email, password)}
                // disabled={errors?.email != null || errors.password != null }
                className="w-full custom-btn-primary"
              >
                {isLoading ? (
                  <Spinner key="default" variant="default" />
                ) : (
                  'Iniciar sesión'
                )}
              </Button>
              <div className="text-center text-sm">
                Necesitas una cuenta? &nbsp;
                <a
                  href="/auth/sign-up"
                  className="hover:underline hover:underline-offset-4 font-bold font-mona-sans"
                >
                  Reg&iacute;strate aqu&iacute;
                </a>
              </div>
            </div>
          </form>
          <div className="bg-[#EDEDED] relative hidden md:block"></div>
        </CardContent>
      </Card>
    </>
  );
}
