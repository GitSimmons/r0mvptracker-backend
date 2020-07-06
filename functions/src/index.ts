//import * as functions from "firebase-functions";
import * as chromium from "chrome-aws-lambda";
import { filterMVPs } from "./filterMVPs";

export const MVPTable = async () => {
  // If stage is dev, use local chromium
  const executablePath =
    process.env.DEV_ANDROID == "true"
      ? "/usr/bin/chromium-browser"
      : await chromium.executablePath;
  const browser = await chromium.puppeteer.launch({
    executablePath,
    headless: true,
    args: [...chromium.args, "--no-sandbox"],
    defaultViewport: chromium.defaultViewport,
  });
  const page = await browser.newPage();
  // In order to minimize server load, use whitelist resources
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    const whitelist = ["document", "script", "xhr", "fetch"];
    if (!whitelist.includes(req.resourceType())) {
      return req.abort();
    }
    return req.continue();
  });
  const url = "http://www.ragna0.com/ranking/mvp/";
  await page.goto(url);

  let MVPs = [];
  MVPs = ["somevalue", "Baphomet", "Dets"];
  MVPs = filterMVPs(MVPs);
  await browser.close();
  return MVPs;
};
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
