import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import './index.css';
import Login from './views/login'; // Ajusta la ruta según tu estructura de carpetas
import DashboardLayout from './views/dashboard/dashboardLayout';
import { CustomThemeProvider } from './componemts/themeContext'; // Ajusta la ruta según tu estructura de carpetas

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <CustomThemeProvider>
      <BrowserRouter>
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<DashboardLayout />} />
          </Routes>
      </BrowserRouter>
    </CustomThemeProvider>
  </React.StrictMode>,
);
