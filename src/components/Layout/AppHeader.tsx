
import React from 'react';
import { Layout, Menu, Button, Dropdown, Avatar, Space, Badge, Input, Select } from 'antd';
import { BellOutlined, UserOutlined, SearchOutlined, GlobalOutlined, MenuOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useMediaQuery } from '@/hooks/use-mobile';

const { Header } = Layout;
const { Option } = Select;

const AppHeader: React.FC = () => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();
  const { user, logout, isAuthenticated } = useAuth();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();

  const languageOptions = [
    { value: 'en', label: t('english') },
    { value: 'ur', label: t('urdu') },
  ];

  const userMenuItems = [
    {
      key: 'profile',
      label: <Link to={`/${user?.role}/profile`}>{t('profile')}</Link>,
    },
    {
      key: 'dashboard',
      label: <Link to={`/${user?.role}/dashboard`}>{t('dashboard')}</Link>,
    },
    {
      key: 'settings',
      label: <Link to={`/${user?.role}/settings`}>{t('settings')}</Link>,
    },
    {
      key: 'logout',
      label: <span onClick={() => {
        logout();
        navigate('/');
      }}>{t('logout')}</span>,
    },
  ];

  const handleLoginClick = () => {
    navigate('/auth', { state: { activeTab: 'login' } });
  };

  const handleRegisterClick = () => {
    // Explicitly set the state to trigger the register tab
    navigate('/auth', { state: { activeTab: 'register' } });
  };

  return (
    <Header style={{ background: '#fff', padding: '0 16px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {isMobile && (
          <Button icon={<MenuOutlined />} style={{ marginRight: 16 }} />
        )}
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <h1 style={{ margin: 0, color: '#7a2df7', fontWeight: 'bold' }}>{t('app_name')}</h1>
        </Link>
      </div>

      {!isMobile && (
        <div style={{ flex: 1, maxWidth: 500, margin: '0 48px' }}>
          <Input
            size="large"
            placeholder={t('search_placeholder')}
            prefix={<SearchOutlined />}
            style={{ borderRadius: 8 }}
          />
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <Select
          defaultValue={language}
          style={{ width: isMobile ? 80 : 120 }}
          onChange={(value) => changeLanguage(value as 'en' | 'ur')}
          dropdownMatchSelectWidth={false}
        >
          {languageOptions.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>

        {isAuthenticated ? (
          <Space>
            <Badge count={5}>
              <Button shape="circle" icon={<BellOutlined />} />
            </Badge>
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Avatar 
                style={{ cursor: 'pointer', backgroundColor: '#7a2df7' }}
                src={user?.avatar}
                icon={!user?.avatar ? <UserOutlined /> : undefined}
              />
            </Dropdown>
          </Space>
        ) : (
          <Space>
            <Button type="text" onClick={handleLoginClick}>{t('login')}</Button>
            <Button type="primary" onClick={handleRegisterClick}>{t('register')}</Button>
          </Space>
        )}
      </div>
    </Header>
  );
};

export default AppHeader;
