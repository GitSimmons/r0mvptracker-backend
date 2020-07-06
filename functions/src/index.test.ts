import { MVPTable } from "./index";

describe("Fetching the MVP Table", () => {
  it("true should be true", () => {
    expect(true).toBe(true);
  });
  it("should load puppeteer and return something", async () => {
    const results = await MVPTable();
    expect(results).toBeTruthy();
  });
});
