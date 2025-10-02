import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import './index.css';
import App from './App.jsx';
import LoginAccount from './pages/LoginAccount.jsx';
import Eccomerce from './pages/Eccomerce.jsx';
import Provider from './context/Provider'; // ✅ importa o Provider

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,            // sua raiz atual
  },
  {
    path: '/login',
    element: <LoginAccount />,
  },
  {
    path: '/products',
    element: (
      <Provider>                 {/* ✅ contexto só aqui */}
        <Eccomerce />
      </Provider>
    ),
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="486729534183-qrpv4bnfg7eirs8arv3ogsmuqrgpff55.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
);
