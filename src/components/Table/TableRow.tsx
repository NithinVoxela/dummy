import { TableCell as MuiTableCell, TableRow as MuiTableRow } from "@material-ui/core";
import * as React from "react";
import { useCallback } from "react";

import { CellType, ITableColumn, ITableRow } from "./Table";

interface ITableRowProps {
  rowData?: ITableRow;
  tableColumns?: ITableColumn[];
}

const TableRowComponent: React.FC<ITableRowProps> = ({ rowData = {} as ITableRow, tableColumns, children }) => {
  const { id, data: row } = rowData;

  const getCell = useCallback((cell: CellType): string | JSX.Element => {
    // @ts-ignore
    return cell?.component ?? cell;
  }, []);

  return (
    <MuiTableRow hover tabIndex={-1} key={id} data-rowkey={id}>
      {row &&
        Object.entries(row).map(([columnName, cell], index) => {
          return (
            <MuiTableCell
              id={`${columnName}_${id}`}
              key={`${columnName}_${id}`}
              align={tableColumns?.[index]?.align ? tableColumns?.[index]?.align : "right"}
            >
              {getCell(cell)}
            </MuiTableCell>
          );
        })}
      {children}
    </MuiTableRow>
  );
};

export const TableRow = React.memo(TableRowComponent);
