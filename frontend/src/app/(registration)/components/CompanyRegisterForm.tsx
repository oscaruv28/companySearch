import { useState } from 'react';
import { submitRegistrationService } from '../services/registration.service';
import { Loader2, Save, ArrowLeft } from 'lucide-react';

interface Props {
    initialData: any; 
    onBack: () => void;
    onSuccess: () => void;
}

export const CompanyRegisterForm = ({ initialData, onBack, onSuccess }: Props) => {
    const [loading, setLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        tipoIdentificacion: initialData?.tipoIdentificacion || 'NIT',
        nit: initialData?.nit || '',
        razonSocial: initialData?.razonSocial || '',
        primerNombre: initialData?.primerNombre || '',
        segundoNombre: initialData?.segundoNombre || '', // Agregado
        primerApellido: initialData?.primerApellido || '',
        segundoApellido: initialData?.segundoApellido || '', // Agregado
        email: initialData?.email || '',
        celular: initialData?.celular || '',
        autorizaCelular: initialData?.autorizaCelular || false,
        autorizaEmail: initialData?.autorizaEmail || false
    });

    // Lógica discriminadora (Página 3)
    const isJuridica = ['NIT', 'IE', 'Extranjería'].includes(formData.tipoIdentificacion);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        // Regla de oro: No números en campos de texto (Página 4)
        const textFields = ['primerNombre', 'segundoNombre', 'primerApellido', 'segundoApellido', 'razonSocial'];
        if (textFields.includes(name) && /\d/.test(value)) return;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await submitRegistrationService(formData);
            onSuccess();
        } catch (err: any) {
            alert(err.message || 'Error al guardar el registro');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 animate-in fade-in duration-500">
            {/* 1. IDENTIFICACIÓN (NIT/TIPO) */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 text-left">
                    <label className="text-xs font-semibold uppercase text-muted-foreground">Tipo Id</label>
                    <select
                        name="tipoIdentificacion"
                        value={formData.tipoIdentificacion}
                        onChange={handleChange}
                        className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:ring-2 focus:ring-primary outline-none"
                    >
                        <option value="NIT">NIT</option>
                        <option value="CC">Cédula Ciudadanía</option>
                        <option value="IE">Identificación Extranjera</option>
                    </select>
                </div>
                <div className="space-y-2 text-left">
                    <label className="text-xs font-semibold uppercase text-muted-foreground">Número</label>
                    <input value={formData.nit} readOnly className="w-full h-10 px-3 rounded-md border border-input bg-muted text-sm outline-none cursor-not-allowed" />
                </div>
            </div>

            {/* 2. RAZÓN SOCIAL O NOMBRES COMPLETOS */}
            {isJuridica ? (
                <div className="space-y-2 text-left">
                    <label className="text-xs font-semibold uppercase text-muted-foreground">Razón Social</label>
                    <input name="razonSocial" value={formData.razonSocial} onChange={handleChange} required className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:ring-2 focus:ring-primary outline-none" />
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-x-4 gap-y-4 text-left">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase text-muted-foreground">Primer Nombre</label>
                        <input name="primerNombre" value={formData.primerNombre} onChange={handleChange} required className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase text-muted-foreground">Segundo Nombre</label>
                        <input name="segundoNombre" value={formData.segundoNombre} onChange={handleChange} className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase text-muted-foreground">Primer Apellido</label>
                        <input name="primerApellido" value={formData.primerApellido} onChange={handleChange} required className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase text-muted-foreground">Segundo Apellido</label>
                        <input name="segundoApellido" value={formData.segundoApellido} onChange={handleChange} className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm" />
                    </div>
                </div>
            )}

            {/* 3. CONTACTO (EMAIL / CELULAR) */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 text-left">
                    <label className="text-xs font-semibold uppercase text-muted-foreground">Correo Electrónico</label>
                    <input name="email" type="email" value={formData.email} onChange={handleChange} required className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm" />
                </div>
                <div className="space-y-2 text-left">
                    <label className="text-xs font-semibold uppercase text-muted-foreground">Celular</label>
                    <input name="celular" type="tel" value={formData.celular} onChange={handleChange} className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm" />
                </div>
            </div>

            {/* 4. AUTORIZACIONES */}
            <div className="p-4 rounded-lg border border-dashed border-border space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" name="autorizaCelular" checked={formData.autorizaCelular} onChange={handleChange} className="w-4 h-4 rounded border-input" />
                    <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">Autorizo envío de SMS</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" name="autorizaEmail" checked={formData.autorizaEmail} onChange={handleChange} className="w-4 h-4 rounded border-input" />
                    <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">Autorizo envío de emails</span>
                </label>
            </div>

            {/* 5. ACCIONES */}
            <div className="flex items-center justify-between pt-4">
                <button type="button" onClick={onBack} className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft size={16} /> Atrás
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground h-11 px-8 font-bold hover:opacity-90 disabled:opacity-50 transition-all active:scale-95"
                >
                    {loading ? <Loader2 className="animate-spin mr-2" /> : <Save size={18} className="mr-2" />}
                    Finalizar Registro
                </button>
            </div>
        </form>
    );
};