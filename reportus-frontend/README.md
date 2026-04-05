# Reportus 2.1

Vor der Gebrauch:

- .env Datei anpassen auf MongoDB URI und Payload URL.

- In folgenden Dateien muss Payload URL HÄNDISCH angepasst sein (da die Dateien komischerweise .env Datei komisch/falsch auslesen):
  - soc.server.ts
  - management.server.ts
  - AlarmChecklistForm.tsx
  - column-data.tsx
