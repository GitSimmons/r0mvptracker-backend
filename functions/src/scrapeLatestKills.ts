import * as chromium from "chrome-aws-lambda";
import { MVPWhitelist } from "./filterMVPs";
import { getDataFromRows } from "./getDataFromRows";
import { MVP } from "./types";

export const scrapeLatestKills: () => Promise<any> = async () => {
  // 1. Load Chromium in Puppeteer
  let browser = null;
  if (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "test"
  ) {
    try {
      // 1.1 Check if there's an already running browser to connect to
      // Don't forget to set the remote debugging port
      // $chromium-browser --remote-debugging-port=9222 --no-sandbox
      browser = await chromium.puppeteer.connect({
        browserURL: "http://127.0.0.1:9222",
      });
    } catch (e) {
      // 1.2 Launch a local headless browser
      // Change the path as appropriate to point to your local chrome
      try {
        const executablePath = "/usr/bin/chromium-browser";
        browser = await chromium.puppeteer.launch({
          args: [...chromium.args, "--no-sandbox"],
          defaultViewport: chromium.defaultViewport,
          executablePath,
          headless: true,
        });
      } catch (e) {
        throw new Error("Failed both to connect to or launch a local browser");
      }
    }
  } else {
    try {
      // 1.3 In the cloud, use chrome-aws-lambda's bundled chromium
      browser = await chromium.puppeteer.launch({
        args: await chromium.args,
        defaultViewport: await chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: await chromium.headless,
        ignoreHTTPSErrors: true,
      });
    } catch (error) {
      throw new Error("Failed to launch bundled browser");
    }
  }
  const page = await browser.newPage();
  page.on("response", (response) => {
    if (response!.status() !== 200) {
      throw new Error(
        `Received response status of ${response.status()}, expect 200`
      );
    }
  });
  // 2. Intercept requests for things we don't need
  await page.setRequestInterception(true);
  page.on("request", (req: any) => {
    const whitelist = ["document"];
    if (!whitelist.includes(req.resourceType())) {
      return req.abort();
    }
    return req.continue();
  });
  // 3. Navigate to site
  const url = "https://www.ragna0.com/mvplogs";
  await page.goto(url);
  // Wait until the table loads on the page
  await page.waitForSelector("table.horizontal-table");
  // 4. Get the MVPs from the table
  // The logic in page.evaluate will run in the chromium
  // instance, so it's difficult to refactor out pieces
  let MVPs = await page.evaluate(getDataFromRows);
  MVPs = MVPs.filter((mvp: MVP) => MVPWhitelist.includes(mvp.name));
  // 5. Close the browser before if not on dev
  // browser.process() returns null if the instance was created with browser.connect()
  if (browser.process()) {
    await browser.close();
  } else {
    await page.close();
    browser.disconnect();
  }
  return MVPs;
};
