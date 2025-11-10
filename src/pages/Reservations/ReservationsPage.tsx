import { useEffect, useState } from 'react';
import {
  Button,
  DatePicker,
  Drawer,
  Form,
  Input,
  Select,
  Space,
  Table,
  Tag,
  Typography,
  message
} from 'antd';
import dayjs from 'dayjs';
import { parkingService, ReservationRecord } from '../../services/parkingService';
import { parkingSpotsMock } from '../../data/mockData';

const { RangePicker } = DatePicker;
const { Title } = Typography;

const ReservationsPage = () => {
  const [reservations, setReservations] = useState<ReservationRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const loadReservations = async () => {
    setLoading(true);
    const response = await parkingService.listReservations();
    setReservations(response);
    setLoading(false);
  };

  useEffect(() => {
    loadReservations();
  }, []);

  const handleCreateReservation = async () => {
    try {
      const values = await form.validateFields();
      await parkingService.createReservation({
        spotCode: values.spotCode,
        customer: values.customer,
        vehicle: values.vehicle,
        start: values.schedule[0].toISOString(),
        end: values.schedule[1].toISOString(),
        status: 'scheduled'
      });
      message.success('Reserva creada exitosamente');
      setOpen(false);
      form.resetFields();
      loadReservations();
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message);
      }
    }
  };

  return (
    <Space direction="vertical" size={24} style={{ width: '100%' }}>
      <Space align="center" style={{ width: '100%', justifyContent: 'space-between' }}>
        <Title level={3} style={{ margin: 0 }}>
          Reservas
        </Title>
        <Button type="primary" size="large" onClick={() => setOpen(true)}>
          Nueva reserva
        </Button>
      </Space>

      <Table<ReservationRecord>
        rowKey="id"
        loading={loading}
        dataSource={reservations}
        pagination={{ pageSize: 6 }}
        columns={[
          { title: 'Plaza', dataIndex: 'spotCode', width: 120 },
          { title: 'Cliente', dataIndex: 'customer' },
          { title: 'Vehículo', dataIndex: 'vehicle' },
          {
            title: 'Inicio',
            dataIndex: 'start',
            render: (value: string) => dayjs(value).format('DD MMM HH:mm')
          },
          {
            title: 'Fin',
            dataIndex: 'end',
            render: (value: string) => dayjs(value).format('DD MMM HH:mm')
          },
          {
            title: 'Estado',
            dataIndex: 'status',
            render: (value: ReservationRecord['status']) => <Tag color={value === 'in-progress' ? 'blue' : 'gold'}>{value}</Tag>
          },
          {
            title: 'Pago',
            dataIndex: 'paymentStatus',
            render: (value: ReservationRecord['paymentStatus']) => (
              <Tag color={value === 'paid' ? 'green' : 'red'}>{value === 'paid' ? 'Pagado' : 'Pendiente'}</Tag>
            )
          }
        ]}
      />

      <Drawer
        title="Crear reserva"
        width={420}
        open={open}
        onClose={() => setOpen(false)}
        destroyOnClose
        extra={
          <Space>
            <Button onClick={() => setOpen(false)}>Cancelar</Button>
            <Button type="primary" onClick={handleCreateReservation}>
              Guardar
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" form={form} initialValues={{ schedule: [dayjs(), dayjs().add(2, 'hour')] }}>
          <Form.Item name="customer" label="Cliente" rules={[{ required: true, message: 'Ingrese el nombre del cliente' }]}>
            <Input placeholder="Nombre y apellido" />
          </Form.Item>
          <Form.Item name="vehicle" label="Vehículo" rules={[{ required: true, message: 'Ingrese el vehículo' }]}>
            <Input placeholder="Ej. Toyota Corolla - ABC123" />
          </Form.Item>
          <Form.Item name="spotCode" label="Plaza" rules={[{ required: true, message: 'Seleccione una plaza' }]}>
            <Select placeholder="Seleccione plaza disponible">
              {parkingSpotsMock.filter((spot) => spot.status === 'available').map((spot) => (
                <Select.Option key={spot.code} value={spot.code}>
                  {spot.code} · Nivel {spot.level}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="schedule"
            label="Horario"
            rules={[{ required: true, message: 'Seleccione inicio y fin' }]}
          >
            <RangePicker
              showTime={{ format: 'HH:mm' }}
              format="DD/MM/YYYY HH:mm"
              style={{ width: '100%' }}
              minuteStep={15}
            />
          </Form.Item>
        </Form>
      </Drawer>
    </Space>
  );
};

export default ReservationsPage;
