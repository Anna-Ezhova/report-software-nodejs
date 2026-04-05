import type { CollectionAfterChangeHook, CollectionConfig } from 'payload'
import {
  Admin,
  NotRegularUser,
  SocAndService,
  SocServiceAdmin,
  SocUserOnly,
  SocUserOrAdmin,
} from '../accessPolicies/accessPolicies'

const sendEmail: CollectionAfterChangeHook = async ({ req, doc }) => {
  if (doc.level === 'HIGH' || doc.level === 'CRITICAL' || doc.level === 'HIGH CRITICAL') {
    const emailBody =
      `<h2>Neuer Alarm for ${doc.customer.name}</h2>` +
      '<table style="border-collapse:collapse;border-spacing:0" class="tg"><thead>' +
      '<tr><th style="background-color:#ffffff;border-color:#333333;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;font-weight:bold;overflow:hidden;padding:10px 5px;text-align:center;vertical-align:top;word-break:normal">Kunde</th><th style="background-color:#ffffff;border-color:#333333;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;font-weight:bold;overflow:hidden;padding:10px 5px;text-align:center;vertical-align:top;word-break:normal">Host</th><th style="background-color:#ffffff;border-color:#333333;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;font-weight:bold;overflow:hidden;padding:10px 5px;text-align:center;vertical-align:top;word-break:normal">Alias</th>' +
      '<th style="background-color:#ffffff;border-color:#333333;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;font-weight:bold;overflow:hidden;padding:10px 5px;text-align:center;vertical-align:top;word-break:normal">Level</th><th style="background-color:#ffffff;border-color:#333333;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;font-weight:bold;overflow:hidden;padding:10px 5px;text-align:center;vertical-align:top;word-break:normal">Beschreibung</th></tr>' +
      '</thead>' +
      '<tbody>' +
      ` <tr><td style="background-color:#ffffff;border-color:#333333;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;text-align:center;vertical-align:top;word-break:normal">${doc.customer.name} </td>` +
      `<td style="background-color:#ffffff;border-color:#333333;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;text-align:center;vertical-align:top;word-break:normal">${doc.asset.host}</td>` +
      `<td style="background-color:#ffffff;border-color:#333333;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;text-align:center;vertical-align:top;word-break:normal">${doc.asset.alias}</td>` +
      `<td style="background-color:#ffffff;border-color:#333333;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;text-align:center;vertical-align:top;word-break:normal">${doc.level}</td>` +
      `<td style="background-color:#ffffff;border-color:#333333;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;text-align:center;vertical-align:top;word-break:normal">${doc.description}<br></td></tr>` +
      '</tbody></table>' +
      `<h4>Alarm bearbeiten unter <a href=${process.env.NEXT_PUBLIC_SERVER_URL}/soc-lvl-1/${doc.id}> ${process.env.NEXT_PUBLIC_SERVER_URL}/soc-lvl-1/${doc.id}</a></h4>`

    req.payload.sendEmail({
      from: 'kontaktformular@ext-asoftnet.de',
      to: 'soc@asoftnet.de',
      subject: `Neuer Alarm for ${doc.customer.name}`,

      html: emailBody,
    })
  }
}

const Alert: CollectionConfig = {
  slug: 'external_alerts',
  access: {
    create: SocAndService,
    // read: SocServiceAdmin,
    read: NotRegularUser,
    update: SocUserOrAdmin,
    // delete: ({req}) => req.user.role === "admin"
    delete: Admin,
  },
  hooks: {
    afterChange: [sendEmail],
  },
  fields: [
    {
      name: 'customer',
      label: 'Kunde',
      type: 'relationship',
      relationTo: 'customers',
      required: true,
    },
    {
      name: 'reference_id',
      label: 'Referenz ID',
      type: 'text',
      unique: true,
      required: true,
    },
    {
      name: 'asset',
      type: 'group',
      label: 'Asset',
      fields: [
        {
          name: 'host',
          label: 'Host',
          required: true,
          type: 'text',
        },
        {
          name: 'alias',
          label: 'Alias',
          required: false,
          type: 'text',
        },
      ],
    },
    {
      name: 'level',
      label: 'Level',
      type: 'select',
      options: [
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HIGH', label: 'HIGH' },
        { value: 'CRITICAL', label: 'CRITICAL' },
        { value: 'HIGH CRITICAL', label: 'HIGH CRITICAL' },
      ],
      required: true,
    },
    {
      name: 'description',
      label: 'Beschreibung',
      type: 'textarea',
      required: false,
    },
    {
      name: 'notes',
      label: 'Notizen',
      type: 'textarea',
      required: false,
    },
  ],
}

export default Alert
