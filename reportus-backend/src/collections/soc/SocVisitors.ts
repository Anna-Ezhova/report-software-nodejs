import type { CollectionConfig } from 'payload'
import { Admin, SocUserOnly, SocUserOrAdmin, addUser } from '../accessPolicies/accessPolicies'

const SocVisitors: CollectionConfig = {
  slug: 'soc_visitors',
  access: {
    // Später: update und delete von status draft/abgegeben abhängig
    create: SocUserOnly,
    read: SocUserOrAdmin,
    update: SocUserOrAdmin,
    delete: Admin,
  },
  hooks: {
    beforeChange: [addUser],
  },
  fields: [
    {
      name: 'user',
      label: 'Mitarbeiter',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },
    {
      name: 'employee',
      label: 'Mitarbeiter',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'date',
      label: 'Datum',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'd MMM yyy',
        },
      },
    },
    {
      name: 'start',
      label: 'Beginn',
      required: true,
      type: 'text',
    },
    {
      name: 'end',
      label: 'Ende',
      required: true,
      type: 'text',
    },
    {
      name: 'reason',
      label: 'Grund',
      required: true,
      type: 'textarea',
    },
  ],
}

export default SocVisitors
