/**
 * @jest-environment jsdom
 */

import { getDataFromRankingRows } from "../src/getDataFromRankingRows";

const makeRowFromName = (name: string, index: number) =>
  `<tr><td>${index}</td><td>${name}</td></tr> `;

const setupTableWithRanks = (rankings: string[]) => {
  const headerRow = `
    <tr>
      <td> rank </td>
      <td> name </td>
    </tr>
  `;
  document.body.innerHTML =
    "<table>" +
    headerRow +
    rankings.map((name: string, index: number) =>
      makeRowFromName(name, index)
    ) +
    "</table>";
};
const testRankings = [
  "Rank 1 person",
  "Rank 2 person",
  "Rank 3 person",
  "Rank 4 person",
  "Rank 5 person",
  "Rank 6 person",
  "Rank 7 person",
  "Rank 8 person",
  "Rank 9 person",
  "Rank 10 person",
  "Rank 11 person",
  "Rank 12 person",
  "Rank 13 person",
  "Rank 14 person",
  "Rank 15 person",
  "Rank 16 person",
  "Rank 17 person",
  "Rank 18 person",
  "Rank 18 person",
  "Rank 19 person",
  "Rank 20 person",
];
describe("Parsing the Rankings Table", () => {
  it("should remove header row data from object before returning", () => {
    setupTableWithRanks(testRankings);
    const rankings = getDataFromRankingRows();
    expect(rankings[0]).toEqual(testRankings[0]);
  });
  it("should read  a table from DOM and return an array of names 15 names long", () => {
    setupTableWithRanks(testRankings);
    const rankings = getDataFromRankingRows();
    expect(rankings.length).toBe(15);
    expect(rankings).toEqual(testRankings.slice(0, 15));
  });
});
