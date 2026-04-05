import type { CollectionConfig } from 'payload'
import { Admin, allUsers } from '../accessPolicies/accessPolicies'

const Visitors: CollectionConfig = {
  slug: 'visitors',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    // Später: update und delete von status draft/abgegeben abhängig
    create: allUsers,
    read: allUsers,
    update: allUsers,
    delete: Admin,
  },
  fields: [
    {
      name: 'employee',
      label: 'Mitarbeiter',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'name',
      label: 'Besuchername',
      type: 'text',
      required: true,
    },
    {
      name: 'cardId',
      label: 'Besucher ID',
      type: 'text',
      unique: true,
      required: true,
    },
    {
      name: 'daysOfVisit',
      type: 'array',
      label: 'Datum des Besuches',
      required: true,
      minRows: 1,
      maxRows: 5,
      labels: {
        singular: 'Datum des Besuches',
        plural: 'Daten des Besuches',
      },

      fields: [
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
      ],
    },
  ],
}

export default Visitors
