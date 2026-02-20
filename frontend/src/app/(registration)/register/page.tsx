import { CompanyRegisterForm } from '../components/CompanyRegisterForm';

export const RegisterPage = ({ initialData, onBack, onSuccess }: any) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight">Completar Información</h1>
        <p className="text-sm text-muted-foreground">Por favor, verifica los datos de contacto de tu empresa</p>
      </div>
      <CompanyRegisterForm 
        initialData={initialData} 
        onBack={onBack} 
        onSuccess={onSuccess} 
      />
    </div>
  );
};