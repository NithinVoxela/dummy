import { expect } from "@jest/globals";
import {render as rtlRender, screen, fireEvent, waitFor} from '@testing-library/react';
import {store, persistor} from "src/redux/store"
import { act } from "react-dom/test-utils";
import { AuthProvider } from "src/contexts/JWTContext";
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { ConfirmProvider } from 'material-ui-confirm';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { SettingsProvider } from '../contexts/SettingsContext';
import { CollapseDrawerProvider } from '../contexts/CollapseDrawerContext';
import { SnackbarProvider } from "notistack"
import '../locales/i18n';
import App from "src/App";
import mock,{currentUser} from "./mocks/axiosMock"
export const render=(component)=>rtlRender(

    <AuthProvider>
    <HelmetProvider>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <SettingsProvider>
              <SnackbarProvider>
              <CollapseDrawerProvider>
                <ConfirmProvider>
                  <BrowserRouter>
                    {component}
                  </BrowserRouter>
                </ConfirmProvider>
              </CollapseDrawerProvider> 
              </SnackbarProvider>
            </SettingsProvider>
          </LocalizationProvider>
        </PersistGate>
      </ReduxProvider>
  </HelmetProvider>
     </AuthProvider>
)

export {expect,screen,fireEvent,waitFor,act,App, currentUser, mock};