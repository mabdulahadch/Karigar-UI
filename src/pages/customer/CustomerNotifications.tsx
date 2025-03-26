
import React from 'react';
import { Card, List, Typography, Tag, Button, Tabs, Badge, Empty, Dropdown, Menu } from 'antd';
import { 
  BellOutlined, 
  CheckCircleOutlined, 
  CloseCircleOutlined, 
  CalendarOutlined,
  DollarOutlined,
  UserOutlined,
  MoreOutlined,
  DeleteOutlined,
  CheckOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import MainLayout from '@/components/Layout/MainLayout';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

interface Notification {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'booking' | 'payment' | 'system' | 'review';
  read: boolean;
}

const CustomerNotifications: React.FC = () => {
  const { t } = useTranslation();
  
  const notifications: Notification[] = [
    {
      id: '1',
      title: 'Booking Confirmed',
      description: 'Your booking for Plumbing Repair with Ahmed Khan has been confirmed for 15 July, 10:00 AM.',
      date: '2023-07-12 09:30:45',
      type: 'booking',
      read: false,
    },
    {
      id: '2',
      title: 'Payment Successful',
      description: 'Your payment of Rs. 2,500 for House Cleaning service has been processed successfully.',
      date: '2023-07-10 14:22:11',
      type: 'payment',
      read: false,
    },
    {
      id: '3',
      title: 'Booking Reminder',
      description: 'Reminder: Your booking for Electrical Repair is scheduled tomorrow at 11:00 AM.',
      date: '2023-07-04 16:45:33',
      type: 'booking',
      read: true,
    },
    {
      id: '4',
      title: 'New Offer Available',
      description: 'Use code SUMMER25 to get 25% off on your next booking!',
      date: '2023-06-30 10:15:22',
      type: 'system',
      read: true,
    },
    {
      id: '5',
      title: 'Review Received',
      description: 'Imran Ali has responded to your review for AC Repair service.',
      date: '2023-06-29 12:30:45',
      type: 'review',
      read: true,
    },
  ];

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'booking':
        return <CalendarOutlined style={{ fontSize: '24px', color: '#1890ff' }} />;
      case 'payment':
        return <DollarOutlined style={{ fontSize: '24px', color: '#52c41a' }} />;
      case 'review':
        return <UserOutlined style={{ fontSize: '24px', color: '#faad14' }} />;
      default:
        return <BellOutlined style={{ fontSize: '24px', color: '#722ed1' }} />;
    }
  };

  const actionMenu = (
    <Menu>
      <Menu.Item key="1" icon={<CheckOutlined />}>
        {t('mark_as_read')}
      </Menu.Item>
      <Menu.Item key="2" icon={<DeleteOutlined />}>
        {t('delete')}
      </Menu.Item>
    </Menu>
  );

  return (
    <MainLayout>
      <Title level={2}>{t('notifications')}</Title>
      
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <Badge count={notifications.filter(n => !n.read).length}>
            <span style={{ fontSize: 16, fontWeight: 'bold' }}>{t('all_notifications')}</span>
          </Badge>
          <div>
            <Button type="text" icon={<CheckCircleOutlined />}>
              {t('mark_all_as_read')}
            </Button>
            <Button type="text" danger icon={<DeleteOutlined />}>
              {t('clear_all')}
            </Button>
          </div>
        </div>
        
        <Tabs defaultActiveKey="all">
          <TabPane tab={t('all')} key="all">
            <List
              itemLayout="horizontal"
              dataSource={notifications}
              renderItem={(notification) => (
                <List.Item
                  style={{ 
                    padding: '16px', 
                    backgroundColor: notification.read ? 'transparent' : 'rgba(240, 240, 255, 0.5)',
                    borderRadius: '8px',
                    marginBottom: '8px'
                  }}
                  actions={[
                    <Dropdown overlay={actionMenu} trigger={['click']}>
                      <Button type="text" icon={<MoreOutlined />} />
                    </Dropdown>
                  ]}
                >
                  <List.Item.Meta
                    avatar={getTypeIcon(notification.type)}
                    title={
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Text strong>{notification.title}</Text>
                        <Text type="secondary" style={{ fontSize: '12px' }}>{notification.date}</Text>
                      </div>
                    }
                    description={notification.description}
                  />
                </List.Item>
              )}
            />
          </TabPane>
          <TabPane tab={t('unread')} key="unread">
            <List
              itemLayout="horizontal"
              dataSource={notifications.filter(n => !n.read)}
              locale={{ emptyText: <Empty description={t('no_unread_notifications')} /> }}
              renderItem={(notification) => (
                <List.Item
                  style={{ 
                    padding: '16px', 
                    backgroundColor: 'rgba(240, 240, 255, 0.5)',
                    borderRadius: '8px',
                    marginBottom: '8px'
                  }}
                  actions={[
                    <Dropdown overlay={actionMenu} trigger={['click']}>
                      <Button type="text" icon={<MoreOutlined />} />
                    </Dropdown>
                  ]}
                >
                  <List.Item.Meta
                    avatar={getTypeIcon(notification.type)}
                    title={
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Text strong>{notification.title}</Text>
                        <Text type="secondary" style={{ fontSize: '12px' }}>{notification.date}</Text>
                      </div>
                    }
                    description={notification.description}
                  />
                </List.Item>
              )}
            />
          </TabPane>
        </Tabs>
      </Card>
    </MainLayout>
  );
};

export default CustomerNotifications;
