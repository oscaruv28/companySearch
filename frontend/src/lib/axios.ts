import axios from "axios";

const apiInstance = axios.create({
  // En Vite usamos import.meta.env
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  }
});

// Interceptor de respuesta para capturar errores de Teleperformance (Pág 4)
apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si el NIT ya existe o hay error de validación, el backend enviará el mensaje aquí
    return Promise.reject(error);
  }
);

export { apiInstance };