import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { List, Box, ListSubheader } from '@mui/material';
//
import React, { useContext } from 'react';
import { NavListRoot } from './NavList';
import { AuthContext } from '../../../contexts/JWTContext';

// ----------------------------------------------------------------------

export const ListSubheaderStyle = styled((props) => <ListSubheader disableSticky disableGutters {...props} />)(
  ({ theme }) => ({
    ...theme.typography.overline,
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    color: theme.palette.text.primary,
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shorter,
    }),
  })
);

// ----------------------------------------------------------------------

NavSectionVertical.propTypes = {
  isCollapse: PropTypes.bool,
  navConfig: PropTypes.array,
  translate: PropTypes.func,
};

export default function NavSectionVertical({ navConfig, isCollapse = false, translate, ...other }) {
  /**
   * First, Check if the role array is there in the list or not.
   * If it's not there then simply show the navroot list,
   * but if it's there then check that the user in the api is contained in the array of users which are authorized for the permission.
   * If the user is in the array, then show the navroot else show null
   */
  const authContext = useContext(AuthContext);

  return (
    <Box {...other}>
      {navConfig.map((group) => (
        <List key={group.subheader} disablePadding sx={{ px: 2 }}>
          <ListSubheaderStyle
            sx={{
              ...(isCollapse && {
                opacity: 0,
              }),
            }}
          >
            {translate(`app.${group.subheader}-label`)}
          </ListSubheaderStyle>
          {group.items.map((list) =>
            !list.role || list.role.includes(authContext?.user?.role) ? (
              <NavListRoot key={list.title} list={list} isCollapse={isCollapse} translate={translate} />
            ) : null
          )}
        </List>
      ))}
    </Box>
  );
}
