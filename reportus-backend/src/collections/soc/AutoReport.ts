import type { CollectionAfterChangeHook, CollectionConfig } from 'payload'
import {
  Admin,
  NotRegularUser,
  SocManagerOrAdmin,
  SocUserOnly,
  SocUserOrAdmin,
  addUser,
  addUserSoc,
} from '../accessPolicies/accessPolicies'

const sendEmail: CollectionAfterChangeHook = async ({ req, doc }) => {
  const emailHtmlTag =
    '<html xmlns="http://www.w3.org/1999/xhtml"><head><title>Email an SOC Lvl 2</title><!--[if !mso]><!-- --><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]--><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>'
  const emailClosingTags = '</body></html>'

  console.log(doc.soc_l1.relevance)

  if (doc.soc_l2.finished) return

  if (doc.soc_l1.relevance === true) {
    const d = new Date(doc.createdAt)
    const time = d.toLocaleString()

    const allAlarms = doc.alarms

    var rows = ''

    for (let i = 0; i < allAlarms.length; i++) {
      const alarmObject = allAlarms[i].external_alarm

      rows +=
        ` <tr>` +
        `<td style="background-color:#ffffff;border-color:#333333;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;text-align:center;vertical-align:top;word-break:normal">${alarmObject.asset.host}</td>` +
        `<td style="background-color:#ffffff;border-color:#333333;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;text-align:center;vertical-align:top;word-break:normal">${alarmObject.asset.alias}</td>` +
        `<td style="background-color:#ffffff;border-color:#333333;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;text-align:center;vertical-align:top;word-break:normal">${alarmObject.level}</td>` +
        `<td style="background-color:#ffffff;border-color:#333333;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;text-align:center;vertical-align:top;word-break:normal">${alarmObject.description}<br></td></tr>`
    }

    const emailBody =
      `
        <h2>Neuer Alarm for ${doc.customer.name}</h2><body>
    <p>

        Bearbeitet durch ${doc.user_lvl1.first_name} ${doc.user_lvl1.last_name} um ${time}. SOC Level 2 Analyze wird benötigt. </p>
        <h4>
        Alarm Details:
        </h4>
        ` +
      '<table style="border-collapse:collapse;border-spacing:0" class="tg"><thead>' +
      '<tr><th style="background-color:#ffffff;border-color:#333333;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;font-weight:bold;overflow:hidden;padding:10px 5px;text-align:center;vertical-align:top;word-break:normal">Host</th><th style="background-color:#ffffff;border-color:#333333;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;font-weight:bold;overflow:hidden;padding:10px 5px;text-align:center;vertical-align:top;word-break:normal">Alias</th>' +
      '<th style="background-color:#ffffff;border-color:#333333;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;font-weight:bold;overflow:hidden;padding:10px 5px;text-align:center;vertical-align:top;word-break:normal">Level</th><th style="background-color:#ffffff;border-color:#333333;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;font-weight:bold;overflow:hidden;padding:10px 5px;text-align:center;vertical-align:top;word-break:normal">Beschreibung</th></tr>' +
      '</thead>' +
      '<tbody>' +
      `${rows}` +
      '</tbody></table>' +
      `<h4>
            Notizen des Mitarbeiters:
        </h4>
        
        <p>
            ${doc.soc_l1.notes}
        </p>
            ` +
      `<h4>Alarm bearbeiten unter <a href=${process.env.NEXT_PUBLIC_SERVER_URL}/soc-lvl-2/${doc.id}> ${process.env.NEXT_PUBLIC_SERVER_URL}/soc-lvl-2/${doc.id}</a></h4>`

    const fullEmail = emailHtmlTag + emailBody + emailClosingTags

    req.payload.sendEmail({
      from: 'kontaktformular@ext-asoftnet.de',

      to: 'kellermann@asoftnet.de',
      subject: `Neuer Alarm for ${doc.customer.name}`,

      html: fullEmail,
    })

    req.payload.sendEmail({
      from: 'kontaktformular@ext-asoftnet.de',
      to: 'taubert@asoftnet.de',
      subject: `Neuer Alarm for ${doc.customer.name}`,

      html: fullEmail,
    })
  }
}

const AutoReport: CollectionConfig = {
  slug: 'auto_reports',
  access: {
    create: SocUserOnly,
    read: NotRegularUser,
    update: SocManagerOrAdmin,
    delete: Admin,
  },
  hooks: {
    beforeChange: [addUserSoc],
    afterChange: [sendEmail],
  },

  fields: [
    {
      name: 'user_lvl1',
      label: 'Level 1 Mitarbeiter',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },
    {
      name: 'user_lvl2',
      label: 'Level 2 Mitarbeiter',
      type: 'relationship',
      relationTo: 'users',
      required: false,
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },
    {
      name: 'customer',
      label: 'Relevanter Kunde',
      type: 'relationship',
      relationTo: 'customers',
      required: true,
    },
    {
      name: 'alarms',
      type: 'array',
      label: 'Alarms',
      required: true,
      minRows: 1,
      labels: {
        singular: 'Alarm',
        plural: 'Alarme',
      },
      fields: [
        {
          name: 'external_alarm',
          type: 'relationship',
          relationTo: 'external_alerts',
          required: true,
        },
      ],
    },

    {
      name: 'soc_l1',
      label: 'SOC Level 1',
      type: 'group',
      fields: [
        {
          name: 'relevance',
          label: 'Sicherkeitrelevant?',
          type: 'checkbox',
          required: true,
        },
        {
          name: 'notes',
          label: 'Kommentar',
          type: 'textarea',
          required: false,
        },
        {
          name: 'finished',
          label: 'Fertig',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'soc_l2',
      label: 'SOC L2',
      type: 'group',
      fields: [
        {
          name: 'valid_incident',
          label: 'Valide Security Incident?',
          type: 'checkbox',
          required: false,
        },
        {
          name: 'notes',
          label: 'Kommentar',
          type: 'textarea',
          required: false,
        },
        {
          name: 'level',
          label: 'Level',
          type: 'select',
          required: false,
          options: [
            {
              label: 'LOW',
              value: 'LOW',
            },
            {
              label: 'MEDIUM',
              value: 'MEDIUM',
            },
            {
              label: 'HIGH',
              value: 'HIGH',
            },
          ],
        },
        {
          name: 'finished',
          label: 'Fertig',
          type: 'text',
          required: false,
        },
      ],
    },
  ],
}

export default AutoReport
