import PropTypes from 'prop-types';
import moment from "moment-timezone"

// @mui
import { styled } from '@mui/material/styles';
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



RecordingTagFiltered.propTypes = {
  filters: PropTypes.object,
  isShowReset: PropTypes.bool,
  setParams: PropTypes.func,
  setClearData: PropTypes.func,
  getRecordingData: PropTypes.func,
  onResetAll: PropTypes.func,
  translate: PropTypes.func,
  sortDirection: PropTypes.bool
};

export default function RecordingTagFiltered({
  filters,
  isShowReset,
  setClearData,
  getRecordingData,
  onResetAll,
  setParams,
  translate,
  sortDirection
}) {

  const { cameraName, startDate } = filters;

  const applyFilter = (newParams) => {
    setParams(newParams);
    setClearData(true);
    getRecordingData(0, sortDirection, newParams);
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

      {startDate && (
        <WrapperStyle>
          <LabelStyle>{translate('app.start-date-lable')}</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0.75 }}>
            <Chip size="small" label={moment(startDate).format("DD MMMM yyyy hh:mm a")} onDelete={() => onRemoveParam("startDate")} sx={{ m: 0.5 }} />
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
