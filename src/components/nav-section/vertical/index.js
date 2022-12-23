import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { List, Box, ListSubheader } from '@mui/material';
//
import React from 'react';
import { NavListRoot } from './NavList';
import useAuth from '../../../hooks/useAuth';

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
  const { user } = useAuth();

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
            !list.role || list.role.includes(user?.role) ? ( // check if user has access to the group item
              <NavListRoot key={list.title} list={list} isCollapse={isCollapse} translate={translate} />
            ) : null
          )}
        </List>
      ))}
    </Box>
  );
}
