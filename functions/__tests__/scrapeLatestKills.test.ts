import { scrapeLatestKills } from "../src/scrapeLatestKills";
import { MVP } from "../src/types";

describe("Fetching the MVP Table", () => {
  it("should return a list of MVPs", async () => {
    jest.setTimeout(30000);
    const sampleMVP: MVP = {
      name: expect.any(String),
      whoKilled: expect.any(String),
      lastKilled: expect.any(String),
    };
    const results = await scrapeLatestKills();
    results.every((result: MVP) =>
      expect(result).toMatchObject<MVP>(sampleMVP)
    );
  });
});
