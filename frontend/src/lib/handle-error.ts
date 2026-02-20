import { AxiosError } from "axios";

// Handle error for forms using react-hook-form
export const handleErrorForm = (error: any, form: any) => {
  if (error instanceof AxiosError) {
    if (error.status === 422) {
      const actionErrors = error.response?.data.errors;

      Object.keys(actionErrors).forEach((field) => {
        form.setError(field as any, {
          type: "server",
          message: actionErrors[field],
        });
      });
    }
  }
  // throw error;
};
