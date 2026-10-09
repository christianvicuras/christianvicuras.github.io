# TeamLead Indmeldinger

Bug reports, feedback and ideas from TeamLeads, at `https://christianvicuras.github.io/`.

People create an account with their @vicuras.dk email and a password, and are signed in right away. Each report is stored as its own document in Firestore, tagged with who wrote it, and the security rules in
[firestore.rules](firestore.rules) decide who sees what:

| Who | Sees | Can do |
| --- | --- | --- |
| A TeamLead | Their own reports (also the ones only for Louise) and the shared reports of other TeamLeads | Create reports in their own name |
| An editor (listed in `admins`) | Every report | Set status, reply, file a report on behalf of a TeamLead |

Emails are **not** confirmed. Anyone who can open the page can create an account with any @vicuras.dk address that
hasn't been taken yet, including a made-up one, and then read the shared reports. Someone who registers an editor's
address before the editor does gets editor access, so editors should create their accounts first. To require email
confirmation again, add `&& request.auth.token.email_verified == true` to `isVicuras()` in the rules.

## Firebase project

Project **vicuras-teamlead** (Spark/free plan), console: <https://console.firebase.google.com/project/vicuras-teamlead/overview>

- Firestore database `(default)` in `eur3` (Europe). Screenshots are stored as compressed images in Firestore; Cloud Storage isn't used.
- Authentication: Email/Password.
- Web app config is in [firebase-config.js](firebase-config.js) (not secret; access is enforced by the rules).

Change the rules by editing [firestore.rules](firestore.rules) and running, in this folder:

```
firebase deploy --only firestore:rules
```

## Editors

In **Firestore Database → Data**, the collection `admins` holds one document per editor. The **document ID is the
editor's email in lowercase** (e.g. `louise@vicuras.dk`); the fields don't matter (e.g. `name: "Louise"`). Editors see
every report and get the "Status og svar" panel. Delete the document to take the access away.

## Notes
- The email domain is set in two places: `allowedDomain` in [firebase-config.js](firebase-config.js) (what the page checks) and `isVicuras()` in [firestore.rules](firestore.rules) (what the database enforces). Change both if it changes.
- The password-reset mails come from `noreply@vicuras-teamlead.firebaseapp.com` and can land in spam. Their text can be edited under **Authentication → Templates**.
- Accounts can be seen, disabled or deleted under **Authentication → Users**.
- To try it locally, serve the folder over http (module scripts don't load from `file://`): `python -m http.server 8000` and open `http://localhost:8000/`.
