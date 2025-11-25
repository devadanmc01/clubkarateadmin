import type { NestedKeysStripped } from '@payloadcms/translations'

import { enTranslations } from '@payloadcms/translations/languages/en'

export const customTranslations = {
  en: {
    custom: {
      unauthorized: 'Access unauthorized',
      registerAttendance: 'Register Attendance',
    },
  },
  es: {
    custom: {
      unauthorized: 'Acceso no autorizado',
      registerAttendance: 'Registrar Asistencia',
    },
  },
}

export type CustomTranslationsObject = typeof customTranslations.en & typeof enTranslations
export type CustomTranslationsKeys = NestedKeysStripped<CustomTranslationsObject>
