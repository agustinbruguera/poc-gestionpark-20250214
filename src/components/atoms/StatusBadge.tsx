import { Tag } from 'antd';

export type ParkingStatus = 'available' | 'occupied' | 'reserved' | 'maintenance';

const statusConfig: Record<ParkingStatus, { label: string; color: string }> = {
  available: { label: 'Disponible', color: 'green' },
  occupied: { label: 'Ocupada', color: 'red' },
  reserved: { label: 'Reservada', color: 'orange' },
  maintenance: { label: 'Fuera de servicio', color: 'gold' }
};

interface StatusBadgeProps {
  status: ParkingStatus;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = statusConfig[status];
  return <Tag color={config.color}>{config.label}</Tag>;
};

export default StatusBadge;
