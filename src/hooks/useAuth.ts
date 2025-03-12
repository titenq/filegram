import { useContext } from 'react';

import { IAuthContext } from '@/interfaces/authInterface';
import { AuthContext } from '@/context/AuthContext';

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
