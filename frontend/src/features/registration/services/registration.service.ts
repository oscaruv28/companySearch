import { apiClient } from '../../../api/api-client';

export const registrationService = {
  validateNit: async (nit: string) => {
    const { data } = await apiClient.get(`/companies/validate/${nit}`);
    return data;
  },
  
  register: async (payload: any) => {
    const { data } = await apiClient.post('/companies/register', payload);
    return data;
  }
};