export const Queues = {
  Genehmigungsgruppe: 9,
  Infrastruktur: 5,
  Infrastruktur_Linux: 8,
  Infrastruktur_Netzwerk_Firewall_Freischaltungen: 14,
  Infrastruktur_Windows_Zertifikatsanfrage: 15,
  Infrastruktur_Windows_Neuer_Server: 17,
  Change_Queue: 10,
  Zertifikatssperrung_Queue: 19,
  Onboarding_Queue: 21,
};

export const QueuesKeys = Object.keys(Queues);

export const TypeIDs = {
  Firewall_Freischaltung: 8,
  Zertifikatsanfrage: 7,
  Changeantrag: 1,
  Neuer_Server: 9,
  Zertifikatssperrung: 13,
  Serverrückbau: 14,
  Onboarding: 15,
} as const;

export const TypeIdKeys = Object.keys(TypeIDs);

export const PriorityIDs = {
  sehr_niedrig: 1,
  niedrig: 2,
  normal: 3,
  hoch: 4,
  kritisch: 5,
  notfall_change: 6,
  standard_change: 7,
  normaler_change: 8,
} as const;

export const PriorityIdKeys = [
  "sehr_niedrig",
  "niedrig",
  "normal",
  "hoch",
  "kritisch",
  "notfall_change",
  "standard_change",
  "normaler_change",
] as const;
