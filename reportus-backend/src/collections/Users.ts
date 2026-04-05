import { DEPARTMENT_DATA } from '../config'
import type { Access, CollectionConfig, PayloadRequest } from 'payload'
import { Admin, adminAndUser } from './accessPolicies/accessPolicies'

const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'username',
  },
  auth: {
    tokenExpiration: 32400, //9 hours
    verify: {
      generateEmailHTML: ({ req, token, user }) => {
        return `<a href='${process.env.NEXT_PUBLIC_SERVER_URL}/reset-password?email=${user.email}&token=${token}'> Verify Account </a>`
      },
    },
    /* verify: {
            generateEmailSubject: () => 'Verify your email',
            generateEmailHTML: generateVerificationEmail,
          },*/
    /* forgotPassword: {
            generateEmailSubject: () => 'Reset your password',
            
            generateEmailHTML: generateForgotPasswordEmail,
          },  */
    forgotPassword: {
      //@ts-expect-error
      generateEmailHTML: ({ req, token, user }) => {
        // Use the token provided to allow your user to reset their password
        const resetPasswordURL = `${process.env.NEXT_PUBLIC_SERVER_URL}/reset-password?to=${user.email}&token=${token}`

        return `


                <!doctype html>
                <html lang="de">
                  <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                    <title>Simple Transactional Email</title>
                    <style media="all" type="text/css">
                @media all {
                  .btn-primary table td:hover {
                    background-color: #ec0867 !important;
                  }
                
                  .btn-primary a:hover {
                    background-color: #ec0867 !important;
                    border-color: #ec0867 !important;
                  }
                }
                @media only screen and (max-width: 640px) {
                  .main p,
                .main td,
                .main span {
                    font-size: 16px !important;
                  }
                
                  .wrapper {
                    padding: 8px !important;
                  }
                
                  .content {
                    padding: 0 !important;
                  }
                
                  .container {
                    padding: 0 !important;
                    padding-top: 8px !important;
                    width: 100% !important;
                  }
                
                  .main {
                    border-left-width: 0 !important;
                    border-radius: 0 !important;
                    border-right-width: 0 !important;
                  }
                
                  .btn table {
                    max-width: 100% !important;
                    width: 100% !important;
                  }
                
                  .btn a {
                    font-size: 16px !important;
                    max-width: 100% !important;
                    width: 100% !important;
                  }
                }
                @media all {
                  .ExternalClass {
                    width: 100%;
                  }
                
                  .ExternalClass,
                .ExternalClass p,
                .ExternalClass span,
                .ExternalClass font,
                .ExternalClass td,
                .ExternalClass div {
                    line-height: 100%;
                  }
                
                  .apple-link a {
                    color: inherit !important;
                    font-family: inherit !important;
                    font-size: inherit !important;
                    font-weight: inherit !important;
                    line-height: inherit !important;
                    text-decoration: none !important;
                  }
                
                  #MessageViewBody a {
                    color: inherit;
                    text-decoration: none;
                    font-size: inherit;
                    font-family: inherit;
                    font-weight: inherit;
                    line-height: inherit;
                  }
                }
                </style>
                  </head>
                  <body style="font-family: Helvetica, sans-serif; -webkit-font-smoothing: antialiased; font-size: 16px; line-height: 1.3; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #f4f5f6; margin: 0; padding: 0;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f4f5f6; width: 100%;" width="100%" bgcolor="#f4f5f6">
                      <tr>
                        <td style="font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top;" valign="top">&nbsp;</td>
                        <td class="container" style="font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; max-width: 600px; padding: 0; padding-top: 24px; width: 600px; margin: 0 auto;" width="600" valign="top">
                          <div class="content" style="box-sizing: border-box; display: block; margin: 0 auto; max-width: 600px; padding: 0;">
                
                            <!-- START CENTERED WHITE CONTAINER -->
                            <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">This is preheader text. Some clients will show this text as a preview.</span>
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; border: 1px solid #eaebed; border-radius: 16px; width: 100%;" width="100%">
                
                              <!-- START MAIN CONTENT AREA -->
                              <tr>
                                <td class="wrapper" style="font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; box-sizing: border-box; padding: 24px;" valign="top">
                                  <p style="font-family: Helvetica, sans-serif; font-size: 16px; font-weight: normal; margin: 0; margin-bottom: 16px;">Hallo, ${user.first_name} ${user.last_name}</p>
                                  <p style="font-family: Helvetica, sans-serif; font-size: 16px; font-weight: normal; margin: 0; margin-bottom: 16px;">Für Sie wurde ein neues Konto im <b>Reportus</b> erstellt. Um die Kontoerstellung abzuschließen, legen Sie ein neues Passwort fest, indem Sie dem Link folgen.</p>
                                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; box-sizing: border-box; width: 100%; min-width: 100%;" width="100%">
                                    <tbody>
                                      <tr>
                                        <td align="left" style="font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; padding-bottom: 16px;" valign="top">
                                          <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
                                            <tbody>
                                              <tr>
                                                <td style="font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; border-radius: 4px; text-align: center; background-color: #0867ec;" valign="top" align="center" bgcolor="#0867ec"> <a href="${resetPasswordURL}" target="_blank" style="border: solid 2px #0867ec; border-radius: 4px; box-sizing: border-box; cursor: pointer; display: inline-block; font-size: 16px; font-weight: bold; margin: 0; padding: 12px 24px; text-decoration: none; text-transform: capitalize; background-color: #0867ec; border-color: #0867ec; color: #ffffff;">Passwort Neu Anlegen</a> </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <p style="font-family: Helvetica, sans-serif; font-size: 16px; font-weight: normal; margin: 0; margin-bottom: 16px;">Bei Fragen oder Beschwerden wenden Sie bitte an die Entwicklung.</p>
                                  
                                
                                </td>
                              </tr>
                
                              <!-- END MAIN CONTENT AREA -->
                              </table>
                
                            <!-- START FOOTER -->
                            <div class="footer" style="clear: both; padding-top: 24px; text-align: center; width: 100%;">
                              <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
                                <tr>
                                  <td class="content-block" style="font-family: Helvetica, sans-serif; vertical-align: top; color: #9a9ea6; font-size: 16px; text-align: center;" valign="top" align="center">
                                    <span class="apple-link" style="color: #9a9ea6; font-size: 16px; text-align: center;">Company Inc, 7-11 Commercial Ct, Belfast BT1 2NB</span>
                                    <br> Software funktioniert nicht richtig? Haben Sie diese E-Mail versehentlich erhalten?  <a href="mailto:entwicklung@asoftnet.de" style="text-decoration: underline; color: #9a9ea6; font-size: 16px; text-align: center;">Kontaktieren Sie Support</a>.
                                  </td>
                                </tr>
                                <tr>
                                  <td class="content-block powered-by" style="font-family: Helvetica, sans-serif; vertical-align: top; color: #9a9ea6; font-size: 16px; text-align: center;" valign="top" align="center">
                                    Powered by <a href="${process.env.NEXT_PUBLIC_SERVER_URL}" style="color: #9a9ea6; font-size: 16px; text-align: center; text-decoration: none;">Reportus</a>
                                  </td>
                                </tr>
                              </table>
                            </div>
                
                            <!-- END FOOTER -->
                            
                <!-- END CENTERED WHITE CONTAINER --></div>
                        </td>
                        <td style="font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top;" valign="top">&nbsp;</td>
                      </tr>
                    </table>
                  </body>
                </html>
                
                `
      },
    },
  },
  access: {
    read: () => true,
    update: adminAndUser,
    delete: Admin,
    create: Admin,
  },

  fields: [
    {
      name: 'role',
      label: 'Rolle',
      defaultValue: 'user_general',
      required: true,
      type: 'select',
      /* access: {
              create: ({ req: { user } }) => user!.role === "admin",
              read: () => true,
              update: ({ req: { user } }) => user!.role === "admin",
          }, */
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Mitarbeiter', value: 'user_general' },
        { label: 'SOC Mitarbeiter', value: 'user_soc' },
        { label: 'SOC Leiter', value: 'manager_soc' },
        { label: 'Verwaltung', value: 'manager_general' },
      ],
    },
    {
      name: 'username',
      label: 'Username',
      required: true,
      type: 'text',
      /*  access: {
              create: ({ req: { user } }) => {user!.role === "admin"},
              read: () => true,
              update: ({req: { user }}) => user!.role === "admin",
          }, */
    },
    {
      name: 'first_name',
      label: 'Vorname',
      required: true,
      type: 'text',
      /* access: {
            create: ({req: { user }}) => user!.role === "admin",
            read: () => true,
            update: ({req: { user }}) => user!.role === "admin",
        }, */
    },
    {
      name: 'last_name',
      label: 'Nachname',
      required: true,
      type: 'text',
      /* access: {
            create: ({req: { user }}) => user!.role === "admin",
            read: () => true,
            update: ({req: { user }}) => user!.role === "admin",
        }, */
    },
    {
      name: 'phone',
      label: 'Telefonnummer',
      required: false,
      type: 'text',
    },
    {
      name: 'avatar',
      label: 'Avatar',
      required: false,
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'department',
      label: 'Abteilung',
      defaultValue: 'Generic',
      required: true,
      type: 'select',
      /* access: {
            create: ({req: { user }}) => user!.role === "admin",
            read: () => true,
            update: ({req: { user }}) => user!.role === "admin",
        }, */
      options: DEPARTMENT_DATA.map(({ label, value }) => ({ label, value })),
    },
    {
      name: '_status',
      label: 'Status',
      defaultValue: 'active',
      /* access: {
            create: ({req: { user }}) => user!.role === "admin",
            read: ({req: { user }}) => user!.role === "admin",
            update: ({req: { user }}) => user!.role === "admin",
        }, */
      type: 'select',
      options: [
        { label: 'Aktiv', value: 'active' },
        { label: 'Archiviert', value: 'archived' },
      ],
    },
  ],
}

export default Users
