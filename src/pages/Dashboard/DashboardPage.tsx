import { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Space, Table, Typography } from 'antd';
import OccupancySummary from '../../components/organisms/OccupancySummary';
import { parkingService, ParkingSpot, ReservationRecord } from '../../services/parkingService';
import StatusBadge from '../../components/atoms/StatusBadge';

const { Title, Text } = Typography;

const DashboardPage = () => {
  const [spots, setSpots] = useState<ParkingSpot[]>([]);
  const [reservations, setReservations] = useState<ReservationRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const [spotsResponse, reservationsResponse] = await Promise.all([
        parkingService.listSpots(),
        parkingService.listReservations()
      ]);
      setSpots(spotsResponse);
      setReservations(reservationsResponse);
      setLoading(false);
    };

    loadData();
    const poller = setInterval(loadData, 15000);
    return () => clearInterval(poller);
  }, []);

  const occupied = spots.filter((spot) => spot.status === 'occupied').length;
  const reserved = spots.filter((spot) => spot.status === 'reserved').length;

  return (
    <Space direction="vertical" size={32} style={{ width: '100%' }}>
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={3} style={{ marginBottom: 0 }}>
            Dashboard operativo
          </Title>
          <Text type="secondary">Estado actual del estacionamiento y próximas acciones</Text>
        </Col>
        <Col>
          <Button type="primary" size="large">
            Nueva reserva rápida
          </Button>
        </Col>
      </Row>

      <OccupancySummary total={spots.length || 1} occupied={occupied} reserved={reserved} />

      <Card title="Próximos ingresos" bodyStyle={{ padding: 0 }}>
        <Table<ReservationRecord>
          dataSource={reservations.slice(0, 5)}
          loading={loading}
          pagination={false}
          rowKey="id"
          columns={[
            { title: 'Plaza', dataIndex: 'spotCode' },
            { title: 'Cliente', dataIndex: 'customer' },
            { title: 'Vehículo', dataIndex: 'vehicle' },
            {
              title: 'Inicio',
              dataIndex: 'start',
              render: (value: string) => new Date(value).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
            },
            {
              title: 'Estado',
              dataIndex: 'status',
              render: (value: ReservationRecord['status']) => <StatusBadge status={value === 'in-progress' ? 'occupied' : 'reserved'} />
            },
            {
              title: 'Acción',
              render: (_, record) => (
                <Button type="link" size="small">
                  Procesar check-in
                </Button>
              )
            }
          ]}
        />
      </Card>
    </Space>
  );
};

export default DashboardPage;
