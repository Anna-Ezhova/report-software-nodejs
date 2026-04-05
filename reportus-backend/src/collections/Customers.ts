import type { Access, CollectionConfig } from 'payload'
import { SocUserOrAdmin } from './accessPolicies/accessPolicies'

const Customers: CollectionConfig = {
  slug: 'customers',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: SocUserOrAdmin,
    read: () => true,
    update: SocUserOrAdmin,
    delete: SocUserOrAdmin,
  },
  fields: [
    {
      name: 'name',
      label: 'Kundenname',
      required: true,
      type: 'text',
      unique: true,
    },
    {
      name: 'contact',
      type: 'array',
      label: 'Kontaktdaten',
      minRows: 1,
      maxRows: 5,
      labels: {
        singular: 'Kontaktperson',
        plural: 'Kontakpersonen',
      },

      fields: [
        {
          name: 'name',
          label: 'Name',
          type: 'text',
        },
        {
          name: 'phone',
          label: 'Telefon',
          type: 'text',
        },
        {
          name: 'email',
          label: 'Email',
          type: 'text',
        },
        {
          name: 'role',
          label: 'Rolle/Funktion',
          type: 'text',
        },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Notizen',
      required: false,
    },
    /*  {
        name: "assets",
        type: "relationship",
       relationTo: "asset_lists",
        label: "Assets",
        admin: {
            condition: () => false
        },
        required: false
    }, */
    {
      name: '_status',
      label: 'Status',
      type: 'select',
      defaultValue: 'active',
      required: true,
      options: [
        {
          value: 'active',
          label: 'Aktiv',
        },
        {
          value: 'archived',
          label: 'Archiviert',
        },
      ],
    },
  ],
}

export default Customers
