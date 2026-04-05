import type { CollectionConfig } from 'payload'
import { Admin } from './accessPolicies/accessPolicies'

const ServiceUsers: CollectionConfig = {
  slug: 'service_users',
  admin: {
    useAsTitle: 'name',
  },
  auth: {
    useAPIKey: true,
    disableLocalStrategy: true,
  },
  access: {
    read: Admin,
    update: Admin,
    delete: Admin,
    create: Admin,
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      required: true,
      type: 'text',
    },
    {
      name: 'role',
      label: 'Rolle',
      defaultValue: 'service_account',
      required: true,
      type: 'select',
      options: [{ value: 'service_account', label: 'Service Account' }],
    },
  ],
}

export default ServiceUsers
