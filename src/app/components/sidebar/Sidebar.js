import { IdcardOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';
import { Divider, Menu } from 'antd';
import { forEach } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../../AppContext';
import { MODULES, ROUTES } from '../../../common/constants';
import UserProfile from '../header/UserProfile';
import './sidebar.less';
import useRouter from '../../../hooks/useRouter';

function Sidebar({ collapsed }) {
  const {
    state: { currentUser: { roles = [] } = null }
  } = useContext(AppContext);
  const {
    location: { pathname },
    navigate
  } = useRouter();
  const [openKeys, setOpenKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);

  const subMenus = [];

  const getOpenKeys = () => {
    const openKeysClone = openKeys;
    forEach(subMenus, (item) => {
      forEach(item?.routes, (route) => {
        if (
          route !== ROUTES?.MAIN &&
          pathname?.includes(route) &&
          !openKeysClone?.includes(item?.moduleKey)
        ) {
          openKeysClone?.push(item?.moduleKey);
          setOpenKeys(openKeysClone);
        }
      });
    });
  };

  useEffect(() => {
    getOpenKeys();
  }, [pathname]);

  // useEffect(() => {
  //   if (pathname.split('/')?.length <= 2) {
  //     setSelectedKeys(`/${pathname?.split('/')?.[1]}`);
  //   } else {
  //     setSelectedKeys(
  //       `/${pathname?.split('/')?.[1]}/${pathname?.split('/')?.[2]}`
  //     );
  //   }
  // }, [pathname]);

  const onMenuSelect = ({ key }) => {
    navigate(key);
  };

  function getItem({ label, key, icon, children, type }) {
    return {
      key,
      icon,
      children,
      label,
      type
    };
  }

  const menuItems = [
    getItem({
      label: MODULES?.DASHBOARD,
      key: ROUTES?.MAIN
    }),
    getItem({
      type: 'divider'
    }),
    getItem({
      label: MODULES?.PRODUCTS,
      key: ROUTES?.PRODUCTS
    }),
    getItem({
      type: 'divider'
    }),
    getItem({
      label: MODULES?.ORDERS,
      key: ROUTES?.ORDERS
    }),
    getItem({
      type: 'divider'
    }),
    getItem({
      label: MODULES?.CATEGORY,
      key: ROUTES?.CATEGORY
    }),
    getItem({
      type: 'divider'
    }),
    getItem({
      label: MODULES?.COUPONS,
      key: ROUTES?.COUPONS
    }),
    getItem({
      type: 'divider'
    }),
    getItem({
      label: MODULES?.REVIEWS,
      key: ROUTES?.REVIEWS
    }),
    getItem({
      type: 'divider'
    }),
    getItem({
      label: MODULES?.PAYMENTS,
      key: ROUTES?.PAYMENTS
    }),
    getItem({
      type: 'divider'
    }),
    getItem({
      label: MODULES?.USERS,
      key: ROUTES?.USERS
    }),
    getItem({
      type: 'divider'
    })
  ];

  const profileItems = [
    getItem({
      label: <UserProfile collapsed={collapsed} />,
      key: MODULES?.PROFILE,
      children: [
        getItem({
          label: <Link to={ROUTES?.PROFILE}>My Profile</Link>,
          key: ROUTES?.PROFILE,
          icon: <IdcardOutlined />
        }),
        getItem({
          label: <Link to={ROUTES?.LOGOUT}>Logout</Link>,
          key: ROUTES?.LOGOUT,
          icon: <LoginOutlined />
        })
      ]
    })
  ];

  return (
    <div className="sidebar">
      <img
        onClick={() => navigate(ROUTES?.MAIN)}
        src={collapsed ? '/logo.png' : '/favicon-144x144.png'}
        className={`sidebar-logo ${collapsed ? 'collapsed' : ''}`}
        alt="sidebar logo"
      />
      <Divider className="logo-divider" />
      <div className="sidebar-scroll">
        <Menu
          className="menu-bar"
          theme="light"
          mode="inline"
          selectedKeys={[`/${pathname?.split('/')?.[1]}`]}
          defaultSelectedKeys={[ROUTES?.MAIN]}
          items={menuItems}
          inlineIndent={0}
          // openKeys={openKeys}
          onOpenChange={(openKeysArray) => {
            setOpenKeys(openKeysArray);
          }}
          onClick={onMenuSelect}
        />
      </div>
      <div className="profile-menu">
        <Menu
          className="profile-bar"
          theme="light"
          selectedKeys={[`/${pathname?.split('/')?.[1]}`]}
          items={profileItems}
        />
      </div>
    </div>
  );
}

export default Sidebar;
