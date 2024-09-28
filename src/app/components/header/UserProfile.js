import { Avatar, Space, Typography } from 'antd';
import React, { useContext } from 'react';
import { AppContext } from '../../../AppContext';

const { Paragraph } = Typography;

const UserProfile = (props) => {
  const { collapsed } = props;
  const { getCurrentUser } = useContext(AppContext);
  const { firstName = '', lastName = '' } = getCurrentUser() || {};

  return (
    <Space className="pointer">
      <Avatar
        alt="Avatar"
        size="small"
      >{`${firstName?.[0]}${lastName?.[0]}`}</Avatar>
      <Paragraph
        title={`${firstName} ${lastName && lastName}`}
        ellipsis
        className={collapsed ? 'display-none' : 'profile-name'}
      >
        {`${firstName} ${lastName && lastName}`}
      </Paragraph>
    </Space>
  );
};

export default UserProfile;
