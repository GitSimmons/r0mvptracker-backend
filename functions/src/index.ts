//import * as functions from "firebase-functions";
import * as chromium from "chrome-aws-lambda";

export const MVPTable = async () => {
  // if stage is dev, use local chromium
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
