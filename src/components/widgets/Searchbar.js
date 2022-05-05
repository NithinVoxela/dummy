import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Toolbar, InputAdornment } from '@mui/material';
// components
import Iconify from '../Iconify';
import InputStyle from '../InputStyle';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 84,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

// ----------------------------------------------------------------------

const Searchbar = ({ searchText, onSearchTextChange, placeholder }) => (
  <RootStyle>
    <InputStyle
      stretchStart={240}
      value={searchText}
      onChange={(event) => onSearchTextChange(event.target.value)}
      placeholder={placeholder}
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
          </InputAdornment>
        ),
      }}
    />
  </RootStyle>
);

Searchbar.propTypes = {
  searchText: PropTypes.string,
  onSearchTextChange: PropTypes.func,
  placeholder: PropTypes.string,
};

export default Searchbar;
