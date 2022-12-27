import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, Typography, Tooltip } from '@mui/material';
// hooks
import useAuth from '../../../hooks/useAuth';
import useLocales from '../../../hooks/useLocales';
// components
import MyAvatar from '../../../components/MyAvatar';
import { ListItemIconStyle } from '../../../components/nav-section/vertical/style';
import Iconify from '../../../components/Iconify';
import { IMAGES } from '../../../sections/common/ImageConstants';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

NavbarAccount.propTypes = {
  isCollapse: PropTypes.bool,
};

export default function NavbarAccount({ isCollapse }) {
  const { user } = useAuth();
  const { translate } = useLocales();

  return (
    <RootStyle
      sx={{
        ...(isCollapse && {
          bgcolor: 'transparent',
        }),
      }}
    >
      <Stack direction="column" spacing={2}>
        <Stack direction="row" spacing={2}>
          <MyAvatar />

          <Box
            sx={{
              ml: 2,
              transition: (theme) =>
                theme.transitions.create('width', {
                  duration: theme.transitions.duration.shorter,
                }),
              ...(isCollapse && {
                ml: 0,
                width: 0,
              }),
            }}
          >
            <Typography variant="subtitle2" noWrap>
              {user?.displayName}
            </Typography>
            <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
              {user?.applicationTenant?.schemaName}
            </Typography>
          </Box>
        </Stack>
        {user?.impersonatedTenant && (
          <Stack direction="row">
            <Tooltip title={translate('app.tenant-impersonating-label')}>
              <ListItemIconStyle>
                <Iconify icon={IMAGES.impersonation} />
              </ListItemIconStyle>
            </Tooltip>

            {user?.impersonatedTenant?.schemaName}
          </Stack>
        )}
      </Stack>
    </RootStyle>
  );
}
