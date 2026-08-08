# Golden Light Studio â€” Production Readiness Audit

Audit statico eseguito il 22 luglio 2026 sul repository locale. Questo documento non certifica configurazioni remote di Supabase, Netlify, DNS, Search Console o GTM: tali elementi sono elencati come verifiche obbligatorie in ambiente.

## Esito

**NO-GO per il rilascio professionale** finchÃ© i punti P0 non sono chiusi e verificati. La build di produzione passa, ma il progetto presenta esposizioni di configurazione, autorizzazione lato client e metadati di produzione non allineati al dominio previsto.

## P0 â€” Blocchi di rilascio

### 1. `.env` Ã¨ tracciato da Git

- Evidenza: `.env` Ã¨ un file tracciato e compare nel commit `266ee61` del 28 maggio 2026; il repository ha un remote GitHub configurato.
- Impatto: il file Ã¨ disponibile nella cronologia remota. Oggi contiene soltanto variabili Supabase lato browser, ma ogni secret eventualmente presente in una revisione precedente va considerato esposto.
- Azione:
  1. Ruotare immediatamente qualsiasi secret che sia mai stato messo in `.env` (in particolare service-role, Gemini/OpenAI, SMTP e Resend). L'anon key Supabase Ã¨ pubblicabile per design, ma va comunque sostituita se il progetto o le policy sono state esposte impropriamente.
  2. Aggiungere `.env`, `.env.*` e file di secret a `.gitignore`, mantenendo escluso solo `.env.example` privo di valori.
  3. Rimuovere `.env` dall'indice con `git rm --cached .env`, creare `.env.example` e riscrivere la cronologia Git con uno strumento dedicato, poi forzare il push solo dopo la rotazione.
  4. Verificare il clone remoto con un secret scanner (GitHub secret scanning, gitleaks o trufflehog).

### 2. Il frontend ripristina l'accesso admin dal `localStorage`

- Evidenza: `src/pages/Admin.jsx` legge `adminUser` e `adminExpiration` dal browser e imposta `logged` e `currentUser` senza verificare una sessione Supabase valida.
- Impatto: ruoli e permessi visualizzati sono manipolabili dal browser. La UI non puÃ² essere una barriera di sicurezza.
- Azione: eliminare il ripristino basato su `adminUser`; usare esclusivamente `supabase.auth.getSession()` / `onAuthStateChange()` e recuperare il profilo da `admin_users` con RLS che consenta la sola riga dell'utente autenticato. Ogni query mutante deve restare protetta da RLS o da Edge Function.

### 3. Policy Supabase e funzione `create-user` non sono auditabili dal repository

- Evidenza: le migrazioni presenti aggiungono campi JSON ma non contengono `enable row level security`, policy delle tabelle o policy dei bucket. La Edge Function `create-user`, chiamata dal frontend, non Ã¨ versionata qui.
- Impatto: non Ã¨ possibile dimostrare che portfolio, articles, admin_users, login_users, storage e creazione utenti siano protetti contro accessi anonimi o escalation di privilegi.
- Azione: esportare e versionare migrazioni di schema/RLS e configurazione bucket; revisionare la funzione `create-user`; testare con anon key, utente non admin, editor e owner. FinchÃ© non verificato, negare di default INSERT/UPDATE/DELETE ai ruoli pubblici.

### 4. Header di sicurezza assenti

- Evidenza: `netlify.toml` contiene solo il redirect SPA.
- Impatto: mancano CSP, HSTS, anti-clickjacking, MIME sniffing, referrer policy e permissions policy.
- Azione: aggiungere header Netlify dopo aver inventariato i domini necessari (self, Supabase, Google Fonts, GTM/GA, Instagram e immagini). La CSP va prima usata in Report-Only e poi resa bloccante.

## P1 â€” Da correggere prima del go-live

### Sicurezza applicativa

- `content-ai` verifica l'utente e i permessi, che Ã¨ una buona base, ma non impone rate limit, timeout `AbortController`, limiti su dimensione del body/numero di URL o validazione strutturale dei campi. Limita anche il CORS agli origin di produzione invece di `*`.
- La funzione registra la risposta completa del provider AI in caso di errore. Ridurre i log a request id, codice e stato HTTP, evitando contenuti editoriali o metadati potenzialmente personali.
- `journalAi.js` blocca il salvataggio se Gemini fallisce, mentre il Portfolio ha giÃ  un fallback. Allineare il Journal al fallback previsto dal CMS.
- Upload Journal e Portfolio non applicano ancora limiti di dimensione, tipo MIME verificato lato server, compressione o prevenzione duplicati. La validazione client non Ã¨ sufficiente.
- `SettingsSection.jsx` usa un URL Supabase hardcoded per `create-user`. Centralizzarlo nella configurazione Supabase e assicurarsi che la funzione controlli il ruolo owner sul server.

### Dipendenze e qualitÃ  del codice

- `npm audit --omit=dev` segnala una vulnerabilitÃ  **high** in Vite `8.0.14` su Windows (`GHSA-fx2h-pf6j-xcff`), piÃ¹ una advisory moderata correlata. Aggiornare Vite a una versione corretta, rigenerare lockfile e rieseguire build/lint.
- `npm run lint` fallisce con 8 errori e 1 warning: `SettingsSection`, `CTASection`, `Navbar`, `site.jsx`, `Admin.jsx` e `Hero`. Il lint deve essere verde prima del rilascio.
- `src/config/site.jsx` dichiara `phone` due volte: il primo numero viene sovrascritto.

