import React, { useState } from 'react';
import { Card, Typography, Button, Radio, Form, Input, Row, Col, Divider, Space, message, Modal, Tag } from 'antd';
import { 
  CreditCardOutlined, 
  BankOutlined, 
  MobileOutlined, 
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import MainLayout from '@/components/Layout/MainLayout';

const { Title, Text } = Typography;

interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'mobile';
  name: string;
  details: string;
  isDefault: boolean;
}

const CustomerPaymentMethods: React.FC = () => {
  const { t } = useTranslation();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'card',
      name: 'Visa Card',
      details: '**** **** **** 4242',
      isDefault: true,
    },
    {
      id: '2',
      type: 'mobile',
      name: 'JazzCash',
      details: '+92 300 1234567',
      isDefault: false,
    },
    {
      id: '3',
      type: 'mobile',
      name: 'EasyPaisa',
      details: '+92 333 7654321',
      isDefault: false,
    },
  ]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [paymentType, setPaymentType] = useState<string>('card');

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: t('confirm_deletion'),
      content: t('confirm_delete_payment_method'),
      okText: t('yes_delete'),
      okType: 'danger',
      cancelText: t('cancel'),
      onOk() {
        setPaymentMethods(paymentMethods.filter(method => method.id !== id));
        message.success(t('payment_method_deleted'));
      },
    });
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
    message.success(t('default_payment_updated'));
  };

  const handleAddPaymentMethod = (values: any) => {
    const newMethod: PaymentMethod = {
      id: Date.now().toString(),
      type: paymentType as 'card' | 'bank' | 'mobile',
      name: values.name,
      details: paymentType === 'card' 
        ? `**** **** **** ${values.cardNumber.slice(-4)}`
        : paymentType === 'bank' 
          ? values.accountNumber 
          : values.phoneNumber,
      isDefault: false,
    };

    setPaymentMethods([...paymentMethods, newMethod]);
    setIsAddModalVisible(false);
    form.resetFields();
    message.success(t('payment_method_added'));
  };

  const getMethodIcon = (type: string) => {
    switch(type) {
      case 'card':
        return <CreditCardOutlined style={{ fontSize: '24px', color: '#1890ff' }} />;
      case 'bank':
        return <BankOutlined style={{ fontSize: '24px', color: '#52c41a' }} />;
      case 'mobile':
        return <MobileOutlined style={{ fontSize: '24px', color: '#722ed1' }} />;
      default:
        return <CreditCardOutlined style={{ fontSize: '24px', color: '#1890ff' }} />;
    }
  };

  return (
    <MainLayout>
      <Title level={2}>{t('payment_methods')}</Title>
      
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <Text strong style={{ fontSize: 16 }}>{t('saved_payment_methods')}</Text>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => setIsAddModalVisible(true)}
          >
            {t('add_payment_method')}
          </Button>
        </div>
        
        <Divider />
        
        {paymentMethods.map((method) => (
          <Card 
            key={method.id} 
            style={{ 
              marginBottom: 16, 
              borderLeft: method.isDefault ? '4px solid #722ed1' : 'none'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {getMethodIcon(method.type)}
                <div style={{ marginLeft: 16 }}>
                  <Text strong>{method.name}</Text>
                  <br />
                  <Text type="secondary">{method.details}</Text>
                  {method.isDefault && (
                    <Tag color="purple" style={{ marginLeft: 8 }}>
                      {t('default')}
                    </Tag>
                  )}
                </div>
              </div>
              <Space>
                {!method.isDefault && (
                  <Button 
                    type="text" 
                    icon={<CheckCircleOutlined />} 
                    onClick={() => handleSetDefault(method.id)}
                  >
                    {t('set_default')}
                  </Button>
                )}
                <Button type="text" icon={<EditOutlined />}>
                  {t('edit')}
                </Button>
                <Button 
                  type="text" 
                  danger 
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(method.id)}
                >
                  {t('delete')}
                </Button>
              </Space>
            </div>
          </Card>
        ))}
        
        {paymentMethods.length === 0 && (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <Text type="secondary">{t('no_payment_methods')}</Text>
            <br />
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={() => setIsAddModalVisible(true)}
              style={{ marginTop: 16 }}
            >
              {t('add_payment_method')}
            </Button>
          </div>
        )}
      </Card>
      
      <Modal
        title={t('add_payment_method')}
        open={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddPaymentMethod}
        >
          <Form.Item
            name="paymentType"
            label={t('payment_type')}
            initialValue="card"
          >
            <Radio.Group 
              onChange={(e) => setPaymentType(e.target.value)}
              value={paymentType}
              buttonStyle="solid"
            >
              <Radio.Button value="card">
                <CreditCardOutlined /> {t('card')}
              </Radio.Button>
              <Radio.Button value="bank">
                <BankOutlined /> {t('bank')}
              </Radio.Button>
              <Radio.Button value="mobile">
                <MobileOutlined /> {t('mobile_wallet')}
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          
          <Form.Item
            name="name"
            label={t('name')}
            rules={[{ required: true, message: t('please_enter_name') }]}
          >
            <Input placeholder={t('enter_name_for_this_payment_method')} />
          </Form.Item>
          
          {paymentType === 'card' && (
            <>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="cardNumber"
                    label={t('card_number')}
                    rules={[{ required: true, message: t('please_enter_card_number') }]}
                  >
                    <Input placeholder="**** **** **** ****" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="expiryDate"
                    label={t('expiry_date')}
                    rules={[{ required: true, message: t('please_enter_expiry_date') }]}
                  >
                    <Input placeholder="MM/YY" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="cvv"
                    label="CVV"
                    rules={[{ required: true, message: t('please_enter_cvv') }]}
                  >
                    <Input placeholder="***" />
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}
          
          {paymentType === 'bank' && (
            <>
              <Form.Item
                name="bankName"
                label={t('bank_name')}
                rules={[{ required: true, message: t('please_enter_bank_name') }]}
              >
                <Input placeholder={t('enter_bank_name')} />
              </Form.Item>
              <Form.Item
                name="accountNumber"
                label={t('account_number')}
                rules={[{ required: true, message: t('please_enter_account_number') }]}
              >
                <Input placeholder={t('enter_account_number')} />
              </Form.Item>
            </>
          )}
          
          {paymentType === 'mobile' && (
            <>
              <Form.Item
                name="phoneNumber"
                label={t('phone_number')}
                rules={[{ required: true, message: t('please_enter_phone_number') }]}
              >
                <Input placeholder="+92 XXX XXXXXXX" />
              </Form.Item>
            </>
          )}
          
          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Button style={{ marginRight: 8 }} onClick={() => setIsAddModalVisible(false)}>
              {t('cancel')}
            </Button>
            <Button type="primary" htmlType="submit">
              {t('save')}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </MainLayout>
  );
};

export default CustomerPaymentMethods;
