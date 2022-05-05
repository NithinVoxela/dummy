import { Avatar, Box, Button, Dialog, DialogContent, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Iconify from '../Iconify';


const DeleteModal = (props) => {
  const { isOpen, handleClose, type, recordId, handleDelete } = props;


  return (
    <Dialog
      open={isOpen}
      disableBackdropClick
    >
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            pb: 2,
            pt: 3,
            px: 3
          }}
        >
          <Avatar
            sx={{
              backgroundColor: (theme) => alpha(theme.palette.error.main, 0.08),
              color: 'error.main',
              mr: 2
            }}
          >
            <Iconify icon={'eva:alert-triangle-fill'} color="warning" />
          </Avatar>
          <Box>
            <Typography
              color="textPrimary"
              variant="h5"
            >
              Delete {type}
            </Typography>
            <Typography
              color="textSecondary"
              sx={{ mt: 1 }}
              variant="body2"
            >
              Are you sure you want to delete {type}?
              This action cannot be undone.
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            px: 3,
            py: 1.5
          }}
        >
          <Button
            color="primary"
            sx={{ mr: 2 }}
            variant="outlined"
            onClick={handleClose}            
          >
            Cancel
          </Button>
          <Button
            sx={{
              backgroundColor: 'error.main',
              '&:hover': {
                backgroundColor: 'error.dark'
              }
            }}
            variant="contained"
            onClick={() => handleDelete(recordId)}
          >
            Delete {type}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
};

export default DeleteModal;
