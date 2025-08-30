import axios, { AxiosResponse, AxiosError } from 'axios';
import env from '@/lib/env-config';
import { verifyToken } from '@/lib/jwt';
import { LocalStorageUtils } from '@/hooks/localStorage';


interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
}

interface LoginResponse {
  access_token: string;
  user: User;
}

type ApiLoginResponse = AxiosResponse<LoginResponse>;

export const validateOTPAction = async(otp: string) => {
  try {
     
    return await axios.post<{ message: string }>(env.apiUrl.concat('auth/user/activate'), 
      { otp }, 
      { headers: {
        Authorization: 'Bearer '.concat(LocalStorageUtils.getItem('token') ?? ''),
        'Content-Type': 'application/json',
      } 
    });
  } catch (error) {
    throw error;
  }
}


export const loginAction = async (email: string, password: string) => {
  
    try {
        const response = await axios.post<LoginResponse>(env.apiUrl.concat('auth/user/login'), { email, password });

        if (response.data) {
          const token = response.data.access_token;
          LocalStorageUtils.setItem('token', token);
          return await verifyToken(token);
        } 
        
        throw new Error('Invalid Certificate', { cause: 'Wrong certificate' });
    } catch (error) {
      throw error;   
    }
};
