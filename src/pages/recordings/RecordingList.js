import { useCallback, useEffect, useState } from 'react';
import { Oval } from 'react-loader-spinner';

// @mui
import { Box, Button, Container, Stack, Typography } from '@mui/material';
// routes
import { useForm } from 'react-hook-form';
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
import { FormProvider } from '../../components/hook-form';
import useLocales from '../../hooks/useLocales';

// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';

// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getRecordings, resetRecordingList } from '../../redux/slices/recordings';
import { getCameras } from '../../redux/slices/cameras';

// sections
import { RecordingFilterSidebar, RecordingSort, RecordingTagFiltered, RecordingGrid } from '../../sections/recordings';

const RecordingList = () => {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { translate, langStorage } = useLocales();
  const [clearData, setClearData] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [isAscending, setIsAscending] = useState(false);
  const [params, setParams] = useState({});
  const { recordingDataList, isLoading } = useSelector((state) => state.recordings);
  const { cameraDataList } = useSelector((state) => state.cameras);

  const getRecordingData = useCallback(
    async (currentPage = 0, sortAscending = false, payload = {}) => {
      try {
        const queryParams = {
          pageNumber: currentPage,
          pageSize: 8,
          sortAscending,
          requireThumbnailUrl: true,
        };
        await dispatch(getRecordings(queryParams, payload));
      } catch (err) {
        console.error(err);
      }
    },
    [dispatch]
  );

  const getCameraData = useCallback(async () => {
    try {
      await dispatch(getCameras({ pageSize: 1000 }));
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  const handleSort = (sortDirection) => {
    setClearData(true);
    getRecordingData(0, sortDirection, params);
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
    getRecordingData(0, isAscending, {});
  };

  useEffect(() => {
    return () => {
      resetRecordingList();
    };
  }, []);

  const isDefault = Object.keys(params).length === 0;

  return (
    <Page title={translate('app.recordings-list-label')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('app.recordings-list-label')}
          links={[
            { name: translate('app.dashboard-header-label'), href: PATH_DASHBOARD.root },
            { name: translate('app.recordings-label') },
          ]}
        />

        <Stack
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ sm: 'center' }}
          justifyContent="flex-end"
          sx={{ mb: 1 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <FormProvider methods={methods}>
              <RecordingFilterSidebar
                onResetAll={handleResetFilter}
                isOpen={openFilter}
                onOpen={handleOpenFilter}
                onClose={handleCloseFilter}
                translate={translate}
                cameraList={cameraDataList?.data || []}
                getRecordingData={getRecordingData}
                params={params}
                setParams={setParams}
                setClearData={setClearData}
                sortDirection={isAscending}
                locale={langStorage}
              />
            </FormProvider>

            <RecordingSort setIsAscending={setIsAscending} handleSort={handleSort} translate={translate} />
          </Stack>
        </Stack>

        <Stack sx={{ mb: 2 }}>
          {!isDefault && (
            <>
              <Typography variant="body2" gutterBottom>
                <strong>{recordingDataList?.total}</strong>
                &nbsp;{translate('app.recordings-found-label')}
              </Typography>

              <RecordingTagFiltered
                filters={params}
                isShowReset={!isDefault && !openFilter}
                setParams={setParams}
                setClearData={setClearData}
                getRecordingData={getRecordingData}
                onResetAll={handleResetFilter}
                translate={translate}
                sortDirection={isAscending}
              />
            </>
          )}
        </Stack>

        <RecordingGrid
          isLoading={isLoading}
          recordingList={recordingDataList?.data}
          totalCount={recordingDataList?.total}
          nextPageCallback={(page) => getRecordingData(page, isAscending, params)}
          currentPage={recordingDataList?.currentPage || 0}
          clearData={clearData}
          setClearData={setClearData}
        />

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
        {!isLoading && recordingDataList?.data?.length === 0 && (
          <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center' }}>
            {translate('app.global-no-results-label')}
          </Typography>
        )}
      </Container>
    </Page>
  );
};

export default RecordingList;
