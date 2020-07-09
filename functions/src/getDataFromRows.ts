import { MVP } from "./types";

export const getDataFromRows: () => MVP[] = () => {
  const rowNodes = document.querySelectorAll("tr");
  let MVPs: MVP[] = [];
  let names: string[] = [];
  // TODO: convert to getElementsByTagName for performance
  // NodeLists are only recently iteratable with forEach, so we use an older way
  Array.prototype.forEach.call(rowNodes, (row: HTMLTableRowElement) => {
    // Row looks like TIME // CHAR_ID // MVP_NAME // MVP_EXP // MVP_MAP
    const columns = row.children;
    const lastKilled = columns[0].textContent!.trim();
    const whoKilled = columns[1].textContent!.trim();
    let name = columns[2].textContent!.trim();
    // Because latest kills are at the top, ignore repeats
    // TODO: consider a For Loop instead of indexOf for performance reasons
    if (names.indexOf(name) === -1) {
      MVPs.push({
        name,
        lastKilled,
        whoKilled,
      });
      names.push(name);
    }
  });
  // remove header row from data
  MVPs.shift();
  return MVPs;
};
