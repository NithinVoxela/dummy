import { Box, Typography } from "@mui/material";
import Label from "../../components/Label";
import Iconify from '../../components/Iconify';
import { VideoPreview } from "../../sections/cameras";
import { formatEpochTime } from "../../utils/formatTime";

const openStreamUrl = (streamUrl) => {
  window.open(streamUrl, "_blank");
};
export const CAMERA_TABLE_META = {
  size: 'medium',
  idProperty: 'publicId',
  columns: [
    {
      text: '',
      dataKey: 'latestAlertThumbnailUrl',
      type: 'widget',
      renderWidget: (col, cellData, value) => (
        <Box>
          {value ? (
            <VideoPreview name={cellData?.name} thumbnailUrl={value} mediaUrl={cellData?.latestAlertMediaUrl} />
          ) : (
            <Iconify icon={'clarity:image-line'} width={48} height={48} color="#919EAB" />
          )}
        </Box>
      ),
    },
    {
      text: 'app.camera-name-label',
      dataKey: 'name',
      type: 'widget',
      sortable: true,
      renderWidget: (col, cellData, value) => <Typography variant="subtitle2">{value}</Typography>,
    },
    {
      text: 'app.camera-location-label',
      dataKey: 'location',
      sortable: true,
    },
    {
      text: 'app.last-activity',
      dataKey: 'lastActivityTime',
      type: 'widget',
      sortable: true,
      renderWidget: (col, cellData, value, translate, authContext) => (
        <>{value && value > 0 ? formatEpochTime(value, authContext?.user?.timezone) : ''}</>
      ),
    },
    {
      text: 'app.camera-status-label',
      dataKey: 'streamUrl',
      type: 'widget',
      renderWidget: (col, cellData, value, translate) => (
        <>
          {value?.trim()?.length > 0 && cellData?.cameraStatus === 'Online' ? (
            <Label variant="ghost" color="success">
              <Box
                sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                onClick={() => openStreamUrl(value)}
              >
                {translate('app.camera-online-label', 'Online')}
                <Iconify icon={'ic:sharp-launch'} />
              </Box>
            </Label>
          ) : (
            <Label variant="ghost" color="error">
              {translate('app.camera-offline-label', 'Offline')}
            </Label>
          )}
        </>
      ),
    },
    {
      text: 'app.camera.shadow-sync-status-label',
      dataKey: 'shadowSyncStatus',
      type: 'widget',
      renderWidget: (col, cellData, value, translate) => (
        <>
          <Label variant="ghost" color={value === 'IN_SYNC' ? 'success' : 'error'}>
            {translate(`app.camera.shadow-sync-status-${value}-label`)}
          </Label>
        </>
      ),
    },
    {
      text: '',
      dataKey: 'action',
    },
  ],
};