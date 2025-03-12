import { createContext } from 'react';

import { IAuthContext } from '@/interfaces/authInterface';

export const AuthContext = createContext<IAuthContext | undefined>(undefined);
