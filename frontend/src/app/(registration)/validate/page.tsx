import { IdentificationForm } from '../components/IdentificationForm';

export const ValidatePage = ({ onValidated }: any) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Bienvenido</h1>
        <p className="text-sm text-muted-foreground">Valida tu NIT para continuar</p>
      </div>
      <IdentificationForm onValidated={onValidated} />
    </div>
  );
};