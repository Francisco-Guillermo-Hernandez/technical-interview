'use client';

import CreateOrder from '@/components/orders/create-order';
import AddProducts from '@/components/orders/add-products';

import { useState } from 'react';

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

export default function orderWizardPage({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [currentStep, setCurrentStep] = useState<
    'crearOrden' | 'aggregarProductos'
  >('crearOrden');

  return (
    <div {...props}>
      {currentStep === 'crearOrden' ? (
        // Step 1: Customer Information Form
        <>
          <CreateOrder
            triggerNext={(data) => {
              console.log(data);
              setCurrentStep('aggregarProductos');
            }}
          />
        </>
      ) : (
        // Step 2: Add Products
        <>
          <AddProducts
            triggerOutput={(data) => {
              console.log(data);
            }}
            triggerBack={() => {
              console.log('regresando');
              setCurrentStep('crearOrden');
            }}
          />
        </>
      )}
    </div>
  );
}
