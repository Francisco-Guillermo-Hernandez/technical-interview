'use client';

import * as React from 'react';
import PackageIcon from '@/public/package.svg';

import AddIcon from '@/public/add.svg';
import ArrowIcon from '@/public/arrow.svg';
import DeleteIcon from '@/public/delete.svg';
import ArrowLeft from '@/public/ArrowLeft.svg';

import { Button } from '@/components/ui/button';
import ArrowRightIcon from '@/components/customIcons/arrow.icon';
import DeleteI from '@/components/customIcons/delete.icon';
import Image from 'next/image';
import ProductDimensions from '@/components/orders/product-dimensions';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


import { z } from 'zod';

const productSchema = z.object({
  length: z.string().min(1, "La longitud es requerida"),
  height: z.string().min(1, "La altura es requerida"),
  width: z.string().min(1, "El ancho es requerido"),
  weight: z.string().min(1, "El peso es requerido"),
  content: z.string().min(1, "El contenido es requerido"),
});


interface Product {
  id: string;
  length: string;
  height: string;
  width: string;
  weight: string;
  content: string;
}

type TriggerOutputCallback = (products: Product[]) => void;
type TriggerBack = () => void;

export default function OrderPage({ triggerOutput, triggerBack }: { 
  triggerOutput?: TriggerOutputCallback; 
  triggerBack: TriggerBack;
}) {
  const [open, setOpen] = React.useState(false);
  const [products, setProducts] = React.useState<Array<Product>>([]);
  const [newProduct, setNewProduct] = React.useState({
    length: '',
    height: '',
    width: '',
    weight: '',
    content: '',
  });

  const addProduct = () => {
    if (!isProductValid()) return;
    
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

  const handleDimensionsChange = (dimensions: {
    length: string;
    height: string;
    width: string;
  }) => {
    console.log(dimensions);

    setNewProduct({
      ...newProduct,
      length: dimensions.length,
      height: dimensions.height,
      width: dimensions.width,
    });
  };

  const isProductValid = () => {
    try {
      productSchema.parse(newProduct);
      return true;
    } catch (error) {
      return false;
    }
  };

  const clearProducts = () => setProducts([]);
  const handleTriggerOutput = () => {
    if (triggerOutput) {
      triggerOutput(products);
    }
    setOpen(false);
    clearProducts();
  }

  const handleTriggerBack = () => triggerBack();

  return (
    
    <div className="bg-white rounded-lg  border border-gray-200 p-8  ">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Agrega tus productos
      </h2>

      <div className="">
        <div className="p-6 bg-[#F8F9FA] rounded-xl">
          <div className="flex items-center gap-[20px]">
            <div className="flex items-center justify-center w-[48px] h-[48px]">
              <Image src={PackageIcon} alt="package" width={30} height={31} />
            </div>
            {/* border border- rounded-lg bg-white px-2 py-2 */}

            <ProductDimensions
              onChange={handleDimensionsChange}
              initialDimensions={{
                height: newProduct.height,
                width: newProduct.width,
                length: newProduct.length,
              }}
            />
            <div className="flex flex-col ml-[20px] w-[130px]">
              <label className="text-sm font-bold text-foreground mb-1">
                Peso en libras
              </label>
              <input
                type="text"
                className="w-full h-[48px] px-3 border border-input-border-color rounded-lg bg-white font-medium"
                placeholder="3 libras"
                inputMode="numeric"
                pattern="[0-9]*"
                autoComplete="off"
                maxLength={3}
                value={newProduct.weight}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, weight: e.target.value.replace(/[^0-9]/g, '') })
                }
              />
            </div>

            <div className="flex flex-col ml-[20px] flex-1">
              <label className="text-sm font-bold text-foreground mb-1">
                Contenido
              </label>
              <input
                type="text"
                className="w-full h-[48px] px-3 border border-input-border-color rounded-lg bg-white font-medium"
                placeholder="iPhone 14 pro Max"
                value={newProduct.content}
                onChange={(e) => {
                  console.log(e.target.value)
                  setNewProduct({ ...newProduct, content: e.target.value })
                  console.log(newProduct);
                }}
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button
              variant="outline"
              className="custom-btn-secondary "
              onClick={addProduct}
              disabled={!isProductValid()}
            >
              Agregar{' '}
              <Image src={AddIcon} alt="package" width={24} height={24} />
            </Button>
          </div>
        </div>
      </div>
      <div className='flex flex-col max-h-[400px] p-2'>
        <div className='flex-1 overflow-y-auto'>
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg border border-products p-[20px] mt-6"
          >
            <div className=" flex justify-between gap-5 ">
              <div className="flex flex-col ml-[20px] w-[130px]">
                <label className="text-sm font-bold text-foreground mb-1">
                  Peso en libras
                </label>
                <input
                  type="text"
                  defaultValue={product.weight}
                  className="w-full h-[48px] px-3 border border-input-border-color rounded-lg bg-white font-medium"
                  placeholder="3 libras"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="off"
                  maxLength={3}
                 
                />
              </div>
              <div className="flex flex-col ml-[20px] flex-1">
                <label className="text-sm font-bold text-foreground mb-1">
                  Contenido
                </label>
                <input
                  type="text"
                   defaultValue={product.content} 
                  className="w-full h-[48px] px-3 border border-input-border-color rounded-lg bg-white font-medium"
                  placeholder="iPhone 14 pro Max"
                />
              </div>
              <div className="flex items-center justify-center w-[48px] h-[48px] mt-6">
                <Image src={PackageIcon} alt="package" width={30} height={31} />
              </div>
              <ProductDimensions
                initialDimensions={{
                  height: product.height,
                  width: product.width,
                  length: product.length,
                }}
              />
              <Button
                className="bg-white size-12 border border-input-border-color mt-6"
                onClick={() => removeProduct(product.id)}
              >
                <DeleteI className="custom-icon" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      </div>
      <div className="flex justify-between mt-8">
        <Button className="custom-btn-secondary border border-input-border-color " onClick={handleTriggerBack}>
          <Image src={ArrowLeft} alt="Regresar" width={24} height={24}  />
          Regresar
        </Button>
        <Button
          variant="default"
          className=" text-white px-1 py-2 custom-btn-primary"
          onClick={() => {
            setOpen(true)
          }}
          disabled={products.length === 0}
        >
          <span className="px-3">Enviar</span>{' '}
          <ArrowRightIcon className="custom-icon" />
        </Button>
      </div>

       
      <Dialog open={open}>
        <DialogContent onPointerDownOutside={handleTriggerOutput}>
            <DialogHeader >
            <DialogTitle>Sus productos han sido procesados</DialogTitle>
            <DialogDescription>
                <span>
                    Espera a recibir el código de seguimiento.
                </span>
            </DialogDescription>
            </DialogHeader>
             <DialogFooter>
            
            <Button variant='secondary' type="button" onClick={() => { }} className='ml-4'>Registrar mas productos</Button>  
            <DialogClose asChild>
              
              <Button type="button" onClick={handleTriggerOutput}>Deacuerdo</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
       
      </Dialog>
    </div>
  );
}
