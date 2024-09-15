import axios from 'axios'
import { toast } from 'react-toastify'

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
}

// Generic API handler
export const api = async <T>(
  endpoint: string,
  method: 'GET' | 'POST',
  payload?: any,
  headers?: Record<string, string>
): Promise<ApiResponse<T>> => {
  try {
    const response = await axios({
      url: `http://127.0.0.1:5000/api${endpoint}`,
      method,
      data: payload,
      headers: {
        'Content-Type': payload instanceof FormData ? 'multipart/form-data' : 'application/json',
        ...headers,
      },
    })
    return { success: true, data: response.data }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error('API Error:', err)
      return {
        success: false,
        message: err.response?.data?.error || err.message || 'Network Error',
      }
    }
    return { success: false, message: 'An unexpected error occurred' }
  }
}

const handleApiError = (error: unknown): ApiResponse => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.error || 'Error communicating with the server'
    toast.error(message)
    return { success: false, message }
  } else if (error instanceof Error) {
    toast.error(error.message)
    return { success: false, message: error.message }
  }
  toast.error('An unexpected error occurred')
  return { success: false, message: 'An unexpected error occurred' }
}

// Wrapper for GET requests
export const getRequest = async <T>(endpoint: string): Promise<ApiResponse<T>> => {
  try {
    return await api<T>(endpoint, 'GET')
  } catch (error) {
    return handleApiError(error)
  }
}

// Wrapper for POST requests
export const postRequest = async <T>(endpoint: string, data: any): Promise<ApiResponse<T>> => {
  try {
    return await api<T>(endpoint, 'POST', data)
  } catch (error) {
    return handleApiError(error)
  }
}
