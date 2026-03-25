import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import { getRefreshToken, setRefreshToken, clearRefreshToken } from './tokenService';
import { getFcmToken } from '../../App';


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

const authConfig = { getAccessToken: () => null, setAccessToken: () => {}, onLogout: () => {} };
let interceptorsSetup = false;

export function setupApiInterceptors(cfg) {
  authConfig.getAccessToken = cfg.getAccessToken;
  authConfig.setAccessToken = cfg.setAccessToken;
  authConfig.onLogout = cfg.onLogout;

  if (interceptorsSetup) return;
  interceptorsSetup = true;

  api.interceptors.request.use((config) => {
    const token = authConfig.getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    const fullUrl = getFullUrl(config);
    console.log('[API REQUEST]', config.method?.toUpperCase(), fullUrl);
    return config;
  });

  api.interceptors.response.use(
    (response) => {
      console.log('[API RESPONSE]', response.status, getFullUrl(response.config));
      return response;
    },
    async (err) => {
      const config = err.config;
      const fullUrl = config ? getFullUrl(config) : '(no config)';
      console.warn('[API ERROR]', err.message, err.response?.status, fullUrl);

      if (err.response?.status !== 401 || config?.__retried) {
        return Promise.reject(err);
      }
      config.__retried = true;

      const refresh = await getRefreshToken();
      // getting the refresh token
      if (!refresh) {
        authConfig.onLogout();
        return Promise.reject(err);
      }
      try {
        const data = await refreshTokens(refresh);
        if (data?.accessToken) {
          authConfig.setAccessToken(data.accessToken);
          if (data.refreshToken) await setRefreshToken(data.refreshToken);
          if (config.headers) config.headers.Authorization = `Bearer ${data.accessToken}`;
          return api.request(config);
        }
      } catch (e) {
        console.warn('[API] Refresh failed', e?.message);
      }
      await clearRefreshToken();
      authConfig.onLogout();
      return Promise.reject(err);
    }
  );
}

export async function refreshTokens(refreshToken) {
  const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });
  if (!res.ok) throw new Error('Refresh failed');
  const data = await res.json();
  return {
    accessToken: data.accessToken ?? data.access_token,
    refreshToken: data.refreshToken ?? data.refresh_token ?? refreshToken,
  };
}

/**
 * Get OTP – sends email to backend; backend sends OTP to that email (e.g. via nodemailer).
 * Optionally include location (latitude / longitude).
 * @param {string} email - User email
 * @param {{ latitude?: number|null, longitude?: number|null }=} location
 * @returns {Promise<{ success: boolean, data?: any, message?: string }>}
 */
