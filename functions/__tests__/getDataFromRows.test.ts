/**
 * @jest-environment jsdom
 */

import { getDataFromRows } from "../src/getDataFromRows";
import { MVP } from "../src/types";

const makeRowFromMVPObject = ({ name, whoKilled, lastKilled }: MVP) => `
<tr><td>${lastKilled}</td><td>${whoKilled}</td><td>${name}</td></tr> `;

const setupTableWithMVPs = (MVPs: MVP[]) => {
  const headerRow = `
    <tr>
      <td> timestamp </td>
      <td> char_id </td>
      <td> mvp_name </td>
    </tr>
  `;
  document.body.innerHTML =
    "<table>" +
    headerRow +
    MVPs.map((MVP: MVP) => makeRowFromMVPObject(MVP)) +
    "</table>";
};

describe("Parsing the MVP Table", () => {
  it("should remove header row data from object before returning", () => {
    const sampleMVPs: MVP[] = [
      {
        name: "Baphomet",
        whoKilled: "xxMVPKillerxx",
        lastKilled: "0000",
      },
      {
        name: "Doppelganger",
        whoKilled: "xxMVPKillerxx",
        lastKilled: "0001",
      },
    ];
    setupTableWithMVPs(sampleMVPs);
    const MVPs = getDataFromRows();
    expect(MVPs[0]).toEqual(sampleMVPs[0]);
  });
  it("should read  a table from DOM and return an array of MVP objects", () => {
    const sampleMVPs: MVP[] = [
      {
        name: "Baphomet",
        whoKilled: "xxMVPKillerxx",
        lastKilled: "0000",
      },
      {
        name: "Doppelganger",
        whoKilled: "xxMVPKillerxx",
        lastKilled: "0001",
      },
    ];
    setupTableWithMVPs(sampleMVPs);
    const MVPs = getDataFromRows();
    expect(MVPs).toEqual(sampleMVPs);
  });
  it("should only return the first entry for any MVP, because the first will always be the most recent kill", () => {
    const sampleMVPsWithDuplicateKill = [
      {
        name: "Baphomet",
        whoKilled: "xxMVPKillerxx",
        lastKilled: "0000",
      },
      {
        name: "Baphomet",
        whoKilled: "xxMVPKillerxx",
        lastKilled: "0001",
      },
    ];

    setupTableWithMVPs(sampleMVPsWithDuplicateKill);
    const MVPs = getDataFromRows();
    expect(MVPs).toEqual([sampleMVPsWithDuplicateKill[0]]);
  });
});
