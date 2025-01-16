export const i18n = {
  locales: ['en', 'ar', 'fa'],
  defaultLocale: 'ar'
} as const

export type Locale = (typeof i18n)['locales'][number]
