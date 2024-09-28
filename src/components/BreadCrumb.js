import { Breadcrumb } from 'antd';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles/breadCrumb.less';

const BreadCrumb = ({ menu, noNavigation = false }) => {
  const location = useLocation();
  const breadCrumbView = () => {
    const { pathname } = location;
    const pathnames = pathname?.split('/')?.filter((item) => item);
    const smallCase = (s) =>
      s?.charAt(0)?.toUpperCase() + s?.slice(1)?.toLowerCase();
    const capitalize = (s) => s?.charAt(0)?.toUpperCase() + s?.slice(1);

    const renderItems = () => {
      const items = [];
      if (menu?.length > 0) {
        if (pathnames && pathnames?.length > 0) {
          items?.push({ className: 'clickable', title: smallCase(menu) });
        } else {
          items?.push({ className: 'active', title: smallCase(menu) });
        }
      }
      if (pathnames) {
        pathnames?.forEach((item, index) => {
          const routeTo = `/${pathnames?.slice(0, index + 1)?.join('/')}`;
          const isLast = index === pathnames.length - 1;
          const showTitle =
            (pathnames?.includes('edit') && index !== 0) || noNavigation;
          items?.push({
            title:
              isLast || showTitle ? (
                capitalize(item)
              ) : (
                <Link className="clickable" to={`${routeTo}`}>
                  {capitalize(item)}
                </Link>
              ),
            className: isLast ? 'active' : 'clickable'
          });
        });
      }
      return items;
    };

    return (
      <div>
        <Breadcrumb items={renderItems()} className="breadcrumb-item" />
      </div>
    );
  };

  return <>{breadCrumbView()}</>;
};

export default BreadCrumb;
