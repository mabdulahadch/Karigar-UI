
import React, { useState } from 'react';
import { Typography, Input, Row, Col, Card, Button, Tag, Rate, Carousel, List, Avatar, Space, Divider } from 'antd';
import { SearchOutlined, RightOutlined, EnvironmentOutlined, ClockCircleOutlined, TagOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';

const { Title, Text, Paragraph } = Typography;

interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface ServiceProvider {
  id: string;
  name: string;
  avatar: string;
  service: string;
  rating: number;
  reviewCount: number;
  price: string;
  location: string;
  distance: string;
}

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const categories: ServiceCategory[] = [
    { id: '1', name: 'Plumbing', icon: '🔧', color: '#e6f7ff' },
    { id: '2', name: 'Electrical', icon: '⚡', color: '#fff7e6' },
    { id: '3', name: 'Cleaning', icon: '🧹', color: '#e6fffb' },
    { id: '4', name: 'Tutoring', icon: '📚', color: '#f9f0ff' },
    { id: '5', name: 'Carpentry', icon: '🪚', color: '#fff2e8' },
    { id: '6', name: 'Painting', icon: '🎨', color: '#fcffe6' },
    { id: '7', name: 'Gardening', icon: '🌱', color: '#e6ffec' },
    { id: '8', name: 'Beauty', icon: '💇', color: '#ffe6f6' },
  ];

  const topProviders: ServiceProvider[] = [
    {
      id: '1',
      name: 'Ahmed Khan',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      service: 'Plumbing',
      rating: 4.8,
      reviewCount: 124,
      price: 'Rs. 1,500/hr',
      location: 'Gulshan-e-Iqbal, Karachi',
      distance: '3.2 km away',
    },
    {
      id: '2',
      name: 'Saima Abbas',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      service: 'House Cleaning',
      rating: 4.9,
      reviewCount: 89,
      price: 'Rs. 1,200/hr',
      location: 'DHA Phase 5, Karachi',
      distance: '5.7 km away',
    },
    {
      id: '3',
      name: 'Faisal Mahmood',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      service: 'Electrical Repairs',
      rating: 4.7,
      reviewCount: 76,
      price: 'Rs. 1,300/hr',
      location: 'Bahadurabad, Karachi',
      distance: '2.8 km away',
    },
    {
      id: '4',
      name: 'Aisha Ali',
      avatar: 'https://randomuser.me/api/portraits/women/29.jpg',
      service: 'Tutoring',
      rating: 4.9,
      reviewCount: 112,
      price: 'Rs. 1,000/hr',
      location: 'PECHS, Karachi',
      distance: '4.1 km away',
    },
  ];

  return (
    <MainLayout showSidebar={false}>
      {/* Hero Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, #9f75ff 0%, #7a2df7 100%)', 
        borderRadius: 16, 
        padding: '64px 32px',
        marginBottom: 48,
        color: 'white',
        textAlign: 'center'
      }}>
        <Title level={1} style={{ color: 'white', marginBottom: 16 }}>
          {t('welcome')}
        </Title>
        <Paragraph style={{ fontSize: 18, maxWidth: 600, margin: '0 auto 32px' }}>
          {t('tagline')}
        </Paragraph>

        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <Input
            size="large"
            placeholder={t('search_placeholder')}
            prefix={<SearchOutlined />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ borderRadius: 8, height: 56 }}
            suffix={
              <Button type="primary" size="large" style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
                {t('search')}
              </Button>
            }
          />
        </div>
      </section>

      {/* Categories Section */}
      <section style={{ marginBottom: 48 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <Title level={3}>{t('categories')}</Title>
          <Link to="/categories">
            <Button type="link" icon={<RightOutlined />}>{t('view_all')}</Button>
          </Link>
        </div>

        <Row gutter={[16, 16]}>
          {categories.map((category) => (
            <Col xs={12} sm={8} md={6} lg={3} key={category.id}>
              <Link to={`/services/${category.name.toLowerCase()}`}>
                <Card
                  hoverable
                  style={{ textAlign: 'center', background: category.color, border: 'none' }}
                  bodyStyle={{ padding: 16 }}
                >
                  <div style={{ fontSize: 32, marginBottom: 8 }}>{category.icon}</div>
                  <Text strong>{category.name}</Text>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </section>

      {/* Top Providers Section */}
      <section style={{ marginBottom: 48 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <Title level={3}>{t('top_rated')}</Title>
          <Link to="/providers">
            <Button type="link" icon={<RightOutlined />}>{t('view_all')}</Button>
          </Link>
        </div>

        <Row gutter={[24, 24]}>
          {topProviders.map((provider) => (
            <Col xs={24} sm={12} md={8} lg={6} key={provider.id}>
              <Card
                hoverable
                cover={
                  <div style={{ position: 'relative', height: 140, background: '#f5f5f5', overflow: 'hidden' }}>
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: '8px 16px',
                      background: 'rgba(0,0,0,0.6)',
                      color: 'white',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <Tag color="#7a2df7">{provider.service}</Tag>
                      <Text style={{ color: 'white', fontWeight: 'bold' }}>{provider.price}</Text>
                    </div>
                  </div>
                }
              >
                <div style={{ marginTop: -40 }}>
                  <Avatar 
                    src={provider.avatar} 
                    size={80} 
                    style={{ border: '4px solid white' }}
                  />
                  <Title level={5} style={{ marginTop: 8, marginBottom: 4 }}>{provider.name}</Title>
                  
                  <Space align="center">
                    <Rate disabled defaultValue={provider.rating} style={{ fontSize: 14 }} />
                    <Text type="secondary">({provider.reviewCount})</Text>
                  </Space>
                  
                  <Divider style={{ margin: '12px 0' }} />
                  
                  <Space direction="vertical" size={2} style={{ fontSize: 13 }}>
                    <div><EnvironmentOutlined /> {provider.location}</div>
                    <div><ClockCircleOutlined /> {provider.distance}</div>
                  </Space>
                  
                  <Button type="primary" block style={{ marginTop: 16 }}>
                    {t('view_profile')}
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* How It Works Section */}
      <section style={{ marginBottom: 48, background: '#f5f8ff', padding: 32, borderRadius: 12 }}>
        <Title level={3} style={{ textAlign: 'center', marginBottom: 32 }}>How It Works</Title>
        
        <Row gutter={[32, 32]}>
          <Col xs={24} md={8}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: 48, 
                width: 80, 
                height: 80, 
                lineHeight: '80px', 
                background: '#7a2df7', 
                color: 'white', 
                borderRadius: '50%', 
                margin: '0 auto 16px' 
              }}>1</div>
              <Title level={4}>Search Service</Title>
              <Text>Browse through various service categories or search for specific services you need</Text>
            </div>
          </Col>
          
          <Col xs={24} md={8}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: 48, 
                width: 80, 
                height: 80, 
                lineHeight: '80px', 
                background: '#7a2df7', 
                color: 'white', 
                borderRadius: '50%', 
                margin: '0 auto 16px' 
              }}>2</div>
              <Title level={4}>Book Provider</Title>
              <Text>Select a service provider based on ratings, reviews, and pricing that fits your budget</Text>
            </div>
          </Col>
          
          <Col xs={24} md={8}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: 48, 
                width: 80, 
                height: 80, 
                lineHeight: '80px', 
                background: '#7a2df7', 
                color: 'white', 
                borderRadius: '50%', 
                margin: '0 auto 16px' 
              }}>3</div>
              <Title level={4}>Get Service</Title>
              <Text>Receive quality service at your doorstep and pay securely through our platform</Text>
            </div>
          </Col>
        </Row>
        
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <Button type="primary" size="large">Get Started Now</Button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{ marginBottom: 48 }}>
        <Title level={3} style={{ textAlign: 'center', marginBottom: 32 }}>What Our Users Say</Title>
        
        <Carousel autoplay>
          {[1, 2, 3].map((item) => (
            <div key={item}>
              <div style={{ 
                background: 'white', 
                padding: 32, 
                borderRadius: 12, 
                maxWidth: 800, 
                margin: '0 auto',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <Rate disabled defaultValue={5} style={{ marginBottom: 16 }} />
                  <Paragraph style={{ fontSize: 18 }}>
                    "Karigar made it so easy to find a reliable plumber in my area. The service was excellent and the booking process was seamless. I highly recommend this platform!"
                  </Paragraph>
                  <Avatar size={64} src="https://randomuser.me/api/portraits/women/65.jpg" style={{ marginBottom: 8 }} />
                  <Title level={5} style={{ margin: 0 }}>Fatima Khalid</Title>
                  <Text type="secondary">Lahore</Text>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </section>
    </MainLayout>
  );
};

export default HomePage;
