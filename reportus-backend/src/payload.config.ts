import { mongooseAdapter } from '@payloadcms/db-mongodb'

import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import path from 'path'

import sharp from 'sharp'

import dotenv from 'dotenv'
import { Media } from './collections/Media'
import SocGenReports from './collections/soc/SocGenReports'
import Customers from './collections/Customers'
import SocNotfall from './collections/soc/SocNotfall'
import SocVisitors from './collections/soc/SocVisitors'
import BcixAlert from './collections/soc/BcixAlert'
import Visitors from './collections/general/Visitors'
import ServiceUsers from './collections/ServiceUsers'
import Alert from './collections/soc/Alert'
import AutoReport from './collections/soc/AutoReport'
import PostEntry from './collections/general/Post'
import MeetingProtocol from './collections/general/MeetingProtocol'
import ManagementProtocol from './collections/general/ManagementProtocols'

import { nodemailerAdapter } from '@payloadcms/email-nodemailer'

import { fileURLToPath } from 'url'
import Users from './collections/Users'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const url = process.env.NEXT_PUBLIC_SERVER_URL as string

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

export default buildConfig({
  serverURL: process.env.PAYLOAD_SERVER_URL || '',
  cors: {
    origins: [url],
  },

  localization: {
    locales: ['en', 'de'], // required
    defaultLocale: 'de', // required
  },

  email: nodemailerAdapter({
    defaultFromAddress: 'kontaktformular@ext-asoftnet.de',
    defaultFromName: 'Reportus',
    // Nodemailer transportOptions
    transportOptions: {
      host: process.env.SMTP_HOST,
      port: 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
  }),
  collections: [
    Users,
    Media,
    SocGenReports,
    SocNotfall,
    Customers,
    SocVisitors,
    BcixAlert,
    Visitors,
    ServiceUsers,
    Alert,
    AutoReport,
    PostEntry,
    MeetingProtocol,
    ManagementProtocol,
  ],

  routes: {
    admin: '/admin',
  },
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(__dirname),
    },
  },
  secret: process.env.PAYLOAD_SECRET || '',
  editor: lexicalEditor(),
  db: mongooseAdapter({
    url: process.env.MONGODB_URL! || '',
  }),
  sharp,
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
})
