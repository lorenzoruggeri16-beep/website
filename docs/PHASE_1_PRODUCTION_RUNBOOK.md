# Fase 1 â€” Security & Production Runbook

La Fase 1 Ã¨ completata solo quando ogni casella Ã¨ verificata sul progetto di produzione. Non inserire secret in file Git, ticket o chat.

## 1. Secret e repository

- [ ] Ruotare in Supabase le chiavi che sono state esposte o potrebbero essere state esposte nella cronologia Git: service-role, Gemini/OpenAI, SMTP/Resend e qualsiasi altro secret.
- [ ] Aggiornare i valori in Supabase Edge Functions e Netlify Environment Variables.
- [ ] Impostare nell'Edge Function `content-ai`:
  - `GEMINI_API_KEY`
  - `GEMINI_MODEL`
  - `ALLOWED_ORIGINS=https://goldenlightstudio.es,https://www.goldenlightstudio.es`
- [ ] Riscrivere la cronologia remota per rimuovere `.env`, quindi forzare il push solo dopo la rotazione delle chiavi.
- [ ] Attivare GitHub Secret Scanning e verificare che `.env` non compaia piÃ¹ nei file tracciati.

## 2. Database, RLS e Storage

- [ ] Applicare prima su un progetto Supabase preview la migrazione `20260722_security_rls_and_storage.sql`.
- [ ] Verificare con anon key che Portfolio e Journal mostrino solo record con `deleted = false`.
- [ ] Verificare che un utente autenticato ma senza profilo admin non possa leggere `admin_users` o `login_users`, nÃ© caricare/eliminare asset.
- [ ] Verificare che un editor Portfolio non possa modificare Journal/Storage Journal e viceversa.
- [ ] Verificare che solo un owner possa gestire profili admin e Media Library.
- [ ] Dopo l'esito positivo, applicare la stessa migrazione alla produzione.

## 3. Edge Functions

- [ ] Versionare e revisionare anche `create-user`; deve usare service role solo sul server e confermare il ruolo owner del chiamante.
- [ ] Distribuire `content-ai` con i nuovi limiti: CORS per origin consentiti, payload massimo, timeout Gemini e rate limit per utente.
- [ ] Il rate limit incluso è una prima barriera in memoria per singola istanza; aggiungere un rate limit centralizzato/gateway se il volume di pubblicazioni cresce.
- [ ] Testare: nessun JWT (401), origin non ammesso (403), utente non autorizzato (403), richiesta invalida (400), rate limit (429), timeout provider (502).
- [ ] Verificare che i log contengano solo request id, codice e stato; mai prompt, token o contenuto editoriale.

## 4. Netlify e dominio

- [ ] Collegare `goldenlightstudio.es` e `www.goldenlightstudio.es`; rendere uno dei due il redirect permanente verso il dominio canonico.
- [ ] Fare un deploy preview e controllare che la CSP non blocchi Supabase, Google Fonts, GTM o Formspree.
- [ ] Verificare sul dominio HTTPS gli header: CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy e Permissions-Policy.
- [ ] Controllare che `/studio-control` e `/reset-password` non siano indicizzabili.

## 5. Test Admin di accettazione

- [ ] Login con email/password Supabase, refresh della pagina e logout.
- [ ] L'email puÃ² essere ricordata; ruolo e permessi non devono comparire nel localStorage.
- [ ] Owner: utenti, Media Library, portfolio, Journal e cestino.
- [ ] Editor Portfolio: solo Portfolio e asset Portfolio.
- [ ] Editor Journal: solo Journal e asset Journal.
- [ ] Utente senza permessi: nessuna modifica consentita anche manipolando la UI dal browser.
- [ ] Gemini non disponibile: Portfolio e Journal salvano il contenuto sorgente e mostrano un messaggio di rigenerazione successiva.

## 6. Evidenze richieste per chiudere la fase

- [ ] Screenshot/risultato dei test RLS e Storage sul progetto preview.
- [ ] URL del deploy Netlify con header verificati.
- [ ] Log testato delle due Edge Function senza dati sensibili.
- [ ] Build e lint verdi; rieseguire `npm audit --omit=dev` e verificare le advisory React Router prima del deploy.
- [ ] Approvazione per il passaggio alla Fase 2 â€” Tracking & GDPR.
