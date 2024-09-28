import { CloseCircleOutlined } from '@ant-design/icons';
import * as Sentry from '@sentry/react';
import { Result, Typography } from 'antd';
import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { AppContext } from './AppContext';
import Error404 from './Error404';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import App from './app/App';
import {
  ERROR_PAGE_SUBTITLE,
  ERROR_PAGE_TITLE,
  ROUTES
} from './common/constants';
import LoaderComponent from './components/LoaderComponent';
import MaintenancePage from './components/MaintenancePage';
import history from './historyData';
import Dashboard from './modules/Dashboard/Dashboard';
import ForgetPassword from './modules/auth/ForgetPassword';
import Login from './modules/auth/Login';
import Logout from './modules/auth/Logout';
import RefreshToken from './modules/auth/RefreshToken';
import ResetPassword from './modules/auth/ResetPassword';
import Signup from './modules/auth/Signup';
import Profile from './modules/profile/Profile';

const { Paragraph } = Typography;

const MyFallbackComponent = ({ error, componentStack }) => (
  <Result
    status="error"
    title={ERROR_PAGE_TITLE}
    subTitle={ERROR_PAGE_SUBTITLE}
  >
    <div className="desc">
      <Paragraph>
        <Typography.Title level={4}> Error:</Typography.Title>
      </Paragraph>
      <Paragraph>
        <CloseCircleOutlined className="site-result-demo-error-icon" /> Your{' '}
        {error?.message?.toString()}
      </Paragraph>
      <Paragraph>
        <Typography.Title level={4}> Stacktrace:</Typography.Title>
      </Paragraph>
      <Paragraph>
        <CloseCircleOutlined className="site-result-demo-error-icon" /> Your{' '}
        {componentStack}
      </Paragraph>
    </div>
  </Result>
);

const RoutesCollection = () => {
  const AUTH_MODULES = [
    {
      path: ROUTES?.LOGIN,
      element: <PublicRoute />,
      // Nested routes use a children property
      children: [{ path: ROUTES?.LOGIN, element: <Login /> }]
    },
    {
      path: ROUTES?.FORGET_PASSWORD,
      element: <PublicRoute />,
      children: [{ path: ROUTES?.FORGET_PASSWORD, element: <ForgetPassword /> }]
    },
    {
      path: ROUTES?.SIGNUP,
      element: <PublicRoute />,
      children: [{ path: ROUTES?.SIGNUP, element: <Signup /> }]
    },
    {
      path: ROUTES?.RESET,
      element: <PublicRoute />,
      children: [{ path: ROUTES?.RESET, element: <ResetPassword /> }]
    },
    {
      path: ROUTES?.LOGOUT,
      element: <PrivateRoute />,
      children: [{ path: ROUTES?.LOGOUT, element: <Logout /> }]
    },
    {
      path: ROUTES?.AUTHENTICATION,
      element: <PrivateRoute />,
      children: [{ path: ROUTES?.AUTHENTICATION, element: <RefreshToken /> }]
    }
  ];

  const DASHBOARD_MODULES = [
    {
      path: ROUTES?.MAIN,
      element: <PrivateRoute />,
      children: [
        {
          path: ROUTES?.MAIN,
          element: <App />,
          children: [{ path: ROUTES?.MAIN, element: <Dashboard /> }]
        }
      ]
    }
  ];

  const USER_MODULES = [
    {
      path: ROUTES?.MAIN,
      element: <PrivateRoute />,
      children: [
        {
          path: ROUTES?.MAIN,
          element: <App />,
          children: [
            {
              path: ROUTES?.PROFILE,
              element: <Profile />
            }
          ]
        }
      ]
    }
  ];

  const OTHER_MODULES = [
    {
      path: ROUTES?.MAIN,
      element: <PrivateRoute />,
      children: [
        {
          path: ROUTES?.MAIN,
          element: <App />,
          children: [
            {
              path: '*',
              element: <Error404 />
            }
          ]
        }
      ]
    }
  ];

  const element = useRoutes([
    ...AUTH_MODULES,
    ...DASHBOARD_MODULES,
    ...USER_MODULES,
    ...OTHER_MODULES
  ]);
  return element;
};

const RoutesWrapper = () => {
  const { initializeAuth, getToken } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const path = history?.location?.pathname;
  const idToken = getToken();

  // const [getCurrentUser] = useLazyQuery(GET_CURRENT_USER, {
  //   fetchPolicy: 'network-only',
  //   onCompleted: (res) => {
  //     initializeAuth(idToken, res?.getCurrentUser);
  //     setLoading(false);
  //   },
  //   onError: () => {
  //     history?.push(ROUTES?.LOGOUT);
  //     setLoading(false);
  //   }
  // });

  // useEffect(() => {
  //   if (path === ROUTES?.LOGOUT || idToken) {
  //     getCurrentUser();
  //   } else {
  //     setLoading(false);
  //   }

  //   // Below line is disabling Eslint auto fix we don't want any value in use effect array
  //   // We want to call initializeAuth once. Please add this line while you working with hooks and you want to call it once.
  //   // eslint-disable-next-line
  // }, []);

  // use this variable from envs so that we can able to run maintenance page on runtime.
  const maintenance = process.env.REACT_APP_MAINTENANCE_ENABLE;

  if (loading) return <LoaderComponent />;
  return (
    <Sentry.ErrorBoundary fallback={MyFallbackComponent}>
      <Router>
        {maintenance === 'true' ? <MaintenancePage /> : <RoutesCollection />}
      </Router>
    </Sentry.ErrorBoundary>
  );
};
export default RoutesWrapper;
