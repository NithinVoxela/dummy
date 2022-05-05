import { Button, Typography } from "@mui/material";
import Iconify from '../../components/Iconify';


const openStreamUrl = (streamUrl) => {
  window.open(streamUrl, "_blank");
};

export const CAMERA_TABLE_META = {    
  size: 'medium',
  idProperty: 'publicId',
  columns: [{
    text: 'app.camera-name-label',
    dataKey: 'name',
    type: 'widget',    
    renderWidget: (col, cellData, value) => (
      <Typography
        variant='subtitle2'        
      >
        {value}
      </Typography>
    )
  }, {
    text: 'app.camera-type-label',
    dataKey: 'cameraType'
  }, {
    text: 'app.camera-installation-label',
    dataKey: 'installationDate',
    type: 'date'
  }, {
    text: 'app.camera-status-label',
    dataKey: 'streamUrl',
    type: 'widget',    
    renderWidget: (col, cellData, value, translate) => (
      <>
        {value?.trim()?.length > 0 && cellData?.cameraStatus === "Online" ? (
          <Button
            color="primary"
            size="small"            
            onClick={() => openStreamUrl(value)}
          >
            {translate("app.camera-online-label", "Online")}
            <Iconify icon={'ic:sharp-launch'} />
          </Button>
        ) : (
          <>{translate("app.camera-offline-label", "Online")}</>
        )}
      </>
    )
  }, {
    text: '',
    dataKey: 'action'   
  }]
};