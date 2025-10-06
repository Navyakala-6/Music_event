This project uses Firebase Authentication and Firestore to store signed-up user profiles.

Follow these steps to create a Firebase project and wire it into the project so signup/login data is stored in your Firebase project's Firestore.

1) Create a Firebase project
- Sign in to the Firebase console at https://console.firebase.google.com using the email: navyakala.296@gmail.com
- Click "Add project" and follow the prompts. You can skip Google Analytics if you prefer.

2) Enable Authentication (Email/Password)
- In the Firebase console, go to Build → Authentication → Sign-in method
- Enable "Email/Password" and save.

3) Create a Firestore database
- In the Firebase console, go to Build → Firestore Database
- Click "Create database" and choose a security mode. For testing, you can use "Start in test mode" but for production set proper rules (see `firestore.rules` below).

4) Get Firebase config and paste it into the project
- In the Firebase console go to Project settings (the gear icon) → Your apps → Add web app (</>) (or select the existing web app if you created one earlier).
- Register a new app and copy the config object (apiKey, authDomain, projectId, etc.).
- Open `index.html` and find the `firebaseConfig` object near the top of the inline script. Replace the placeholder fields with the values from the console.

Example (do NOT commit secret server keys):

const firebaseConfig = {
  apiKey: "...",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "...",
  appId: "..."
};

5) Optional: Create a few test users via the Authentication → Users panel or sign up through the site to verify Firestore documents are created under `users/{uid}`.

6) Firestore security rules (recommended)
- See `firestore.rules` in this repository for a starting point. Update rules to match your app's needs before going to production.

7) Developer-only data access
- To allow only the developer to list/read all user profiles, use a server-side Admin SDK with a service account. Do NOT commit the service account JSON to this repository. See `firebase-admin-snippet.js` for an example.

If you want, paste the firebaseConfig here and I will add it directly into `index.html` and run smoke tests locally within the repository (no external network calls from this assistant). If you'd rather I guide you step-by-step, tell me and I'll proceed interactively.