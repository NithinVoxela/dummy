import { useCallback, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { Oval } from 'react-loader-spinner';
import { useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';
// @mui
import { Box, Stack, Typography } from '@mui/material';

import moment from 'moment-timezone';

// routes
import { useForm } from 'react-hook-form';
// hooks
import { FormProvider } from '../../components/hook-form';
import useLocales from '../../hooks/useLocales';

// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getAlerts, getUnreadAlertCount, markAllAsRead, resetAlertList } from '../../redux/slices/alerts';
import { getCameras } from '../../redux/slices/cameras';

// sections
import { AlertFilterSidebar, AlertSort, AlertTagFiltered, MasonaryGrid } from '../../sections/alerts';

const AlertList = forwardRef(({ currentTab, alertSessionFilter }, ref) => {
  const dispatch = useDispatch();
  const { translate, langStorage } = useLocales();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const [clearData, setClearData] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [isAscending, setIsAscending] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [params, setParams] = useState({});
  const { alertDataList, isLoading } = useSelector((state) => state.alerts);
  const { cameraDataList } = useSelector((state) => state.cameras);

  const getAlertData = useCallback(
    async (currentPage = 0, sortAscending = false, params = {}) => {
      try {
        const queryParams = {
          pageNumber: currentPage,
          pageSize: 20,
          sortAscending,
          requireVideoUrl: false,
        };

        let payload = { ...params };
        if (currentTab === 'archive') payload = { ...payload, isArchived: true };
        if (payload.startDate || payload.endDate) {
          payload.dateRange = {};
          if (payload.startDate) {
            payload.dateRange.startDate = moment(payload.startDate).utc().format('yyyy-MM-DDTHH:mm:ss');
            delete payload.startDate;
          }
          if (payload.endDate) {
            payload.dateRange.endDate = moment(payload.endDate).utc().format('yyyy-MM-DDTHH:mm:ss');
            delete payload.endDate;
          }
        }

        await dispatch(getAlerts(queryParams, payload));
      } catch (err) {
        console.error(err);
      }
    },
    [dispatch]
  );

  const getCameraData = useCallback(async () => {
    try {
      dispatch(getCameras({ pageSize: 1000 }));
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  const handleSort = (sortDirection) => {
    setClearData(true);
    getAlertData(0, sortDirection, params);
  };

  const defaultValues = {};

  const methods = useForm({
    defaultValues,
  });

  const handleOpenFilter = () => {
    getCameraData();
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    setParams({});
    handleCloseFilter();
    setClearData(true);
    getAlertData(0, isAscending, {});
  };

  const handleRefresh = () => {
    setClearData(true);
    getAlertData(0, isAscending, params);
  };

  const handleMarkAsRead = async () => {
    try {
      await markAllAsRead();
      dispatch(getUnreadAlertCount());
      handleRefresh();
      enqueueSnackbar(translate('app.alert-status-updated-label'));
    } catch (err) {
      enqueueSnackbar(err?.message, {
        variant: 'error',
      });
    }
  };

  useImperativeHandle(ref, () => ({
    handleMarkAsRead,
    handleRefresh,
  }));

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const unreadFlag = query.get('unread');
    if (unreadFlag) {
      setParams({ hasRead: false });
    }
    setIsPageLoading(false);
  }, [location]);

  useEffect(() => {
    let alertFilter = {};
    const alertFilterInSession = sessionStorage.getItem(alertSessionFilter);
    if (alertFilterInSession) {
      alertFilter = JSON.parse(alertFilterInSession);

      if (alertFilter.startDate) {
        alertFilter.startDate = moment(alertFilter.startDate);
      }

      if (alertFilter.endDate) {
        alertFilter.endDate = moment(alertFilter.endDate);
      }

      setParams(alertFilter);
    }
    getAlertData(0, isAscending, alertFilter);
  }, []);

  useEffect(() => {
    if (params && Object.keys(params).length > 0) {
      sessionStorage.setItem(alertSessionFilter, JSON.stringify({ ...params, currentTab }));
    } else {
      sessionStorage.removeItem(alertSessionFilter);
    }
  }, [params]);

  useEffect(() => {
    return () => {
      if (!/alerts/.test(window.location.href)) {
        sessionStorage.removeItem(alertSessionFilter);
      }
      resetAlertList();
    };
  }, []);

  const isDefault = Object.keys(params).length === 0;

  return (
    <>
      <Stack
        spacing={2}
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ sm: 'center' }}
        justifyContent="flex-end"
        sx={{ mb: 1 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <FormProvider methods={methods}>
            <AlertFilterSidebar
              onResetAll={handleResetFilter}
              isOpen={openFilter}
              onOpen={handleOpenFilter}
              onClose={handleCloseFilter}
              translate={translate}
              cameraList={cameraDataList?.data || []}
              getAlertData={getAlertData}
              params={params}
              setParams={setParams}
              setClearData={setClearData}
              sortDirection={isAscending}
              locale={langStorage}
              currentTab={currentTab}
            />
          </FormProvider>

          <AlertSort setIsAscending={setIsAscending} handleSort={handleSort} translate={translate} />
        </Stack>
      </Stack>

      <Stack sx={{ mb: 2 }}>
        {!isDefault && (
          <>
            <Typography variant="body2" gutterBottom>
              <strong>{alertDataList?.total}</strong>
              &nbsp;{translate('app.alerts-found-label')}
            </Typography>

            <AlertTagFiltered
              filters={params}
              isShowReset={!isDefault && !openFilter}
              setParams={setParams}
              setClearData={setClearData}
              getAlertData={getAlertData}
              onResetAll={handleResetFilter}
              translate={translate}
              sortDirection={isAscending}
            />
          </>
        )}
      </Stack>

      {!isPageLoading && (
        <MasonaryGrid
          isLoading={isLoading}
          alertList={alertDataList?.data}
          totalCount={alertDataList?.total}
          nextPageCallback={(page) => getAlertData(page, isAscending, params)}
          currentPage={alertDataList?.currentPage || 0}
          clearData={clearData}
          setClearData={setClearData}
          handlePageRefresh={handleRefresh}
        />
      )}
      {isLoading && (
        <Box sx={{ mt: 15 }}>
          <Oval
            color="#626262"
            secondaryColor="#e7e4e4"
            wrapperStyle={{ justifyContent: 'center' }}
            height={36}
            width={36}
          />
        </Box>
      )}
      {!isLoading && alertDataList?.data?.length === 0 && (
        <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center' }}>
          {translate('app.global-no-results-label')}
        </Typography>
      )}
    </>
  );
});

export default AlertList;
