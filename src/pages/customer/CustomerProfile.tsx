
import React from 'react';
import { Card, Typography, Form, Input, Button, Avatar, Upload, Row, Col, Divider, message } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined, UploadOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/context/AuthContext';
import MainLayout from '@/components/Layout/MainLayout';

const { Title, Text } = Typography;

const CustomerProfile: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  
  const onFinish = (values: any) => {
    console.log('Profile update:', values);
    message.success(t('profile_updated_successfully'));
  };

  return (
    <MainLayout>
      <Title level={2}>{t('my_profile')}</Title>
      
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <Avatar size={100} src={user?.avatar} icon={<UserOutlined />} />
              <Title level={4} style={{ marginTop: 16, marginBottom: 4 }}>{user?.name || 'User Name'}</Title>
              <Text type="secondary">{t('customer')}</Text>
              
              <Divider />
              
              <Upload
                name="avatar"
                showUploadList={false}
                beforeUpload={() => false}
                onChange={() => message.info(t('avatar_upload_clicked'))}
              >
                <Button icon={<UploadOutlined />}>{t('change_avatar')}</Button>
              </Upload>
            </div>
            
            <div>
              <p>
                <MailOutlined style={{ marginRight: 8 }} />
                {user?.email || 'user@example.com'}
              </p>
              <p>
                <PhoneOutlined style={{ marginRight: 8 }} />
                {user?.phone || '+92 XXX XXXXXXX'}
              </p>
              <p>
                <EnvironmentOutlined style={{ marginRight: 8 }} />
                Karachi, Pakistan
              </p>
            </div>
          </Card>
        </Col>
        
        <Col xs={24} md={16}>
          <Card title={t('edit_profile')}>
            <Form
              layout="vertical"
              initialValues={{ 
                name: user?.name || '',
                email: user?.email || '',
                phone: user?.phone || '',
                address: '',
                city: 'Karachi',
                postalCode: ''
              }}
              onFinish={onFinish}
            >
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="name"
                    label={t('full_name')}
                    rules={[{ required: true, message: t('please_enter_your_name') }]}
                  >
                    <Input prefix={<UserOutlined />} />
                  </Form.Item>
                </Col>
                
                <Col xs={24} md={12}>
                  <Form.Item
                    name="email"
                    label={t('email')}
                    rules={[
                      { required: true, message: t('please_enter_your_email') },
                      { type: 'email', message: t('please_enter_valid_email') }
                    ]}
                  >
                    <Input prefix={<MailOutlined />} />
                  </Form.Item>
                </Col>
              </Row>
              
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="phone"
                    label={t('phone_number')}
                    rules={[{ required: true, message: t('please_enter_your_phone') }]}
                  >
                    <Input prefix={<PhoneOutlined />} />
                  </Form.Item>
                </Col>
                
                <Col xs={24} md={12}>
                  <Form.Item
                    name="address"
                    label={t('address')}
                  >
                    <Input prefix={<EnvironmentOutlined />} />
                  </Form.Item>
                </Col>
              </Row>
              
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="city"
                    label={t('city')}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                
                <Col xs={24} md={12}>
                  <Form.Item
                    name="postalCode"
                    label={t('postal_code')}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {t('update_profile')}
                </Button>
              </Form.Item>
            </Form>
          </Card>
          
          <Card title={t('security')} style={{ marginTop: 24 }}>
            <Form layout="vertical">
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="currentPassword"
                    label={t('current_password')}
                    rules={[{ required: true, message: t('please_enter_current_password') }]}
                  >
                    <Input.Password />
                  </Form.Item>
                </Col>
              </Row>
              
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="newPassword"
                    label={t('new_password')}
                    rules={[{ required: true, message: t('please_enter_new_password') }]}
                  >
                    <Input.Password />
                  </Form.Item>
                </Col>
                
                <Col xs={24} md={12}>
                  <Form.Item
                    name="confirmPassword"
                    label={t('confirm_password')}
                    rules={[
                      { required: true, message: t('please_confirm_new_password') },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('newPassword') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error(t('passwords_do_not_match')));
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                </Col>
              </Row>
              
              <Form.Item>
                <Button type="primary" onClick={() => message.success(t('password_updated'))}>
                  {t('update_password')}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default CustomerProfile;
