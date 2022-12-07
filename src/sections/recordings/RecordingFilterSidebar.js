import PropTypes from 'prop-types';
// form
// @mui
import { Box, Stack, Button, Drawer, Divider, IconButton, Typography, TextField } from '@mui/material';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from "moment-timezone"
import MomentUtils from "@date-io/moment"
// @types
import { useEffect, useMemo, useState, useContext } from 'react';
import { NAVBAR } from '../../config';
// components
import { AuthContext } from '../../contexts/JWTContext';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import { RHFSelect } from '../../components/hook-form';

RecordingFilterSidebar.propTypes = {
  isOpen: PropTypes.bool,
  onResetAll: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  translate: PropTypes.func,
  cameraList: PropTypes.array,
  getRecordingData: PropTypes.func,
  setParams: PropTypes.func,
  params: PropTypes.object,
  setClearData: PropTypes.func,
  sortDirection: PropTypes.bool,
  locale: PropTypes.string
};

export default function RecordingFilterSidebar({
  isOpen,
  onOpen,
  onClose,
  translate,
  cameraList,
  getRecordingData,
  params,
  setParams,
  setClearData,
  sortDirection,
  locale
}) {

  const authContext = useContext(AuthContext);
  const allOptionLabel = translate('app.all-option-label');

  const [startDate, setStartDate] = useState(null);
  const [cameraText, setCameraText] = useState(allOptionLabel);

  const cameraDataList = useMemo(() => {
    const cameras = [{ id: allOptionLabel, name: allOptionLabel }];
    let result = [];
    if (cameraList.length > 0) {
      result = cameraList.map(item => ({ publicId: item.publicId, name: item.name }));
    }
    return cameras.concat(result);
  }, [cameraList]);

  const handleCameraChange = (e) => {
    const filteredValue = e.target.value;
    const newParams = { ...params };
    setCameraText(filteredValue);
    if (filteredValue?.length > 0 && filteredValue !== allOptionLabel) {
      newParams.cameraName = filteredValue;            
    } else {
      delete newParams.cameraName;
    }
    applyFilter(newParams);
  };

  const resetFilter = () => {
    setCameraText(allOptionLabel);
    setStartDate(null);
    applyFilter({});
  };

  const handleStartDate = (value) => {
    const newParams = { ...params };
    value.set({minute:0,second:0,millisecond:0});
    setStartDate(value);
    newParams.startDate = value;

    applyFilter(newParams);
  };

  const applyFilter = (newParams) => {    
    setParams({...newParams});
    setClearData(true);
    if (newParams.startDate) {
      newParams.dateRange = {};
      newParams.dateRange.startDate = moment(newParams.startDate).utc().format("yyyy-MM-DDTHH:mm:ss");
      newParams.dateRange.endDate = moment(newParams.startDate).add(1, 'hours').utc().format("yyyy-MM-DDTHH:mm:ss");
      delete newParams.startDate;
    }
    getRecordingData(0, sortDirection, newParams);
  };

  useEffect(() => {
    setCameraText(allOptionLabel);
    setStartDate(null);

    if (params?.cameraName) {
      setCameraText(params.cameraName);
    }
    if (params?.startDate) {
      setStartDate(params.startDate);
    }
  }, [params]);  

  return (
    <LocalizationProvider dateLibInstance={moment} dateAdapter={MomentUtils} adapterLocale={locale}>
      <Button disableRipple color="inherit" endIcon={<Iconify icon={'ic:baseline-search'} />} onClick={onOpen}>
        {translate('app.search-label')}
      </Button>

      <Drawer
        anchor="right"
        open={isOpen}
        onClose={onClose}
        PaperProps={{
          sx: { width: NAVBAR.BASE_WIDTH },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            {translate('app.search-label')}
          </Typography>
          <IconButton onClick={onClose}>
            <Iconify icon={'eva:close-fill'} width={20} height={20} />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            <Stack spacing={1}>
              <Typography variant="subtitle1">{translate('app.cameras-header-label')}</Typography>
              <RHFSelect
                name="camera"
                label=""
                placeholder={translate('app.alert-camera-details')}
                size="small"
                onChange={handleCameraChange}
                value={cameraText}
              >
                <option value="" />
                {cameraDataList.map((option) => (
                  <option key={option.publicId} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </RHFSelect>
            </Stack>

            <Stack spacing={1}>
              <Typography variant="subtitle1">{translate('app.start-date-lable')}</Typography>
              <DesktopDateTimePicker
                inputFormat="DD MMMM yyyy hh:mm a"
                value={startDate}
                onAccept={handleStartDate}
                onChange={ () => {}}
                size="small"
                views={["year", "month", "day", "hours"]}
                disableFuture
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    inputProps={{ ...params.inputProps, placeholder: translate('app.select-date-label') }}
                  />
                )}
              />
            </Stack>
          </Stack>
        </Scrollbar>

        <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            onClick={resetFilter}
            startIcon={<Iconify icon={'ic:round-clear-all'} />}
          >
            {translate('app.filter-reset-label')}
          </Button>
        </Box>
      </Drawer>
    </LocalizationProvider>
  );
}
