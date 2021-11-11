import {
  Breadcrumbs,
  Box,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography
} from "@material-ui/core";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";
import classNames from "classnames";
import SearchBar from "material-ui-search-bar";
import * as React from "react";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { DateTimeRangeInput } from "components/DateTimeRangeInput";
import { VirtualizedMasonry } from "components/Masonry/VirtualizedMasonry";
import { LoadingBar } from "containers/Loading";
import { IAlertDataModel } from "models/alertData.model";
import { IAlertFilterParams } from "services/alert/alert.service";
import { translationService } from "services/translation/translation.service";
import { SEVERITY } from "src/Constants";
import { formatDateInWords } from "src/helpers/dateTime";
import { isImageURL } from "src/helpers/fileType";
import * as actions from "store/alert/alert.actions";
import { getAlertLogTotalCount, getAlerts } from "store/alert/alert.selector";
import * as filterActions from "store/alert/alertLogFilters/alertLogFilters.actions";
import { getAlertLogFilter } from "store/alert/alertLogFilters/alertLogFilters.selector";
import { IApplicationState } from "store/state.model";

import { styles } from "./styles";

interface IDispatchToProps {
  getAlertLogLoadingRequest: typeof actions.getAlertLogLoadingRequest;
  getAlertLogNextPageRequest: typeof actions.getAlertLogNextPageRequest;
  cleanAlertLogs: typeof actions.cleanAlertLogs;
  updateFilterParams: typeof filterActions.updateAlertLogFilter;
  cleanFilterParams: typeof filterActions.cleanAlertLogFilter;
  markAsReadRequest: typeof actions.markAsRead;
}

interface IStateToProps {
  filters: IAlertFilterParams;
  alerts: IAlertDataModel[];
  totalCount: number;
}

interface IState {
  location: string;
  severity: string;
}

interface IProps extends IStateToProps, IDispatchToProps, WithStyles<typeof styles> {}

