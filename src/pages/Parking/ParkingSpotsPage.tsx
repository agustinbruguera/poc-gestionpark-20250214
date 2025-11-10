import { useEffect, useMemo, useState } from 'react';
import { Col, Empty, Input, Row, Segmented, Space, Typography } from 'antd';
import ParkingSpotCard from '../../components/molecules/ParkingSpotCard';
import { parkingService, ParkingSpot } from '../../services/parkingService';

const { Title } = Typography;

const statusOptions = [
  { label: 'Todas', value: 'all' },
  { label: 'Disponibles', value: 'available' },
  { label: 'Ocupadas', value: 'occupied' },
  { label: 'Reservadas', value: 'reserved' },
  { label: 'Mantenimiento', value: 'maintenance' }
];

const ParkingSpotsPage = () => {
  const [spots, setSpots] = useState<ParkingSpot[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    parkingService.listSpots().then(setSpots);
  }, []);

  const filteredSpots = useMemo(() => {
    return spots.filter((spot) => {
      const matchesSearch = `${spot.code} ${spot.level}`.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' ? true : spot.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [spots, search, statusFilter]);

  return (
    <Space direction="vertical" size={24} style={{ width: '100%' }}>
      <Space direction="vertical" size={12} style={{ width: '100%' }}>
        <Title level={3} style={{ margin: 0 }}>
          Gestión de plazas
        </Title>
        <Space wrap size={16}>
          <Input.Search
            placeholder="Buscar por código o nivel"
            allowClear
            onChange={(event) => setSearch(event.target.value)}
            style={{ minWidth: 240 }}
          />
          <Segmented
            options={statusOptions}
            value={statusFilter}
            onChange={(value) => setStatusFilter(value as string)}
          />
        </Space>
      </Space>

      <Row gutter={[24, 24]}>
        {filteredSpots.length === 0 && (
          <Col span={24}>
            <Empty description="No se encontraron plazas con los filtros seleccionados" />
          </Col>
        )}
        {filteredSpots.map((spot) => (
          <Col key={spot.id} xs={24} sm={12} xl={8} xxl={6}>
            <ParkingSpotCard
              code={spot.code}
              level={spot.level}
              type={spot.type}
              status={spot.status}
              nextReservation={spot.nextReservation}
            />
          </Col>
        ))}
      </Row>
    </Space>
  );
};

export default ParkingSpotsPage;
