'use client';

import CreateOrder, { type DeliveryRequest } from '@/components/orders/create-order';
import AddProducts, { type Product } from '@/components/orders/add-products';

import { useState } from 'react';
import axios from 'axios';

import env from '@/lib/env-config';

type Package = {
  length: number;
  height: number;
  width: number;
  weight: number;
  content: string; 
}

type KeysToOmit = 'countryCode';
type Order = Omit<DeliveryRequest, KeysToOmit> & {
  packages: Array<Package>
}

const createOrderService = async (
  token: string,
  order: Order
) => {
  const response = await axios.post(env.apiUrl.concat('delivery/orders'), order, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};


export default function orderWizardPage({
  token,
  className,
  ...props
}: React.ComponentProps<'div'> & { token: string } ) {
  const [currentStep, setCurrentStep] = useState<
    'crearOrden' | 'aggregarProductos'
  >('crearOrden');

  const [details, setDeliveryDetails] = useState<DeliveryRequest>();
  const [products, setProducts] = useState<Array<Product>>([]);

  const handleOrder = async (p: Array<Product>) => {
    if (!details || !products) return;

    try {
      const combinedData = {
        deliveryAddress: details.deliveryAddress,
        directions: details.directions,
        instructions: details.instructions,
        deliveryDate: details.deliveryDate,
        firstLevel: details.firstLevel,
        secondLevel: details.secondLevel,
        pickupAddress: details.pickupAddress,
        firstName: details.firstName,
        lastName: details.lastName,
        phone: details.phone,
        email: details.email,
        packages: p.map(product => ({
          length: parseFloat(product.length),
          height: parseFloat(product.height),
          width: parseFloat(product.width),
          content: product.content,
          weight: parseFloat(product.weight)
        }))
      };

      const result = await createOrderService(token, combinedData);
      console.log('Order created successfully:', result);
      
    } catch (error) {
      console.error('Error creating order:', error);
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data || error.message);
      }
    }
  };

  return (
    <div {...props}>
      {currentStep === 'crearOrden' ? (
        // Step 1: Customer Information Form
        <>
          <CreateOrder
            triggerNext={(data) => {
              console.log(data);
              setCurrentStep('aggregarProductos');
              setDeliveryDetails(data)
            }}
          />
        </>
      ) : (
        // Step 2: Add Products
        <>
          <AddProducts
            triggerOutput={(data) => {
              console.log('products')

              handleOrder(data)
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
