import { useState } from 'react';
import { Button, Card, Form, InputNumber, Switch, Typography, message } from 'antd';

const { Title, Paragraph } = Typography;

const SettingsPage = () => {
  const [loading, setLoading] = useState(false);

  const handleSave = async (values: unknown) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    message.success('Tarifas actualizadas para la demo');
    setLoading(false);
  };

  return (
    <Card>
      <Title level={3}>Configuración de tarifas</Title>
      <Paragraph type="secondary">
        Ajustá los valores de referencia para calcular los costos de estacionamiento dentro del POC.
      </Paragraph>
      <Form
        layout="vertical"
        initialValues={{ hourlyRate: 950, fractionRate: 250, overnightRate: 4000, allowManualOverride: true }}
        onFinish={handleSave}
      >
        <Form.Item label="Tarifa por hora" name="hourlyRate" rules={[{ required: true, message: 'Ingresá la tarifa por hora' }]}>
          <InputNumber prefix="$" style={{ width: '100%' }} min={0} step={50} />
        </Form.Item>
        <Form.Item label="Tarifa por fracción (30 min)" name="fractionRate" rules={[{ required: true }]}>
          <InputNumber prefix="$" style={{ width: '100%' }} min={0} step={50} />
        </Form.Item>
        <Form.Item label="Tarifa overnight" name="overnightRate" rules={[{ required: true }]}>
          <InputNumber prefix="$" style={{ width: '100%' }} min={0} step={100} />
        </Form.Item>
        <Form.Item label="Permitir ajustes manuales" name="allowManualOverride" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Guardar cambios
        </Button>
      </Form>
    </Card>
  );
};

export default SettingsPage;
