import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import admin from "firebase-admin";

const filename = fileURLToPath(import.meta.url);
const here = dirname(filename);

const filePathToFirebaseSDK = path.resolve(here, "../../../firebasesdk.json");

const serviceAccount = JSON.parse(
  fs.readFileSync(filePathToFirebaseSDK, "utf-8")
);

function initializeFirebaseApp() {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

function connectToFirebase() {
  initializeFirebaseApp();
  return admin.firestore();
}

export { connectToFirebase };
