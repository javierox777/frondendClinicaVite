import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import Login from './views/login'; // Ajusta la ruta según tu estructura de carpetas
import DashboardLayout from './views/dashboard/dashboardLayout';
import { CustomThemeProvider } from './componemts/themeContext'; // Ajusta la ruta según tu estructura de carpetas
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from './auth/userContext';
import 'rsuite/dist/rsuite.min.css';
import { CustomProvider } from 'rsuite';
import CalendarThemeProvider from './componemts/CalendarThemeProvider';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <CustomThemeProvider>
          <CalendarThemeProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<DashboardLayout />} />
              </Routes>
            </BrowserRouter>
          </CalendarThemeProvider>
        </CustomThemeProvider>
      </QueryClientProvider>
    </UserProvider>
  </React.StrictMode>
);
