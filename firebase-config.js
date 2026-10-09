// Firebase web config for the TeamLead page. These values are not secret: access is controlled by firestore.rules.
// Firebase console → Project settings → General → Your apps → Web app → SDK setup and configuration → Config.
export const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT.firebaseapp.com',
  projectId: 'YOUR_PROJECT',
  storageBucket: 'YOUR_PROJECT.appspot.com',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID'
};

// Directory (tenant) ID of the Vicuras Microsoft 365 tenant, so the Microsoft login only offers Vicuras accounts.
// Azure portal → Microsoft Entra ID → Overview → Tenant ID. Leave empty to allow any Microsoft account.
export const microsoftTenant = '';

// Only accounts with this email domain may use the page. Must match the domain in firestore.rules.
export const allowedDomain = 'vicuras.dk';
