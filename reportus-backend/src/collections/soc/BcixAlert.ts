import type { CollectionConfig } from 'payload'
import { Admin, SocUserOnly, SocUserOrAdmin, addUser } from '../accessPolicies/accessPolicies'

const BcixAlert: CollectionConfig = {
  slug: 'bcix_alert',
  access: {
    // Später: update und delete von status draft/abgegeben abhängig
    create: SocUserOnly,
    read: SocUserOrAdmin,
    update: Admin,
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
      name: 'eventType',
      label: 'Typ des Events',
      required: true,
      type: 'select',
      options: [
        { label: 'ALERT', value: 'ALERT' },
        { label: 'ACCEPT', value: 'ACCEPT' },
        { label: 'RESOLVE', value: 'RESOLVE' },
      ],
    },
    {
      name: 'priority',
      label: 'Priorität',
      required: true,
      type: 'select',
      options: [
        { label: 'LOW', value: 'LOW' },
        { label: 'HIGH', value: 'HIGH' },
      ],
    },
    {
      name: 'alertKey',
      label: 'Ticketnummer',
      required: true,
      type: 'text',
    },
    {
      name: 'summary',
      label: 'Kurzbeschreibung',
      required: true,
      type: 'textarea',
    },
    {
      name: 'details',
      label: 'Ausführliche Meldung',
      required: true,
      defaultValue: 'Bitte melden unter der Nummer: 0361 77519508',
      type: 'textarea',
    },
  ],
}

export default BcixAlert
