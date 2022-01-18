import {
  Typography,
  Grid,
  Breadcrumbs,
  Card,
  CardHeader,
  Divider,
  Box,
  IconButton,
  Button,
  Tooltip
} from "@material-ui/core";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from "@material-ui/icons";
import AppsOutlinedIcon from "@material-ui/icons/AppsOutlined";
import LaunchOutlinedIcon from "@material-ui/icons/LaunchOutlined";
import SearchBar from "material-ui-search-bar";
import * as React from "react";
import { useCallback, useEffect, useState, useRef } from "react";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { Table } from "components/Table/Table";
import { ICameraDataModel } from "models/cameraData.model";
import { IFilterParams } from "services/camera/camera.service";
import { translationService } from "services/translation/translation.service";
import { formatDateInWords } from "src/helpers/dateTime";
import * as actions from "store/camera/camera.actions";
import { getCamerasList, getCamerasTotalCount } from "store/camera/camera.selector";
import * as filterActions from "store/camera/cameraFilters/cameraFilters.actions";
import { getCameraFilters } from "store/camera/cameraFilters/cameraFilters.selector";
import { IApplicationState } from "store/state.model";

import { styles } from "./styles";

interface IDispatchToProps {
  getCamerasLoadingRequest: typeof actions.getCamerasLoadingRequest;
  deleteCameraRequest: typeof actions.deleteCameraRequest;
  resetCameraList: typeof actions.resetCameraList;
  updateCameraFilters: typeof filterActions.updateCameraFilters;
  cleanCameraFilters: typeof filterActions.cleanCameraFilters;
}

interface IStateToProps {
  filters: IFilterParams;
  cameras: ICameraDataModel[];
  totalCount: number;
}

interface IProps extends IStateToProps, IDispatchToProps, WithStyles<typeof styles> {}

type UseEffectParams = Parameters<typeof useEffect>;
type DependencyList = UseEffectParams[1];
const usePrevious = (value: DependencyList) => {
  const ref = useRef<DependencyList>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};


