import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
// @mui
import { Container } from '@mui/material';
// routes
import { useCallback, useEffect } from 'react';
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
import useLocales from '../../hooks/useLocales';

// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getUserDetails, resetUserDetails, saveUser, patchUser } from '../../redux/slices/users';

// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import UserNewForm from '../../sections/users/UserNewForm';

// ----------------------------------------------------------------------

export default function UserCreate() {
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();
  const { userId = '' } = useParams();
  const { translate } = useLocales();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const isEdit = pathname.includes('edit');

  const { userDetails } = useSelector((state) => state.users);

  const getUser = useCallback(async () => {
    try {
      dispatch(getUserDetails(userId));
    } catch (err) {
      enqueueSnackbar(err?.message, {
        variant: 'error',
      });
      throw new Error(err?.message);
    }
  }, [dispatch]);

  const handleSaveUser = useCallback(
    async (payload = {}) => {
      try {
        if (!isEdit) {
          await saveUser(payload);
        } else {
          await patchUser(payload);
        }
        enqueueSnackbar(!isEdit ? translate('app.users-add-success') : translate('app.users-update-success'));
        navigate(PATH_DASHBOARD.users.list);
      } catch (err) {
        if (err?.message) {
          enqueueSnackbar(err?.message, {
            variant: 'error',
          });
        }
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (userId && isEdit) {
      getUser();
    }
  }, [userId]);

  useEffect(
    () => () => {
      dispatch(resetUserDetails());
    },
    []
  );

  const onCancel = () => {
    navigate(PATH_DASHBOARD.users.list);
  };
  const usersName = userDetails?.userName ? userDetails.userName : '';
  return (
    <Page title={`${translate('app.alert-users-label')} : ${translate('app.users-new-users-label')}`}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={
            !isEdit ? `${translate('app.users-add-header-label')}` : `${translate('app.users-edit-header-label')}`
          }
          links={[
            { name: `${translate('app.dashboard-header-label')}`, href: PATH_DASHBOARD.root },
            { name: `${translate('app.alert-users-label')}`, href: PATH_DASHBOARD.general.users },
            { name: !isEdit ? `${translate('app.users-new-users-label')}` : usersName },
          ]}
        />

        <UserNewForm
          isEdit={isEdit}
          currentUsers={userDetails}
          translate={translate}
          handleSave={handleSaveUser}
          onCancel={onCancel}
        />
      </Container>
    </Page>
  );
}
