import { config } from '../config/env';


async function handleResponse<T>(res: Response): Promise<T> {
  if (res.status === 401) {
    localStorage.removeItem('token');
    // Global redirect to login
    window.location.href = '/login';
    throw new Error('Session expired. Please login again.');
  }

  const data = await res.json().catch(() => ({}));
  
  if (!res.ok) {
    throw new Error(data.message || `HTTP ${res.status}: ${res.statusText}`);
  }

  return data;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem('token');
  
  const headers = new Headers(options?.headers);
  headers.set('Content-Type', 'application/json');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const res = await fetch(`${config.apiUrl}${path}`, {
    ...options,
    headers,
  });

  return handleResponse<T>(res);
}

export const api = {
  get: <T>(path: string) => 
    request<T>(path, { method: 'GET' }),
    
  post: <T>(path: string, body?: unknown) => 
    request<T>(path, { 
      method: 'POST', 
      body: JSON.stringify(body || {}) 
    }),
    
  put: <T>(path: string, body: unknown) => 
    request<T>(path, { 
      method: 'PUT', 
      body: JSON.stringify(body) 
    }),
    
  patch: <T>(path: string, body: unknown) => 
    request<T>(path, { 
      method: 'PATCH', 
      body: JSON.stringify(body) 
    }),
    
  delete: <T>(path: string) => 
    request<T>(path, { method: 'DELETE' }),
};
