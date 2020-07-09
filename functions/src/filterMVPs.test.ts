import { filterMVPs } from "./filterMVPs";
import { MVP } from "./types";

describe("Whitelist should filter out MVPs that aren't on a respawn timer", () => {
  it("should remove MVPs that are not whitelisted", () => {
    const realMVPs = ["Baphomet", "Orc Lord"];
    const fakeMVPs = ["Big Hat Logan", "Small Hat Logan"];

    let MVPList: MVP[] = [];
    [...fakeMVPs, ...realMVPs].map((name) =>
      MVPList.push({ name, lastKilled: "", whoKilled: "" })
    );
    let realMVPList: MVP[] = [];
    [...realMVPs].map((name) =>
      realMVPList.push({ name, lastKilled: "", whoKilled: "" })
    );
    expect(filterMVPs(MVPList)).toEqual(realMVPList);
  });
});
