import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import ProtectedRoute from '@/protectedRoutes/ProtectedRoute';

const Files = lazy(() => import('@/pages/Files'));
const FileUpload = lazy(() => import('@/pages/FileUpload'));
const NotFound = lazy(() => import('@/pages/NotFound'));

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/arquivos',
        element: (
          <Suspense fallback={<div>Carregando...</div>}>
            <ProtectedRoute>
              <Files />
            </ProtectedRoute>
          </Suspense>
        )
      },
      {
        path: '/upload',
        element: (
          <Suspense fallback={<div>Carregando...</div>}>
            <ProtectedRoute>
              <FileUpload />
            </ProtectedRoute>
          </Suspense>
        )
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<div>Carregando...</div>}>
            <NotFound />
          </Suspense>
        )
      }
    ]
  }
]);

export default router;
