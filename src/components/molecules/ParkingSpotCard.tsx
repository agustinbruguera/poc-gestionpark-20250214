import { Card, Space, Typography } from 'antd';
import { CarOutlined } from '@ant-design/icons';
import StatusBadge, { ParkingStatus } from '../atoms/StatusBadge';

const { Text, Title } = Typography;

export interface ParkingSpotCardProps {
  code: string;
  level: string;
  type: 'auto' | 'moto' | 'vip';
  status: ParkingStatus;
  nextReservation?: string;
}

const typeLabels: Record<ParkingSpotCardProps['type'], string> = {
  auto: 'Auto',
  moto: 'Moto',
  vip: 'VIP'
};

const ParkingSpotCard = ({ code, level, type, status, nextReservation }: ParkingSpotCardProps) => (
  <Card hoverable style={{ borderRadius: 20 }}>
    <Space direction="vertical" size={12} style={{ width: '100%' }}>
      <Space align="center" size={12}>
        <CarOutlined style={{ fontSize: 24, color: '#3f51b5' }} />
        <Title level={4} style={{ margin: 0 }}>
          Plaza {code}
        </Title>
      </Space>
      <Space size={12} wrap>
        <StatusBadge status={status} />
        <Text type="secondary">Nivel {level}</Text>
        <Text type="secondary">Tipo: {typeLabels[type]}</Text>
      </Space>
      {nextReservation ? (
        <Text strong>Próxima reserva: {nextReservation}</Text>
      ) : (
        <Text type="secondary">Sin reservas próximas</Text>
      )}
    </Space>
  </Card>
);

export default ParkingSpotCard;
