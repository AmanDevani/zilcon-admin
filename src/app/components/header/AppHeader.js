import { Layout } from 'antd';
import React from 'react';

const { Header } = Layout;

function AppHeader(props) {
  const { children } = props;
  return (
    <Header className="site-layout-sub-header-background app-header">
      {children}
    </Header>
  );
}
export default AppHeader;
