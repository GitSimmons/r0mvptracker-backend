import { MVP } from "./types";

export const getDataFromRows: () => MVP[] = () => {
  // TODO: convert to getElementsByTagName for performance
  const rowNodes = document.querySelectorAll("tr");
  const MVPs: MVP[] = [];
  // an array of unique MVP names
  const names: string[] = [];
  // NodeLists are only recently iteratable with forEach, so we use an older way
  Array.prototype.forEach.call(rowNodes, (row: HTMLTableRowElement) => {
    // Row looks like TIME // CHAR_ID // MVP_NAME // MVP_EXP // MVP_MAP
    const columns = row.children;
    const lastKilled = columns[0].textContent!.trim();
    const whoKilled = columns[1].textContent!.trim();
    let name = columns[2].textContent!.trim();
    // get the field for some conditional filtering
    const field = columns[4]?.textContent?.trim();
    // skip going further for Valkyries that aren't on the right map
    if (
      field !== "odin_past" &&
      (name === "Valkyrie Ingrid" || name === "Valkyrie Reginleif")
    ) {
      return;
    }
    // append a sweet crossed sword emoji to guild dungeon MVPs
    if (field && field.includes("gld_dun")) {
      name += " ⚔️";
    }
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
