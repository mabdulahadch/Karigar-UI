
import React, { useState } from 'react';
import { 
  Typography, 
  Row, 
  Col, 
  Card, 
  Avatar, 
  Tag, 
  Button, 
  Tabs, 
  Rate, 
  List, 
  Divider, 
  Space, 
  Image, 
  Badge, 
  Descriptions,
  Timeline
} from 'antd';
import { 
  EnvironmentOutlined, 
  PhoneOutlined, 
  MailOutlined, 
  CheckCircleOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  CalendarOutlined,
  StarOutlined,
  MessageOutlined,
  HeartOutlined,
  ShareAltOutlined,
  EditOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import MainLayout from '@/components/Layout/MainLayout';
import { useAuth } from '@/context/AuthContext';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

interface Review {
  id: string;
  customerName: string;
  customerAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

const ProviderProfile: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('about');
  const isOwnProfile = user?.role === 'provider';
  
  const providerData = {
    id: '1',
    name: 'Ahmed Khan',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    headline: 'Professional Plumber with 10+ years of experience',
    services: ['Plumbing', 'Pipe Fitting', 'Water Heater Installation'],
    rating: 4.8,
    reviewCount: 124,
    completedJobs: 230,
    verified: true,
    location: 'Gulshan-e-Iqbal, Karachi',
    phone: '+92 300 1234567',
    email: 'ahmed.khan@example.com',
    about: `I am a certified plumber with over 10 years of experience in residential and commercial plumbing services. I specialize in pipe installation, repair, and maintenance, as well as fixing leaks and installing fixtures.
    
    My goal is to provide high-quality plumbing services at affordable rates with guaranteed customer satisfaction. I pride myself on being punctual, professional, and providing long-lasting solutions to all plumbing issues.`,
    experience: [
      { period: '2018 - Present', title: 'Independent Plumbing Contractor', company: 'Self-employed' },
      { period: '2013 - 2018', title: 'Senior Plumber', company: 'ABC Plumbing Services' },
      { period: '2010 - 2013', title: 'Junior Plumber', company: 'XYZ Home Services' },
    ],
    skills: ['Pipe Installation', 'Leak Repair', 'Fixture Installation', 'Water Heater Repair', 'Drain Cleaning', 'Emergency Services'],
    education: [
      { year: '2010', degree: 'Diploma in Plumbing', institution: 'Technical Training Institute, Karachi' },
      { year: '2009', degree: 'Certificate in Pipe Fitting', institution: 'Vocational Training Center, Karachi' }
    ],
    pricing: [
      { service: 'Basic Plumbing Inspection', price: 'Rs. 1,000 - Rs. 1,500' },
      { service: 'Pipe Repair/Replacement', price: 'Rs. 2,000 - Rs. 4,000' },
      { service: 'Fixture Installation', price: 'Rs. 1,500 - Rs. 3,000' },
      { service: 'Water Heater Installation', price: 'Rs. 3,000 - Rs. 5,000' },
      { service: 'Emergency Services', price: 'Rs. 2,500 - Rs. 4,500' }
    ],
    availability: [
      { day: 'Monday', hours: '9:00 AM - 6:00 PM' },
      { day: 'Tuesday', hours: '9:00 AM - 6:00 PM' },
      { day: 'Wednesday', hours: '9:00 AM - 6:00 PM' },
      { day: 'Thursday', hours: '9:00 AM - 6:00 PM' },
      { day: 'Friday', hours: '9:00 AM - 6:00 PM' },
      { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
      { day: 'Sunday', hours: 'Closed' }
    ],
    portfolio: [
      { id: '1', title: 'Bathroom Renovation', image: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80' },
      { id: '2', title: 'Kitchen Plumbing', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80' },
      { id: '3', title: 'Water Heater Installation', image: 'https://images.unsplash.com/photo-1535957998253-26ae1ef29506?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80' },
    ]
  };
  
  const reviews: Review[] = [
    {
      id: '1',
      customerName: 'Fatima Khalid',
      customerAvatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      rating: 5,
      comment: 'Ahmed was very professional and fixed our bathroom leak quickly. Would definitely hire again!',
      date: '2023-07-10',
    },
    {
      id: '2',
      customerName: 'Mohammad Ali',
      customerAvatar: 'https://randomuser.me/api/portraits/men/43.jpg',
      rating: 4,
      comment: 'Good service overall. Completed the job on time and was very knowledgeable.',
      date: '2023-07-05',
    },
    {
      id: '3',
      customerName: 'Sara Ahmed',
      customerAvatar: 'https://randomuser.me/api/portraits/women/23.jpg',
      rating: 5,
      comment: 'Very reliable and professional service. Fixed all our plumbing issues efficiently.',
      date: '2023-06-28',
    },
  ];

  return (
    <MainLayout showSidebar={false}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Profile Header */}
        <Card style={{ marginBottom: 24, borderRadius: 12, overflow: 'hidden' }}>
          <div 
            style={{ 
              height: 200, 
              background: 'linear-gradient(135deg, #9f75ff 0%, #7a2df7 100%)',
              marginTop: -24,
              marginLeft: -24,
              marginRight: -24,
              marginBottom: 0
            }} 
          />
          
          <div style={{ marginTop: -50, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Badge
              count={providerData.verified ? <CheckCircleOutlined style={{ color: '#52c41a' }} /> : 0}
              offset={[-10, 80]}
            >
              <Avatar 
                src={providerData.avatar} 
                size={100} 
                style={{ 
                  border: '4px solid white',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.1)'
                }} 
              />
            </Badge>
            
            <Title level={3} style={{ marginBottom: 4, marginTop: 16 }}>
              {providerData.name}
            </Title>
            
            <Text type="secondary" style={{ marginBottom: 12 }}>
              {providerData.headline}
            </Text>
            
            <Space size={16}>
              <Space>
                <StarOutlined style={{ color: '#faad14' }} />
                <Text strong>{providerData.rating}</Text>
                <Text type="secondary">({providerData.reviewCount} {t('reviews')})</Text>
              </Space>
              
              <Space>
                <CheckCircleOutlined style={{ color: '#52c41a' }} />
                <Text>{providerData.completedJobs} {t('jobs_completed')}</Text>
              </Space>
            </Space>
            
            <Space wrap style={{ marginTop: 16 }}>
              {providerData.services.map((service, index) => (
                <Tag key={index} color="#7a2df7" style={{ padding: '4px 8px', fontSize: 14 }}>
                  {service}
                </Tag>
              ))}
            </Space>
            
            <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
              {isOwnProfile ? (
                <Button icon={<EditOutlined />} type="primary">
                  {t('edit_profile')}
                </Button>
              ) : (
                <>
                  <Button type="primary" size="large" icon={<CalendarOutlined />}>
                    {t('book_now')}
                  </Button>
                  <Button icon={<MessageOutlined />} size="large">
                    {t('contact')}
                  </Button>
                  <Button icon={<HeartOutlined />} size="large" shape="circle" />
                  <Button icon={<ShareAltOutlined />} size="large" shape="circle" />
                </>
              )}
            </div>
          </div>
        </Card>
        
        {/* Profile Content */}
        <Row gutter={24}>
          <Col xs={24} md={8}>
            <Card style={{ marginBottom: 24, borderRadius: 12 }}>
              <Title level={5}>{t('contact_information')}</Title>
              <Space direction="vertical" style={{ width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <EnvironmentOutlined style={{ color: '#7a2df7' }} />
                  <Text>{providerData.location}</Text>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <PhoneOutlined style={{ color: '#7a2df7' }} />
                  <Text>{providerData.phone}</Text>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <MailOutlined style={{ color: '#7a2df7' }} />
                  <Text>{providerData.email}</Text>
                </div>
              </Space>
            </Card>
            
            <Card style={{ marginBottom: 24, borderRadius: 12 }}>
              <Title level={5}>{t('availability')}</Title>
              <List
                dataSource={providerData.availability}
                renderItem={(item) => (
                  <List.Item style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                      <Text strong>{item.day}</Text>
                      <Text>{item.hours}</Text>
                    </div>
                  </List.Item>
                )}
              />
            </Card>
            
            <Card style={{ marginBottom: 24, borderRadius: 12 }}>
              <Title level={5}>{t('skills')}</Title>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {providerData.skills.map((skill, index) => (
                  <Tag key={index} style={{ marginBottom: 8, padding: '4px 8px' }}>
                    {skill}
                  </Tag>
                ))}
              </div>
            </Card>
          </Col>
          
          <Col xs={24} md={16}>
            <Card style={{ marginBottom: 24, borderRadius: 12 }}>
              <Tabs activeKey={activeTab} onChange={setActiveTab}>
                <TabPane tab={t('about')} key="about">
                  <Title level={5}>{t('about_me')}</Title>
                  <Paragraph style={{ whiteSpace: 'pre-line' }}>
                    {providerData.about}
                  </Paragraph>
                  
                  <Title level={5} style={{ marginTop: 24 }}>{t('experience')}</Title>
                  <Timeline>
                    {providerData.experience.map((exp, index) => (
                      <Timeline.Item key={index} color="#7a2df7">
                        <Text strong>{exp.title}</Text>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Text type="secondary">{exp.company}</Text>
                          <Text type="secondary">{exp.period}</Text>
                        </div>
                      </Timeline.Item>
                    ))}
                  </Timeline>
                  
                  <Title level={5} style={{ marginTop: 24 }}>{t('education')}</Title>
                  <Timeline>
                    {providerData.education.map((edu, index) => (
                      <Timeline.Item key={index} color="#7a2df7">
                        <Text strong>{edu.degree}</Text>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Text type="secondary">{edu.institution}</Text>
                          <Text type="secondary">{edu.year}</Text>
                        </div>
                      </Timeline.Item>
                    ))}
                  </Timeline>
                </TabPane>
                
                <TabPane tab={t('services_and_pricing')} key="pricing">
                  <Title level={5}>{t('service_pricing')}</Title>
                  <List
                    itemLayout="horizontal"
                    dataSource={providerData.pricing}
                    renderItem={(item) => (
                      <List.Item 
                        style={{ padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}
                        actions={[<Text strong>{item.price}</Text>]}
                      >
                        <List.Item.Meta
                          title={item.service}
                        />
                      </List.Item>
                    )}
                  />
                </TabPane>
                
                <TabPane tab={t('portfolio')} key="portfolio">
                  <Title level={5}>{t('work_portfolio')}</Title>
                  <Row gutter={[16, 16]}>
                    {providerData.portfolio.map((item) => (
                      <Col xs={24} sm={12} md={8} key={item.id}>
                        <Card
                          hoverable
                          cover={
                            <div style={{ height: 200, overflow: 'hidden' }}>
                              <img 
                                alt={item.title} 
                                src={item.image} 
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                            </div>
                          }
                        >
                          <Card.Meta title={item.title} />
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </TabPane>
                
                <TabPane tab={`${t('reviews')} (${reviews.length})`} key="reviews">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                    <div>
                      <Title level={3} style={{ marginBottom: 0 }}>{providerData.rating}</Title>
                      <Rate disabled defaultValue={providerData.rating} allowHalf />
                      <Text type="secondary" style={{ display: 'block' }}>
                        {providerData.reviewCount} {t('reviews')}
                      </Text>
                    </div>
                    
                    {!isOwnProfile && (
                      <Button type="primary">{t('write_review')}</Button>
                    )}
                  </div>
                  
                  <List
                    itemLayout="vertical"
                    dataSource={reviews}
                    renderItem={(review) => (
                      <List.Item key={review.id}>
                        <List.Item.Meta
                          avatar={<Avatar src={review.customerAvatar} />}
                          title={<Text strong>{review.customerName}</Text>}
                          description={
                            <Space direction="vertical" size={4}>
                              <Rate disabled defaultValue={review.rating} style={{ fontSize: 14 }} />
                              <Text type="secondary">{review.date}</Text>
                            </Space>
                          }
                        />
                        <Paragraph>{review.comment}</Paragraph>
                        
                        {isOwnProfile && (
                          <div style={{ marginTop: 12 }}>
                            <Button size="small">{t('respond')}</Button>
                          </div>
                        )}
                      </List.Item>
                    )}
                  />
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default ProviderProfile;
