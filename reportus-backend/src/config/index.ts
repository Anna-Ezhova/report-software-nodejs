export const REPORTS_DATA = [
  {
    label: 'Verwaltungsbereich',
    value: 'generic' as const,
    tag: 'generic' as const,
    featured: [
      {
        name: 'Interne Meeting',
        href: '/meeting-form',
        imageSrc: '/icons/file-pen.svg',
      },
      {
        name: 'Alle Meetings',
        href: '/meeting-show-all',
        imageSrc: '/icons/files.svg',
      },
      {
        name: 'Postausgang',
        href: '/post-entry',
        imageSrc: '/icons/mail-plus.svg',
      },
      {
        name: 'Postausgangsliste',
        href: '/post-all-entries',
        imageSrc: '/icons/mails.svg',
      },

      {
        name: 'Letzter Weekly',
        href: '/latest-meeting?type=weekly',
        imageSrc: '/icons/book-open.svg',
      },
      {
        name: 'Besucher Anmelden',
        href: '/tba',
        imageSrc: '/icons/calendar-plus.svg',
      },
      {
        name: 'Alle Termine Ansehen',
        href: '/tba',
        imageSrc: '/icons/calendar-days.svg',
      },
    ],
  },
  {
    label: 'Forms',
    value: 'forms' as const,
    tag: 'generic' as const,
    featured: [
      {
        name: 'Neuer Server',
        href: '/tba',
        imageSrc: '/icons/server.svg',
      },
      {
        name: 'Serverrückbau',
        href: '/tba',
        imageSrc: '/icons/server-off.svg',
      },
      {
        name: 'Changeantrag',
        href: '/tba',
        imageSrc: '/icons/replace.svg',
      },
      {
        name: 'Firewall-Freischaltung',
        href: '/firewall',
        imageSrc: '/icons/flame.svg',
      },
      {
        name: 'Onboarding',
        href: '/tba',
        imageSrc: '/icons/file-user.svg',
      },
      {
        name: 'Zertifikatsantrag',
        href: '/new-certificate',
        imageSrc: '/icons/file-badge.svg',
      },
      {
        name: 'Zertifikatssperrung',
        href: '/revoke-certificate',
        imageSrc: '/icons/ban.svg',
      },
    ],
  },

  {
    label: 'SOC Berichte',
    value: 'soc_reports' as const,
    tag: 'soc' as const,
    featured: [
      {
        name: 'Ereignisbericht SOC',
        href: '/new-soc-report',
        imageSrc: '/icons/file-pen.svg',
      },
      {
        name: 'Berichte Durchsuchen',
        href: '/soc-all-reports',
        imageSrc: '/icons/search.svg',
      },
      {
        name: 'Letzter Bericht',
        href: '/soc-latest-report',
        imageSrc: '/icons/book-open.svg',
      },
      {
        name: 'Besucherprotokol Einreichen',
        href: '/new-soc-visitor',
        imageSrc: '/icons/door-open.svg',
      },
      {
        name: 'Protokolle Durchsuchen',
        href: '/soc-all-visitors',
        imageSrc: '/icons/search.svg',
      },
      {
        name: 'Notfallbericht SOC',
        href: '/new-alert',
        imageSrc: '/icons/triangle-alert.svg',
      },
      {
        name: 'Alarm an BCIX',
        href: '/bcix-alert',
        imageSrc: '/icons/skull.svg',
      },
    ],
  },

  {
    label: 'SOC Wiki',
    value: 'soc_wiki' as const,
    tag: 'soc' as const,
    featured: [
      {
        name: 'Kundenübersicht',
        href: '/customer-overview',
        imageSrc: '/icons/book-user.svg',
      },
      {
        name: 'Playbooks',
        href: '/playbooks',
        imageSrc: '/icons/book-marked.svg',
      },
      {
        name: 'Wichtige Informationen SOC',
        href: '/soc-wiki?to=Wichtige_Informationen_SOC',
        imageSrc: '/icons/info.svg',
      },
      ,
      {
        name: 'Prozess Verarbeiten Alarme',
        href: '/soc-wiki?to=Prozess_Verarbeiten_Alarme',
        imageSrc: '/icons/file-warning.svg',
      },
    ],
  },
] as const

export const DEPARTMENT_DATA = [
  {
    value: 'Geschäftsführung',
    label: 'Geschäftsführung',
  },
  {
    value: 'Netzwerk',
    label: 'Netzwerk',
  },
  {
    value: 'Server',
    label: 'Server',
  },
  {
    value: 'Entwicklung',
    label: 'Entwicklung',
  },
  {
    value: 'SOC',
    label: 'SOC',
  },
  {
    value: 'Vertrieb',
    label: 'Vertrieb',
  },
  {
    value: 'Buchhaltung',
    label: 'Buchhaltung',
  },
  {
    value: 'Controling',
    label: 'Controling',
  },
  {
    value: 'Generic',
    label: 'Sonstiges/Nicht definiert',
  },
]
