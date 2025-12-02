/**
 * Production Firebase configuration for df-chat-app
 * Hardcoded config avoids need for .env in bundled deployments
 * These are public keys and safe to commit
 */
export const FIREBASE_CONFIG = {
    apiKey: 'AIzaSyCGaJKzrUv_TgD97QLt-ydGPBbpCyCnrEw',
    authDomain: 'peg-2035.firebaseapp.com',
    projectId: 'peg-2035',
    storageBucket: 'peg-2035.appspot.com',
    messagingSenderId: '1039825199205',
    appId: '1:1039825199205:web:44d7dfd0f6f970c0ee668c',
};
/**
 * Emulator configuration - all disabled for production deployment
 */
export const EMULATOR_CONFIG = {
    auth: false,
    firestore: false,
    storage: false,
    functions: false,
};
//# sourceMappingURL=firebase.config.js.map