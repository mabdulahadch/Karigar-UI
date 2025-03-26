
import React from 'react';
import { Layout, ConfigProvider, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';
import AppFooter from './AppFooter';

const { Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, showSidebar = true }) => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  return (
    <ConfigProvider
      direction={language === 'ur' ? 'rtl' : 'ltr'}
      theme={{
        token: {
          colorPrimary: '#7a2df7',
          colorSuccess: '#52c41a',
          colorWarning: '#faad14',
          colorError: '#f5222d',
          colorInfo: '#1890ff',
          borderRadius: 8,
          fontFamily: 'Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
        },
        components: {
          Button: {
            borderRadius: 8,
            controlHeight: 40,
          },
          Input: {
            borderRadius: 8,
          },
          Card: {
            borderRadius: 12,
          },
        },
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        {showSidebar && <AppSidebar />}
        <Layout>
          <AppHeader />
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', borderRadius: 12 }}>
            {children}
          </Content>
          <AppFooter />
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default MainLayout;
