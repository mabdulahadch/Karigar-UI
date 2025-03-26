
import React, { useState } from 'react';
import { Layout, Card, Typography, Row, Col, Statistic, Table, Button, Calendar, Tag, Rate, Badge } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  UserOutlined, 
  StarOutlined, 
  DollarOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  MessageOutlined,
  CalendarOutlined,
  AreaChartOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

const { Content } = Layout;
const { Title, Text } = Typography;

const columns = [
  {
    title: 'Booking ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Service',
    dataIndex: 'service',
    key: 'service',
  },
  {
    title: 'Customer',
    dataIndex: 'customer',
    key: 'customer',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => (
      <Tag color={status === 'Completed' ? 'green' : status === 'Pending' ? 'blue' : 'red'}>{status}</Tag>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Button size="small">View Details</Button>
    ),
  },
];

const data = [
  {
    key: '1',
    id: 'B001',
    service: 'Plumbing',
    customer: 'John Doe',
    date: '2024-03-15',
    status: 'Completed',
  },
  {
    key: '2',
    id: 'B002',
    service: 'Electrical',
    customer: 'Jane Smith',
    date: '2024-03-16',
    status: 'Pending',
  },
  {
    key: '3',
    id: 'B003',
    service: 'Cleaning',
    customer: 'Mike Johnson',
    date: '2024-03-17',
    status: 'Scheduled',
  },
];

const bookingData = [
  { type: 'Total Bookings', value: 120, icon: <CalendarOutlined />, color: '#29ABE2' },
  { type: 'Completed', value: 95, icon: <CheckCircleOutlined />, color: '#87D068' },
  { type: 'Pending', value: 20, icon: <ClockCircleOutlined />, color: '#FADB14' },
  { type: 'Messages', value: 30, icon: <MessageOutlined />, color: '#1890FF' },
];

const reviewsData = [
  { name: 'Jan', uv: 400, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 300, pv: 1398, amt: 2210 },
  { name: 'Mar', uv: 200, pv: 9800, amt: 2290 },
  { name: 'Apr', uv: 278, pv: 3908, amt: 2000 },
  { name: 'May', uv: 189, pv: 4800, amt: 2181 },
  { name: 'Jun', uv: 239, pv: 3800, amt: 2500 },
  { name: 'Jul', uv: 349, pv: 4300, amt: 2100 },
  { name: 'Aug', uv: 400, pv: 2400, amt: 2400 },
  { name: 'Sep', uv: 300, pv: 1398, amt: 2210 },
  { name: 'Oct', uv: 200, pv: 9800, amt: 2290 },
  { name: 'Nov', uv: 278, pv: 3908, amt: 2000 },
  { name: 'Dec', uv: 189, pv: 4800, amt: 2181 },
];

const ProviderDashboard: React.FC = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState(dayjs()); // Initialize with current date as dayjs object

  const onSelect = (newValue: any) => {
    setValue(newValue);
  };

  const onPanelChange = (newValue: any) => {
    setValue(newValue);
  };

  return (
    <Layout style={{ padding: '24px', background: '#fff' }}>
      <Content>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Card>
              <Statistic
                title={t('total_earnings')}
                value={5678.90}
                precision={2}
                prefix={<DollarOutlined />}
                suffix="USD"
              />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Card>
              <Statistic
                title={t('customer_satisfaction')}
                value={4.7}
                precision={1}
                prefix={<StarOutlined />}
                suffix="/5"
              />
              <Rate disabled defaultValue={4.7} />
            </Card>
          </Col>
        </Row>

        <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
          {bookingData.map((item, index) => (
            <Col xs={24} sm={12} md={8} lg={6} xl={6} key={index}>
              <Card>
                <Statistic
                  title={item.type}
                  value={item.value}
                  prefix={item.icon}
                  suffix=""
                />
              </Card>
            </Col>
          ))}
        </Row>

        <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
          <Col xs={24} sm={24} md={16} lg={16} xl={16}>
            <Card title={t('recent_bookings')}>
              <Table columns={columns} dataSource={data} />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Card title={t('calendar')}>
              <Calendar value={value} onSelect={onSelect} onPanelChange={onPanelChange} />
            </Card>
          </Col>
        </Row>

        <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Card title={t('reviews_analytics')}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={reviewsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="pv" stackId="a" fill="#8884d8" />
                  <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default ProviderDashboard;
