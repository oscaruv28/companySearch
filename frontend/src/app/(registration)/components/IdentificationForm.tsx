import { useState, type ChangeEvent } from 'react';
import { validateNitService } from '../services/registration.service';
import { Loader2, ArrowRight, AlertCircle } from 'lucide-react';

export const IdentificationForm = ({ onValidated }: { onValidated: (data: any) => void }) => {
    const [nit, setNit] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Validación en tiempo real para el feedback visual
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        
        // Propuesta de feedback: No permitimos que escriba letras (Pág 4)
        if (value !== '' && !/^\d+$/.test(value)) {
            setError('El NIT debe contener únicamente números.');
            return;
        }

        setError('');
        setNit(value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!nit) return;

        setLoading(true);
        setError('');

        try {
            const res = await validateNitService(nit);
            
            if (res.data.canRegister) {
                onValidated(res.data.companyData);
            } else {
                // Feedback si el NIT es válido en formato pero no para registro (negocio)
                setError(res.data.reason || 'Este NIT no está habilitado para registro.');
            }
        } catch (err: any) {
            setError(err.message || 'Error de conexión con el servidor.');
        } finally {
            setLoading(false);
        }
    };

    // Determinamos si hay una inconsistencia para el estilo visual
    const hasInconsistency = error !== '';

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <div className="grid gap-2 text-left">
                <label className={`text-sm font-medium ${hasInconsistency ? 'text-destructive' : 'text-foreground'}`}>
                    Número de Identificación (NIT)
                </label>
                
                <div className="relative">
                    <input
                        type="text"
                        className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none transition-all
                            ${hasInconsistency 
                                ? 'border-destructive focus:ring-1 focus:ring-destructive' 
                                : 'border-input focus:ring-2 focus:ring-primary'
                            }
                        `}
                        placeholder="900674336"
                        value={nit}
                        onChange={handleInputChange}
                        disabled={loading}
                    />
                    {hasInconsistency && (
                        <AlertCircle className="absolute right-3 top-2.5 h-5 w-5 text-destructive" />
                    )}
                </div>

                {/* Feedback al usuario: Qué está mal exactamente */}
                <div className="min-h-[20px]">
                    {error && (
                        <p className="text-xs font-medium text-destructive animate-in slide-in-from-top-1 duration-200">
                            {error}
                        </p>
                    )}
                </div>
            </div>

            <button
                type="submit"
                // No permitimos continuar hasta que sea corregido (Requerimiento técnico)
                disabled={loading || !nit || hasInconsistency}
                className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground h-10 px-4 py-2 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all active:scale-95"
            >
                {loading ? (
                    <Loader2 className="animate-spin" />
                ) : (
                    <>Continuar <ArrowRight className="ml-2 w-4 h-4" /></>
                )}
            </button>
        </form>
    );
};