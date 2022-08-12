import { Box, Typography } from "@mui/material";
import Label from "../../components/Label";
import Iconify from '../../components/Iconify';
import { VideoPreview } from "../../sections/cameras";
import { convertUTCDateToLocalDateWithTimzone, fDateTimeSuffix } from "../../utils/formatTime";


const openStreamUrl = (streamUrl) => {
  window.open(streamUrl, "_blank");
};

export const CAMERA_TABLE_META = {    
  size: 'medium',
  idProperty: 'publicId',
  columns: [{
    text: '',
    dataKey: 'latestAlertThumbnailUrl',
    type: 'widget',    
    renderWidget: (col, cellData, value) => (
      <Box>
        {value ? <VideoPreview name={cellData?.name} thumbnailUrl={value} mediaUrl={cellData?.latestAlertMediaUrl} />
        :
        <Iconify icon={'clarity:image-line'} width={48} height={48} color="#919EAB" />
        }
      </Box>
    )
  }, {
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
    text: 'app.camera-location-label',
    dataKey: 'location'
  }, {
    text: 'app.last-activity',
    dataKey: 'lastActivityTime',
    type: 'widget',
    renderWidget: (col, cellData, value) => (
      <Typography
        variant='subtitle2'        
      >
        {value && value > 0 ? fDateTimeSuffix(convertUTCDateToLocalDateWithTimzone(new Date(value))) : ''}
      </Typography>
    )
  }, {
    text: 'app.camera-status-label',
    dataKey: 'streamUrl',
    type: 'widget',    
    renderWidget: (col, cellData, value, translate) => (
      <>
        {value?.trim()?.length > 0 && cellData?.cameraStatus === "Online" ? (
          <Label
            variant='ghost'
            color='success'
          >
            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => openStreamUrl(value)}>
              {translate("app.camera-online-label", "Online")}
              <Iconify icon={'ic:sharp-launch'} />
            </Box>
          </Label>          
        ) : (
          <Label
            variant='ghost'
            color='error'
          >
            {translate("app.camera-offline-label", "Offline")}
          </Label> 
        )}
      </>
    )
  }, {
    text: '',
    dataKey: 'action'   
  }]
};