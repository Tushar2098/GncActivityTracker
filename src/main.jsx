import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Admin } from './components/Admin.jsx';
import { AppProvider } from './provider/AppProvider.jsx';

const router = createBrowserRouter([
  { path: '/', Component: App },
  { path: '/admin', Component: Admin },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>
);
