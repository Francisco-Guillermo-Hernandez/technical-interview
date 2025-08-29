import axios, { AxiosResponse, AxiosError } from 'axios';
import env from '@/lib/env-config';
import { verifyToken } from '@/lib/jwt';

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

export const loginAction = async (email: string, password: string) => {
  
    try {
        const response = await axios.post<LoginResponse>(env.apiUrl.concat('auth/user/login'), { email, password });

        if (response.data) {
            return await verifyToken(response.data.access_token.trim());
        } 

        throw new Error('Invalid Certificate', { cause: 'Wrong certificate' });
    } catch (error) {
      throw error;   
    }
};
