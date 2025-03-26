
import React from 'react';
import { Layout, Row, Col, Typography, Space, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';

const { Footer } = Layout;
const { Title, Text } = Typography;

const AppFooter: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Footer style={{ background: '#f5f8ff', padding: '48px 24px 24px' }}>
      <Row gutter={[48, 32]}>
        <Col xs={24} sm={12} md={6}>
          <Title level={3} style={{ color: '#7a2df7' }}>{t('app_name')}</Title>
          <Text style={{ display: 'block', marginBottom: 24 }}>
            {t('tagline')}
          </Text>
          <Space>
            <FacebookOutlined style={{ fontSize: 20 }} />
            <TwitterOutlined style={{ fontSize: 20 }} />
            <InstagramOutlined style={{ fontSize: 20 }} />
            <LinkedinOutlined style={{ fontSize: 20 }} />
          </Space>
        </Col>
        
        <Col xs={24} sm={12} md={6}>
          <Title level={5}>{t('categories')}</Title>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><Link to="/services/plumbing">Plumbing</Link></li>
            <li><Link to="/services/electrical">Electrical</Link></li>
            <li><Link to="/services/cleaning">Cleaning</Link></li>
            <li><Link to="/services/tutoring">Tutoring</Link></li>
            <li><Link to="/services/carpentry">Carpentry</Link></li>
          </ul>
        </Col>
        
        <Col xs={24} sm={12} md={6}>
          <Title level={5}>{t('about')}</Title>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/how-it-works">How It Works</Link></li>
            <li><Link to="/careers">Careers</Link></li>
            <li><Link to="/press">Press</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </Col>
        
        <Col xs={24} sm={12} md={6}>
          <Title level={5}>{t('contact')}</Title>
          <Space direction="vertical">
            <Text><MailOutlined /> support@karigar.com</Text>
            <Text><PhoneOutlined /> +92 300 1234567</Text>
            <Text><EnvironmentOutlined /> Karachi, Pakistan</Text>
          </Space>
        </Col>
      </Row>
      
      <Divider />
      
      <Row justify="space-between" align="middle">
        <Col>
          <Text type="secondary">© 2023 Karigar. All rights reserved.</Text>
        </Col>
        <Col>
          <Space split={<Divider type="vertical" />}>
            <Link to="/terms">{t('terms')}</Link>
            <Link to="/privacy">{t('privacy')}</Link>
            <Link to="/cookies">{t('cookies')}</Link>
          </Space>
        </Col>
      </Row>
    </Footer>
  );
};

export default AppFooter;
