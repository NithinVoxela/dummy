import PropTypes from 'prop-types';
import { Box, Button, Card, CardActions, CardContent, FormControlLabel, Grid, Switch, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { withStyles } from '@mui/styles';
import React from "react";


import { SkeletonAlertItem } from '../../components/skeleton';

const GreenSwitch = withStyles({
  switchBase: {
    color: "#fafafa",
    "&$checked": {
      color: green[500]
    },
    "&$checked + $track": {
      backgroundColor: green[500]
    }
  },
  checked: {},
  track: {},
  thumb: {
    boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)"
  }
})(Switch);

const CameraAppsCard = (props) => {
  const { loading, dataList, translate, handleAppsClick, handleAppEnable  } = props;

  const isAppEnabled = (item) => item.config ? item.config.isEnabled : false;

  const renderAppCard = (item) => (
    <Grid item md={12} xs={12} key={`${item.app.id}`}>
      <Card sx={{ minHeight: 165 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {translate(`app.mlapp-type-${item.app.code}`, `${item.app.name}`)}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {translate(`app.mlapp-type-${item.app.code}`, `${item.app.description}`)}
          </Typography>
        </CardContent>
        <CardActions style={{ padding: "8px 16px", justifyContent: "space-between" }}>
          {!item.config && (
            <Button variant="contained" color="primary" onClick={() => handleAppEnable(item)} size="small">
              {translate("app.camera-subscribe-label")}
            </Button>
          )}
          {item.config && (
            <>
              <FormControlLabel
                control={
                  <GreenSwitch
                    name={item.app.name}
                    value={isAppEnabled(item)}
                    checked={isAppEnabled(item)}
                    onChange={() => handleAppEnable(item)}
                  />
                }
                label={translate("app.camera-active-label")}
              />
              <Button size="small" color="primary" onClick={() => handleAppsClick(item)}>
                {translate("app.camera-settings-label")}
              </Button>
            </>
          )}
        </CardActions>
      </Card>
    </Grid>
  );

  return (   
    <>
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
        }}
      >
        {(loading ? [...Array(12)] : dataList).map((app, index) =>
          app ? renderAppCard(app) : <SkeletonAlertItem key={index} />
        )}        
      </Box>  
      {(!loading && dataList?.length === 0 &&
        <Box sx={{ textAlign: "center", pt: 4 }}>
          <Typography variant="body2">
            {translate("app.camera-no-data-label")}
          </Typography>
        </Box>
      )}
    </>   
  );
};

CameraAppsCard.propTypes = {
  loading: PropTypes.bool,
  dataList: PropTypes.array,
  translate: PropTypes.func,
  handleAppsClick: PropTypes.func,
  handleAppEnable: PropTypes.func,
};

export default CameraAppsCard;
