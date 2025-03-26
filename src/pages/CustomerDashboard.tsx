
import React from 'react';
import { Typography, Row, Col, Card, List, Avatar, Tag, Button, Space, Statistic, Empty } from 'antd';
import { 
  CalendarOutlined, 
  ClockCircleOutlined, 
  CheckCircleOutlined,
  UserOutlined,
  StarOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  DollarOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';

const { Title, Text } = Typography;

interface Booking {
  id: string;
  service: string;
  providerName: string;
  providerAvatar: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  address: string;
  totalAmount: string;
}

const CustomerDashboard: React.FC = () => {
  const { t } = useTranslation();
  
  const upcomingBookings: Booking[] = [
    {
      id: '1',
      service: 'Plumbing Repair',
      providerName: 'Ahmed Khan',
      providerAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      date: '2023-07-15',
      time: '10:00 AM - 12:00 PM',
      status: 'upcoming',
      address: 'House #123, Street 5, Gulshan-e-Iqbal, Karachi',
      totalAmount: 'Rs. 3,000',
    },
    {
      id: '2',
      service: 'House Cleaning',
      providerName: 'Saima Abbas',
      providerAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      date: '2023-07-18',
      time: '02:00 PM - 04:00 PM',
      status: 'upcoming',
      address: 'Apartment 4B, Askari Towers, Karachi',
      totalAmount: 'Rs. 2,400',
    },
  ];

  const recentCompletedBookings: Booking[] = [
    {
      id: '3',
      service: 'Electrical Repair',
      providerName: 'Faisal Mahmood',
      providerAvatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      date: '2023-07-05',
      time: '11:00 AM - 01:00 PM',
      status: 'completed',
      address: 'House #123, Street 5, Gulshan-e-Iqbal, Karachi',
      totalAmount: 'Rs. 2,600',
    },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'upcoming':
        return 'blue';
      case 'completed':
        return 'green';
      case 'cancelled':
        return 'red';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'upcoming':
        return t('upcoming');
      case 'completed':
        return t('completed');
      case 'cancelled':
        return t('canceled');
      default:
        return status;
    }
  };

  return (
    <MainLayout>
      <Title level={2}>{t('customer_dashboard')}</Title>
      
      {/* Stats Overview */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic 
              title={t('total_bookings')}
              value={12}
              prefix={<CalendarOutlined />}
              valueStyle={{ color: '#7a2df7' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic 
              title={t('completed_services')}
              value={9}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic 
              title={t('total_spent')}
              value="Rs. 24,500"
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
      </Row>
      
      {/* Upcoming Bookings */}
      <Card 
        title={t('upcoming_bookings')}
        extra={<Link to="/customer/bookings">{t('view_all')}</Link>}
        style={{ marginBottom: 24 }}
      >
        <List
          dataSource={upcomingBookings}
          locale={{
            emptyText: (
              <Empty
                description={t('no_upcoming_bookings')}
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            )
          }}
          renderItem={(booking) => (
            <List.Item
              key={booking.id}
              actions={[
                <Button key="view" type="primary" ghost>
                  {t('view_details')}
                </Button>,
                <Button key="cancel" danger>
                  {t('cancel')}
                </Button>
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={booking.providerAvatar} size={48} />}
                title={
                  <Space>
                    <Text strong>{booking.service}</Text>
                    <Tag color={getStatusColor(booking.status)}>
                      {getStatusText(booking.status)}
                    </Tag>
                  </Space>
                }
                description={
                  <Space direction="vertical" size={2}>
                    <Text><UserOutlined /> {booking.providerName}</Text>
                    <Text><CalendarOutlined /> {booking.date}</Text>
                    <Text><ClockCircleOutlined /> {booking.time}</Text>
                    <Text><EnvironmentOutlined /> {booking.address}</Text>
                    <Text><DollarOutlined /> {booking.totalAmount}</Text>
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      </Card>
      
      {/* Recent Completed Services */}
      <Card 
        title={t('recently_completed_services')}
        extra={<Link to="/customer/service-history">{t('view_all')}</Link>}
      >
        <List
          dataSource={recentCompletedBookings}
          locale={{
            emptyText: (
              <Empty
                description={t('no_completed_services')}
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            )
          }}
          renderItem={(booking) => (
            <List.Item
              key={booking.id}
              actions={[
                <Button key="review" type="primary">
                  {t('leave_review')}
                </Button>,
                <Button key="book" type="default">
                  {t('book_again')}
                </Button>
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={booking.providerAvatar} size={48} />}
                title={
                  <Space>
                    <Text strong>{booking.service}</Text>
                    <Tag color={getStatusColor(booking.status)}>
                      {getStatusText(booking.status)}
                    </Tag>
                  </Space>
                }
                description={
                  <Space direction="vertical" size={2}>
                    <Text><UserOutlined /> {booking.providerName}</Text>
                    <Text><CalendarOutlined /> {booking.date}</Text>
                    <Text><ClockCircleOutlined /> {booking.time}</Text>
                    <Text><DollarOutlined /> {booking.totalAmount}</Text>
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      </Card>
    </MainLayout>
  );
};

export default CustomerDashboard;
