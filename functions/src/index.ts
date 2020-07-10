import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { scrapeLatestKills } from "./scrapeLatestKills";
import { MVP } from "./types";

if (admin.apps.length === 0) {
  admin.initializeApp();
}
let db = admin.firestore();

const runtimeOpts: {
  timeoutSeconds: number;
  memory: "512MB" | "1GB" | "2GB";
} = {
  timeoutSeconds: 10,
  memory: "512MB",
};

exports.addLatestKills = functions
  .runWith(runtimeOpts)
  .pubsub.schedule("every 5 minutes")
  .onRun(async () => {
    // 1. scrape latest kills
    const MVPs: MVP[] = await scrapeLatestKills();
    /* TODO: see if pruning excess writes saves time
     * 1. get .doc(lastUpdated)
     * 2. only write MVPs if lastUpdated > .doc(lastUpdated)
     * */
    // 2. for each kill, merge new whoKilled && lastKilled data
    const dbUpdates = MVPs.map(
      async (mvp) =>
        await db.collection("mvp").doc(mvp.name).set(mvp, { merge: true })
    );
    await Promise.all(dbUpdates);
    // 3. update the lastUpdated
    await db
      .collection("misc")
      .doc("lastUpdated")
      .set({ lastUpdated: new Date() });
    // Cloud fns are asynchronous and should return null, an object or a promise
    return null;
  });
