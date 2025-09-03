'use client';

import type React from 'react';
import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from "@/components/ui/label";
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Toaster, toast } from 'sonner';
import { ChevronLeft, Eye, EyeOff, Calendar as CalendarIcon, Mail  } from 'lucide-react';
import { signUpAction } from '@/controllers/auth/sign-up.controller';
import { useRouter } from 'next/navigation';
import { User, validateSignUp, type CustomZodError } from '@/lib/validators/sign-up.validator';
import axios from 'axios';
import { Calendar } from '@/components/ui/calendar';
import { Spinner } from '@/components/ui/spinner'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { format } from 'date-fns';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

function formatDate(date: Date | undefined) {
  if (!date) {
    return '';
  }
  return date.toISOString().split('T')[0]; // iso format
}

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [month, setMonth] = useState<Date | undefined>(date);
  const [currentStatus, setStatus] = useState('register');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<CustomZodError>({
    name: '',
    lastName: '',
    gender: '',
    birthdate: '',
    email: '',
    phone: '',
    password: '',
    repeatPassword: '',
  });

  const updateRegisterData = (field: string, value: string) => {
    setRegisterData((prev) => ({ ...prev, [field]: value }));
  };
  const [disabled, setDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [registerData, setRegisterData] = useState<User>({
    name: '',
    lastName: '',
    gender: 'male',
    birthdate: '',
    email: '',
    phone: '',
    password: '',
    repeatPassword: '',
    countryCode: '503',
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { isValid, errors } = validateSignUp(registerData)

    setErrors(errors);

    if (!isValid) return;

    try {
      setIsLoading(true);
      signUpAction(registerData)
        .then((data) => {
          toast('Tu registro se ha completado correctamente', {
            description: ` recibiras un correo de confirmación `,
          });
          setTimeout(() => redirect(), 1000);
        })
        .catch((error) => {
          if (axios.isAxiosError(error)) {
            if (error.response?.status == 400) {
              toast('El usuario no puede ser registrado ', {
                description: '',
              });
            }
          }
        });
        setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      
    }
  };

  const redirect = () => {
    router.push('/auth/login/');
  }

  return (
    <>
      <Toaster position="top-center" />
      <Card className=" p-0 " {...props}>
        <CardContent className="grid p-0 md:grid-cols-2 h-screen">

          { currentStatus === 'register' ? ( <></> ): (<></>) }
          <form
            className="p-6 md:p-8 flex flex-col items-center justify-center "
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col w-full md:w-full xl:max-w-md sm:w-full xs:w-full">
              <div className="flex text-left">
                <button type='button' onClick={redirect} className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                  <ChevronLeft className="w-5  text-gray-600" />
                </button>

                <h1 className="text-2xl font-bold font-mona-sans">
                  Cuéntanos de ti
                </h1>
              </div>
              <p className="text-muted-foreground text-balance font-mona-sans mt-2">
                Completa la información de registro
              </p>
            </div>

            { currentStatus === 'register' ? ( 
            <div className="flex flex-col mt-10 w-full md:w-full xl:max-w-md sm:w-full xs:w-full">
              <div className="grid grid-cols-1 xs:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                <div>
                  <Label className="block text-sm font-medium text-gray-900 mb-2">
                    Nombre
                  </Label>
                  <Input
                    value={registerData.name}
                    onChange={(e) => updateRegisterData('name', e.target.value)}
                    placeholder="Digita tu nombre"
                    className="w-full px-3 py-2 focus:outline-none focus:ring-2 h-12 bg-white"
                    required
                  />

                  {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.name}
                      </p>
                    )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Apellido
                  </label>
                  <Input
                    value={registerData.lastName}
                    onChange={(e) =>
                      updateRegisterData('lastName', e.target.value)
                    }
                    placeholder="Digita tu apellido"
                    className="w-full px-3 py-2 h-12 bg-white"
                    required
                  />

                  {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.lastName}
                      </p>
                    )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Sexo
                  </label>

                  <Select
                    value={registerData.gender}
                    onValueChange={(value) =>
                      updateRegisterData('gender', value)
                    }
                    required
                  >
                    <SelectTrigger className="w-full py-6 text-gray-900 bg-white">
                      <SelectValue
                        placeholder="Seleccionar"
                        className="text-gray-900"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Masculino</SelectItem>
                      <SelectItem value="female">Femenino</SelectItem>
                      <SelectItem value="other">Prefiero no decir</SelectItem>
                    </SelectContent>
                  </Select>

                 
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Fecha de nacimiento
                  </label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        data-empty={!date}
                        className="relative data-[empty=true]:text-muted-foreground bg-white h-12 w-full justify-between text-left font-normal">
                        {date ? (
                          format(date, 'yyyy-MM-dd')
                        ) : (
                          <span>Seleccionar</span>
                        )}

                        <CalendarIcon className="size-3.5 justify-end text-gray-400 hover:text-gray-600" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(e) => {
                          setDate(e)
                          updateRegisterData('birthdate', formatDate(e))
                          setOpen(false)
                        }}
                        captionLayout="dropdown"
                        month={month}
                        onMonthChange={setMonth}
                      />
                    </PopoverContent>
                  </Popover>

                    {errors.birthdate && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.birthdate}
                      </p>
                    )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Correo electrónico
                  </label>
                  <Input
                    type="email"
                    value={registerData.email}
                    onChange={(e) =>
                      updateRegisterData('email', e.target.value)
                    }
                    placeholder="Digitar correo"
                    className="w-full px-3 py-2 h-12 bg-white"
                    required
                  />

                  {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-2">
                    Número de whatsapp
                  </label>
                  <div className="flex items-center rounded-[8px] border border-input  h-12 focus-within:ring-2 focus-within:ring-ring">
                    <Select 
                     value={registerData.countryCode}
                     name='countryCode' 
                    onValueChange={(value) =>
                      updateRegisterData('countryCode', value)
                    }>
                      <SelectTrigger className="w-[78px] px-3 py-6 border-r border-input rounded-[8px] focus:ring-0 focus:ring-offset-0 h-12">
                        <SelectValue placeholder="Code" className="" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="503">503</SelectItem>
                        <SelectItem value="502">502</SelectItem>
                        <SelectItem value="505">505</SelectItem>
                      </SelectContent>
                    </Select>

                    <Input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={registerData.phone}
                      onChange={(e) =>
                        updateRegisterData('phone', e.target.value)
                      }
                      placeholder="7777 7777"
                      className=" flex-1 border-0 px-3 py-6 rounded-r-2xl focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                   {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone}
                      </p>
                    )}
                </div>

                <div>
                  <Label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-2">
                    Contraseña
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={registerData.password}
                      onChange={(e) =>
                        updateRegisterData('password', e.target.value)
                      }
                      placeholder="Digitar contraseña"
                      className="w-full px-3 py-2 pr-10 h-12 bg-white"
                      id="password"
                      name="password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                   {errors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.password}
                      </p>
                    )}
                </div>

                <div>
                  <Label htmlFor="showRepeatPassword" className="block text-sm font-medium text-gray-900 mb-2">
                    Repetir contraseña
                  </Label>
                  <div className="relative">
                    <Input
                      type={showRepeatPassword ? 'text' : 'password'}
                      value={registerData.repeatPassword}
                      onChange={(e) =>
                        updateRegisterData('repeatPassword', e.target.value)
                      }
                      placeholder="Digitar contraseña"
                      className="w-full px-3 py-2 pr-10 h-12 bg-white"
                      required
                      id="showRepeatPassword"
                      name="showRepeatPassword"
                    />
                    <button
                      type="button"
                      onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showRepeatPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                   {errors.repeatPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.repeatPassword}
                      </p>
                    )}
                </div>

               
              </div>
              <Button
                type="submit"
                disabled={disabled}
                className="mt-12 w-full h-12 font-mona-sans font-bold"
              >
                { isLoading ? (<Spinner key="default" variant="default" /> ) : ('Siguente') }
              </Button>
            </div>
            ) : (
           <div className=' mt-12'>
              <div className='grid grid-cols-1'>

                <div className='flex flex-col items-center'>
                <h4 className='text-balance font-black text-center'> Recibiras un correo confirmando que te has registrado correctamente </h4>
                <p className="text-muted-foreground text-balance font-mona-sans mt-2">
                  para continuar debes de activar tu usuario con el código OTP, la proxima vez que incies sesión.
                </p>
                <p className='w-full'>
                  <Mail className='h-28 w-28 text-gray-200 '/>
                </p>
                </div>
              </div>
            </div>
          ) }

            
          </form>
          <div className="bg-[#EDEDED] relative hidden md:block"></div>
        </CardContent>
      </Card>
    </>
  );
}
