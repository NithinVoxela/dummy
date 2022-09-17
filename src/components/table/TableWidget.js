import { useEffect, useState } from 'react';
import { Oval } from  'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import {
  Box,
  Checkbox, 
  Divider,
  IconButton, 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableSortLabel,
  TableRow,
  Tooltip,  
  Typography
} from '@mui/material';
import { fDateTimeTZSuffix } from '../../utils/formatTime';
import Scrollbar from '../Scrollbar';
import useLocales from '../../hooks/useLocales';





const TableWidget = (props) => {
  const { tableData, tableMetaData, onMultiSelect, callback, params, refreshTable = false, isLoading = false, defaultSelected = [],
    isMultiSelectDisabled = false } = props;  
  const history = useNavigate();
  const { translate } = useLocales();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(tableMetaData.pageSize || 10);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeRecord, setActiveRecord] = useState(null);

  const [sortColumn, setSortColumn] = useState(null);
  const [order, setOrder] = useState('asc');

  const handleSort = (col) => {
    setOrder((prevOrder) => {
      if (prevOrder === 'desc' && col.dataKey === sortColumn) {
        return 'asc';
      }

      return 'desc';
    });
    setSortColumn(col.dataKey);
  };

  const buildParams = () => {
    const queryParams = {...params};

    if(!queryParams.searchApplied) {
      if (sortColumn) {
        queryParams.sortAscending = order === 'asc';
      } else {
        queryParams.sortAscending = false;
      }

      if (limit) {
        queryParams.pageSize = limit;
      }

      if (page) {
        queryParams.pageNumber = page;
      }
    } 
    return queryParams;
  };


  useEffect(() => {
    if (defaultSelected.length > 0) {
      setSelectedRecords(defaultSelected);
    }
  }, [defaultSelected]);  

 
  useEffect(() => {    
    if (callback) {
      if (params.searchApplied && page > 0) {
        setPage(0);
      } else {
        const queryParams = buildParams();
        callback(queryParams);   
        params.searchApplied = false; 
      }
    }
  }, [params, sortColumn, order, limit, page]);

  useEffect(() => {
    if (callback && refreshTable) {
      const queryParams = buildParams();
      callback(queryParams);
    }
    if (refreshTable) {
      setSelectedRecords([]);
    }    
  }, [refreshTable]);


  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
  };

  const paginatedData = tableData.data || tableData;

  const getCellData = (col, cellData, value) => {
    switch (col.type) {
      case 'date':        
        if(!value || value === 0) {
          return '';
        } 
        
        if (typeof value === 'number') {
          const secondValue = value.toString().length === 13 ? value : value * 1000;
          const dataDate = new Date(secondValue);          
          value = dataDate;
        }
        return fDateTimeTZSuffix(value);      
      case 'widget':
        return col.renderWidget && col.renderWidget(col, cellData, value, translate);
      case 'action':
        return renderActions(col.actions, cellData);   
      default:
        return value;
    }
  };

  const renderActions = (actions, cellData) => actions.map((action) => createAction(action, cellData));
  const createAction = (action, cellData) => {
    if (action?.hideCondition && action.hideCondition(cellData)) {
      return null;
    }
    return (
      <Tooltip title={action.tooltip} key={`${action.type}-${cellData[tableMetaData.idProperty || 'id']}`}>     
        <IconButton onClick={() => handleActionClick(action, cellData)} size="small" >
          {action.icon}
        </IconButton>      
      </Tooltip>    
    )
  };

  const handleActionClick = (action, cellData) => {
    if (action.type === 'navigation') {
      const compiled = _.template(action.path);
      const url = compiled({'id': cellData[tableMetaData.idProperty || 'id']});     
      history(url);
    } else if (action.type === 'delete') {
      setActiveRecord(cellData);
      setIsOpen(true);
    } else if (action.onClick) {
      action.onClick(action, cellData);
    }
  };

  const handleSelectAllRecords = (event) => {
    const records = event.target.checked ? tableData?.data : [];
    setSelectedRecords(records);
    onMultiSelect(records);
  };

  const handleSelectOneEntry = (event, dataId) => {
    const idProperty = tableMetaData.idProperty || 'id';
    const index = _.findIndex(selectedRecords, (item) => item[idProperty] === dataId[idProperty]);
    let list = _.cloneDeep(selectedRecords);
    if (index === -1) {
      list.push(dataId);      
    } else {
      list = list.filter((item) => item[idProperty] !== dataId[idProperty]);      
    }
    setSelectedRecords(list);
    onMultiSelect(list);
  };

  const showEmptyMessage = () => {
    if (params && params.query && paginatedData.length === 0
      || (paginatedData && paginatedData.length === 0)) {
        return true;
    }
    return false;
  };

  const getBoxStyle = (metaData) => {
    const style = { minHeight: 300, maxHeight: '100%' };
    if (metaData.height) {
      style.height = metaData.height;
    }

    return style;
  };

  const selectedSomeEntries = selectedRecords?.length > 0
  && selectedRecords?.length < tableData?.length;
  const selectedAllEntries = selectedRecords?.length > 0 && selectedRecords?.length === (tableData?.data?.length);

  const getColStyle = (col, isHeader=false) => {
    const style = {
      width: col.width || 'auto'
    };
    if (col.fixed) {
      style.position = 'sticky';
      style.left = 0;
      style.background = '#fff';
      style.zIndex = isHeader? 100 : 99;
    }
    return style;
  }

  const renderCell = (col, cellData, index) => (
    <TableCell key={`${index}-${col.dataKey}-${cellData.id || cellData[tableMetaData.idProperty]}`}
      align={col.align || 'left'}
      size={tableMetaData.size || 'medium'}
      style={getColStyle(col)}
    >
      {getCellData(col, cellData, cellData[col.dataKey])}
    </TableCell> 
  );

  const renderHeaderCell = (col, index) => {
    if (!col.sortable) {
      return (       
        <TableCell key={`header-${index}-${col.dataKey}`} align={col.align || 'left'} 
          size={tableMetaData.size || 'medium'} style={getColStyle(col, true)}>
          {translate(col.text)}
        </TableCell>        
      );
    } 
      return (
        <TableCell
          key={`header-${index}-${col.dataKey}`}
          align={col.align || 'left'}
          size={tableMetaData.size || 'medium'} 
          sortDirection={sortColumn === col.text ? order : false}                 
        >
          <TableSortLabel
            active={sortColumn === col.dataKey}
            direction={sortColumn === col.dataKey? order : 'desc'}
            onClick={() => handleSort(col)}
          >
            {col.text}
          </TableSortLabel>
        </TableCell>
      );
    
  };

  const renderPageRange = ({from, to, count}) => {
    return `${from}-${to} ${translate("app.label-of")} ${count}`;
  }

  return (    
    <>
      <Scrollbar>
        <Box sx={getBoxStyle(tableMetaData)}>
          <Table stickyHeader style={tableMetaData.style}>
            <TableHead>
              <TableRow>
                {tableMetaData.multiSelect ? 
                  <TableCell padding='checkbox'>
                      <Checkbox
                        checked={selectedAllEntries}
                        color='primary'
                        indeterminate={selectedSomeEntries}
                        onChange={handleSelectAllRecords}
                        disabled={isMultiSelectDisabled}
                      />                
                  </TableCell>
                  : null
                }
                { tableMetaData.columns.map(renderHeaderCell) }                
              </TableRow>
            </TableHead>
            <TableBody>
              { !isLoading && showEmptyMessage() &&
                <TableRow>
                  <TableCell
                    align='center'
                    colSpan={tableMetaData.colSpan || tableMetaData.columns.length}
                    sx={{ height: 240, border: 'none'}}
                  >
                    <Typography color="textSecondary" variant="subtitle2">
                      { tableMetaData.emptyMessageText || translate('app.table-empty-placeholder') }
                    </Typography>
                  </TableCell>
                </TableRow>
              }
              { !isLoading && paginatedData?.map((data) => {    
                const idProperty = tableMetaData.idProperty || 'id';
                const rec = data[idProperty];             
                const index = _.findIndex(selectedRecords, (item) => item[idProperty] === rec);
                const isSelected = index > -1;
                return (                  
                  <TableRow
                    hover
                    key={tableMetaData.idProperty ? data[tableMetaData.idProperty] : data.id}                    
                  >
                    {tableMetaData.multiSelect ? 
                      <TableCell padding='checkbox'>
                        <Checkbox
                          checked={isSelected}
                          color='primary'
                          onChange={(event) => handleSelectOneEntry(event, data)}
                          value={isSelected}
                          disabled={isMultiSelectDisabled}
                        />
                      </TableCell>
                      : null
                    }
                    { tableMetaData.columns.map((col, index) => renderCell(col, data, index))}                      
                  </TableRow>
                );
              })}

              { isLoading && 
                <TableRow>
                  <TableCell
                    align='center'
                    colSpan={tableMetaData.colSpan || tableMetaData.columns.length}
                    sx={{ height: 240, border: 'none'}}
                  >                        
                    <Oval color="#626262" secondaryColor="#e7e4e4" wrapperStyle={{ justifyContent: 'center'}} height={36} width={36}/>                    
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      { !tableMetaData.hidePagination ?
        <>
          <Divider />
          <TablePagination
            component='div'
            count={tableData.total || tableData.length || 0}
            labelRowsPerPage={translate("app.labelRowsPerPage")}
            labelDisplayedRows={renderPageRange}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25, 50]}
          />
        </>
        : null
      }     
    </>
  );
};


TableWidget.defaultProps = {
  onMultiSelect: () => {},
  callback: () => {},
  params: {}
};

export default TableWidget;