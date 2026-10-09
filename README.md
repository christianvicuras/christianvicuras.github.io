# TeamLead Indmeldinger

Bug reports, feedback and ideas from TeamLeads, at `https://christianvicuras.github.io/`.

There are no passwords or accounts to create: a TeamLead types their @vicuras.dk email, Firebase mails them a sign-in
link, and clicking it signs them in on the page. The page only sends links to @vicuras.dk addresses.

Each report is stored as its own document in Firestore, tagged with who wrote it, and the security rules in
[firestore.rules](firestore.rules) decide who sees what:

| Who | Sees | Can do |
| --- | --- | --- |
| A TeamLead | Their own reports (also the ones only for Louise) and the shared reports of other TeamLeads | Create reports in their own name |
| An editor (listed in `admins`) | Every report | Set status, reply, file a report on behalf of a TeamLead |

The rules only admit @vicuras.dk emails that were proven through such a link, so nobody can sign in as someone else.

## Firebase project

Project **vicuras-teamlead** (Spark/free plan), console: <https://console.firebase.google.com/project/vicuras-teamlead/overview>

- Firestore database `(default)` in `eur3` (Europe). Screenshots are stored as compressed images in Firestore; Cloud Storage isn't used.
- Authentication: Email/Password provider with **Email link (passwordless sign-in)** turned on, and
  `christianvicuras.github.io` under **Authentication → Settings → Authorized domains** (needed for the link to return to the page).
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
- Sign-in links are valid for a limited time and can be used once. Opening the link in another browser than the one it was requested in asks for the email again.
- The sign-in mails come from `noreply@vicuras-teamlead.firebaseapp.com` and can land in spam. Their text can be edited under **Authentication → Templates**.
- Accounts can be seen, disabled or deleted under **Authentication → Users**.
- To try it locally, serve the folder over http (module scripts don't load from `file://`): `python -m http.server 8000` and open `http://localhost:8000/`.
