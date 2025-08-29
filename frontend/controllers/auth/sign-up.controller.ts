'use client';

import axios from 'axios';
import env from '@/lib/env-config';
import { User } from '@/lib/validators/sign-up.validator';

type SignResponse = {
  message: string;
};

export const signUpAction = async (user: User) => {
  try {
    return await axios.post<SignResponse>(env.apiUrl.concat('auth/user/register'), user);
  } catch (error) {
    throw error;
  }
};
