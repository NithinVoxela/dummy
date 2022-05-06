import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { MenuItem, IconButton } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Iconify from '../../components/Iconify';
import MenuPopover from '../../components/MenuPopover';

// ----------------------------------------------------------------------

CameraListMenu.propTypes = {
  onDelete: PropTypes.func,
  cameraId: PropTypes.string,
  translate: PropTypes.func,
};

export default function CameraListMenu({ onDelete, cameraId, translate }) {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleDelete = () => {
    setOpen(null);
    onDelete();
  };

  const ICON = {
    mr: 2,
    width: 20,
    height: 20,
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        arrow="right-top"
        sx={{
          mt: -1,
          width: 160,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }}
      >
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
          {translate("app.camera-delete-label")}
        </MenuItem>

        <MenuItem component={RouterLink} to={`${PATH_DASHBOARD.cameras.root}/edit/${cameraId}`}>
          <Iconify icon={'eva:edit-fill'} sx={{ ...ICON }} />
          {translate("app.camera-edit-label")}
        </MenuItem>

        <MenuItem component={RouterLink} to={`${PATH_DASHBOARD.cameras.root}/apps/${cameraId}`}>
          <Iconify icon={'mdi:apps'} sx={{ ...ICON }} />
          {translate("app.camera-apps-header-label")}
        </MenuItem>
      </MenuPopover>
    </>
  );
}