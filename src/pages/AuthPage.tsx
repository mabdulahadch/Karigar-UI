
import React, { useState, useEffect } from 'react';
import { 
  Layout, 
  Form, 
  Input, 
  Button, 
  Tabs, 
  Divider, 
  Space, 
  Typography, 
  Select,
  Row,
  Col,
  Checkbox,
  Card
} from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined, GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/context/AuthContext';

const { Content } = Layout;
const { Title } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const AuthPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('login');
  const { t } = useTranslation();
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Check if redirected with state that specifies which tab to show
    if (location.state && location.state.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const handlePhoneVerification = () => {
    // Simulate phone verification
    setIsPhoneVerified(true);
  };

  const handleLogin = (values: any) => {
    console.log('Login:', values);
    // Create mock user for login
    const userData = {
      id: '1',
      name: 'Customer User',
      email: values.email,
      role: 'customer'
    };
    login(userData);
    console.log('Navigating to customer dashboard', userData);
    navigate('/customer/dashboard');
  };

  const handleRegister = (values: any) => {
    console.log('Register:', values);
    // Create mock user for registration
    const userData = {
      id: '2',
      name: 'Provider User',
      email: values.email,
      role: 'provider'
    };
    login(userData);
    console.log('Navigating to provider dashboard', userData);
    // Make sure we navigate to the provider dashboard correctly
    navigate('/provider/dashboard');
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 80 }}>
        <Option value="1">+1</Option>
        <Option value="86">+86</Option>
        <Option value="92">+92</Option>
      </Select>
    </Form.Item>
  );

  // Update the OTP input section to use Ant Design's Input components properly
  // Replace the InputOTP component with a series of standard inputs or an appropriate alternative

  const OtpVerification = ({ phone, onVerify }: { phone: string, onVerify: () => void }) => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const { t } = useTranslation();
    
    const handleChange = (value: string, index: number) => {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    };
    
    return (
      <div className="flex flex-col items-center gap-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">{t('verify_phone')}</h2>
          <p className="text-gray-600 mt-2">
            {t('otp_sent_to')} {phone}
          </p>
        </div>
        
        <div className="flex gap-2 justify-center">
          {otp.map((digit, index) => (
            <Input
              id={`otp-${index}`}
              key={index}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className="w-12 h-12 text-center text-lg"
              maxLength={1}
              autoFocus={index === 0}
            />
          ))}
        </div>
        
        <div className="mt-4">
          <Button type="primary" size="large" onClick={onVerify}>
            {t('verify')}
          </Button>
        </div>
        
        <p className="text-sm">
          {t('didnt_receive_code')}{' '}
          <Button type="link" className="p-0">
            {t('resend')}
          </Button>
        </p>
      </div>
    );
  };

  return (
    <Layout className="bg-white">
      <Content className="flex justify-center items-center h-screen">
        <Card className="w-full max-w-md p-8 shadow-md rounded-lg">
          <div className="text-center mb-6">
            <Title level={2} className="text-3xl font-semibold text-gray-800">
              {t('welcome_back')}
            </Title>
            <p className="text-gray-600">{t('login_register_prompt')}</p>
          </div>
          <Tabs defaultActiveKey="login" centered onChange={handleTabChange}>
            <TabPane tab={t('login')} key="login">
              <Form
                name="login"
                initialValues={{ remember: true }}
                onFinish={handleLogin}
                className="space-y-4"
              >
                <Form.Item
                  name="email"
                  rules={[{ required: true, message: t('email_required') }]}
                >
                  <Input prefix={<UserOutlined className="text-gray-400" />} placeholder={t('email')} size="large" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: t('password_required') }]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="text-gray-400" />}
                    placeholder={t('password')}
                    size="large"
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="w-full" size="large">
                    {t('login')}
                  </Button>
                </Form.Item>
                <div className="text-center">
                  <Link to="#" className="text-blue-500">
                    {t('forgot_password')}
                  </Link>
                </div>
              </Form>
              <Divider>{t('or')}</Divider>
              <Space direction="vertical" size="middle" className="w-full">
                <Button
                  icon={<GoogleOutlined />}
                  className="w-full"
                  size="large"
                >
                  {t('login_with_google')}
                </Button>
                <Button
                  icon={<FacebookOutlined />}
                  className="w-full"
                  size="large"
                >
                  {t('login_with_facebook')}
                </Button>
              </Space>
            </TabPane>
            <TabPane tab={t('register')} key="register">
              {isPhoneVerified ? (
                <Form
                  name="register"
                  initialValues={{ prefix: '92' }}
                  onFinish={handleRegister}
                  scrollToFirstError
                  className="space-y-4"
                >
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        type: 'email',
                        message: t('valid_email'),
                      },
                      {
                        required: true,
                        message: t('email_required'),
                      },
                    ]}
                  >
                    <Input prefix={<UserOutlined className="text-gray-400" />} placeholder={t('email')} size="large" />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: t('password_required'),
                      },
                      {
                        min: 8,
                        message: t('password_min_length'),
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password
                      prefix={<LockOutlined className="text-gray-400" />}
                      placeholder={t('password')}
                      size="large"
                    />
                  </Form.Item>
                  <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: t('confirm_password_required'),
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error(t('confirm_password_match')));
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined className="text-gray-400" />}
                      placeholder={t('confirm_password')}
                      size="large"
                    />
                  </Form.Item>
                  <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                      {
                        validator: (_, value) =>
                          value ? Promise.resolve() : Promise.reject(new Error(t('agreement_required'))),
                      },
                    ]}
                  >
                    <Checkbox>
                      {t('i_have_read_and_agree_to_the')}{' '}
                      <Link to="#">{t('terms_of_service')}</Link>
                    </Checkbox>
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full" size="large">
                      {t('register')}
                    </Button>
                  </Form.Item>
                </Form>
              ) : (
                <Form
                  name="phoneVerification"
                  initialValues={{ prefix: '92' }}
                  onFinish={() => handlePhoneVerification()}
                  className="space-y-4"
                >
                  <Form.Item
                    name="phone"
                    rules={[
                      { required: true, message: t('phone_required') },
                      {
                        pattern: /^[0-9\b]+$/,
                        message: t('phone_number_digits_only'),
                      },
                    ]}
                  >
                    <Input
                      prefix={<PhoneOutlined className="text-gray-400" />}
                      placeholder={t('phone_number')}
                      size="large"
                      addonBefore={prefixSelector}
                      style={{ width: '100%' }}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full" size="large">
                      {t('verify_phone')}
                    </Button>
                  </Form.Item>
                </Form>
              )}
            </TabPane>
          </Tabs>
        </Card>
      </Content>
    </Layout>
  );
};

export default AuthPage;
