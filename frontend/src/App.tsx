import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Toaster, toast } from 'sonner';
import { Layout } from './app/layout';
import { ValidatePage } from './app/(registration)/validate/page';
import { RegisterPage } from './app/(registration)/register/page';

function RegistrationFlow() {
  const [companyData, setCompanyData] = useState<any>(null);
  const navigate = useNavigate();

  const handleValidated = (data: any) => {
    setCompanyData(data);
    navigate('/register'); 
  };

  const handleBack = () => {
    setCompanyData(null);
    navigate('/validate');
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/validate" replace />} />

      <Route path="/validate" element={
        <ValidatePage onValidated={handleValidated} />
      } />

      <Route path="/register" element={
        companyData ? (
          <RegisterPage 
            initialData={companyData} 
            onBack={handleBack}
            onSuccess={() => {
              // 2. Reemplazamos el alert feo por un toast elegante
              toast.success('¡Registro exitoso!', {
                description: 'La empresa ha sido guardada en el sistema.',
                duration: 4000,
              });
              
              setCompanyData(null);
              navigate('/validate');
            }}
          />
        ) : <Navigate to="/validate" replace />
      } />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      {/* 3. El Toaster debe ir aquí para que esté disponible en toda la app */}
      <Toaster 
        position="top-right" 
        richColors 
        closeButton 
        theme="light"
      />
      <Layout>
        <RegistrationFlow />
      </Layout>
    </BrowserRouter>
  );
}