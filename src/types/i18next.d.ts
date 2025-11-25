// Type definitions for i18next
import 'react-i18next';
import en from '../locales/en/translation.json';

// Extend the i18next module to provide type-safe translation keys
declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: typeof en;
    };
  }
}
