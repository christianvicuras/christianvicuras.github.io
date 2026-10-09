# TeamLead Indmeldinger

Bug reports, feedback and ideas from TeamLeads, at `https://christianvicuras.github.io/`.

People sign in with their @vicuras.dk email and a password. There is no sign-up on the page: accounts are created by
hand in the Firebase console. Each report is stored as its own document in Firestore, tagged with who wrote it, and the
security rules decide who sees what:

| Who | Sees | Can do |
| --- | --- | --- |
| A TeamLead | Their own reports (also the ones only for Louise) and the shared reports of other TeamLeads | Create reports in their own name |
| An editor | Every report | Set status, reply, file a report on behalf of a TeamLead |

Only the emails listed in the rules get in, whatever accounts exist.

## Firebase project

Project **vicuras-teamlead** (Spark/free plan), console: <https://console.firebase.google.com/project/vicuras-teamlead/overview>

- Firestore database `(default)` in `eur3` (Europe). Screenshots are stored as compressed images in Firestore; Cloud Storage isn't used.
- Authentication: Email/Password. **Authentication → Settings → User actions → "Enable create (sign-up)" must be off**, so nobody can create an account through the API.
- Web app config is in [firebase-config.js](firebase-config.js) (not secret; access is enforced by the rules).

## Who has access

The lists of editors and TeamLeads live in `firestore.rules` (functions `editors()` and `teamLeads()`). Because this
repo and the site are public, that file is **not committed** (see [.gitignore](.gitignore)); it exists on the machine
that deploys and in Firebase. [firestore.rules.example](firestore.rules.example) is the same file with placeholder
addresses, to recreate it from.

To add or remove someone:
1. Edit the list in `firestore.rules` (lowercase emails) and deploy: `firebase deploy --only firestore:rules`
2. Add or delete the account under **Authentication → Users** in the console.

If `firestore.rules` is lost, the current rules can be copied from **Firestore Database → Rules** in the console.

## Notes
- The email domain the page accepts is `allowedDomain` in [firebase-config.js](firebase-config.js).
- Names on reports come from the email (`anna.hansen@vicuras.dk` → "Anna Hansen").
- "Glemt adgangskode?" mails come from `noreply@vicuras-teamlead.firebaseapp.com`; Microsoft 365 may quarantine them unless that sender is allowed.
- To try it locally, serve the folder over http (module scripts don't load from `file://`): `python -m http.server 8000` and open `http://localhost:8000/`.