class AlertsComponent extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {
      location: "",
      severity: null,
      list: []
    };
  }

  public componentDidMount() {
    const { getAlertLogLoadingRequest, filters } = this.props;
    getAlertLogLoadingRequest(filters, { withDebounce: false });
  }

  public componentDidUpdate(prevProps: IProps) {
    const { getAlertLogNextPageRequest, getAlertLogLoadingRequest, filters, alerts } = this.props;
    const { location, pageNumber } = filters;

    const { filters: prevFilters } = prevProps;
    const { location: prevLocation, pageNumber: prevPageNumber } = prevFilters;

    if (prevProps.filters !== filters) {
      if (pageNumber > 0 && pageNumber !== prevPageNumber) {
        getAlertLogNextPageRequest(filters);
      } else if (filters !== prevFilters) {
        const options = { withDebounce: false };

        if (location !== prevLocation) {
          options.withDebounce = true;
        }

        getAlertLogLoadingRequest(filters, options);
      }
    }
    if(prevProps.alerts != alerts) {
      this.setList();
    }    
  }

  public componentWillUnmount() {
    const { cleanFilterParams, cleanAlertLogs } = this.props;
    cleanFilterParams();
    cleanAlertLogs();
  }

  public setList() {
    const { alerts } = this.props;

    const alertData = alerts.map((alert: IAlertDataModel) => {
      const { id, mediaUrl, alertTime, severity, cameraName, cameraLocation, fileName, hasRead } = alert;
      return {
        id,
        media: mediaUrl,
        cameraName,
        location: cameraLocation,
        type: isImageURL(fileName) ? "image" : "video",
        alertTime: formatDateInWords(alertTime),
        severity,
        hasRead
      };
    });

    this.setState({ list: alertData });
  }

  public onGetNextPage = () => {
    const {
      updateFilterParams,
      filters: { pageNumber, pageSize },
      totalCount
    } = this.props;
    const maxPageNumber = totalCount / pageSize;
    const nextPage = pageNumber + 1;
    if (nextPage < maxPageNumber) {
      updateFilterParams({ pageNumber: nextPage });
    }
  };

  public handleSearch = (location: string) => {
    const { updateFilterParams } = this.props;
    this.setState({ location }, () => {
      updateFilterParams({ location, pageNumber: 0, pageSize: 20 });
    });
  };

  public handleCancelSearch = () => {
    const { updateFilterParams } = this.props;
    this.setState({ location: "" }, () => {
      updateFilterParams({ location: "", pageNumber: 0, pageSize: 20 });
    });
  };

  public handleDateTimeChange = (datePickerModel: any) => {
    const { updateFilterParams } = this.props;
    const { fromDateTime, toDateTime, dateTimeDisplayValue } = datePickerModel;
    updateFilterParams({
      dateRange: {
        startDate: fromDateTime,
        endDate: toDateTime
      },
      dateTimeDisplayValue,
      pageNumber: 0,
      pageSize: 20
    });
  };

  public handleSeverityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const filteredValue = event.target.value;
    const { updateFilterParams } = this.props;
    this.setState({ severity: filteredValue }, () => {
      updateFilterParams({ severity: filteredValue, pageNumber: 0, pageSize: 20 });
    });
  };

  public handleClearSeverity = () => {
    const { updateFilterParams } = this.props;
    this.setState({ severity: null }, () => {
      updateFilterParams({ severity: null, pageNumber: 0, pageSize: 20 });
    });
  };

  public viewDetails = (id: any) => {
    this.props.history.push(`/alerts/${id}`);
  };

  public markAsRead = (id: any) => {
    const { markAsReadRequest } = this.props;
    this.setState({ list: [] });
    markAsReadRequest({ id }); 
  };

  public render() {
    const {
      classes,
      filters: {
        pageSize,
        pageNumber,
        dateTimeDisplayValue,
        dateRange: { startDate, endDate }
      },
      totalCount
    } = this.props;
    const { location, severity, list } = this.state;
    return (
      <>
        <Helmet title="Alerts" />
        <Grid justify="space-between" container spacing={10}>
          <Grid item>
            <Typography variant="h3" gutterBottom display="inline">
              Alerts
            </Typography>
          </Grid>
        </Grid>

        <Divider className={classes.divider} />
        <Box className={classes.filterContainer}>
          <Box className={classes.filterContent}>
            <div className={classes.topbarContainer}>
              <SearchBar
                className={classes.searchContainer}
                value={location}
                onChange={this.handleSearch}
                onCancelSearch={this.handleCancelSearch}
                placeholder="Search by location..."
                classes={{ searchIconButton: classes.searchIcon, iconButton: classes.searchIcon }}
              />
              <Box style={{ marginLeft : 24 }}>
                <DateTimeRangeInput
                  onDateTimeFilterChange={this.handleDateTimeChange}
                  dateTimeDisplayValue={dateTimeDisplayValue}
                  initialFromDateTime={startDate || new Date()}
                  initialToDateTime={endDate || new Date()}
                  disableFutureDates
                  disableEarlierDates
                  minWidth="lg"
                />
              </Box>
              <Box style={{ marginLeft : 24 }}>
                <TextField
                  select
                  value={severity}
                  onChange={this.handleSeverityChange}
                  variant="filled"
                  className={classes.formControl}
                  InputProps={{
                    endAdornment: (
                      <>
                        {severity && (
                          <IconButton
                            className={classes.searchIcon}
                            onClick={this.handleClearSeverity}
                            style={{ margin: "-0.5em" }}
                            size="small"
                            component="span"
                          >
                            <Close className={classes.icon} fontSize="small" />
                          </IconButton>
                        )}
                      </>
                    ),
                    classes: { root: classes.inputRoot, focused: classes.focused },
                    disableUnderline: true
                  }}
                  InputLabelProps={{
                    className: classNames(classes.severityLabel),
                    filled: true,
                    shrink: true
                  }}
                  label="Severity"
                >
                  {SEVERITY.map(option => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </div>
          </Box>
        </Box>

        <Grid container spacing={6}>
          <Grid item xs={12}>
            {list?.length ? (
              <VirtualizedMasonry
                list={list}
                limit={pageSize}
                totalCount={totalCount}
                offset={pageSize * pageNumber + 1}
                nextPageCallback={this.onGetNextPage}
                viewDetails={this.viewDetails}
                markAsRead={this.markAsRead.bind(this)}
              />
            ) : (
              <Typography className={classes.noResults}>
                {translationService.getMessageTranslation("global-no-results-label", "No results")}
              </Typography>
            )}
          </Grid>
          <LoadingBar />
        </Grid>
      </>
    );
  }
}

const mapDispatchToProps = {
  getAlertLogLoadingRequest: actions.getAlertLogLoadingRequest,
  getAlertLogNextPageRequest: actions.getAlertLogNextPageRequest,
  cleanAlertLogs: actions.cleanAlertLogs,
  updateFilterParams: filterActions.updateAlertLogFilter,
  cleanFilterParams: filterActions.cleanAlertLogFilter,
  markAsReadRequest: actions.markAsRead
};

const mapStateToProps = (state: IApplicationState) => ({
  filters: getAlertLogFilter(state),
  alerts: getAlerts(state),
  totalCount: getAlertLogTotalCount(state)
});

export const Alerts = withStyles(styles)(
  connect<IStateToProps, IDispatchToProps>(mapStateToProps, mapDispatchToProps)(withRouter(AlertsComponent))
);
