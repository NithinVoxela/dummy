// @mui
// utils

// redux
import { useSelector } from '../../redux/store';

// components
import Label from '../../components/Label';

// ----------------------------------------------------------------------

export default function AlertCountLabel() {
  const { alertCountDataList } = useSelector((state) => state.alerts);

  return (
    alertCountDataList?.total > 0 && (
      <Label variant="ghost" color="error">
        {alertCountDataList.total > 99 ? '+99' : alertCountDataList.total}
      </Label>
    )
  );
}

// ----------------------------------------------------------------------

AlertCountLabel.propTypes = {};
