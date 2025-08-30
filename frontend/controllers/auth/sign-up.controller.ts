'use client';

import axios from 'axios';
import env from '@/lib/env-config';
import { User } from '@/lib/validators/sign-up.validator';

type SignResponse = {
  message: string;
};

export const signUpAction = async (user: User) => {
  try {
    const { area, phone, ...remaining} = user;
    return await axios.post<SignResponse>(env.apiUrl.concat('auth/user/register'), { ...remaining, phone: area.concat(phone)  });
  } catch (error) {
    throw error;
  }
};
