import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
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
      {/* 1. Redirección por defecto: Al entrar a "/", te manda a "/validate" */}
      <Route path="/" element={<Navigate to="/validate" replace />} />

      {/* 2. Ruta de Validación */}
      <Route path="/validate" element={
        <ValidatePage onValidated={handleValidated} />
      } />

      {/* 3. Ruta de Registro (Protegida: si no hay data, vuelve a validate) */}
      <Route path="/register" element={
        companyData ? (
          <RegisterPage 
            initialData={companyData} 
            onBack={handleBack}
            onSuccess={() => {
              alert("¡Registro exitoso!");
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
      <Layout>
        <RegistrationFlow />
      </Layout>
    </BrowserRouter>
  );
}