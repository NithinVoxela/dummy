import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import RtlLayout from './components/RtlLayout';
import { ChartStyle } from './components/chart';
import ScrollToTop from './components/ScrollToTop';
import { ProgressBarStyle } from './components/ProgressBar';
import NotistackProvider from './components/NotistackProvider';
import ThemeColorPresets from './components/ThemeColorPresets';
import ThemeLocalization from './components/ThemeLocalization';
import MotionLazyContainer from './components/animate/MotionLazyContainer';
import { Notification } from "./components/toastify";
import { getToken, onMessageListener } from "./firebase";

// ----------------------------------------------------------------------

export default function App() {
  getToken();

  const notify = (notification) => toast(<Notification notification={notification} />);

  onMessageListener()
    .then(payload => {
      notify(payload);
    })
    .catch(err => console.log("failed: ", err));

  return (
    <ThemeProvider>
      <ThemeColorPresets>
        <ThemeLocalization>
          <RtlLayout>
            <NotistackProvider>
              <MotionLazyContainer>
                <ToastContainer hideProgressBar newestOnTop />
                <ProgressBarStyle />
                <ChartStyle />
                {/* <Settings /> */}
                <ScrollToTop />
                <Router />
              </MotionLazyContainer>
            </NotistackProvider>
          </RtlLayout>
        </ThemeLocalization>
      </ThemeColorPresets>
    </ThemeProvider>
  );
}
