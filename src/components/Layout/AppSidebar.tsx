
import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import { Link, useLocation, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/context/AuthContext';
import {
  DashboardOutlined,
  CalendarOutlined,
  UserOutlined,
  SettingOutlined,
  BellOutlined,
  DollarOutlined,
  StarOutlined,
  BarChartOutlined,
  FileOutlined,
  MessageOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { useMediaQuery } from '@/hooks/use-mobile';

const { Sider } = Layout;

const AppSidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();
  const { user } = useAuth();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  const isProvider = user?.role === 'provider';

  const customerMenuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: <NavLink to="/customer/dashboard">{t('dashboard')}</NavLink>,
    },
    {
      key: 'bookings',
      icon: <CalendarOutlined />,
      label: <NavLink to="/customer/bookings">{t('bookings')}</NavLink>,
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: <NavLink to="/customer/profile">{t('profile')}</NavLink>,
    },
    {
      key: 'notifications',
      icon: <BellOutlined />,
      label: <NavLink to="/customer/notifications">{t('notifications')}</NavLink>,
    },
    {
      key: 'payment-methods',
      icon: <DollarOutlined />,
      label: <NavLink to="/customer/payment-methods">{t('payment_methods')}</NavLink>,
    },
    {
      key: 'service-history',
      icon: <FileOutlined />,
      label: <NavLink to="/customer/service-history">{t('service_history')}</NavLink>,
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: <NavLink to="/customer/settings">{t('settings')}</NavLink>,
    },
    {
      key: 'help',
      icon: <QuestionCircleOutlined />,
      label: <NavLink to="/customer/help">{t('help')}</NavLink>,
    },
  ];

  const providerMenuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: <NavLink to="/provider/dashboard">{t('dashboard')}</NavLink>,
    },
    {
      key: 'bookings',
      icon: <CalendarOutlined />,
      label: <NavLink to="/provider/bookings">{t('bookings')}</NavLink>,
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: <NavLink to="/provider/profile">{t('profile')}</NavLink>,
    },
    {
      key: 'earnings',
      icon: <DollarOutlined />,
      label: <NavLink to="/provider/earnings">{t('earnings')}</NavLink>,
    },
    {
      key: 'reviews',
      icon: <StarOutlined />,
      label: <NavLink to="/provider/reviews">{t('reviews')}</NavLink>,
    },
    {
      key: 'analytics',
      icon: <BarChartOutlined />,
      label: <NavLink to="/provider/analytics">{t('analytics')}</NavLink>,
    },
    {
      key: 'messages',
      icon: <MessageOutlined />,
      label: <NavLink to="/provider/messages">{t('messages')}</NavLink>,
    },
    {
      key: 'notifications',
      icon: <BellOutlined />,
      label: <NavLink to="/provider/notifications">{t('notifications')}</NavLink>,
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: <NavLink to="/provider/settings">{t('settings')}</NavLink>,
    },
    {
      key: 'help',
      icon: <QuestionCircleOutlined />,
      label: <NavLink to="/provider/help">{t('help')}</NavLink>,
    },
  ];

  const menuItems = isProvider ? providerMenuItems : customerMenuItems;
  
  const getCurrentKey = () => {
    const path = location.pathname.split('/');
    if (path.length > 2) {
      return path[2];
    }
    return 'dashboard';
  };
  
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      breakpoint="lg"
      collapsedWidth={isMobile ? 0 : 80}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'sticky',
        top: 0,
        left: 0,
        background: 'white',
        boxShadow: '2px 0 8px rgba(0,0,0,0.06)',
      }}
      theme="light"
    >
      <div style={{ padding: 16, textAlign: 'center' }}>
        <h2 style={{ color: '#7a2df7', margin: 0, fontSize: collapsed ? 14 : 24 }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            {collapsed ? 'K' : t('app_name')}
          </Link>
        </h2>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[getCurrentKey()]}
        style={{ borderRight: 0 }}
        items={menuItems}
      />
    </Sider>
  );
};

export default AppSidebar;
