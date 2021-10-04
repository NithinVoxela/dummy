import {
  Breadcrumbs,
  Card,
  CardContent,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from "@material-ui/core";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import SearchBar from "material-ui-search-bar";
import * as React from "react";
import { connect } from "react-redux";

import { DateTimeRangeInput } from "components/DateTimeRangeInput";
import { VirtualizedMasonry } from "components/Masonry/VirtualizedMasonry";
import { IAlertDataModel } from "models/alertData.model";
import { IAlertFilterParams } from "services/alert/alert.service";
import { translationService } from "services/translation/translation.service";
import { formatDateInWords } from "src/helpers/dateTime";
import { isImageURL } from "src/helpers/fileType";
import * as actions from "store/alert/alert.actions";
import { getAlertLogTotalCount, getAlerts } from "store/alert/alert.selector";
import * as filterActions from "store/alert/alertLogFilters/alertLogFilters.actions";
import { getAlertLogFilter } from "store/alert/alertLogFilters/alertLogFilters.selector";
import { IApplicationState } from "store/state.model";

import { styles } from "./styles";

const SEVERITY = ["HIGH", "MEDIUM", "LOW"];

interface IDispatchToProps {
  getAlertLogLoadingRequest: typeof actions.getAlertLogLoadingRequest;
  getAlertLogNextPageRequest: typeof actions.getAlertLogNextPageRequest;
  cleanAlertLogs: typeof actions.cleanAlertLogs;
  updateFilterParams: typeof filterActions.updateAlertLogFilter;
  cleanFilterParams: typeof filterActions.cleanAlertLogFilter;
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
      severity: null
    };
  }

  public componentDidMount() {
    const { getAlertLogLoadingRequest, filters } = this.props;
    getAlertLogLoadingRequest(filters, { withDebounce: false });
  }

  public componentDidUpdate(prevProps: IProps) {
    const { getAlertLogNextPageRequest, getAlertLogLoadingRequest, filters } = this.props;
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
  }

  public componentWillUnmount() {
    const { cleanFilterParams, cleanAlertLogs } = this.props;
    cleanFilterParams();
    cleanAlertLogs();
  }

  public getList() {
    const { alerts } = this.props;
    return alerts.map((alert: IAlertDataModel) => {
      const { id, mediaUrl, alertTime, severity, cameraName, cameraLocation, fileName } = alert;
      return {
        id,
        media: mediaUrl,
        cameraName,
        location: cameraLocation,
        type: isImageURL(fileName) ? "image" : "video",
        alertTime: formatDateInWords(alertTime),
        severity
      };
    });
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
    const list = this.getList();
    const { location, severity } = this.state;
    return (
      <>
        <Grid justify="space-between" container spacing={10}>
          <Grid item>
            <Typography variant="h3" gutterBottom display="inline">
              Alerts
            </Typography>

            <Breadcrumbs>
              <Typography>Alert List</Typography>
            </Breadcrumbs>
          </Grid>
        </Grid>

        <Divider className={classes.divider} />
        <Card className={classes.filterContainer}>
          <CardContent>
            <div className={classes.topbarContainer}>
              <div>
                <SearchBar
                  className={classes.searchContainer}
                  value={location}
                  onChange={this.handleSearch}
                  onCancelSearch={this.handleCancelSearch}
                />
              </div>
              <div>
                <DateTimeRangeInput
                  onDateTimeFilterChange={this.handleDateTimeChange}
                  dateTimeDisplayValue={dateTimeDisplayValue}
                  initialFromDateTime={startDate || new Date()}
                  initialToDateTime={endDate || new Date()}
                  disableFutureDates
                  disableEarlierDates
                  minWidth="lg"
                />
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <InputLabel className={classes.label}>Severity</InputLabel>
                  <Select value={severity} onChange={this.handleSeverityChange}>
                    {SEVERITY.map(s => (
                      <MenuItem value={s} key={s}>
                        {s}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
          </CardContent>
        </Card>

        <Grid container spacing={6}>
          <Grid item xs={12}>
            {list?.length ? (
              <VirtualizedMasonry
                list={this.getList()}
                limit={pageSize}
                totalCount={totalCount}
                offset={pageSize * pageNumber + 1}
                nextPageCallback={this.onGetNextPage}
              />
            ) : (
              <Typography className={classes.noResults}>
                {translationService.getMessageTranslation("global-no-results-label", "No results")}
              </Typography>
            )}
          </Grid>
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
  cleanFilterParams: filterActions.cleanAlertLogFilter
};

const mapStateToProps = (state: IApplicationState) => ({
  filters: getAlertLogFilter(state),
  alerts: getAlerts(state),
  totalCount: getAlertLogTotalCount(state)
});

export const Alerts = withStyles(styles)(
  connect<IStateToProps, IDispatchToProps>(mapStateToProps, mapDispatchToProps)(AlertsComponent)
);
