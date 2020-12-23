/**
 * @jest-environment jsdom
 */

import { getDataFromRows } from "../src/getDataFromRows";
import { MVP } from "../src/types";

const makeRowFromMVPObject = ({ name, whoKilled, lastKilled, field }: MVP) => `
<tr><td>${lastKilled}</td><td>${whoKilled}</td><td>${name}</td><td></td><td>${field}</td></tr> `;

const setupTableWithMVPs = (MVPs: MVP[]) => {
  const headerRow = `
    <tr>
      <td> timestamp </td>
      <td> char_id </td>
      <td> mvp_name </td>
      <td> iunno, </td>
      <td> field </td>
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

  it("it should only count valkyries from odin_past", () => {
    const valkyriesInTheWrongPlaces = [
      {
        name: "Valkyrie Reginleif",
        whoKilled: "xxMVPKillerxx",
        lastKilled: "0000",
        field: "odin_past",
      },
      {
        name: "Valkyrie Ingrid",
        whoKilled: "xxMVPKillerxx",
        lastKilled: "0001",
        field: "instanced_map_with_the_same_mvps",
      },
      {
        name: "Valkyrie Ingrid",
        whoKilled: "xxMVPKillerxx",
        lastKilled: "0003",
        field: "odin_past",
      },
      {
        name: "Valkyrie Reginleif",
        whoKilled: "xxMVPKillerxx",
        lastKilled: "0004",
        field: "instanced_map_with_the_same_mvps",
      },
    ];
    const expectedResult = [
      {
        name: "Valkyrie Reginleif",
        whoKilled: "xxMVPKillerxx",
        lastKilled: "0000",
      },
      {
        name: "Valkyrie Ingrid",
        whoKilled: "xxMVPKillerxx",
        lastKilled: "0003",
      },
    ];
    setupTableWithMVPs(valkyriesInTheWrongPlaces);
    const MVPs = getDataFromRows();
    expect(MVPs).toEqual(expectedResult);
  });
});
