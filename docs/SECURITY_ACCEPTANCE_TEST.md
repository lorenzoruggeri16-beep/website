# Security Acceptance Test — Golden Light Studio

Stato: **obbligatorio prima della produzione**. Ogni test deve essere eseguito sul deploy preview e poi sul dominio `goldenlightstudio.es`.

## Evidenze richieste

- Data, ambiente, utente di test e risultato per ogni scenario.
- Screenshot o risposta HTTP per i fallimenti attesi (401, 403, 413, 429).
- Nessun token, API key, password o contenuto personale nei log allegati.

## 1. Edge Functions

| Test | Risultato atteso |
| --- | --- |
| Deploy `content-ai` | Funzione pubblicata e invocabile solo con JWT valido. |
| Secret Gemini | Configurato nel vault Supabase; mai restituito al client o ai log. |
| Origin `.es` | Richiesta dal dominio canonico completata con successo. |
| Origin non autorizzato | `403 ORIGIN_NOT_ALLOWED`. |
| Payload invalido | `400 INVALID_REQUEST`. |
| Payload oltre limite | `413 REQUEST_TOO_LARGE`. |
| Utente senza permesso | `403 FORBIDDEN`. |
| Provider lento/non disponibile | Timeout o `502` con request id, senza dati provider. |
| Raffica richieste stesso utente | `429 RATE_LIMITED`. |

## 2. RLS e Admin

| Scenario | Risultato atteso |
| --- | --- |
| Visitatore anonimo legge Portfolio/Journal pubblicati | Consentito. |
| Visitatore anonimo modifica Portfolio o Journal | Negato. |
| Utente autenticato senza profilo admin legge `admin_users`/`login_users` | Negato. |
| Editor Portfolio modifica Portfolio | Consentito. |
| Editor Portfolio modifica Journal | Negato. |
| Editor Journal modifica Journal | Consentito. |
| Editor Journal modifica Portfolio | Negato. |
| Owner gestisce utenti e Media Library | Consentito. |
| Ruolo inserito manualmente nel localStorage | Nessun privilegio aggiuntivo. |
| Logout e refresh | Nessun accesso admin finché Supabase Auth non ripristina una sessione valida. |

## 3. Storage e upload

| Test | Risultato atteso |
| --- | --- |
| Lettura asset Portfolio/Journal pubblici | Consentita. |
| Upload anonimo | Negato. |
| Upload editor nel bucket non pertinente | Negato. |
| Delete anonimo o utente non autorizzato | Negato. |
| File oltre limite applicativo | Bloccato prima dell'upload. |
| MIME non consentito o file mascherato | Bloccato dal server/storage policy. |
| Eliminazione DAM | Storage prima, DB poi; stato di riparazione visibile in caso di errore DB. |

## 4. Browser e deploy

| Test | Risultato atteso |
| --- | --- |
| HTTPS | Redirect e certificato validi. |
| CSP | Nessun blocco inatteso per Supabase, Google Fonts, GTM o Formspree. |
| Header | HSTS, CSP, X-Frame-Options, nosniff, Referrer-Policy e Permissions-Policy presenti. |
| Console browser | Nessun errore o warning inatteso sulle pagine pubbliche e admin. |
| Network | Nessuna chiamata fallita non prevista. |

## 5. Secret e Git

- [ ] Secret ruotati in Supabase, Netlify e provider AI.
- [ ] `.env` rimosso dall'indice e dalla cronologia remota.
- [ ] Secret scanning attivo e senza segnalazioni aperte.
- [ ] Solo `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` sono disponibili al bundle browser.

## Registro di rischio — React Router

- **Componente:** `react-router-dom` 7.18.1, usato come SPA con `BrowserRouter`.
- **Rischio noto:** `npm audit` segnala advisory che includono percorsi RSC/SSR e routing server-side.
- **Impatto sul progetto:** ridotto ma non nullo, perché l'app non usa RSC, SSR, loader/action server-side o endpoint manifest.
- **Mitigazione:** nessun redirect costruito da input utente; usare solo percorsi interni controllati con `Link` e `navigate`; mantenere aggiornati i pacchetti.
- **Criterio di rivalutazione:** prima di ogni deploy e appena esce una release upstream che risolve le advisory senza downgrade o breaking change.
- **Stato:** accettazione esplicita richiesta prima del go-live; non forzare un upgrade incompatibile solo per azzerare il contatore npm.
