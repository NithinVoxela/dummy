import PropTypes from 'prop-types';
// @mui
import { Box, Card, Typography } from '@mui/material';
// utils
import { fNumber } from '../../utils/formatNumber';
// components

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

AppWidgetSummary.propTypes = {
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default function AppWidgetSummary({ title, total }) {

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="h3">{fNumber(total)}</Typography>
      </Box>      
    </Card>
  );
}
