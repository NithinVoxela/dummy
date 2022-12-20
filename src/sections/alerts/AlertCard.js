import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// utils

// components
import { AuthContext } from '../../contexts/JWTContext';
import Label from '../../components/Label';
import Image from '../../components/Image';
import CameraName from '../cameras/CameraName';
import useLocales from '../../hooks/useLocales';
import { formatUTCDateString } from '../../utils/formatTime';

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
  const authContext = useContext(AuthContext);
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

  const getActivityName = (activity) => {
    if (activity) {
      return translate(`app.app-name-${activity.toLowerCase()}`) || activity;
    }
    return "-";
  }  

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
            {(alertTime) ? formatUTCDateString(alertTime, authContext?.user?.timezone) : ''}
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
            <b>{translate("app.alert-camera-details")}:</b> <CameraName cameraName={cameraName} streamUrl={streamUrl}/>
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
