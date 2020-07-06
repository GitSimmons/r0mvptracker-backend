import { MVPTable } from "./index";
import { filterMVPs } from "./filterMVPs";

it("should remove MVPs that are not whitelisted", () => {
  const realMVPs = ["Baphomet", "Orc Lord"];
  const fakeMVPs = ["Big Hat Logan", "Small Hat Logan"];
  const MVPs = [...fakeMVPs, ...realMVPs];
  expect(filterMVPs(MVPs)).toEqual(realMVPs);
});

describe("Fetching the MVP Table", () => {
  it("true should be true", () => {
    expect(true).toBe(true);
  });
  it("should load puppeteer and return something", async () => {
    const results = await MVPTable();
    expect(results).toBeTruthy();
  });
});
