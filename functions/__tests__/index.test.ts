import * as admin from "firebase-admin";
import fireBaseTest = require("firebase-functions-test");
import * as path from "path";

const myFunctions = require("../src/index");

const fireStoreConfig = {
  databaseURL: "https://zeromvp.dev.firebasio.com",
  projectId: "zeromvp-dev",
};

const testEnv = fireBaseTest(
  fireStoreConfig,
  path.resolve("__tests__/zeromvp-dev-key.json")
);

describe("Cloud Functions", () => {
  it("should update the DB with the latest kills and set lastUpdated", async () => {
    const timeBeforeUpdate = new Date();
    jest.setTimeout(30000);
    const wrapped = testEnv.wrap(myFunctions.addLatestKills);
    // Run the function, no arguments needed
    await wrapped(null);
    const lastUpdated = admin.firestore().collection("misc").doc("lastUpdated");
    await lastUpdated.get().then((doc) => {
      if (doc.exists) {
        // pray that it takes longer than a second to execute)
        expect(doc.data()!.lastUpdated._seconds).toBeGreaterThan(
          timeBeforeUpdate.getTime() / 1000 // remove nanoseconds
        );
      }
    });
  });
});
