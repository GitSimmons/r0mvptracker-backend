//import * as functions from "firebase-functions";
import * as chromium from "chrome-aws-lambda";

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
  // In order to minimize server load, we use a whitelist
  // 1. Intercept network requests.
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    // 2. Ignore requests for resources that don't produce DOM
    // (images, stylesheets, media).
    const whitelist = ["document", "script", "xhr", "fetch"];
    if (!whitelist.includes(req.resourceType())) {
      return req.abort();
    }
    // 3. Pass through all other requests.
    req.continue();
  });
  const url = "http://www.ragna0.com/ranking/mvp/";
  await page.goto(url);
  const MVPs = ["somevalues"];
  await browser.close();
  return MVPs;
};
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
