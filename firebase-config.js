// Firebase web config for the TeamLead page (project vicuras-teamlead). These values are not secret:
// access is controlled by firestore.rules. Firebase console → Project settings → General → Your apps.
export const firebaseConfig = {
  apiKey: 'AIzaSyCmaNC2yo9-wgytp6SWzH_AVg-U6ksOBcA',
  authDomain: 'vicuras-teamlead.firebaseapp.com',
  projectId: 'vicuras-teamlead',
  storageBucket: 'vicuras-teamlead.firebasestorage.app',
  messagingSenderId: '8590925188',
  appId: '1:8590925188:web:0125308af6868b81ec91d1'
};

// Only emails with this domain can create an account. Must match the domain in firestore.rules.
export const allowedDomain = 'vicuras.dk';
