import { useCallback, useEffect, useMemo, useState, useContext } from 'react';
import { cloneDeep, debounce } from 'lodash';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Card, Button, Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
import useLocales from '../../hooks/useLocales';
import { AuthContext } from '../../contexts/JWTContext';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Searchbar from '../../components/widgets/Searchbar';
import TableWidget from '../../components/table/TableWidget';
import DeleteModal from '../../components/widgets/DeleteModal';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getCameras, deleteCamera } from '../../redux/slices/cameras';
// sections
import { CAMERA_TABLE_META } from './CameraConstants';
import { CameraListMenu } from '../../sections/cameras';
import { ADMIN_ROLE } from '../../layouts/dashboard/navbar/NavConfig';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const CameraList = () => {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { translate } = useLocales();
  const [params, setParams] = useState({
    name: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [recordId, setRecordId] = useState(null);
  const { cameraDataList, isLoading } = useSelector((state) => state.cameras);
  const authContext = useContext(AuthContext);

  const getCameraData = useCallback(
    async (queryParams = {}) => {
      try {
        const payload = { ...params, name: queryParams?.name || '' };
        delete queryParams.name;
        await dispatch(getCameras(queryParams, payload));
      } catch (err) {
        console.error(err);
      }
    },
    [dispatch]
  );

  const searchHandler = (searchStr) => {
    const searchParams = {
      name: '',
    };
    if (searchStr.length > 0) {
      searchParams.name = searchStr;
    }
    setParams(searchParams);
    // getCameraData({}, searchParams);
  };

  const debounceSearchHandler = useCallback(debounce(searchHandler, 1000), []);

  const handleQueryChange = (value) => {
    debounceSearchHandler(value);
  };

  const showWarningModal = (id) => {
    setRecordId(id);
    setShowModal(true);
  };

  const handleDelete = useCallback(
    async (cameraId) => {
      try {
        await dispatch(deleteCamera(cameraId));
        await getCameraData();
        setShowModal(false);
      } catch (err) {
        console.error(err);
      }
    },
    [dispatch]
  );

  const tableMetaData = useMemo(() => {
    const metaData = cloneDeep(CAMERA_TABLE_META);
    metaData.columns[metaData.columns.length - 1] = ADMIN_ROLE.includes(authContext?.user?.role)
      ? {
          text: '',
          dataKey: 'publicId',
          type: 'widget',
          renderWidget: (col, cellData, value) => (
            <CameraListMenu onDelete={() => showWarningModal(value)} cameraId={value} translate={translate} />
          ),
        }
      : {};
    return metaData;
  }, []);
  return (
    <Page title={translate('app.camera-list-header-label')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={translate('app.camera-list-header-label')}
          links={[
            { name: `${translate('app.dashboard-header-label')}`, href: PATH_DASHBOARD.root },
            { name: `${translate('app.alert-cameras-label')}` },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.cameras.new}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              {translate('app.alert-new-camera-label')}
            </Button>
          }
        />
        <Card>
          <Searchbar placeholder={translate('app.alert-search-txt-label')} onSearchTextChange={handleQueryChange} />
          <TableWidget
            tableMetaData={tableMetaData}
            tableData={cameraDataList}
            callback={getCameraData}
            isLoading={isLoading}
            params={params}
          />
        </Card>
      </Container>
      <DeleteModal
        isOpen={showModal}
        handleClose={() => setShowModal(false)}
        type="Camera"
        recordId={recordId}
        handleDelete={handleDelete}
      />
    </Page>
  );
};

export default CameraList;
