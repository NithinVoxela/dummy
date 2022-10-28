import { Typography } from '@mui/material';

const ConfirmationModalConfig = (theme) => ({
    title: (
      <Typography color="textPrimary" variant="h5">
        Are you sure?
      </Typography>
    ),
    contentProps: {
      sx: {
        '.MuiDialogContentText-root': {
          margin: 0,
          lineHeight: 1.5,
          fontSize: '1rem',
          fontFamily: theme.typography.fontFamily,
          fontWeight: 400,
          color: theme.palette.text.secondary,
        },
      },
    },
    cancellationButtonProps: {
      variant: 'text',
      color: 'inherit',
      sx: {
        textTransform: 'capitalize',
        fontWeight: 700,
        fontFamily: theme.typography.fontFamily
      }
    },
    confirmationButtonProps: {
      variant: 'contained',
      sx: {
        borderRadius: 2,
        textTransform: 'capitalize',
        fontWeight: 700,
        fontFamily: theme.typography.fontFamily
      }
    },
    titleProps: {
      sx: {
        paddingBottom: 0,
        'h6': { 
          fontSize: '1.125rem',
          fontWeight: 700,
          fontFamily: theme.typography.fontFamily
        }
      }
    },
    dialogActionsProps: {
      sx: {
        padding: 3
      }
    },
    dialogProps: {
      PaperProps: {
        sx: {
          borderRadius: 4,
          fontFamily: theme.typography.fontFamily
         },
      }      
    },
  });

export default ConfirmationModalConfig;
