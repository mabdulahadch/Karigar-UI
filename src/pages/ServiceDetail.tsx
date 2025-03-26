
import React, { useState } from 'react';
import { 
  Typography, 
  Row, 
  Col, 
  Card, 
  Button, 
  Tag, 
  Rate, 
  Avatar, 
  Space, 
  Carousel, 
  Tabs, 
  List, 
  Divider, 
  Form,
  Input,
  DatePicker,
  TimePicker,
  Select,
  Descriptions,
  Radio,
  Checkbox
} from 'antd';
import { 
  ClockCircleOutlined, 
  EnvironmentOutlined, 
  UserOutlined, 
  CheckCircleOutlined,
  DollarOutlined,
  CalendarOutlined,
  StarOutlined,
  PhoneOutlined,
  MessageOutlined,
  HeartOutlined,
  ShareAltOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;

interface ServiceDetail {
  id: string;
  title: string;
  category: string;
  images: string[];
  description: string;
  price: string;
  rating: number;
  reviewCount: number;
  provider: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    reviewCount: number;
    completedJobs: number;
    verified: boolean;
    location: string;
  };
  serviceOptions: {
    id: string;
    title: string;
    price: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

const ServiceDetail: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('details');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [form] = Form.useForm();
  
  const serviceData: ServiceDetail = {
    id: '1',
    title: 'Professional Plumbing Services',
    category: 'Plumbing',
    images: [
      'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
      'https://images.unsplash.com/photo-1535957998253-26ae1ef29506?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80',
    ],
    description: `Professional plumbing services for all your residential needs. I specialize in:

- Leak detection and repair
- Drain cleaning and unclogging
- Fixture installation and replacement
- Pipe installation and repair
- Water heater installation and maintenance
- Emergency plumbing services

All services come with a 30-day satisfaction guarantee. I use high-quality materials and ensure timely completion of all jobs.`,
    price: 'Rs. 1,500 - Rs. 5,000',
    rating: 4.8,
    reviewCount: 124,
    provider: {
      id: '1',
      name: 'Ahmed Khan',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 4.8,
      reviewCount: 124,
      completedJobs: 230,
      verified: true,
      location: 'Gulshan-e-Iqbal, Karachi',
    },
    serviceOptions: [
      { 
        id: '1', 
        title: 'Basic Inspection', 
        price: 'Rs. 1,500',
        description: 'Thorough inspection of your plumbing system to identify issues.' 
      },
      { 
        id: '2', 
        title: 'Leak Repair', 
        price: 'Rs. 2,500',
        description: 'Fix leaking pipes, faucets, or fixtures.' 
      },
      { 
        id: '3', 
        title: 'Drain Cleaning', 
        price: 'Rs. 2,000',
        description: 'Unclog and clean drains to restore proper flow.' 
      },
      { 
        id: '4', 
        title: 'Fixture Installation', 
        price: 'Rs. 3,500',
        description: 'Install new plumbing fixtures like sinks, toilets, or showers.' 
      },
      { 
        id: '5', 
        title: 'Emergency Service', 
        price: 'Rs. 5,000',
        description: 'Immediate response to urgent plumbing problems.' 
      },
    ],
    faqs: [
      {
        question: 'How long does the typical service take?',
        answer: 'Most standard services take 1-3 hours, depending on the complexity. Emergency services are typically resolved within 1-2 hours.'
      },
      {
        question: 'Do you provide a warranty for your services?',
        answer: 'Yes, all services come with a 30-day satisfaction guarantee. If any issues arise with the work done, I will fix it at no additional cost.'
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'I accept cash, credit/debit cards, Easypaisa, and JazzCash.'
      },
      {
        question: 'Do I need to provide any materials?',
        answer: 'No, I bring all the necessary tools and materials. However, if specific fixtures need to be installed that you\'ve purchased, please have them ready.'
      }
    ]
  };
  
  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    
    // Find the selected option
    const option = serviceData.serviceOptions.find(opt => opt.id === optionId);
    
    if (option) {
      form.setFieldsValue({
        serviceOption: option.title,
        amount: option.price
      });
    }
  };
  
  const onFinish = (values: any) => {
    console.log('Form values:', values);
    // Here you would typically handle the booking submission
  };

  return (
    <MainLayout showSidebar={false}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Row gutter={24}>
          <Col xs={24} lg={16}>
            <Card style={{ marginBottom: 24, borderRadius: 12, overflow: 'hidden' }}>
              <Carousel autoplay style={{ marginTop: -24, marginLeft: -24, marginRight: -24, marginBottom: 24 }}>
                {serviceData.images.map((image, index) => (
                  <div key={index}>
                    <div style={{ height: 400, background: `url(${image}) center/cover no-repeat` }} />
                  </div>
                ))}
              </Carousel>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div>
                  <Title level={3} style={{ marginBottom: 8 }}>{serviceData.title}</Title>
                  <Space align="center" size={16}>
                    <Tag color="#7a2df7">{serviceData.category}</Tag>
                    <Space>
                      <StarOutlined style={{ color: '#faad14' }} />
                      <Text strong>{serviceData.rating}</Text>
                      <Text type="secondary">({serviceData.reviewCount} {t('reviews')})</Text>
                    </Space>
                    <Text type="secondary">{serviceData.price}</Text>
                  </Space>
                </div>
                
                <Space>
                  <Button icon={<HeartOutlined />} shape="circle" />
                  <Button icon={<ShareAltOutlined />} shape="circle" />
                </Space>
              </div>
              
              <Tabs activeKey={activeTab} onChange={setActiveTab}>
                <TabPane tab={t('details')} key="details">
                  <Title level={5}>{t('service_description')}</Title>
                  <Paragraph style={{ whiteSpace: 'pre-line' }}>
                    {serviceData.description}
                  </Paragraph>
                  
                  <Title level={5} style={{ marginTop: 24 }}>{t('service_options')}</Title>
                  <List
                    dataSource={serviceData.serviceOptions}
                    renderItem={(option) => (
                      <List.Item 
                        key={option.id}
                        style={{ 
                          padding: 16, 
                          borderRadius: 8,
                          border: '1px solid #f0f0f0',
                          marginBottom: 12,
                          cursor: 'pointer',
                          background: selectedOption === option.id ? '#f5f0ff' : 'white',
                          borderColor: selectedOption === option.id ? '#7a2df7' : '#f0f0f0'
                        }}
                        onClick={() => handleOptionSelect(option.id)}
                      >
                        <List.Item.Meta
                          title={option.title}
                          description={option.description}
                        />
                        <Text strong>{option.price}</Text>
                      </List.Item>
                    )}
                  />
                  
                  <Title level={5} style={{ marginTop: 24 }}>{t('faqs')}</Title>
                  <List
                    itemLayout="vertical"
                    dataSource={serviceData.faqs}
                    renderItem={(faq, index) => (
                      <List.Item key={index} style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: 16 }}>
                        <Title level={5} style={{ marginBottom: 8 }}>{faq.question}</Title>
                        <Text>{faq.answer}</Text>
                      </List.Item>
                    )}
                  />
                </TabPane>
                
                <TabPane tab={t('provider')} key="provider">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                    <Avatar src={serviceData.provider.avatar} size={80} />
                    <div>
                      <Link to={`/provider/${serviceData.provider.id}`}>
                        <Title level={4} style={{ marginBottom: 4 }}>
                          {serviceData.provider.name}
                          {serviceData.provider.verified && (
                            <CheckCircleOutlined style={{ color: '#52c41a', marginLeft: 8 }} />
                          )}
                        </Title>
                      </Link>
                      <Space direction="vertical" size={2}>
                        <Space>
                          <StarOutlined style={{ color: '#faad14' }} />
                          <Text>{serviceData.provider.rating}</Text>
                          <Text type="secondary">({serviceData.provider.reviewCount} {t('reviews')})</Text>
                        </Space>
                        <Space>
                          <CheckCircleOutlined style={{ color: '#52c41a' }} />
                          <Text>{serviceData.provider.completedJobs} {t('jobs_completed')}</Text>
                        </Space>
                        <Space>
                          <EnvironmentOutlined />
                          <Text>{serviceData.provider.location}</Text>
                        </Space>
                      </Space>
                    </div>
                  </div>
                  
                  <Space>
                    <Button type="primary" icon={<MessageOutlined />}>
                      {t('contact_provider')}
                    </Button>
                    <Button>
                      <Link to={`/provider/${serviceData.provider.id}`}>
                        {t('view_full_profile')}
                      </Link>
                    </Button>
                  </Space>
                </TabPane>
                
                <TabPane tab={t('reviews')} key="reviews">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                    <div>
                      <Title level={3} style={{ marginBottom: 0 }}>{serviceData.rating}</Title>
                      <Rate disabled defaultValue={serviceData.rating} allowHalf />
                      <Text type="secondary" style={{ display: 'block' }}>
                        {serviceData.reviewCount} {t('reviews')}
                      </Text>
                    </div>
                    
                    <Button type="primary">{t('write_review')}</Button>
                  </div>
                  
                  {/* Reviews would be listed here */}
                  <Text>{t('customer_reviews_will_appear_here')}</Text>
                </TabPane>
              </Tabs>
            </Card>
          </Col>
          
          <Col xs={24} lg={8}>
            <div style={{ position: 'sticky', top: 24 }}>
              <Card title={t('book_service')} style={{ marginBottom: 24, borderRadius: 12 }}>
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={onFinish}
                >
                  <Form.Item
                    name="serviceOption"
                    label={t('service_option')}
                    rules={[{ required: true, message: t('please_select_service_option') }]}
                  >
                    <Select placeholder={t('select_service')} disabled>
                      {serviceData.serviceOptions.map(option => (
                        <Option key={option.id} value={option.title}>{option.title}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                  
                  <Form.Item
                    name="date"
                    label={t('service_date')}
                    rules={[{ required: true, message: t('please_select_date') }]}
                  >
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>
                  
                  <Form.Item
                    name="time"
                    label={t('service_time')}
                    rules={[{ required: true, message: t('please_select_time') }]}
                  >
                    <TimePicker.RangePicker style={{ width: '100%' }} format="HH:mm" />
                  </Form.Item>
                  
                  <Form.Item
                    name="address"
                    label={t('service_address')}
                    rules={[{ required: true, message: t('please_enter_address') }]}
                  >
                    <TextArea rows={3} placeholder={t('enter_complete_address')} />
                  </Form.Item>
                  
                  <Form.Item
                    name="phone"
                    label={t('contact_number')}
                    rules={[{ required: true, message: t('please_enter_phone') }]}
                  >
                    <Input prefix={<PhoneOutlined />} placeholder="+92 XXX XXXXXXX" />
                  </Form.Item>
                  
                  <Form.Item name="notes" label={t('additional_notes')}>
                    <TextArea rows={3} placeholder={t('any_specific_requirements')} />
                  </Form.Item>
                  
                  <Divider />
                  
                  <Form.Item name="amount" label={t('amount')}>
                    <Input disabled prefix={<DollarOutlined />} />
                  </Form.Item>
                  
                  <Form.Item name="payment" label={t('payment_method')} rules={[{ required: true }]}>
                    <Radio.Group>
                      <Space direction="vertical">
                        <Radio value="cash">{t('cash_on_delivery')}</Radio>
                        <Radio value="easypaisa">Easypaisa</Radio>
                        <Radio value="jazzcash">JazzCash</Radio>
                      </Space>
                    </Radio.Group>
                  </Form.Item>
                  
                  <Form.Item name="terms" valuePropName="checked" rules={[{ required: true }]}>
                    <Checkbox>
                      {t('i_agree_to')} <Link to="/terms">{t('terms_and_conditions')}</Link>
                    </Checkbox>
                  </Form.Item>
                  
                  <Button type="primary" htmlType="submit" block size="large">
                    {t('confirm_booking')}
                  </Button>
                </Form>
              </Card>
              
              <Card title={t('need_help')} style={{ borderRadius: 12 }}>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Text>{t('questions_about_service')}</Text>
                  <Button icon={<MessageOutlined />} block style={{ marginTop: 8 }}>
                    {t('contact_support')}
                  </Button>
                </Space>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default ServiceDetail;
