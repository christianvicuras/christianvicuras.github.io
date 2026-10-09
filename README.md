# TeamLead Indmeldinger

Bug reports, feedback and ideas from TeamLeads, at `https://christianvicuras.github.io/`.

People sign in with their Vicuras Microsoft account. Each report is stored as its own document in Firestore, tagged with
who wrote it, and the security rules in [firestore.rules](firestore.rules) decide who sees what:

| Who | Sees | Can do |
| --- | --- | --- |
| A TeamLead | Their own reports (also the ones only for Louise) and the shared reports of other TeamLeads | Create reports in their own name |
| An editor (listed in `admins`) | Every report | Set status, reply, file a report on behalf of a TeamLead |

The page runs entirely on GitHub Pages. Firebase's free Spark plan is enough: screenshots are stored as compressed
images in Firestore, so Cloud Storage (which needs the paid plan) isn't used.

## One-time setup

### 1. Create the Firebase project
1. Go to <https://console.firebase.google.com>, choose **Add project**, give it a name (e.g. `vicuras-teamlead`). Analytics isn't needed.
2. **Build → Firestore Database → Create database**. Pick a location in Europe (e.g. `eur3` or `europe-west1`), start in **production mode**.
3. **Firestore Database → Rules**: replace everything with the contents of [firestore.rules](firestore.rules) and press **Publish**.
4. **Project settings (gear) → General → Your apps → Web (`</>`)**: register an app (no Hosting needed). Copy the `firebaseConfig` values into [firebase-config.js](firebase-config.js).

### 2. Microsoft sign-in
1. In Firebase: **Build → Authentication → Get started → Sign-in method → Add new provider → Microsoft**. Keep the dialog open and copy the **redirect URI** it shows (`https://<project>.firebaseapp.com/__/auth/handler`).
2. In the Azure portal (<https://portal.azure.com>) → **Microsoft Entra ID → App registrations → New registration**:
   - Name: `TeamLead Indmeldinger`
   - Supported account types: **Accounts in this organizational directory only** (single tenant). This is what keeps non-Vicuras accounts out.
   - Redirect URI: platform **Web**, paste the redirect URI from step 1.
3. In the new app registration: copy the **Application (client) ID**. Under **Certificates & secrets → New client secret**, create a secret and copy its **Value**. Note the expiry date; the login stops working when it expires.
4. Back in Firebase, paste the client ID and secret into the Microsoft provider and **Save**.
5. Copy the **Directory (tenant) ID** from the app registration's overview into `microsoftTenant` in [firebase-config.js](firebase-config.js).
6. **Authentication → Settings → Authorized domains → Add domain**: `christianvicuras.github.io`.

### 3. Editors
In **Firestore Database → Data**, create a collection `admins` with one document per editor. The **document ID is the
editor's email in lowercase** (e.g. `louise@vicuras.dk`); add any field (e.g. `name`), the contents don't matter.
Editors see every report and get the "Status og svar" panel. Remove a document to take the access away.

### 4. Publish
Commit and push. GitHub Pages serves the page at `https://christianvicuras.github.io/`.

## Notes
- The email domain is set in two places: `allowedDomain` in [firebase-config.js](firebase-config.js) (what the page checks) and `isVicuras()` in [firestore.rules](firestore.rules) (what the database enforces). Change both if it changes.
- Sign-in needs the account to have an email address in Entra ID. If someone gets "Du har ikke adgang", check that their user has the **Email** field set.
- To try it locally, serve the folder over http (module scripts don't load from `file://`) and add `localhost` to the authorized domains, e.g. `python -m http.server 8000` in the repo root and open `http://localhost:8000/`.
- Data lives in the Firebase project; export it from the console (or with `gcloud firestore export`) if you need a backup.
