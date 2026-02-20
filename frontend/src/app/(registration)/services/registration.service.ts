import { httpRequest, type ApiResponse } from "../../../lib/http-request";
import type { RegistrationPayload, ValidationResponse } from "../types/registration";

/**
 * Servicio para validar si un NIT puede registrarse
 * Basado en el requerimiento de búsqueda inicial (Pág 2)
 */
export const validateNitService = async (nit: string): Promise<ApiResponse<ValidationResponse>> => {
  return httpRequest({
    url: `/companies/validate/${nit}`,
    method: "GET",
  });
};

/**
 * Servicio para enviar el formulario final de registro
 * Aplica para Personas Jurídicas y Naturales (Pág 3)
 */
export const submitRegistrationService = async (data: RegistrationPayload): Promise<ApiResponse<any>> => {
  return httpRequest({
    url: "/companies/register",
    method: "POST",
    data,
  });
};