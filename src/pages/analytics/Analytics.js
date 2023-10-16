import { useCallback, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
// @mui
import { Container, Grid, Typography, TextField, Card, Box } from '@mui/material';
// routes
// hooks
import useSettings from '../../hooks/useSettings';
import useLocales from '../../hooks/useLocales';

// components
import Page from '../../components/Page';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getAlertsStats, getCameraStats, getCameraSeverityStats, resetAnalytics } from '../../redux/slices/analytics';
// sections
import { AnalyticsCameraPieChart, AppAlertsPieChart, AppWidgetSummary } from '../../sections/analytics';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const ALERT_CHART_OPTIONS = ['day', 'week', 'month'];

function Analytics() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();
  const { cameraStats, severityStats, alertStats } = useSelector((state) => state.analytics);

  const [seriesData, setSeriesData] = useState('month');
  const [activeCameraCount, setActiveCameraCount] = useState(0);
  const [offlineCameraCount, setOfflineCameraCount] = useState(0);

  const handleChangeSeriesData = (event) => {
    const { value } = event.target;
    setSeriesData(value);
    let days = 30;
    if (value === 'week') {
      days = 7;
    } else if (value === 'day') {
      days = 1;
    }
    getSeverityStatDetails({ days });
  };

  const getCameraStatDetails = useCallback(async () => {
    try {
      await dispatch(getCameraStats());
    } catch (err) {
      enqueueSnackbar(err?.message, {
        variant: 'error',
      });
      throw new Error(err?.message);
    }
  }, [dispatch]);

  const getSeverityStatDetails = useCallback(
    async (params = {}) => {
      try {
        if (!params.days) {
          params.days = 30;
        }
        await dispatch(getCameraSeverityStats(params));
      } catch (err) {
        enqueueSnackbar(err?.message, {
          variant: 'error',
        });
        throw new Error(err?.message);
      }
    },
    [dispatch]
  );

  const getAlertStatDetails = useCallback(
    async (params = {}) => {
      try {
        await dispatch(getAlertsStats(params));
      } catch (err) {
        enqueueSnackbar(err?.message, {
          variant: 'error',
        });
        throw new Error(err?.message);
      }
    },
    [dispatch]
  );

  const formatBytes = (bytes, decimals = 2) => {
    if (!bytes || bytes === 0) return '0';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    // eslint-disable-next-line no-restricted-properties
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };

  useEffect(() => {
    if (cameraStats?.length > 0) {
      setActiveCameraCount(cameraStats.find((item) => item.status === 'ONLINE')?.groupCount);
      setOfflineCameraCount(cameraStats.find((item) => item.status === 'OFFLINE')?.groupCount);
    }
  }, [cameraStats]);

  useEffect(() => {
    getCameraStatDetails();
    getSeverityStatDetails();
    getAlertStatDetails();
    return () => {
      resetAnalytics();
    };
  }, []);

  const getAlertActions = (
    <TextField
      select
      fullWidth
      value={seriesData}
      SelectProps={{ native: true }}
      onChange={handleChangeSeriesData}
      sx={{
        '& fieldset': { border: '0 !important' },
        '& select': {
          pl: 1,
          py: 0.5,
          pr: '24px !important',
          typography: 'subtitle2',
        },
        '& .MuiOutlinedInput-root': {
          borderRadius: 0.75,
          bgcolor: 'background.neutral',
        },
        '& .MuiNativeSelect-icon': {
          top: 4,
          right: 0,
          width: 20,
          height: 20,
        },
      }}
    >
      {ALERT_CHART_OPTIONS.map((option) => (
        <option key={option} value={option}>
          {translate(`app.alert-time-${option}-option`)}
        </option>
      ))}
    </TextField>
  );

  return (
    <Page title={translate('app.analytics-label')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid justify="space-between" container spacing={10}>
          <Grid item>
            <Typography variant="h4" gutterBottom display="inline">
              {translate('app.analytics-label')}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ marginTop: 2 }}>
          <Grid item xs={12} md={6}>
            <AppWidgetSummary title={translate('app.total-active-devices-label')} total={activeCameraCount} />
          </Grid>

          <Grid item xs={12} md={6}>
            <AppWidgetSummary title={translate('app.total-offline-devices')} total={offlineCameraCount} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppAlertsPieChart
              title={translate('app.alert-generated-by-time')}
              actions={getAlertActions}
              data={severityStats}
              translate={translate}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsCameraPieChart title={translate('app.chart-title-camera-total')} data={alertStats} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default Analytics;
