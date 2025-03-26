
import React, { useState } from 'react';
import { Card, Typography, Collapse, Input, Button, List, Divider, Avatar, Form, Select, Row, Col, message } from 'antd';
import { 
  SearchOutlined, 
  QuestionCircleOutlined, 
  PhoneOutlined, 
  MessageOutlined, 
  ArrowRightOutlined,
  MailOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import MainLayout from '@/components/Layout/MainLayout';

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;
const { TextArea } = Input;
const { Option } = Select;

interface FAQ {
  question: string;
  answer: string;
}

const CustomerHelp: React.FC = () => {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState('');
  
  const faqs: FAQ[] = [
    {
      question: 'How do I book a service?',
      answer: 'You can book a service by browsing through available service categories, selecting a service provider, choosing a date and time, and confirming your booking. Payment can be made through various methods including cash on delivery, EasyPaisa, and JazzCash.',
    },
    {
      question: 'How can I reschedule my booking?',
      answer: 'To reschedule a booking, go to your Bookings page, find the booking you wish to reschedule, and click on the "Reschedule" button. You can then select a new date and time for your service.',
    },
    {
      question: 'Can I cancel my booking?',
      answer: 'Yes, you can cancel your booking by going to your Bookings page, finding the booking you wish to cancel, and clicking on the "Cancel" button. Please note that cancellations made less than 24 hours before the scheduled service may incur a cancellation fee.',
    },
    {
      question: 'How do I leave a review for a service provider?',
      answer: 'After your service is completed, you will receive a notification to leave a review. You can also go to your Service History, find the completed service, and click on "Leave a Review" to rate your experience with the service provider.',
    },
    {
      question: 'How do I add a payment method?',
      answer: 'You can add a payment method by going to Payment Methods in your dashboard and clicking on "Add Payment Method". You can add credit/debit cards, bank accounts, or mobile wallet information.',
    },
  ];
  
  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchText.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchText.toLowerCase())
  );
  
  const onSearch = (value: string) => {
    setSearchText(value);
  };
  
  const handleContactSubmit = (values: any) => {
    console.log('Contact form values:', values);
    message.success(t('contact_form_submitted'));
  };

  return (
    <MainLayout>
      <Title level={2}>{t('help_support')}</Title>
      
      <Card style={{ marginBottom: 24 }}>
        <Title level={4}>{t('how_can_we_help')}</Title>
        <Input
          size="large"
          placeholder={t('search_for_help')}
          prefix={<SearchOutlined />}
          allowClear
          onChange={(e) => onSearch(e.target.value)}
          style={{ marginBottom: 24 }}
        />
        
        <Title level={4}>{t('faqs')}</Title>
        {filteredFAQs.length > 0 ? (
          <Collapse 
            expandIconPosition="right"
            bordered={false}
            ghost
          >
            {filteredFAQs.map((faq, index) => (
              <Panel header={<Text strong>{faq.question}</Text>} key={index}>
                <Paragraph>{faq.answer}</Paragraph>
              </Panel>
            ))}
          </Collapse>
        ) : (
          <Paragraph type="secondary" style={{ textAlign: 'center', padding: '20px 0' }}>
            {t('no_faqs_found')}
          </Paragraph>
        )}
      </Card>
      
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card>
            <Title level={4}>{t('contact_us')}</Title>
            <Form
              layout="vertical"
              onFinish={handleContactSubmit}
              initialValues={{ issue_type: 'general' }}
            >
              <Form.Item
                name="issue_type"
                label={t('issue_type')}
                rules={[{ required: true, message: t('please_select_issue_type') }]}
              >
                <Select placeholder={t('select_issue_type')}>
                  <Option value="general">{t('general_inquiry')}</Option>
                  <Option value="booking">{t('booking_issue')}</Option>
                  <Option value="payment">{t('payment_issue')}</Option>
                  <Option value="technical">{t('technical_problem')}</Option>
                  <Option value="other">{t('other')}</Option>
                </Select>
              </Form.Item>
              
              <Form.Item
                name="subject"
                label={t('subject')}
                rules={[{ required: true, message: t('please_enter_subject') }]}
              >
                <Input placeholder={t('enter_subject')} />
              </Form.Item>
              
              <Form.Item
                name="message"
                label={t('message')}
                rules={[{ required: true, message: t('please_enter_message') }]}
              >
                <TextArea 
                  rows={4} 
                  placeholder={t('describe_your_issue')} 
                />
              </Form.Item>
              
              <Form.Item>
                <Button type="primary" htmlType="submit" icon={<MailOutlined />}>
                  {t('send_message')}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        
        <Col xs={24} md={12}>
          <Card>
            <Title level={4}>{t('contact_information')}</Title>
            <List
              itemLayout="horizontal"
              dataSource={[
                {
                  title: t('customer_support'),
                  description: '+92 300 1234567',
                  icon: <PhoneOutlined style={{ fontSize: '24px', color: '#722ed1' }} />,
                },
                {
                  title: t('technical_support'),
                  description: 'support@karigar.pk',
                  icon: <MailOutlined style={{ fontSize: '24px', color: '#722ed1' }} />,
                },
                {
                  title: t('whatsapp_support'),
                  description: '+92 333 7654321',
                  icon: <MessageOutlined style={{ fontSize: '24px', color: '#722ed1' }} />,
                },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={item.icon} />}
                    title={item.title}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
            
            <Divider />
            
            <Title level={4}>{t('support_hours')}</Title>
            <Paragraph>
              <strong>{t('monday_friday')}:</strong> 9:00 AM - 8:00 PM
            </Paragraph>
            <Paragraph>
              <strong>{t('saturday')}:</strong> 10:00 AM - 6:00 PM
            </Paragraph>
            <Paragraph>
              <strong>{t('sunday')}:</strong> Closed
            </Paragraph>
            
            <Divider />
            
            <Button 
              type="primary" 
              block 
              icon={<MessageOutlined />}
              onClick={() => message.info(t('live_chat_clicked'))}
            >
              {t('start_live_chat')}
            </Button>
          </Card>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default CustomerHelp;
