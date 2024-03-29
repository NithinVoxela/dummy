import PropTypes from 'prop-types';
import moment from 'moment-timezone';

// @mui
import { Chip, Stack, Button } from '@mui/material';

// components
import Iconify from '../../components/Iconify';
import { RootStyle, WrapperStyle, LabelStyle } from '../common/StyleConstants';

// ----------------------------------------------------------------------

AlertTagFiltered.propTypes = {
  filters: PropTypes.object,
  isShowReset: PropTypes.bool,
  setParams: PropTypes.func,
  setClearData: PropTypes.func,
  getAlertData: PropTypes.func,
  onResetAll: PropTypes.func,
  translate: PropTypes.func,
  sortDirection: PropTypes.string,
};

export default function AlertTagFiltered({
  filters,
  isShowReset,
  setClearData,
  getAlertData,
  onResetAll,
  setParams,
  translate,
  sortDirection,
}) {
  const { cameraName, startDate, endDate, severity, eventType, hasRead } = filters;

  const applyFilter = (newParams) => {
    setParams(newParams);
    setClearData(true);
    getAlertData(0, sortDirection, newParams);
  };

  const onRemoveParam = (paramName) => {
    const newParams = { ...filters };
    delete newParams[paramName];
    applyFilter(newParams);
  };

  // eslint-disable-next-line no-prototype-builtins
  const checkReadParam = () => filters.hasOwnProperty('hasRead') && !hasRead;

  return (
    <RootStyle>
      {filters?.cameraName?.length > 0 && (
        <WrapperStyle>
          <LabelStyle>{translate('app.cameras-header-label')}:</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0.75 }}>
            <Chip
              key={cameraName}
              label={cameraName}
              size="small"
              onDelete={() => onRemoveParam('cameraName')}
              sx={{ m: 0.5 }}
            />
          </Stack>
        </WrapperStyle>
      )}

      {filters?.eventType?.length > 0 && (
        <WrapperStyle>
          <LabelStyle>{translate('app.event-type-label')}:</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0.75 }}>
            <Chip
              key={eventType}
              label={translate(`app.app-name-${eventType}`)}
              size="small"
              onDelete={() => onRemoveParam('eventType')}
              sx={{ m: 0.5 }}
            />
          </Stack>
        </WrapperStyle>
      )}

      {startDate && (
        <WrapperStyle>
          <LabelStyle>{translate('app.start-date-lable')}</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0.75 }}>
            <Chip
              size="small"
              label={moment(startDate).format('DD MMMM yyyy hh:mm a')}
              onDelete={() => onRemoveParam('startDate')}
              sx={{ m: 0.5 }}
            />
          </Stack>
        </WrapperStyle>
      )}

      {endDate && (
        <WrapperStyle>
          <LabelStyle>{translate('app.end-date-lable')}</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0.75 }}>
            <Chip
              size="small"
              label={moment(endDate).format('DD MMMM yyyy hh:mm a')}
              onDelete={() => onRemoveParam('endDate')}
              sx={{ m: 0.5 }}
            />
          </Stack>
        </WrapperStyle>
      )}

      {severity?.length > 0 && (
        <WrapperStyle>
          <LabelStyle>{translate('app.alerts-severity-label')}</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0.75 }}>
            <Chip
              size="small"
              label={translate(`app.alert-${severity.toLowerCase()}-label`)}
              onDelete={() => onRemoveParam('severity')}
              sx={{ m: 0.5 }}
            />
          </Stack>
        </WrapperStyle>
      )}

      {checkReadParam() && (
        <WrapperStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0.75 }}>
            <Chip
              size="small"
              label={translate(`app.unread-label`)}
              onDelete={() => onRemoveParam('hasRead')}
              sx={{ m: 0.5 }}
            />
          </Stack>
        </WrapperStyle>
      )}

      {isShowReset && (
        <Button color="error" size="small" onClick={onResetAll} startIcon={<Iconify icon={'ic:round-clear-all'} />}>
          {translate('app.filter-reset-label')}
        </Button>
      )}
    </RootStyle>
  );
}
