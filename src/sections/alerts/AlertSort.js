import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Button, MenuItem, Typography } from '@mui/material';

// components
import Iconify from '../../components/Iconify';
import MenuPopover from '../../components/MenuPopover';

// ----------------------------------------------------------------------


AlertSort.propTypes = {  
  setIsAscending: PropTypes.func,
  translate: PropTypes.func,
};

// ----------------------------------------------------------------------

export default function AlertSort(props) {
  const { translate, setIsAscending } = props;


  const [open, setOpen] = useState(null);
  const [sortBy, setSortBy] = useState("newest");

  const SORT_BY_OPTIONS = [
    { value: 'oldest', label: translate("app.sort-option-oldest")},
    { value: 'newest', label: translate("app.sort-option-newest") }
  ];

  const renderLabel = (label) => { 
    if (label === 'oldest') {
      return translate("app.sort-option-oldest");
    }    
    return translate("app.sort-option-newest");
  };

  const handleOpen = (currentTarget) => {
    setOpen(currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleSortBy = (value) => {
    handleClose();
    setSortBy(value);    
    setIsAscending(value === "oldest");    
  };

  return (
    <>
      <Button
        color="inherit"
        disableRipple
        onClick={(event) => handleOpen(event.currentTarget)}
        endIcon={<Iconify icon={open ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}
      >
        {translate("app.sort-by-lable")}: &nbsp;
        <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {renderLabel(sortBy)}
        </Typography>
      </Button>

      <MenuPopover
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        sx={{
          width: 'auto',
          '& .MuiMenuItem-root': { typography: 'body2', borderRadius: 0.75 },
        }}
      >
        {SORT_BY_OPTIONS.map((option) => (
          <MenuItem key={option.value} selected={option.value === sortBy} onClick={() => handleSortBy(option.value)}>
            {option.label}
          </MenuItem>
        ))}
      </MenuPopover>
    </>
  );
}
