import { ApiResponse } from "@blacksof/types";
import { toast } from "sonner";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

/** Shared body type for mutation methods (POST/PUT) */
type RequestBody = Record<string, unknown> | FormData;

const isFormDataBody = (body: unknown): body is FormData => {
  return !!body && body instanceof FormData;
};

const request = async <T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> => {
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  if (!isFormDataBody(options.body)) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers,
  });

  const result = (await response.json()) as ApiResponse<T>;
  const method = options.method?.toUpperCase() || "GET";

  if (!response.ok || !result.success) {
    const errorMsg = result.message || "Something went wrong";
    if (method !== "GET") {
      toast.error(errorMsg);
    }
    throw new Error(errorMsg);
  }

  if (method !== "GET" && result.message) {
    toast.success(result.message);
  }

  return result.data as T;
};

export const ApiClient = {
  get: <T>(endpoint: string): Promise<T> => {
    return request<T>(endpoint, { method: "GET" });
  },

  post: <T>(endpoint: string, body: RequestBody): Promise<T> => {
    const isForm = isFormDataBody(body);
    return request<T>(endpoint, {
      method: "POST",
      body: isForm ? body : JSON.stringify(body),
    });
  },

  put: <T>(endpoint: string, body: RequestBody): Promise<T> => {
    const isForm = isFormDataBody(body);
    return request<T>(endpoint, {
      method: "PUT",
      body: isForm ? body : JSON.stringify(body),
    });
  },

  delete: <T>(endpoint: string): Promise<T> => {
    return request<T>(endpoint, { method: "DELETE" });
  },

  upload: async <T>(endpoint: string, file: File): Promise<T> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: "POST",
      body: formData,
    });

    const result = (await response.json()) as ApiResponse<T>;

    if (!response.ok || !result.success) {
      const errorMsg = result.message || "Something went wrong";
      toast.error(errorMsg);
      throw new Error(errorMsg);
    }

    if (result.message) {
      toast.success(result.message);
    }

    return result.data as T;
  },
};