export async function getOtp(email, location, fcmToken) {
  try {
    const body = {
      email,
      latitude: location?.latitude ?? null,
      longitude: location?.longitude ?? null,
      device_token: fcmToken
    };
    
    console.log('[Location] getOtp body', body);
    const response = await api.post('/otp/get-otp', body);

    if (response.status === 200 || response.status === 201) {
      return { success: true, data: response.data };
    }
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
/**
 * Sign in with Google ID token. Backend creates or finds user and returns app tokens.
 * @param {string} idToken - Google ID token from Google Sign-In
 * @returns {Promise<{ success: boolean, data?: { accessToken, refreshToken }, message?: string }>}
 */
export async function googleSignIn(idToken) {
  try {
    const response = await api.post('/api/google-signin', { idToken });
    const data = response.data?.data ?? response.data;
    if (response.status === 200 || response.status === 201) {
      return {
        success: true,
        data: {
          accessToken: data?.accessToken ?? data?.access_token,
          refreshToken: data?.refreshToken ?? data?.refresh_token,
        },
      };
    }
    return { success: false, message: response.data?.message || 'Google sign in failed.' };
  } catch (err) {
    console.warn('googleSignIn error:', err?.message, err?.response?.data);
    const message =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      'Google sign in failed. Please try again.';
    return { success: false, message };
  }
}

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


/**
 * Get all categories with subcategories. Transforms flat API rows into
 * [{ category_id, category_name, subcategories: [{ subcategory_id, subcategory_name, image_url }] }].
 */
export async function getCategories() {
  try {
    const response = await api.get('/api/get-all-category');
    const result = response.data?.data ?? response.data ?? [];
    return { success: true, data: result };
  } catch (err) {
    console.warn('getCategories error:', err?.message, err?.response?.data);
    const message = err?.response?.data?.message || err?.message || 'Failed to load categories.';
    return { success: false, message };
  }
}

/**
 * Get current user info. Returns name, email, phone_no for prefilling profile form.
 * Backend returns: { name, email, phoneno } (row from DB).
 */
export async function getUserInfo() {
  try {
    const response = await api.get('/api/get-user-info');
    console.log("response", response.data)
    const row = response.data?.data ?? response.data ?? {};
    return {
      success: true,
      data: {
        name: row.name ?? '',
        email: row.email ?? '',
        phone_no: row.phone_no ?? null,
      },
    };
  } catch (err) {
    console.warn('getUserInfo error:', err?.message, err?.response?.data);
    const message = err?.response?.data?.message || err?.message || 'Failed to load user info.';
    return { success: false, message, data: null };
  }
}

/**
 * Update user info: name, email, phone_no (all optional).
 */
export async function updateUserInfo(payload) {
  try {
    const body = {};
    if (payload.name) body.name = payload.name;
    if (payload.email) body.email = payload.email;
    if (payload.phone_no) body.phone_no = payload.phone_no;
    const response = await api.post('/api/update-user-info', body);
    if (response.status === 200 || response.status === 201) {
      return { success: true, data: response.data };
    }
    return { success: false, message: response.data?.message || 'Failed to update profile.' };
  } catch (err) {
    console.warn('updateUserInfo error:', err?.message, err?.response?.data);
    const message = err?.response?.data?.message || err?.message || 'Failed to update profile.';
    return { success: false, message };
  }
}

/**
 * Get all banners. Returns list with id, title, message, image_url, is_main.
 * Use the one with is_main === 1 for the home hero.
 */
export async function getAllBanners() {
  try {
    const response = await api.get('/api/get-all-banner');
    const result = response.data?.data ?? response.data ?? [];
    return { success: true, data: Array.isArray(result) ? result : [] };
  } catch (err) {
    console.warn('getAllBanners error:', err?.message, err?.response?.data);
    const message = err?.response?.data?.message || err?.message || 'Failed to load banners.';
    return { success: false, message, data: [] };
  }
}

/**
 * Get all businesses with optional filters.
 * GET /api/get-all-business?subCatId=X | is_popular=1 | is_recent=1
 */
export async function getAllBusinesses(params = {}) {
  try {
    const qs = new URLSearchParams();
    if (params.subCatId != null && params.subCatId !== '') qs.append('subCatId', params.subCatId);
    if (params.is_popular === 1 || params.isPopular) qs.append('is_popular', '1');
    if (params.is_recent === 1 || params.isRecent) qs.append('is_recent', '1');
    const query = qs.toString();
    const url = query ? `/api/get-all-business?${query}` : '/api/get-all-business';
    console.log("url", url)
    const response = await api.get(url);
    const result = response.data?.data ?? response.data ?? [];
    return { success: true, data: Array.isArray(result) ? result : [] };
  } catch (err) {
    console.warn('getAllBusinesses error:', err?.message, err?.response?.data);
    const message = err?.response?.data?.message || err?.message || 'Failed to load businesses.';
    return { success: false, message, data: [] };
  }
}

/**
 * Get a single business by ID.
 * GET /api/get-business-by-id?businessId=X
 */
export async function getBusinessById(businessId) {
  try {
    const response = await api.get('/api/get-business-by-id', {
      params: { businessId },
    });
    const res = response.data;
    return { success: true, data: res};
  } catch (err) {
    console.warn('getBusinessById error:', err?.message, err?.response?.data);
    const message = err?.response?.data?.message || err?.message || 'Failed to load business.';
    return { success: false, message, data: null };
  }
}

/**
 * Delete profile of current user.
 */
export async function deleteProfile() {
  try {
    const response = await api.post('/api/delete-profile');
    if (response.status === 200 || response.status === 201) {
      return { success: true, data: response.data };
    }
    return { success: false, message: response.data?.message || 'Failed to delete profile.' };
  } catch (err) {
    console.warn('deleteProfile error:', err?.message, err?.response?.data);
    const message = err?.response?.data?.message || err?.message || 'Failed to delete profile.';
    return { success: false, message };
  }
}

/**
 * Home feed: categories, popular_businesses, recent_businesses.
 * GET /home-feed (or /api/home-feed)
 * @returns {Promise<{ success: boolean, data?: { categories, popular_businesses, recent_businesses }, message?: string }>}
 */
export async function getHomeFeed() {
  try {
    const response = await api.get('/api/home-feed');
    const raw = response.data?.data ?? response.data ?? response;
    const subcategories = Array.isArray(raw.subcategories) ? raw.subcategories : [];
    const popular_businesses = Array.isArray(raw.popular_businesses) ? raw.popular_businesses : [];
    const recent_businesses = Array.isArray(raw.recent_businesses) ? raw.recent_businesses : [];
    return {
      success: true,
      data: { subcategories, popular_businesses, recent_businesses },
    };
  } catch (err) {
    console.warn('getHomeFeed error:', err?.message, err?.response?.data);
    const message = err?.response?.data?.message || err?.message || 'Failed to load home feed.';
    return { success: false, message, data: { categories: [], popular_businesses: [], recent_businesses: [] } };
  }
}

/**
 * Search businesses. Backend expects cat and subcat (same input sent for both).
 * @param {string} input - Search query (user input)
 * @returns {Promise<{ success: boolean, data?: Array<{ business_id, business_name, address, gallery, phone_no }>, message?: string }>}
 */
export async function searchBusinesses(input) {
  const q = String(input ?? '').trim();
  if (!q) {
    return { success: true, data: [] };
  }
  try {
    const response = await api.post('/api/search', {
      cat: q,
      subcat: q,
    });
    console.log("response", response.data);
    if (response.status === 200 || response.status === 201) {
      return { success: true, data: response.data.businesses };
    }
    return { success: false, message: response.data?.message || 'Search failed.' };
  } catch (err) {
    console.warn('searchBusinesses error:', err?.message, err?.response?.data);
    const message = err?.response?.data?.message || err?.message || 'Search failed.';
    return { success: false, message, data: [] };
  }
}

/**
 * Upload a single image. Returns the URL from the backend.
 * @param {{ uri: string, type?: string, fileName?: string }} image - Image from picker
 * @returns {Promise<{ success: boolean, url?: string, message?: string }>}
 */
export async function uploadImage(image) {
  try {
    const formData = new FormData();
    formData.append('image', {
      uri: image.uri,
      type: image.type || 'image/jpeg',
      name: image.fileName || `image_${Date.now()}.jpg`,
    });
    const response = await api.post('/api/upload-image', formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      transformRequest: (data, headers) => data,
    });
    const data = response.data;
    const url = data?.url ?? data?.data?.url ?? data?.imageUrl;
    if (url) {
      return { success: true, url };
    }
    return { success: false, message: data?.message || 'No URL returned from upload.' };
  } catch (err) {
    console.warn('uploadImage error:', err?.message, err?.response?.data);
    const message = err?.response?.data?.message || err?.message || 'Failed to upload image.';
    return { success: false, message };
  }
}

export async function addBusiness(formData) {
  try {
    console.log("formData", formData)
    const response = await api.post('/api/add-business', formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('response', response);
    if (response.status === 200 || response.status === 201) {
      return { success: true, data: response.data };
    }
    return { success: false, message: response.data?.message || 'Failed to add business.' };
  } catch (err) {
    console.warn('addBusiness error:', err?.message, err?.response?.data);
    const message = err?.response?.data?.message || err?.message || 'Failed to add business.';
    return { success: false, message };
  }
}

export async function getUserBusinesses(userId) {
  try {
    const response = await api.get('/api/get-user-businesses');
    if (response.status === 200 || response.status === 201) {
      console.log("response.data", response.data)
      const list = response.data.data ?? [];
      return { success: true, data: Array.isArray(list) ? list : [] };
    }
    return { success: false, data: [], message: response.data?.message };
  } catch (err) {
    console.warn('getUserBusinesses error:', err?.message);
    return { success: false, data: [], message: err?.response?.data?.message || err?.message };
  }
}

export async function updateBusiness(businessId, formData) {
  try {
    const response = await api.post(`/api/update-business/${businessId}`, formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.status === 200 || response.status === 201) {
      return { success: true, data: response.data };
    }
    return { success: false, message: response.data?.message || 'Failed to update business.' };
  } catch (err) {
    console.warn('updateBusiness error:', err?.message);
    return { success: false, message: err?.response?.data?.message || err?.message };
  }
}

