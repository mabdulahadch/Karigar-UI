
import React, { useState } from 'react';
import { Card, Typography, Tabs, Switch, Select, Button, Form, Input, Space, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';
import MainLayout from '@/components/Layout/MainLayout';

const { Title, Text } = Typography;
const { Option } = Select;

const CustomerSettings: React.FC = () => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
  });

  const handleLanguageChange = (value: 'en' | 'ur') => {
    changeLanguage(value);
  };

  const handleNotificationChange = (type: string) => {
    setNotifications({
      ...notifications,
      [type]: !notifications[type],
    });
  };

  const handleProfileUpdate = (values: any) => {
    console.log('Profile updated:', values);
  };

  return (
    <MainLayout>
      <Title level={2}>{t('settings')}</Title>
      
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab={t('profile')} key="1">
          <Card>
            <Title level={4}>{t('profile_settings')}</Title>
            <Form
              layout="vertical"
              onFinish={handleProfileUpdate}
            >
              <Form.Item
                label={t('full_name')}
                name="fullName"
                rules={[{ required: true, message: t('please_enter_your_name') }]}
              >
                <Input placeholder={t('your_name')} />
              </Form.Item>
              <Form.Item
                label={t('email')}
                name="email"
                rules={[
                  { required: true, message: t('please_enter_your_email') },
                  { type: 'email', message: t('please_enter_a_valid_email') },
                ]}
              >
                <Input placeholder={t('your_email')} />
              </Form.Item>
              <Form.Item
                label={t('phone_number')}
                name="phoneNumber"
              >
                <Input placeholder={t('your_phone_number')} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {t('update_profile')}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Tabs.TabPane>
        
        <Tabs.TabPane tab={t('notifications')} key="2">
          <Card>
            <Title level={4}>{t('notification_settings')}</Title>
            <Space direction="vertical">
              <Space>
                <Text>{t('email_notifications')}</Text>
                <Switch checked={notifications.email} onChange={() => handleNotificationChange('email')} />
              </Space>
              <Space>
                <Text>{t('push_notifications')}</Text>
                <Switch checked={notifications.push} onChange={() => handleNotificationChange('push')} />
              </Space>
              <Space>
                <Text>{t('sms_notifications')}</Text>
                <Switch checked={notifications.sms} onChange={() => handleNotificationChange('sms')} />
              </Space>
            </Space>
          </Card>
        </Tabs.TabPane>
        
        <Tabs.TabPane tab={t('language')} key="3">
          <Card>
            <Title level={4}>{t('language_settings')}</Title>
            <Select defaultValue={language} style={{ width: 120 }} onChange={handleLanguageChange}>
              <Option value="en">English</Option>
              <Option value="ur">Urdu</Option>
            </Select>
          </Card>
        </Tabs.TabPane>
      </Tabs>
    </MainLayout>
  );
};

export default CustomerSettings;
