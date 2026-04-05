import type { CollectionConfig } from 'payload'
import { Admin, addUser, allUsers } from '../accessPolicies/accessPolicies'
import { DEPARTMENT_DATA } from '../../config'

const MeetingProtocol: CollectionConfig = {
  slug: 'meeting_protocols',
  access: {
    // Später: update und delete von status draft/abgegeben abhängig
    create: allUsers,
    read: allUsers,
    update: allUsers,
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
      name: 'organizer',
      label: 'Organisator',
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
      name: 'location',
      label: 'Ort',
      type: 'select',
      required: true,
      options: [
        { label: 'Geschäftsführungraum', value: 'Geschäftsführungraum' },
        { label: 'Besprechungsraum', value: 'Besprechungsraum' },
        { label: 'Verwaltungsbüro', value: 'Verwaltungsbüro' },
        { label: 'Teams', value: 'Teams' },
        { label: 'Arbeitsplatz', value: 'Arbeitsplatz' },
      ],
    },
    {
      name: 'start_time',
      label: 'Beginn',
      required: true,
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'timeOnly',
          displayFormat: 'h:mm',
          timeIntervals: 1,
        },
      },
    },
    {
      name: 'end_time',
      label: 'Ende',
      required: true,
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'timeOnly',
          displayFormat: 'h:mm',
          timeIntervals: 1,
        },
      },
    },
    /* {
            name: "participants_intern",
            label: "Teilnehmer Intern",
            type: "array",
            minRows: 2,
            required: true,
            labels: {
                singular: "Teilnehmer",
                plural: "Teilnehmer"
            },
            fields: [
                {
                    name: "participant",
                    label: "Teilnehmer", 
                    type: "relationship",
                    relationTo: "users"
                }
            ]

        }, */
    {
      name: 'participants_intern',
      label: 'Teilnehmer Intern',
      type: 'textarea',
      required: true,
    },
    {
      name: 'participants_extern',
      label: 'Teilnehmer Extern',
      type: 'textarea',
      required: false,
    },

    {
      name: 'topic',
      label: 'Thema',
      required: true,
      type: 'select',
      options: [
        { label: 'Weekly Meetings', value: 'weekly' },
        { label: 'Verwaltungsmeeting', value: 'verwaltung' },
        // {label: "Sonstiges", value: "sonstiges"}
      ],
    },
    {
      name: 'tasks',
      label: 'Aufgaben',
      required: true,
      type: 'array',
      minRows: 1,
      labels: {
        singular: 'Aufgabe',
        plural: 'Aufgaben',
      },
      fields: [
        {
          name: 'topic',
          label: 'Thema',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          label: 'Inhalt',
          type: 'textarea',
          required: true,
        },
        {
          name: 'accountable',
          label: 'Verantwortlicher',
          type: 'textarea',
          required: false,
        },
        {
          name: 'due_date',
          label: 'Fälligkeit',
          type: 'date',
          admin: {
            date: {
              pickerAppearance: 'dayOnly',
              displayFormat: 'd MMM yyy',
            },
          },
        },
        {
          name: 'status',
          label: 'Status',
          type: 'select',
          required: true,
          defaultValue: 'to_do',
          options: [
            { label: 'offen', value: 'to_do' },
            { label: 'erledigt', value: 'done' },
            { label: 'verschoben', value: 'postponed' },
          ],
        },
      ],
    },
    {
      name: 'notes',
      label: 'Notizen',
      type: 'textarea',
      required: false,
    },
  ],
}

export default MeetingProtocol
