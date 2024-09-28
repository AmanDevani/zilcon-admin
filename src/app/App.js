import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../AppContext';
import { BREAKPOINTS } from '../common/constants';
import RouterPrompt from '../components/RouterPrompt';
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import PageHeader from './components/PageHeader';
import AppHeader from './components/header/AppHeader';

const { Content, Sider } = Layout;

function App() {
  const {
    state: { showPrompt }
  } = useContext(AppContext);
  const [isDesktop, setDesktop] = useState(
    // eslint-disable-next-line no-undef
    window.innerWidth > BREAKPOINTS.tablet
  );
  const [collapsed, setCollapsed] = useState(false);
  const [isActive, setActive] = useState(false);

  const handleOverlay = () => {
    setActive(!isActive);
  };
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  const GetTriggerIcon = () => {
    if (collapsed) {
      return <MenuUnfoldOutlined />;
    }
    return <MenuFoldOutlined />;
  };

  useEffect(() => {
    const updateMedia = () => {
      // eslint-disable-next-line no-undef
      setDesktop(window.innerWidth > BREAKPOINTS.tablet);
    };
    // eslint-disable-next-line no-undef
    window.addEventListener('resize', updateMedia);
    // eslint-disable-next-line no-undef
    return () => window.removeEventListener('resize', updateMedia);
  });

  return (
    <Layout hasSider>
      <RouterPrompt openPrompt={showPrompt} />
      {!isDesktop && (
        <span
          className={isActive ? 'active overlay-responsive' : 'd-hide'}
          onClick={handleOverlay}
        />
      )}
      <Sider
        theme="light"
        width={197}
        trigger={GetTriggerIcon()}
        collapsible
        onCollapse={toggle}
        collapsed={isDesktop ? collapsed : false}
        className={isActive ? 'close' : null}
        breakpoint="lg"
      >
        <Sidebar collapsed={collapsed} />
      </Sider>
      <Layout className="site-layout">
        <Content className="wrapper">
          <AppHeader>
            <PageHeader />
          </AppHeader>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
