'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Calendar,
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

export interface Product {
  id: string;
  length: string;
  height: string;
  width: string;
  weight: string;
  content: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  firstName: string;
  lastName: string;
  department: string;
  municipality: string;
  packages: number;
}

// export function Dashboard({
//   className,
//   ...props
// }: React.ComponentProps<"div">) {

export function DeliveryOrderForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [activeTab, setActiveTab] = useState<'crear' | 'historial'>('crear');
  const [currentStep, setCurrentStep] = useState(1);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [formData, setFormData] = useState({
    pickupAddress: 'Colonia Las Magnolias, calle militar 1, San Salvador',
    scheduledDate: '03/07/2025',
    firstName: 'Gabriela Reneé',
    lastName: 'Días López',
    email: 'gabbydiaz@gmail.com',
    phone: '7777 7777',
    countryCode: '503',
    deliveryAddress:
      'Final 49 Av Sur y Bulevar Los Próceres, Smartcenter, Bodega #8, San Salvador',
    department: 'San Salvador',
    municipality: 'San Salvador',
    referencePoint: 'Cerca de redondel Árbol de la Paz',
    instructions: 'Llamar antes de entregar',
  });

  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      length: '15',
      height: '15',
      width: '15',
      weight: '3',
      content: 'iPhone 14 pro Max',
    },
  ]);

  const [newProduct, setNewProduct] = useState({
    length: '15',
    height: '15',
    width: '15',
    weight: '3',
    content: 'iPhone 14 pro Max',
  });

  const [orders] = useState<Order[]>([
    {
      id: '1',
      orderNumber: '3446788',
      firstName: 'Julio',
      lastName: 'Almendarez',
      department: 'San Salvador',
      municipality: 'San Salvador',
      packages: 4,
    },
  ]);

  const [dateRange, setDateRange] = useState('Enero - Julio');

  const addProduct = () => {
    const product: Product = {
      id: Date.now().toString(),
      ...newProduct,
    };
    setProducts([...products, product]);
    setNewProduct({
      length: '',
      height: '',
      width: '',
      weight: '',
      content: '',
    });
  };

  const removeProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleNextStep = () => {
    setCurrentStep(2);
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
  };

  const handleTabSwitch = (tab: 'crear' | 'historial') => {
    setActiveTab(tab);
    if (tab === 'crear') {
      setCurrentStep(1); // Reset to first step when switching back to create order
    }
    setSidebarOpen(false);
  };

  return (
  <div {...props}>
        {activeTab === 'crear' ? (
          <>
           
        

            {currentStep === 1 ? (
              // Step 1: Customer Information Form
              <div className="bg-white rounded-lg border border-gray-200 p-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Completa los datos</h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Pickup Address */}
                  <div className="lg:col-span-2">
                    <Label
                      htmlFor="pickupAddress"
                      className="text-sm font-medium text-gray-700 mb-2 block"
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
                      className="w-full"
                    />
                  </div>

                  {/* Scheduled Date */}
                  <div>
                    <Label
                      htmlFor="scheduledDate"
                      className="text-sm font-medium text-gray-700 mb-2 block"
                    >
                      Fecha programada
                    </Label>
                    <div className="relative">
                      <Input
                        id="scheduledDate"
                        value={formData.scheduledDate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            scheduledDate: e.target.value,
                          })
                        }
                        className="w-full pr-10"
                      />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  {/* First Name */}
                  <div>
                    <Label
                      htmlFor="firstName"
                      className="text-sm font-medium text-gray-700 mb-2 block"
                    >
                      Nombres
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      className="w-full"
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <Label
                      htmlFor="lastName"
                      className="text-sm font-medium text-gray-700 mb-2 block"
                    >
                      Apellidos
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      className="w-full"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700 mb-2 block"
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
                      className="w-full"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <Label
                      htmlFor="phone"
                      className="text-sm font-medium text-gray-700 mb-2 block"
                    >
                      Teléfono
                    </Label>
                    <div className="flex gap-2">
                      <Select
                        value={formData.countryCode}
                        onValueChange={(value) =>
                          setFormData({ ...formData, countryCode: value })
                        }
                      >
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="503">503</SelectItem>
                          <SelectItem value="504">504</SelectItem>
                          <SelectItem value="505">505</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="flex-1"
                      />
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div className="lg:col-span-2">
                    <Label
                      htmlFor="deliveryAddress"
                      className="text-sm font-medium text-gray-700 mb-2 block"
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
                      className="w-full"
                    />
                  </div>

                  {/* Department */}
                  <div>
                    <Label
                      htmlFor="department"
                      className="text-sm font-medium text-gray-700 mb-2 block"
                    >
                      Departamento
                    </Label>
                    <Input
                      id="department"
                      value={formData.department}
                      onChange={(e) =>
                        setFormData({ ...formData, department: e.target.value })
                      }
                      className="w-full"
                    />
                  </div>

                  {/* Municipality */}
                  <div>
                    <Label
                      htmlFor="municipality"
                      className="text-sm font-medium text-gray-700 mb-2 block"
                    >
                      Municipio
                    </Label>
                    <Input
                      id="municipality"
                      value={formData.municipality}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          municipality: e.target.value,
                        })
                      }
                      className="w-full"
                    />
                  </div>

                  {/* Reference Point */}
                  <div>
                    <Label
                      htmlFor="referencePoint"
                      className="text-sm font-medium text-gray-700 mb-2 block"
                    >
                      Punto de referencia
                    </Label>
                    <Input
                      id="referencePoint"
                      value={formData.referencePoint}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          referencePoint: e.target.value,
                        })
                      }
                      className="w-full"
                    />
                  </div>

                  {/* Instructions */}
                  <div className="lg:col-span-3">
                    <Label
                      htmlFor="instructions"
                      className="text-sm font-medium text-gray-700 mb-2 block"
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
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Next Button */}
                <div className="flex justify-end mt-8">
                  <Button
                    onClick={handleNextStep}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2"
                  >
                    Siguiente
                    <span className="ml-2">→</span>
                  </Button>
                </div>
              </div>
            ) : (
              // Step 2: Add Products
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Agrega tus productos
                </h2>

                {/* Product Entry Form */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="grid grid-cols-5 gap-4 items-end">
                    <div className="flex items-center justify-center">
                      <Package className="w-8 h-8 text-gray-400" />
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Largo
                      </Label>
                      <div className="flex items-center gap-2">
                        <Input
                          value={newProduct.length}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              length: e.target.value,
                            })
                          }
                          className="w-16"
                        />
                        <span className="text-sm text-gray-500">cm</span>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Alto
                      </Label>
                      <div className="flex items-center gap-2">
                        <Input
                          value={newProduct.height}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              height: e.target.value,
                            })
                          }
                          className="w-16"
                        />
                        <span className="text-sm text-gray-500">cm</span>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Ancho
                      </Label>
                      <div className="flex items-center gap-2">
                        <Input
                          value={newProduct.width}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              width: e.target.value,
                            })
                          }
                          className="w-16"
                        />
                        <span className="text-sm text-gray-500">cm</span>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Peso en libras
                      </Label>
                      <Input
                        value={newProduct.weight}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            weight: e.target.value,
                          })
                        }
                        placeholder="3 libras"
                        className="w-24"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Contenido
                    </Label>
                    <Input
                      value={newProduct.content}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          content: e.target.value,
                        })
                      }
                      placeholder="iPhone 14 pro Max"
                      className="w-full max-w-md"
                    />
                  </div>

                  <div className="flex justify-end mt-4">
                    <Button
                      onClick={addProduct}
                      variant="outline"
                      className="text-gray-700 bg-transparent"
                    >
                      Agregar
                      <Plus className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>

                {/* Product List */}
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg border-2 border-green-200 p-6"
                  >
                    <div className="grid grid-cols-6 gap-4 items-center">
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-1 block">
                          Peso en libras
                        </Label>
                        <div className="text-sm text-gray-900">
                          {product.weight} libras
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-1 block">
                          Contenido
                        </Label>
                        <div className="text-sm text-gray-900">
                          {product.content}
                        </div>
                      </div>

                      <div className="flex items-center justify-center">
                        <Package className="w-8 h-8 text-gray-400" />
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-1 block">
                          Largo
                        </Label>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-900">
                            {product.length}
                          </span>
                          <span className="text-sm text-gray-500">cm</span>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-1 block">
                          Alto
                        </Label>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-900">
                            {product.height}
                          </span>
                          <span className="text-sm text-gray-500">cm</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-1 block">
                            Ancho
                          </Label>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-900">
                              {product.width}
                            </span>
                            <span className="text-sm text-gray-500">cm</span>
                          </div>
                        </div>
                        <Button
                          onClick={() => removeProduct(product.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <Button
                    onClick={handlePrevStep}
                    variant="outline"
                    className="text-gray-700 bg-transparent"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Regresar
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2">
                    Enviar
                    <span className="ml-2">→</span>
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <h1 className="text-2xl font-semibold text-gray-900 mb-8">
              Mis envíos
            </h1>

            {/* Search and Filter Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Input
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="w-48 pr-10"
                    placeholder="Enero - Julio"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Search className="w-4 h-4 mr-2" />
                  Buscar
                </Button>
                <button className="text-gray-600 hover:text-gray-800 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Descargar órdenes
                </button>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="grid grid-cols-6 gap-4 p-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-700">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded mr-3"
                  />
                  No. de orden
                </div>
                <div>Nombre</div>
                <div>Apellidos</div>
                <div>Departamento</div>
                <div>Municipio</div>
                <div>Paquetes en orden</div>
              </div>

              {orders.map((order) => (
                <div
                  key={order.id}
                  className="grid grid-cols-6 gap-4 p-4 border-b border-gray-100 text-sm"
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded mr-3"
                    />
                    <span className="text-gray-900">{order.orderNumber}</span>
                  </div>
                  <div className="text-gray-900">{order.firstName}</div>
                  <div className="text-gray-900">{order.lastName}</div>
                  <div className="text-gray-900">{order.department}</div>
                  <div className="text-gray-900">{order.municipality}</div>
                  <div>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {order.packages}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
  );
}
