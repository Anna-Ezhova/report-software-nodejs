import type { CollectionConfig } from 'payload'
import {
  Admin,
  ManagementOnly,
  ManagementandAdmin,
  addUser,
  allUsers,
} from '../accessPolicies/accessPolicies'

const PostEntry: CollectionConfig = {
  slug: 'post_entries',
  admin: {
    useAsTitle: 'serial_number',
  },
  access: {
    //TODO: Berechtigung nur für Verwaltung
    create: ManagementandAdmin,
    read: ManagementandAdmin,
    update: ManagementandAdmin,
    delete: Admin,
  },
  hooks: {
    beforeChange: [addUser],
  },
  fields: [
    {
      name: 'user',
      label: 'Verfasser',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },
    {
      name: 'serial_number',
      label: 'Lfd. Nr',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'date_of_record',
      label: 'Datum der Eintragung',
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
      name: 'date_of_letter',
      label: 'Datum des Schreibens',
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
      name: 'recipient',
      label: 'Empfänger',
      type: 'text',
      required: true,
    },
    {
      name: 'subject',
      label: 'Betreff',
      type: 'text',
      required: true,
    },
    {
      name: 'notes',
      label: 'Bemerkung',
      type: 'textarea',
      required: false,
    },
  ],
}

export default PostEntry
