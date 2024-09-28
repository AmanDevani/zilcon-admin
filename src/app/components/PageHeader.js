import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import BreadCrumb from '../../components/BreadCrumb';

const PageHeader = () => {
  const [isActive, setActive] = useState(false);

  const handleOverlay = () => {
    setActive(!isActive);
  };

  useEffect(() => {
    if (isActive) {
      // eslint-disable-next-line no-undef
      document.body.style.overflow = 'hidden';
      // eslint-disable-next-line no-undef
      document.querySelector('.ant-layout-sider').classList.add('close');
    } else {
      // eslint-disable-next-line no-undef
      document.body.style.overflow = 'unset';
      // eslint-disable-next-line no-undef
      document.querySelector('.ant-layout-sider').classList.remove('close');
    }
  }, [isActive]);
  return (
    <div className="page-header">
      <span
        className={
          isActive ? 'active overlay-responsive' : 'overlay-disable d-hide'
        }
        onClick={handleOverlay}
      />
      <div className="d-hide">
        <Button
          className="trigger text-btn"
          type="text"
          onClick={handleOverlay}
          icon={<MenuOutlined size={25} />}
          size="middle"
        />
      </div>
    </div>
  );
};

export default PageHeader;
