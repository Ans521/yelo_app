import { Platform } from 'react-native';

/**
 * API base URL. Backend runs on port 3050.
 * Deployed backend: use the server IP/hostname.
 * Local dev: Android emulator use 10.0.2.2; iOS simulator use localhost; physical device use your PC's IP.
 */
const PORT = 3050;
const DEPLOYED_HOST = '82.180.144.143';
// const DEPLOYED_HOST = 'localhost';
const LOCAL_HOST = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';

const USE_DEPLOYED = true; // set to false for local backend
const HOST = USE_DEPLOYED ? DEPLOYED_HOST : LOCAL_HOST;

export const API_BASE_URL = `http://${HOST}:${PORT}`;

/** Google Sign-In: Web client ID from same GCP project as Firebase (yeloapp-14a28). Create in Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 → Web application. */
export const GOOGLE_WEB_CLIENT_ID = '1036928005927-postk74f6v2qkbbg9v861gjarn0fcuog.apps.googleusercontent.com'; // e.g. 1036928005927-xxxx.apps.googleusercontent.com
