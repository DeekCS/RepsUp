// API Configuration

// For development with Expo:
// - Use your local IP (not localhost) so the physical device/simulator can reach it
// - Your Mac's IP: 192.168.1.119
// - Make sure your backend server is running and accessible on this IP

const DEV_URL = 'http://192.168.1.119:3000'; // Your local backend
const PROD_URL = 'https://your-production-api.com'; // Replace when you have production

export const API_CONFIG = {
  BASE_URL: __DEV__ ? DEV_URL : PROD_URL,
  TIMEOUT: 30000, // 30 seconds
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      VERIFY_OTP: '/auth/verify-otp',
      LOGOUT: '/auth/logout',
    },
    USER: {
      PROFILE: '/user/profile',
      UPDATE: '/user/update',
    },
    WORKOUT: {
      LIST: '/workouts',
      CREATE: '/workouts/create',
      UPDATE: '/workouts/update',
      DELETE: '/workouts/delete',
    },
  },
} as const;
