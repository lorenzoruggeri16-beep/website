# GTM + Consent Mode v2 — configurazione del container

Il sito usa una soluzione proprietaria in **modalità basic**: GTM viene caricato solo dopo il consenso ad Analytics o Marketing. Prima dell'interazione non viene effettuata alcuna richiesta a Google Tag Manager.

## Implementazione nel sito

- `src/lib/consent.js` imposta e aggiorna i quattro segnali Consent Mode v2:
  - `analytics_storage`
  - `ad_storage`
  - `ad_user_data`
  - `ad_personalization`
- Le preferenze sono conservate localmente con chiave `gls-consent-v1`, necessaria a ricordare la scelta dell'utente.
- Il container `GTM-MKDZBGJ7` viene inserito dinamicamente solo dopo consenso opzionale.
- Lo snippet statico e il fallback `noscript` sono stati rimossi da `index.html` per evitare richieste pre-consenso.

## Configurazione GTM obbligatoria

1. Aprire Preview su `goldenlightstudio.es` e collegare Tag Assistant.
2. Per il tag GA4, verificare nei Consent Settings che richieda `analytics_storage`.
3. Per tag pubblicitari/remarketing, richiedere `ad_storage`, `ad_user_data` e `ad_personalization`.
4. Non impostare tag che aggirino le Consent Settings o leggano cookie prima del consenso.
5. Pubblicare il container solo dopo aver verificato gli eventi in Preview.

## Casi di test

| Scelta banner | Risultato atteso |
| --- | --- |
| Nessuna scelta | Nessuna richiesta `gtm.js`, GA o Ads. |
| Solo necessari | Nessuna richiesta `gtm.js`, GA o Ads. |
| Analytics | Caricamento GTM e solo tag che richiedono `analytics_storage`. |
| Marketing | Caricamento GTM e tag autorizzati dalle Consent Settings. |
| Revoca dopo consenso | Segnali aggiornati a `denied`; cookie Google non essenziali rimossi per le pagine successive. |

## Verifica finale

- In Tag Assistant: il container si connette solo dopo consenso.
- In DevTools Network: assenza di `gtm.js` prima del consenso.
- In dataLayer: valori `denied` iniziali e `update` coerente con la scelta.
- In GA4 DebugView: eventi solo dopo consenso Analytics.
- In GTM Preview: nessun tag non autorizzato parte prima del consenso.

Consent Mode non sostituisce il banner o le policy: il titolare resta responsabile di informativa, basi giuridiche e categorie dichiarate. Consultare la guida ufficiale Google per i segnali e l'ordine di inizializzazione: https://developers.google.com/tag-platform/security/guides/consent
