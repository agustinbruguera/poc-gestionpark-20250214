import { Button, Card, Form, Input, Typography } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
        padding: 24
      }}
    >
      <Card style={{ maxWidth: 420, width: '100%', borderRadius: 24 }}>
        <Title level={3}>Bienvenido a GestiónPark</Title>
        <Paragraph type="secondary">Accedé al panel operador con las credenciales demo.</Paragraph>
        <Form layout="vertical" onFinish={handleSubmit} initialValues={{ email: 'operador@gestionpark.io' }}>
          <Form.Item name="email" label="Correo" rules={[{ required: true, message: 'Ingresá tu correo' }]}
            ><Input prefix={<MailOutlined />} placeholder="operador@gestionpark.io" /></Form.Item>
          <Form.Item name="password" label="Contraseña" rules={[{ required: true, message: 'Ingresá tu contraseña' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="********" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block size="large">
            Ingresar
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
