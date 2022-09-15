import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Card, Link, Typography, Stack, Button} from '@mui/material';
import { makeStyles } from '@mui/styles';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// utils

// components
import Label from '../../components/Label';
import Image from '../../components/Image';
import useLocales from '../../hooks/useLocales';
import { fDateTimeSuffix, fDateTimeTZSuffix, fDateWithTZ } from '../../utils/formatTime';
import Iconify from '../../components/Iconify';

const useStyles = makeStyles({
  root: {       
    "& :not(style)+:not(style)": {
      marginTop: "0px !important"
    }
  }
});


// ----------------------------------------------------------------------

AlertCard.propTypes = {
  alert: PropTypes.object,
};

export default function AlertCard({ alert }) {
  const { id, cameraName, alertTime, preSignedUrl, severity, streamUrl, cameraLocation, hasRead, type } = alert;
  const { translate } = useLocales();
  const classes = useStyles();

  const linkTo = `${PATH_DASHBOARD.alerts.root}/detail/${id}`;
  const getColor = () => {
    if (severity === "High") {
      return "error";
    }
    
    if (severity === "Medium") {
      return "warning";
    } 
    return "info";    
  };

  const openStreamUrl = (streamUrl) => {
    window.open(streamUrl, "_blank");
  };

  const renderDate = (dateValue) => {
    let formattedDate = null;
    try {     
      formattedDate = fDateTimeSuffix(`${dateValue}Z`);
    } catch (err) {
      formattedDate = fDateTimeTZSuffix(dateValue);
    }
    return formattedDate;
  };

  const getActivityName = (activity) => {
    if (activity) {
      return translate(`app.app-name-${activity.toLowerCase()}`) || activity;
    }
    return "-";
  }  

  const renderCameraName = () => (
    <>
      {streamUrl?.trim()?.length > 0 ? (
        <Button color="primary" size="small" onClick={() => openStreamUrl(streamUrl)}>
          {cameraName}
          <Iconify icon={'ic:sharp-launch'} />
        </Button>
      ) : (
        <>{cameraName}</>
      )}
    </>
  );
  return (
    <Card>
      <Box sx={{ position: 'relative' }}>        
        {!hasRead && (
          <Label
            variant="filled"
            color='info'
            sx={{
              top: 16,
              right: 16,
              zIndex: 9,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {translate("app.alert-new")}
          </Label>
        )}
                        
        <Link to={linkTo} color="inherit" component={RouterLink}>
          <Image alt={cameraName} src={preSignedUrl} ratio="1/1" />
        </Link>        
      </Box>

      <Stack spacing={2} sx={{ p: 2 }} className={classes.root}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle2" noWrap>
            {renderDate(alertTime)}
          </Typography>

          <Stack direction="row" spacing={0.5}>           
            {severity && (
              <Label
                variant="filled"
                color={getColor()}
                sx={{
                  textTransform: 'uppercase',
                }}
              >
                {severity}
              </Label>
            )}
          </Stack>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle2" noWrap>
            <b>{translate("app.alert-camera-details")}:</b> {renderCameraName()}
          </Typography>
        </Stack>

        <Typography variant="subtitle2" noWrap>
          <b>{translate("app.alert-location-details")}:</b> {cameraLocation}
        </Typography>

        <Typography variant="subtitle2" noWrap>
          <b>{translate("app.activity-type")}:</b> {getActivityName(type)}
        </Typography>
      </Stack>
    </Card>
  );
}
