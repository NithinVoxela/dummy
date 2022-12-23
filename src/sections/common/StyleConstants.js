import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

export const RootStyle = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
});

export const WrapperStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  overflow: 'hidden',
  alignItems: 'stretch',
  margin: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.divider}`,
}));

export const LabelStyle = styled((props) => <Typography component="span" variant="subtitle2" {...props} />)(
  ({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.neutral,
    borderRight: `solid 1px ${theme.palette.divider}`,
  })
);
