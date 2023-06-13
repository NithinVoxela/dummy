import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { IconButton } from '@mui/material';
// components
import Iconify from '../../components/Iconify';
import MenuPopover from '../../components/MenuPopover';

// ----------------------------------------------------------------------

ListMenu.propTypes = {
  getMenuItems: PropTypes.func,
};

export const ICON = {
  mr: 2,
  width: 20,
  height: 20,
};

export default function ListMenu({ getMenuItems, sx = { ...ICON } }) {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Iconify icon={'eva:more-vertical-fill'} sx={{ ...sx }} />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        onClick={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        arrow="right-top"
        sx={{
          mt: -1,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }}
      >
        {getMenuItems()}
      </MenuPopover>
    </>
  );
}
