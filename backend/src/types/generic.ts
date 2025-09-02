
import { Order } from '../entities/Order.entity';
import  { ObjectId } from 'typeorm';

export type OrderPaginator = { 
    orders: Order[]; 
    total: number; 
    page: number; 
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export type GenericPaginator<T> = { 
    data: Array<T>; 
    total: number; 
    page: number; 
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  }


export type ObjIds = { ObjectId: Array<ObjectId> }

export type ActivateRequest = { user: { email: string, isActive: boolean, sub: string }, body: { otp: string } };

export type OrderFilter = {
  range?: { 
      from: Date; 
      to: Date 
    }
}