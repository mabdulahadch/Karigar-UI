
import React from 'react';
import { Card, List, Avatar, Typography, Tag, Rate, Button, Input, DatePicker, Row, Col, Space, Divider } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import MainLayout from '@/components/Layout/MainLayout';

const { Title, Text, Paragraph } = Typography;
const { RangePicker } = DatePicker;

interface ServiceRecord {
  id: string;
  service: string;
  provider: {
    id: string;
    name: string;
    avatar: string;
  };
  date: string;
  cost: string;
  rating: number;
  feedback?: string;
  status: 'completed' | 'cancelled';
}

const CustomerServiceHistory: React.FC = () => {
  const { t } = useTranslation();
  
  const serviceHistory: ServiceRecord[] = [
    {
      id: '1',
      service: 'Electrical Repair',
      provider: {
        id: 'p1',
        name: 'Faisal Mahmood',
        avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      },
      date: '2023-07-05',
      cost: 'Rs. 2,600',
      rating: 4,
      feedback: 'Great service, fixed the issue quickly.',
      status: 'completed',
    },
    {
      id: '2',
      service: 'AC Repair',
      provider: {
        id: 'p2',
        name: 'Imran Ali',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      },
      date: '2023-06-28',
      cost: 'Rs. 3,500',
      rating: 5,
      feedback: 'Excellent service. AC working perfectly now.',
      status: 'completed',
    },
    {
      id: '3',
      service: 'Car Wash',
      provider: {
        id: 'p3',
        name: 'Yasir Khan',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      },
      date: '2023-06-15',
      cost: 'Rs. 800',
      status: 'cancelled',
      rating: 0,
    },
    {
      id: '4',
      service: 'House Cleaning',
      provider: {
        id: 'p4',
        name: 'Saima Abbas',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      },
      date: '2023-06-10',
      cost: 'Rs. 2,400',
      rating: 3,
      feedback: 'Good service but missed some areas.',
      status: 'completed',
    },
    {
      id: '5',
      service: 'Plumbing Service',
      provider: {
        id: 'p5',
        name: 'Ahmed Khan',
        avatar: 'https://randomuser.me/api/portraits/men/36.jpg',
      },
      date: '2023-05-22',
      cost: 'Rs. 1,800',
      rating: 4,
      feedback: 'Fixed the leaking tap promptly.',
      status: 'completed',
    },
  ];

  return (
    <MainLayout>
      <Title level={2}>{t('service_history')}</Title>
      
      <Card style={{ marginBottom: 24 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={8}>
            <Input 
              prefix={<SearchOutlined />} 
              placeholder={t('search_services')} 
            />
          </Col>
          <Col xs={24} md={12}>
            <RangePicker 
              style={{ width: '100%' }} 
              placeholder={[t('start_date'), t('end_date')]}
            />
          </Col>
          <Col xs={24} md={4}>
            <Button icon={<FilterOutlined />} style={{ width: '100%' }}>
              {t('filter')}
            </Button>
          </Col>
        </Row>
      </Card>
      
      <List
        dataSource={serviceHistory}
        renderItem={(item) => (
          <Card style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar size={64} src={item.provider.avatar} />
                  <div style={{ marginLeft: 16 }}>
                    <Text strong style={{ fontSize: 16 }}>{item.service}</Text>
                    <div>
                      <Text type="secondary">{t('provider')}: </Text>
                      <Text>{item.provider.name}</Text>
                    </div>
                    <div>
                      <Text type="secondary">{t('date')}: </Text>
                      <Text>{item.date}</Text>
                    </div>
                    <div>
                      <Text type="secondary">{t('cost')}: </Text>
                      <Text>{item.cost}</Text>
                    </div>
                  </div>
                </div>
                <Tag color={item.status === 'completed' ? 'green' : 'red'}>
                  {item.status === 'completed' ? t('completed') : t('cancelled')}
                </Tag>
              </div>
              
              {item.status === 'completed' && (
                <>
                  <Divider />
                  <div>
                    <Text strong>{t('your_rating')}:</Text>
                    <div style={{ marginTop: 8 }}>
                      <Rate disabled defaultValue={item.rating} />
                    </div>
                    
                    {item.feedback && (
                      <div style={{ marginTop: 8 }}>
                        <Text strong>{t('your_feedback')}:</Text>
                        <Paragraph style={{ marginTop: 4 }}>{item.feedback}</Paragraph>
                      </div>
                    )}
                    
                    {!item.feedback && (
                      <Button type="default" style={{ marginTop: 8 }}>
                        {t('add_feedback')}
                      </Button>
                    )}
                  </div>
                </>
              )}
              
              <div style={{ marginTop: 16, textAlign: 'right' }}>
                <Space>
                  <Button type="default">
                    {t('view_details')}
                  </Button>
                  <Button type="primary">
                    {t('book_again')}
                  </Button>
                </Space>
              </div>
            </div>
          </Card>
        )}
      />
    </MainLayout>
  );
};

export default CustomerServiceHistory;
