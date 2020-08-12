export const getDataFromRankingRows: () => string[] = () => {
  const rowNodes = document.querySelectorAll("tr");
  const Rankings: string[] = [];
  // TODO: convert to getElementsByTagName for performance
  // NodeLists are only recently iteratable with forEach, so we use an older way
  Array.prototype.forEach.call(rowNodes, (row: HTMLTableRowElement) => {
    const columns = row.children;
    //    const rank = columns[0].textContent!.trim();
    const name = columns[1].textContent!.trim();
    Rankings.push(name);
  });
  // remove header row from data
  Rankings.shift();
  // Only return 15 of 'em though, because '
  return Rankings.slice(0, 15);
};
