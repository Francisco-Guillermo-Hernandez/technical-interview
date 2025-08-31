'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ArrowRightIcon from '@/components/customIcons/arrow.icon';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Plus,
  Clock,
  ArrowLeft,
  Trash2,
  Package,
  Search,
  Download,
  Menu,
  X,
} from 'lucide-react';
import env from '@/lib/env-config';

import { useEffect } from 'react';
import axios from 'axios';

import { format } from 'date-fns';
import { Calendar as CalendarIcon, Mail } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Spinner, type SpinnerProps } from '@/components/ui/spinner';

import { cn } from '@/lib/utils';
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

export type DeliveryRequest = {
  pickupAddress: string;
  deliveryDate: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
  deliveryAddress: string;
  firstLevel: string;
  secondLevel: string;
  directions: string;
  instructions: string;
};

type DataType = {
  firstLevelName: string;
  firstLevelDivision: string;
  firstLevelEntries: {
    secondLevelName: string;
    secondLevelDivision: string;
    secondLevelEntries: {
      thirdLevelName: string;
      thirdLevelDivision: string;
    }[];
  }[];
};

type TriggerOutputCallback = (deliveryRequest: DeliveryRequest) => void;

export default function CreateOrderPage({
  triggerNext,
}: {
  triggerNext: TriggerOutputCallback;
}) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [month, setMonth] = useState<Date | undefined>(date);
  const [data, setData] = useState<DataType[]>([]);
  useEffect(() => {
    axios
      .get<DataType[]>(env.apiUrl.concat('catalogs/divisions/'))
      .then((res) => {
        setData(res.data);
      });
  }, []);

  const [formData, setFormData] = useState<DeliveryRequest>({
    pickupAddress: 'Colonia Las Magnolias, calle militar 1, San Salvador',
    deliveryDate: '03/07/2025',
    firstName: 'Gabriela Reneé',
    lastName: 'Días López',
    email: 'gabbydiaz@gmail.com',
    phone: '7777 7777',
    countryCode: '503',
    deliveryAddress:
      'Final 49 Av Sur y Bulevar Los Próceres, Smartcenter, Bodega #8, San Salvador',
    firstLevel: 'Departamento De San Salvador',
    secondLevel: 'Municipio De San Salvador Centro',
    directions: 'Cerca de redondel Árbol de la Paz',
    instructions: 'Llamar antes de entregar',
  });

  const selectedFirst = data.find(
    (d) => d.firstLevelName === formData.firstLevel
  );

  const handleNextStep = () => triggerNext(formData);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Completa los datos
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
        {/* Pickup Address */}
        <div className="lg:col-span-2">
          <Label
            htmlFor="pickupAddress"
            className="text-sm font-medium text-gray-900 mb-2 block"
          >
            Dirección de recolección
          </Label>
          <Input
            id="pickupAddress"
            value={formData.pickupAddress}
            onChange={(e) =>
              setFormData({
                ...formData,
                pickupAddress: e.target.value,
              })
            }
            className="w-full h-12"
          />
        </div>

        {/* Scheduled Date */}
        <div>
          <Label
            htmlFor="deliveryDate"
            className="text-sm font-medium text-gray-900 mb-2 block"
          >
            Fecha programada
          </Label>
          <div className="relative">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  data-empty={!date}
                  className="relative data-[empty=true]:text-muted-foreground bg-white h-12 w-full justify-between text-left font-normal"
                >
                  {date ? format(date, 'yyyy-MM-dd') : <span>Seleccionar</span>}

                  <CalendarIcon className="size-3.5 justify-end text-gray-400 hover:text-gray-600" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(e) => {
                    setDate(e);

                    setFormData({
                      ...formData,
                      deliveryDate: formatDate(e),
                    });
                    setOpen(false);
                  }}
                  captionLayout="dropdown"
                  month={month}
                  onMonthChange={setMonth}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* First Name */}
        <div>
          <Label
            htmlFor="firstName"
            className="text-sm font-medium text-gray-900 mb-2 block"
          >
            Nombres
          </Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            className="w-full h-12"
          />
        </div>

        {/* Last Name */}
        <div>
          <Label
            htmlFor="lastName"
            className="text-sm font-medium text-gray-900 mb-2 block"
          >
            Apellidos
          </Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            className="w-full h-12"
          />
        </div>

        {/* Email */}
        <div>
          <Label
            htmlFor="email"
            className="text-sm font-medium text-gray-900 mb-2 block"
          >
            Correo electrónico
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full h-12"
          />
        </div>

        {/* Phone */}

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Número de whatsapp
          </label>
          <div className="flex items-center rounded-[8px] border border-input  h-12 focus-within:ring-2 focus-within:ring-ring">
            <Select
              value={formData.countryCode}
              onValueChange={(value) =>
                setFormData({ ...formData, countryCode: value })
              }
            >
              <SelectTrigger className="w-[78px] bg-[#F8F9FA] px-3 py-6 border-r border-input rounded-[8px] focus:ring-0 focus:ring-offset-0 h-12">
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
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="7777 7777"
              className="flex-1 border-0 px-3 py-6 rounded-r-2xl focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>

        {/* Delivery Address */}
        <div className="lg:col-span-2">
          <Label
            htmlFor="deliveryAddress"
            className="text-sm font-medium text-gray-900 mb-2 block"
          >
            Dirección del destinatario
          </Label>
          <Input
            id="deliveryAddress"
            value={formData.deliveryAddress}
            onChange={(e) =>
              setFormData({
                ...formData,
                deliveryAddress: e.target.value,
              })
            }
            className="w-full h-12"
          />
        </div>

        {/* firstLevel */}

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Departamento
          </label>

          <Select
            onValueChange={(value) => {
              setFormData({
                ...formData,
                firstLevel: value,
              });
            }}
            value={formData.firstLevel}
          >
            <SelectTrigger className="py-6 w-full">
              <SelectValue placeholder="Selecciona un departamento" />
            </SelectTrigger>
            <SelectContent>
              {data.map((item) => (
                <SelectItem
                  key={item.firstLevelName}
                  value={item.firstLevelName}
                >
                  {item.firstLevelName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Municipio
          </label>

          <Select
            onValueChange={(value) => {
              setFormData({
                ...formData,
                secondLevel: value,
              });
            }}
            value={formData.secondLevel}
            disabled={!formData.firstLevel}
          >
            <SelectTrigger className="py-6 w-full">
              <SelectValue placeholder="Selecciona un municipio" />
            </SelectTrigger>
            <SelectContent>
              {selectedFirst?.firstLevelEntries.map((entry) => (
                <SelectItem
                  key={entry.secondLevelName}
                  value={entry.secondLevelName}
                >
                  {entry.secondLevelName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Reference Point */}
        <div>
          <Label
            htmlFor="directions"
            className="text-sm font-medium text-gray-900 mb-2 block"
          >
            Punto de referencia
          </Label>
          <Input
            id="directions"
            value={formData.directions}
            onChange={(e) =>
              setFormData({
                ...formData,
                directions: e.target.value,
              })
            }
            className="w-full h-12"
          />
        </div>

        {/* instructions */}
        <div className="lg:col-span-3">
          <Label
            htmlFor="instructions"
            className="text-sm font-medium text-gray-900 mb-2 block"
          >
            Indicaciones
          </Label>
          <Input
            id="instructions"
            value={formData.instructions}
            onChange={(e) =>
              setFormData({
                ...formData,
                instructions: e.target.value,
              })
            }
            className="w-full h-12"
          />
        </div>
      </div>

      {/* Next Button */}
      <div className="flex justify-end mt-8">
        <Button
          onClick={handleNextStep}
          className=" text-white px-1 py-2 custom-btn-primary"
        >
          <span className="px-3">Siguiente</span>{' '}
          <ArrowRightIcon className="custom-icon" />
        </Button>
      </div>
    </div>
  );
}
