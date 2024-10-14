import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicRouter from './pages/public/PublicRouter';
import AdminRouter from './pages/Admin/AdminRouter';
import AuthRouter from './pages/Auth/AuthRouter';
import AuthGuard from './_helpers/AuthGuard';
import { Suspense } from 'react';
import { AuthProvider } from './pages/Auth/AuthContext';  // Contexte pour l'authentification
import { AppointmentProvider } from './pages/public/context/AppointmentContext'; // Contexte pour les rendez-vous

function App() {
  return (
    <AuthProvider>
      <AppointmentProvider>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/*" element={<PublicRouter />} />
              <Route
                path="/admin/*"
                element={
                  <AuthGuard requiredRole="admin">
                    <AdminRouter />
                  </AuthGuard>
                }
              />
              <Route path="/auth/*" element={<AuthRouter />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AppointmentProvider>
    </AuthProvider>
  );
}

export default App;
