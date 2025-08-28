
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