import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Build full URL for logging (baseURL + path)
const getFullUrl = (config) => {
  const base = config.baseURL || '';
  const path = config.url || '';
  return base && path ? `${base.replace(/\/$/, '')}${path.startsWith('/') ? path : '/' + path}` : base || path;
};

// Log every request/response in DevTools Console (press j in Metro to open DevTools)
api.interceptors.request.use((config) => {
  const fullUrl = getFullUrl(config);
  console.log('[API REQUEST]', config.method?.toUpperCase(), fullUrl, config.data);
  return config;
});
api.interceptors.response.use(
  (response) => {
    const fullUrl = getFullUrl(response.config);
    console.log('[API RESPONSE]', response.status, fullUrl, response.data);
    return response;
  },
  (err) => {
    const fullUrl = err.config ? getFullUrl(err.config) : '(no config)';
    console.warn('[API ERROR]', err.message, err.code, fullUrl, err.response?.status, err.response?.data);
    return Promise.reject(err);
  }
);

/**
 * Get OTP – sends email to backend; backend sends OTP to that email (e.g. via nodemailer).
 * @param {string} email - User email
 * @returns {Promise<{ success: boolean, data?: any, message?: string }>}
 */
export async function getOtp(email) {
  try {
    const response = await api.post('/otp/get-otp', { email });
    console.log('response', response)
    if (response.status === 200 || response.status === 201) {
      return { success: true };
    }
    return {
      success: false,
      message: 'Failed to send OTP.',
    };
  } catch (err) {
    // Log full error so you can see why the request failed (in DevTools: press j in Metro terminal)
    console.warn('getOtp error:', {
      message: err?.message,
      code: err?.code,
      status: err?.response?.status,
      responseData: err?.response?.data,
    });
    const message =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      'Network error. Please try again.';
    return { success: false, message };
  }
}

/**
 * Verify OTP. Only 200 = success (navigate to Home); any other status show "Please provide the correct OTP".
 * @param {string} email - User email
 * @param {string} otp - 4-digit OTP
 * @returns {Promise<{ success: boolean, data?: any, message?: string }>}
 */
export async function verifyOtp(email, otp) {
  try {
    const {status } = await api.post('/otp/verify-otp', { email, otp });
    if (status === 200 || status === 201) {
      return { success: true };
    }
    return {
      success: false,
      message: 'Please provide the correct OTP',
    };
  } catch (err) {
    return {
      success: false,
      message: 'Please provide the correct OTP',
    };
  }
}
