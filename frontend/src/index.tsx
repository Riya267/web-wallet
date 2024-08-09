import { createRoot } from 'react-dom/client';
import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import Dashboard from './app/dashboard';
import './index.css';
import NotFound from './app/notFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/404',
    element: <NotFound />,
  },
  {
    path: '*',
    element: <Navigate to="/404" replace />,
  },
]);

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
);
