import type { Locale } from '@/i18n.config'

const dictionaries = {
  ar: () => import('@/dictionaries/ar.json').then(module => module.default),
  en: () => import('@/dictionaries/en.json').then(module => module.default),
  fa: () => import('@/dictionaries/fa.json').then(module => module.default)
}

export const getTranslations = async (locale: Locale) => dictionaries[locale]()


