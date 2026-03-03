/**
 * Internationalization setup
 * Add i18n library configuration here when needed
 */

export const translations = {
  en: {
    common: {
      welcome: 'Welcome',
      loading: 'Loading...',
      error: 'An error occurred',
    },
  },
  tr: {
    common: {
      welcome: 'Hoş Geldiniz',
      loading: 'Yükleniyor...',
      error: 'Bir hata oluştu',
    },
  },
} as const;

export type Language = keyof typeof translations;

export const i18n = {
  currentLanguage: 'tr' as Language,
  t: (key: string) => key, // Placeholder for translation function
};

export default i18n;