const CamerasComponent: React.FC<IProps> = ({
  totalCount,
  getCamerasLoadingRequest,
  cleanCameraFilters,
  updateCameraFilters,
  deleteCameraRequest,
  resetCameraList,
  cameras,
  filters,
  classes
}) => {
  const history = useHistory();
  const [searched, setSearched] = useState("");
  const prevSearched = usePrevious(searched);
  const [isLoading, setIsLoading] = useState(false);

  const tableColumns = [
    {
      id: "name",
      numeric: false,
      disablePadding: false,
      disableSort: true,
      label: translationService.getMessageTranslation("camera-name-label", "Name"),
      align: "left"
    },
    {
      id: "cameraStatus",
      numeric: false,
      disablePadding: false,
      disableSort: true,
      label: translationService.getMessageTranslation("camera-status-label", "Status"),
      align: "left"
    },
    {
      id: "cameraType",
      numeric: false,
      disablePadding: false,
      disableSort: true,
      label: translationService.getMessageTranslation("camera-type-label", "Type"),
      align: "left"
    },
    // {
    //   id: "description",
    //   numeric: false,
    //   disablePadding: false,
    //   disableSort: true,
    //   label: translationService.getMessageTranslation("camera-desc-label", "Description"),
    //   align: "left"
    // },
    {
      id: "installationDate",
      numeric: false,
      disablePadding: false,
      disableSort: true,
      label: translationService.getMessageTranslation("camera-installation-label", "Installation Date"),
      align: "left"
    },
    {
      id: "actions",
      label: translationService.getMessageTranslation("camera-action-label", "Actions"),
      numeric: true,
      disablePadding: false,
      disableSort: true,
      align: "center"
    }
  ];

  useEffect(() => {
    setIsLoading(true);
    getCamerasLoadingRequest(filters, { withDebounce: filters.keywords !== prevSearched });
  }, [getCamerasLoadingRequest, filters, cleanCameraFilters, prevSearched]);

  useEffect(() => {
    return () => {
      cleanCameraFilters();
      resetCameraList();
    };
  }, [cleanCameraFilters, resetCameraList]);

  useEffect(() => {
    setIsLoading(false);
  }, [cameras, setIsLoading]);

  const handleEditClick = (id: string) => () => {
    history.push(`/camera/${id}`);
  };

  const handleAppsClick = (id: string) => () => {
    history.push(`/camera/${id}/apps`);
  };

  const handleDeleteClick = (publicId: string, name: string) => () => {
    deleteCameraRequest({ publicId, name });
  };

  const openStreamUrl = (streamUrl: string) => {
    window.open(streamUrl, "_blank");
  };

  const getRows = () => {
    return cameras.map((row: any) => {
      const {
        publicId,
        name,
        cameraType,
        description,
        model,
        cameraStatus,
        location,
        installationDate,
        streamUrl
      } = row;
      return {
        id: publicId,
        data: {
          name,
          cameraStatus: (
            <>
              {streamUrl?.trim()?.length > 0 && cameraStatus === "Online" ? (
                <Button
                  color="primary"
                  size="small"
                  className={classes.linkBtn}
                  onClick={() => openStreamUrl(streamUrl)}
                >
                  {translationService.getMessageTranslation("camera-online-label", "Online")}
                  <LaunchOutlinedIcon
                    color="primary"
                    fontSize="small"
                    style={{ fontSize: 14, marginLeft: 2, marginTop: 2 }}
                  />
                </Button>
              ) : (
                <>{translationService.getMessageTranslation("camera-offline-label", "Offline")}</>
              )}
            </>
          ),
          cameraType,
          // description,
          installationDate: formatDateInWords(installationDate),
          actions: (
            <Box mr={2}>
              <Tooltip title={translationService.getMessageTranslation("camera-edit-label", "Edit")}>
                <IconButton aria-label="edit" onClick={handleEditClick(publicId)} size="small">
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title={translationService.getMessageTranslation("camera-delete-label", "Delete")}>
                <IconButton aria-label="delete" onClick={handleDeleteClick(publicId, name)} size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title={translationService.getMessageTranslation("camera-apps-header-label", "Camera Apps")}>
                <IconButton aria-label="apps" onClick={handleAppsClick(publicId)} size="small">
                  <AppsOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          )
        }
      };
    });
  };

  const handlePageChange = useCallback(
    (pageNumber: number) => {
      updateCameraFilters({ pageNumber });
    },
    [updateCameraFilters]
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>) => {
      updateCameraFilters({ pageSize: event.target.value });
    },
    [updateCameraFilters]
  );

  const handleSearch = useCallback(
    (keywords: string) => {
      setSearched(keywords);
      updateCameraFilters({ keywords, pageNumber: 0, pageSize: 5 });
    },
    [setSearched, updateCameraFilters]
  );

  const handleCancelSearch = useCallback(() => {
    setSearched("");
    updateCameraFilters({ keywords: "", pageNumber: 0, pageSize: 5 });
  }, [setSearched, updateCameraFilters]);

  const handleAddCamera = useCallback(() => {
    history.push("/addCamera");
  }, [history]);

  return (
    <>
      <Helmet title="Cameras" />
      <Grid justify="space-between" container spacing={10}>
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            {translationService.getMessageTranslation("alert-cameras-label", "Cameras")}
          </Typography>
        </Grid>
        <Grid item>
          <div>
            <Button variant="contained" color="primary" onClick={handleAddCamera}>
              <AddIcon />
              {translationService.getMessageTranslation("alert-new-camera-label", "New Camera")}
            </Button>
          </div>
        </Grid>
      </Grid>

      <Divider className={classes.divider} />

      <Box className={classes.filterContainer} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={translationService.getMessageTranslation("alert-camera-list-label", "Camera List")}
              style={{ paddingBottom: 4 }}
            />
            <Box style={{ padding: "8px 16px" }}>
              <SearchBar
                className={classes.searchContainer}
                value={searched}
                onChange={handleSearch}
                onCancelSearch={handleCancelSearch}
                placeholder={translationService.getMessageTranslation("alert-search-txt-label", "Search by Name...")}
                classes={{ searchIconButton: classes.searchIcon, iconButton: classes.searchIcon }}
              />
            </Box>
            <Table
              rows={getRows()}
              tableColumns={tableColumns}
              pageNumber={filters.pageNumber}
              pageSize={filters.pageSize}
              onPageChange={handlePageChange}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              totalCount={totalCount}
              isLoading={isLoading}
            />
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

const mapDispatchToProps = {
  getCamerasLoadingRequest: actions.getCamerasLoadingRequest,
  deleteCameraRequest: actions.deleteCameraRequest,
  resetCameraList: actions.resetCameraList,
  updateCameraFilters: filterActions.updateCameraFilters,
  cleanCameraFilters: filterActions.cleanCameraFilters
};

const mapStateToProps = (state: IApplicationState) => ({
  filters: getCameraFilters(state),
  cameras: getCamerasList(state),
  totalCount: getCamerasTotalCount(state)
});

export const Cameras = withStyles(styles)(
  connect<IStateToProps>(mapStateToProps, mapDispatchToProps)(CamerasComponent)
);
