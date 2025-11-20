// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import { en } from '@payloadcms/translations/languages/en'
import { es } from '@payloadcms/translations/languages/es'
import { fileURLToPath } from 'url'
import path from 'path'
import sharp from 'sharp'

// import { Media } from './collections/Media'
import Members from './collections/Members'
import Attendances from './collections/Attendances'
import Payments from './collections/Payments'
import Users from './collections/Users'
import { testEndpoint } from './app/(payload)/api/[...slug]/registro'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      afterNavLinks: [
        './components/afterNavLink/LinkToStudentsStatsView#LinkToStudentsStatsView',
        './components/afterNavLink/LinkToQRReaderView#LinkToQRReaderView',
      ],
      views: {
        EstadisticasdeAlumnos: {
          Component: './components/views/StudentsStats',
          path: '/students-stats',
        },
        QRReader: {
          Component: './components/views/QRReaderView',
          path: '/qr-reader',
        },
      },
      Nav: '/components/Nav#Nav',
      logout: {
        Button: {
          path: '/components/Logout#Logout',
        },
      },
    },
    timezones: {
      supportedTimezones: [
        {
          label: 'America/Mexico_City',
          value: 'America/Mexico_City',
        },
      ],
      defaultTimezone: 'America/Mexico_City',
    },
    theme: 'dark',
  },

  collections: [Members, Attendances, Payments, Users],
  editor: lexicalEditor(),
  i18n: {
    supportedLanguages: {
      en: {
        ...en,
        dateFNSKey: 'en-US',
      },
      es: {
        ...es,
        dateFNSKey: 'es',
      },
    },
  },
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  endpoints: [testEndpoint],
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
