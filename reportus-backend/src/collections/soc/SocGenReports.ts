import type { Access, CollectionConfig } from 'payload'

import { Admin, SocUserOnly, SocUserOrAdmin, addUser } from '../accessPolicies/accessPolicies'

const SocGenReports: CollectionConfig = {
  slug: 'soc_generic',

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
      required: false,
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },

    {
      name: 'lead',
      label: 'Schichtleiter',
      required: true,
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'employees',
      label: 'Mitarbeiter',
      required: true,
      type: 'text',
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
      name: 'shift',
      label: 'Schicht',
      required: true,
      type: 'select',
      options: [
        {
          label: '06:00 - 14:00',
          value: '0',
        },
        {
          label: '14:00 - 22:00',
          value: '1',
        },
        {
          label: '22:00 - 06:00',
          value: '2',
        },
      ],
    },
    {
      name: 'events',
      label: 'Vorkommnisse',
      required: true,
      type: 'textarea',
    },
    {
      name: 'special_events',
      label: 'Besondere Vorkommnisse',
      required: false,
      type: 'textarea',
    },
    /* {
    name: "_status",
    label: "Status",
    type: "select",
    defaultValue: "final",
    required: true,
    options: [
        {
            value: "final", label: "Abgegeben"

        },
        {
            value: "draft", label: "Entwurf"
        }
    ]
} */
  ],
}

export default SocGenReports
