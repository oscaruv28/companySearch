import { useState } from 'react';
import { registrationService } from '../services/registration.service';
import { Search, Loader2, AlertCircle } from 'lucide-react';

interface Props {
  onValidated: (data: any) => void;
}

export const StepIdentification = ({ onValidated }: Props) => {
  const [nit, setNit] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setError('');
    
    // Validación Requerimiento Técnico: Solo números (Pág 4)
    if (!/^\d+$/.test(nit)) {
      setError('El número de identificación debe contener únicamente dígitos numéricos.');
      return;
    }

    setLoading(true);
    try {
      const result = await registrationService.validateNit(nit);
      
      if (result.data.canRegister) {
        // Si puede registrarse, pasamos los datos al componente padre
        onValidated(result.data);
      } else {
        // Si está bloqueado o ya registrado, mostramos la razón (Pág 4)
        setError(result.data.reason);
      }
    } catch (err: any) {
      setError(err.message || 'Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Validar Identificación</h2>
      <p className="text-sm text-gray-600 mb-6">
        Ingrese el número de identificación para verificar si su empresa está habilitada.
      </p>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            className={`w-full p-2 border rounded-lg outline-none transition-all ${
              error ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-blue-500'
            }`}
            placeholder="Ej: 900674336"
            value={nit}
            onChange={(e) => setNit(e.target.value)}
            disabled={loading}
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={loading || !nit}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 flex items-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
          Consultar
        </button>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 flex items-center gap-2 text-sm">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};