## P1 â€” SEO e indicizzazione

- Il dominio ufficiale configurato in `src/config/site.jsx`, `index.html`, `robots.txt` e `sitemap.xml` è `https://goldenlight.studio`; canonical, Open Graph, Twitter card, robots e sitemap sono coerenti con il dominio di produzione.
- `Journal.jsx` non monta il componente `SEO`; eredita quindi i metadati statici della home.
- `JournalArticle.jsx` usa sempre `/journal` come canonical, invece dell'URL dell'articolo. `PortfolioDetail.jsx` non passa alcun URL a `SEO`, quindi usa `/` come canonical.
- `NotFound.jsx` emette `index,follow`; deve essere `noindex,follow`. Anche `/studio-control` deve essere noindex, preferibilmente protetto da Netlify/HTTP oltre al solo `robots.txt`.
- La sitemap Ã¨ statica: non include portfolio e articoli pubblicati nÃ© `lastmod`. Generarla dal contenuto CMS in build/deploy o tramite Edge Function.
- Ãˆ presente JSON-LD `PhotographyBusiness`, ma mancano le strutture richieste dalla release: `WebSite`, `Organization`, `Article`, `ImageObject` e `BreadcrumbList`; aggiungerle per pagina, con dati reali.
- Mancano `hreflang` / `alternate` per ES, IT ed EN.

## P1 â€” Performance

- Le 16 immagini statiche in `public/images` pesano **24,48 MiB**; la piÃ¹ pesante Ã¨ **4,53 MiB**. Le quattro immagini gallery principali e l'hero sono JPEG multi-megabyte.
- Convertire le immagini statiche in AVIF/WebP, servire varianti responsive (`srcset`/`sizes`) e usare CDN/trasformazioni per Supabase Storage. Solo l'hero LCP va precaricato; le restanti immagini devono usare `loading="lazy"` e `decoding="async"`.
- Il progetto ha giÃ  lazy loading delle route con `React.lazy`, quindi il code splitting di base Ã¨ presente.
- Google Fonts usa giÃ  `display=swap`; aggiungere preload mirato del font usato sopra la piega e cache header per gli asset versionati.

## P2 â€” AccessibilitÃ  e UX

- Mancano uno skip link e una landmark strategy uniforme (`header`, `nav`, `main`, `footer`).
- La lightbox Portfolio gestisce Escape, ma non ha `role="dialog"`, `aria-modal`, focus trap, ripristino del focus o comandi con `aria-label`; le frecce sono solo caratteri. I dialog della Media Library hanno lo stesso limite.
- Diverse immagini amministrative e statiche non hanno attributo `alt`; aggiungere testo significativo o `alt=""` solo per immagini decorative.
- Numerosi controlli sono cliccabili ma non hanno nomi accessibili completi. Testare tab, Shift+Tab, Enter, Space ed Escape su menu, modali, carousel e lightbox.
- Non esistono test automatici, E2E o una checklist manuale versionata per Chrome, Safari, Firefox, Edge, iOS, Android, tablet, Slow 3G, offline e 404.

## P2 â€” Privacy, analytics e operativitÃ 

- GTM Ã¨ caricato direttamente in `index.html`, ma non sono presenti cookie banner, Consent Mode, Privacy Policy, Cookie Policy o Aviso Legal nel repository.
- Non sono implementati eventi business per contatto, WhatsApp, email, apertura Portfolio/Journal, cambio lingua o booking.
- Non risultano integrazioni Sentry, backup documentati o health check. Attivare alert su errori funzione, deploy Netlify, budget storage e problemi di crawl.

## Verifiche remote obbligatorie

| Area | Criterio di accettazione |
| --- | --- |
| Supabase RLS | anon: solo SELECT pubblico a contenuti pubblicati; editor/owner: solo permessi necessari; nessun accesso a login/admin altrui. |
| Storage | lettura pubblica solo per asset pubblicati; upload/delete consentiti esclusivamente a ruoli autorizzati e ai soli path previsti. |
| Edge Functions | JWT verificato, autorizzazione server-side, rate limit, limiti input, timeout, secret presenti solo nel vault. |
| Netlify | deploy preview, header effettivi, redirect SPA/404, HTTPS e dominio canonico verificati. |
| SEO | Search Console collegata, sitemap accettata, canonical `.es`, nessun errore di coverage. |
| Analytics/GDPR | consenso prima dei tag non essenziali, GA4 realtime e eventi personalizzati verificati. |
| Performance | Lighthouse su produzione mobile/desktop dopo ottimizzazione immagini; LCP, CLS e INP entro target. |

## Ordine di esecuzione consigliato

1. Rotazione secret, rimozione `.env` dalla cronologia e aggiornamento `.gitignore`.
2. RLS/storage/function audit e rimozione dell'autorizzazione basata su `localStorage`.
3. Header Netlify, aggiornamento Vite e lint verde.
4. Canonical dominio `.es`, noindex admin/404, canonical dinamici e sitemap CMS.
5. Immagini responsive compresse, GDPR/Consent Mode, eventi e monitoraggio.
6. Test cross-browser e Lighthouse della release candidata, poi checklist finale di deploy.
