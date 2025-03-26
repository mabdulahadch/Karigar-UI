
import React from 'react';
import { Card, Table, Tag, Button, Typography, Space, DatePicker, Select, Input } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import MainLayout from '@/components/Layout/MainLayout';

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const CustomerBookings: React.FC = () => {
  const { t } = useTranslation();
  
  const columns = [
    {
      title: t('booking_id'),
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: t('service'),
      dataIndex: 'service',
      key: 'service',
    },
    {
      title: t('provider'),
      dataIndex: 'provider',
      key: 'provider',
    },
    {
      title: t('date'),
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: t('time'),
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: t('status'),
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={
          status === 'completed' ? 'green' : 
          status === 'upcoming' ? 'blue' : 
          status === 'cancelled' ? 'red' : 'default'
        }>
          {t(status)}
        </Tag>
      ),
    },
    {
      title: t('actions'),
      key: 'actions',
      render: (_: any, record: any) => (
        <Space size="small">
          <Button type="primary" size="small">
            {t('view_details')}
          </Button>
          {record.status === 'upcoming' && (
            <Button danger size="small">
              {t('cancel')}
            </Button>
          )}
          {record.status === 'completed' && !record.reviewed && (
            <Button type="default" size="small">
              {t('review')}
            </Button>
          )}
        </Space>
      ),
    },
  ];
  
  const data = [
    {
      key: '1',
      id: 'BK-1001',
      service: 'Plumbing Repair',
      provider: 'Ahmed Khan',
      date: '2023-07-15',
      time: '10:00 AM - 12:00 PM',
      status: 'upcoming',
      reviewed: false,
    },
    {
      key: '2',
      id: 'BK-1002',
      service: 'House Cleaning',
      provider: 'Saima Abbas',
      date: '2023-07-18',
      time: '02:00 PM - 04:00 PM',
      status: 'upcoming',
      reviewed: false,
    },
    {
      key: '3',
      id: 'BK-1003',
      service: 'Electrical Repair',
      provider: 'Faisal Mahmood',
      date: '2023-07-05',
      time: '11:00 AM - 01:00 PM',
      status: 'completed',
      reviewed: false,
    },
    {
      key: '4',
      id: 'BK-1004',
      service: 'AC Repair',
      provider: 'Imran Ali',
      date: '2023-06-28',
      time: '09:00 AM - 11:00 AM',
      status: 'completed',
      reviewed: true,
    },
    {
      key: '5',
      id: 'BK-1005',
      service: 'Car Wash',
      provider: 'Yasir Khan',
      date: '2023-06-15',
      time: '04:00 PM - 05:00 PM',
      status: 'cancelled',
      reviewed: false,
    },
  ];

  return (
    <MainLayout>
      <Title level={2}>{t('my_bookings')}</Title>
      
      <Card style={{ marginBottom: 24 }}>
        <Space style={{ marginBottom: 16 }} wrap>
          <Input 
            placeholder={t('search_bookings')} 
            prefix={<SearchOutlined />} 
            style={{ width: 250 }}
          />
          <RangePicker placeholder={[t('start_date'), t('end_date')]} />
          <Select defaultValue="all" style={{ width: 120 }}>
            <Option value="all">{t('all_status')}</Option>
            <Option value="upcoming">{t('upcoming')}</Option>
            <Option value="completed">{t('completed')}</Option>
            <Option value="cancelled">{t('cancelled')}</Option>
          </Select>
          <Button icon={<FilterOutlined />}>{t('filter')}</Button>
        </Space>
        
        <Table 
          columns={columns} 
          dataSource={data} 
          pagination={{ pageSize: 10 }}
          bordered
        />
      </Card>
    </MainLayout>
  );
};

export default CustomerBookings;
