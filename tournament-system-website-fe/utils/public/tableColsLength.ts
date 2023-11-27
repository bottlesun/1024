/*
 * @prams cols : ( ex : obj.cols)
 * @prams type : any
 * @description : get table cols length
 * */
export const tableColsLength = (cols: any) => {
  if (!cols) return 0;

  let totalCols = 0;
  for (let i = 0; i < cols.length; i++) {
    let header = cols[i];
    let colSpan = header.colSpan;
    totalCols += colSpan;
  }

  return totalCols;
}