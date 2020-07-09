import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

exports.addLatestKills = functions.pubsub
  .schedule("every 5 minutes")
  .onRun(() => {
    console.log("this runs every 5 minutes");
  });
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
