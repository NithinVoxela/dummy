import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { sentenceCase } from 'change-case';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Chip, Typography, Stack, Button } from '@mui/material';

// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const RootStyle = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
});

const WrapperStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  overflow: 'hidden',
  alignItems: 'stretch',
  margin: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.divider}`,
}));

const LabelStyle = styled((props) => <Typography component="span" variant="subtitle2" {...props} />)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.neutral,
  borderRight: `solid 1px ${theme.palette.divider}`,
}));



AlertTagFiltered.propTypes = {
  filters: PropTypes.object,
  isShowReset: PropTypes.bool,
  setParams: PropTypes.func,
  setClearData: PropTypes.func,
  getAlertData: PropTypes.func,
  onResetAll: PropTypes.func,
  translate: PropTypes.func,
  sortDirection: PropTypes.string
};

export default function AlertTagFiltered({
  filters,
  isShowReset,
  setClearData,
  getAlertData,
  onResetAll,
  setParams,
  translate,
  sortDirection
}) {

  const { cameraName, startDate, endDate, severity, eventType } = filters;

  const applyFilter = (newParams) => {
    setParams(newParams);
    setClearData(true);
    getAlertData(0, sortDirection, newParams);
  };

  const onRemoveParam = (paramName) => {
    const newParams = {...filters};
    delete newParams[paramName];
    applyFilter(newParams);
  }

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
              onDelete={() => onRemoveParam("cameraName")}
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
              onDelete={() => onRemoveParam("eventType")}
              sx={{ m: 0.5 }}
            />            
          </Stack>
        </WrapperStyle>
      )}

      {startDate && (
        <WrapperStyle>
          <LabelStyle>{translate('app.start-date-lable')}</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0.75 }}>
            <Chip size="small" label={format(new Date(startDate), "dd MMMM yyyy")} onDelete={() => onRemoveParam("startDate")} sx={{ m: 0.5 }} />
          </Stack>
        </WrapperStyle>
      )}

      {endDate && (
        <WrapperStyle>
          <LabelStyle>{translate('app.end-date-lable')}</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0.75 }}>
            <Chip size="small" label={format(new Date(endDate), "dd MMMM yyyy")} onDelete={() => onRemoveParam("endDate")} sx={{ m: 0.5 }} />
          </Stack>
        </WrapperStyle>
      )}

      {severity?.length > 0 && (
        <WrapperStyle>
          <LabelStyle>{translate('app.alerts-severity-label')}</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0.75 }}>
            <Chip size="small" label={sentenceCase(severity)} onDelete={() => onRemoveParam("severity")} sx={{ m: 0.5 }} />
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
