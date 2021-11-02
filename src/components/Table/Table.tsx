import {
  Box,
  Paper,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow as MuiTableRow,
  TableSortLabel
} from "@material-ui/core";
import * as React from "react";

import { LoadingBar } from "containers/Loading";
import { translationService } from "services/translation/translation.service";

import { TableRow } from "./TableRow";

export type CellType = string | number | React.ReactNode | { component: JSX.Element; sortValue?: unknown };
type AlignmentOption = "left" | "right" | "center" | "inherit";

export interface ITableColumn {
  id: string;
  align?: AlignmentOption;
  label?: string | JSX.Element;
  // actionButton?: JSX.Element;
  disableSort?: boolean;
}
export interface IRowData {
  [field: string]: CellType;
}

export interface ITableRow {
  id: string;
  data: IRowData;
}

interface IProps {
  orderBy?: string;
  order?: OrderKeys.asc | OrderKeys.desc;
  onSort?: (orderBy: string, order: OrderKeys) => void;
  onPageChange?: (page: number) => void;
  onChangeRowsPerPage?: (event: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>) => void;
  pageSize?: number;
  rows: any;
  pageNumber: number;
  tableColumns: any;
  totalCount: number;
  isLoading: boolean;
}

export enum OrderKeys {
  asc = "asc",
  desc = "desc"
}

interface IState {
  order: OrderKeys.asc | OrderKeys.desc;
  orderBy: string;
  pageSize: number;
  pageNumber?: number;
}

class TableComponent extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {
      order: props.order ? props.order : OrderKeys.asc,
      orderBy: props.orderBy,
      pageNumber: props.pageNumber,
      pageSize: props.pageSize
    };
  }

  public handleRequestSort = (property: string) => (_e: React.MouseEvent<HTMLElement>) => {
    const { onSort } = this.props;
    let updatedOrder = OrderKeys.desc;
    const { orderBy, order } = this.state;
    if (orderBy === property && order === OrderKeys.desc) {
      updatedOrder = OrderKeys.asc;
    }
    this.setState({ order: updatedOrder, orderBy: property }, () => {
      if (onSort) {
        onSort(property, updatedOrder);
      }
    });
  };

  public handleChangePage = (_e: React.MouseEvent<HTMLElement>, newPage: number) => {
    const { onPageChange } = this.props;
    this.setState({ pageNumber: newPage }, () => {
      if (onPageChange) {
        onPageChange(newPage);
      }
    });
  };

  public handleChangeRowsPerPage = (event: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>) => {
    const { onChangeRowsPerPage } = this.props;
    this.setState({ pageSize: parseInt(event.target.value, 10) }, () => {
      if (onChangeRowsPerPage) {
        onChangeRowsPerPage(event);
      }
    });
  };

  public emptyRows = () => {
    const { pageSize, pageNumber } = this.state;
    const { rows } = this.props;
    return pageSize - Math.min(pageSize, rows.length - pageNumber * pageSize);
  };

  public render() {
    const { pageNumber, pageSize, order, orderBy } = this.state;
    const { rows, tableColumns, totalCount, isLoading = false } = this.props;
    return (
      <Paper elevation={0} style={{ borderRadius: 0, borderTop: "1px solid #e0e0e0" }}>
        <Box style={{ minHeight: 400 }}>
          <MuiTable size="medium">
            <TableHead>
              <MuiTableRow>
                {tableColumns.map((tableColumn: any) => (
                  <TableCell
                    key={tableColumn.id}
                    align={tableColumn.align ?? "left"}
                    padding={tableColumn.disablePadding ? "none" : "default"}
                    sortDirection={orderBy === tableColumn.id ? order : false}
                  >
                    {tableColumn.disableSort ? (
                      tableColumn.label
                    ) : (
                      <TableSortLabel
                        active={orderBy === tableColumn.id}
                        direction={orderBy === tableColumn.id ? order : "asc"}
                        onClick={this.handleRequestSort(tableColumn.id)}
                      >
                        {tableColumn.label}
                      </TableSortLabel>
                    )}
                  </TableCell>
                ))}
              </MuiTableRow>
            </TableHead>
            <TableBody>
              { isLoading && 
                <TableRow>
                  <TableCell padding="default" align="center" colSpan={tableColumns.length}>
                    <LoadingBar />
                  </TableCell>
                </TableRow>
              }
              {rows.map((rowData: ITableRow) => {
                const { id } = rowData;
                return <TableRow rowData={rowData} key={`table-row-${id}`} tableColumns={tableColumns} />;
              })}
              {rows?.length === 0 && (
                <TableRow>
                  <TableCell padding="default" align="center" colSpan={tableColumns.length}>
                    {translationService.getMessageTranslation("no-records-available-label", "No results found")}
                  </TableCell>
                </TableRow>
              )}              
            </TableBody>
          </MuiTable>
        </Box>
        <TablePagination
          style={{ borderTop: "1px solid #e0e0e0" }}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalCount}
          rowsPerPage={pageSize}
          page={pageNumber}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

export const Table = TableComponent;
