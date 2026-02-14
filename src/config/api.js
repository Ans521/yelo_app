import { Platform } from 'react-native';

/**
 * API base URL. Backend runs on port 3050.
 * Deployed backend: use the server IP/hostname.
 * Local dev: Android emulator use 10.0.2.2; iOS simulator use localhost; physical device use your PC's IP.
 */
const PORT = 3050;
const DEPLOYED_HOST = '82.180.144.143';
const LOCAL_HOST = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';

const USE_DEPLOYED = true; // set to false for local backend
const HOST = USE_DEPLOYED ? DEPLOYED_HOST : LOCAL_HOST;

export const API_BASE_URL = `http://${HOST}:${PORT}`;
