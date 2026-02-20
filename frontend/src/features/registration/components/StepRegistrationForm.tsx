import { useState } from 'react';
import { registrationService } from '../services/registration.service';

interface Props {
  initialData: any;
  onBack: () => void;
  onSuccess: () => void;
}

export const StepRegistrationForm = ({ initialData, onBack, onSuccess }: Props) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    tipoIdentificacion: initialData?.type || 'NIT',
    nit: initialData?.nit || '',
    razonSocial: initialData?.name || '',
    primerNombre: '',
    primerApellido: '',
    email: '',
    autorizaCelular: false,
    autorizaEmail: false
  });

  const isJuridica = formData.tipoIdentificacion === 'NIT' || formData.tipoIdentificacion === 'Extranjería';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if ((name === 'primerNombre' || name === 'primerApellido') && /\d/.test(value)) return;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registrationService.register(formData);
      onSuccess();
    } catch (err) {
      alert('Error en el registro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card text-card-foreground p-8 rounded-xl shadow-lg border border-border max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-primary">Datos de la Empresa</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-left">
          {/* Tipo de Id - Drop-down */}
          <div>
            <label className="block text-sm font-medium mb-1">Tipo Identificación</label>
            <select 
              name="tipoIdentificacion" 
              value={formData.tipoIdentificacion} 
              onChange={handleChange}
              className="w-full p-2 rounded-md border border-input bg-background"
            >
              <option value="NIT">NIT</option>
              <option value="Cédula Ciudadanía">Cédula Ciudadanía</option>
              <option value="Extranjería">Extranjería</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Número</label>
            <input name="nit" value={formData.nit} readOnly className="w-full p-2 bg-muted rounded-md border border-input" />
          </div>
        </div>

        {/* Lógica Dinámica: Nombre Empresa vs Nombres Reales */}
        {isJuridica ? (
          <div className="text-left">
            <label className="block text-sm font-medium mb-1">Razón Social</label>
            <input name="razonSocial" value={formData.razonSocial} onChange={handleChange} required className="w-full p-2 rounded-md border border-input bg-background" />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 text-left">
            <div>
              <label className="block text-sm font-medium mb-1">Nombres</label>
              <input name="primerNombre" value={formData.primerNombre} onChange={handleChange} required className="w-full p-2 rounded-md border border-input bg-background" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Apellidos</label>
              <input name="primerApellido" value={formData.primerApellido} onChange={handleChange} required className="w-full p-2 rounded-md border border-input bg-background" />
            </div>
          </div>
        )}

        <div className="text-left">
          <label className="block text-sm font-medium mb-1">Correo Electrónico</label>
          <input name="email" type="email" value={formData.email} onChange={handleChange} required className="w-full p-2 rounded-md border border-input bg-background" />
        </div>

        {/* Autorizaciones - Single selection fields */}
        <div className="space-y-2 pt-4 border-t border-border">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="autorizaCelular" checked={formData.autorizaCelular} onChange={handleChange} />
            <span className="text-sm">Autorizo envío de mensajes de texto (SMS)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="autorizaEmail" checked={formData.autorizaEmail} onChange={handleChange} />
            <span className="text-sm">Autorizo envío de correos electrónicos</span>
          </label>
        </div>

        <div className="flex justify-between mt-8">
          <button type="button" onClick={onBack} className="text-muted-foreground hover:underline">Atrás</button>
          <button 
            type="submit" 
            disabled={loading}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-bold hover:opacity-90 transition-opacity"
          >
            {loading ? 'Procesando...' : 'Enviar Registro'}
          </button>
        </div>
      </form>
    </div>
  );
};