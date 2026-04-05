import { CollectionConfig } from 'payload'
import { Admin, SocUserOnly, SocUserOrAdmin, addUser } from '../accessPolicies/accessPolicies'

const SocNotfall: CollectionConfig = {
  slug: 'soc_alert',
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
      required: true,
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'd MMM yyy',
        },
      },
    },
    {
      name: 'time',
      label: 'Zeit',
      required: true,
      type: 'text',
    },
    {
      name: 'customer',
      label: 'Kunde',
      required: true,
      type: 'relationship',
      relationTo: 'customers',
    },
    {
      name: 'events',
      label: 'Ablauf',
      required: true,
      type: 'textarea',
    },
  ],
}

export default SocNotfall
