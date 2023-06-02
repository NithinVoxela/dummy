import { Avatar, Box, Button, Dialog, DialogContent, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Iconify from '../Iconify';

const DialogModal = (props) => {
  const {
    isOpen,
    handleClose,
    type,
    promptText,
    handleConfirm,
    themeOfDialog = 'primary',
    icon = <Iconify icon={'eva:alert-triangle-fill'} color="warning" />,
  } = props;

  return (
    <Dialog open={isOpen} disableBackdropClick>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            pb: 2,
            pt: 3,
            px: 3,
          }}
        >
          <Avatar
            sx={{
              backgroundColor: (theme) => alpha(theme.palette[themeOfDialog].main, 0.08),
              color: `${themeOfDialog}.main`,
              mr: 2,
            }}
          >
            {icon}
          </Avatar>
          <Box>
            <Typography color="textPrimary" variant="h5">
              {type}
            </Typography>
            <Typography color="textSecondary" sx={{ mt: 1 }} variant="body2">
              {promptText}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            px: 3,
            py: 1.5,
          }}
        >
          <Button color="primary" sx={{ mr: 2 }} variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            sx={{
              backgroundColor: `${themeOfDialog}.main`,
              '&:hover': {
                backgroundColor: `${themeOfDialog}.dark`,
              },
            }}
            variant="contained"
            onClick={() => handleConfirm()}
          >
            {type}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DialogModal;
