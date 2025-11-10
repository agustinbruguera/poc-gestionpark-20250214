import { Card, Col, Progress, Row, Space, Typography } from 'antd';
import MetricTile from '../atoms/MetricTile';

const { Text } = Typography;

interface OccupancySummaryProps {
  total: number;
  occupied: number;
  reserved: number;
}

const OccupancySummary = ({ total, occupied, reserved }: OccupancySummaryProps) => {
  const availability = total - occupied - reserved;
  const occupiedPct = Math.round((occupied / total) * 100);
  const reservedPct = Math.round((reserved / total) * 100);

  return (
    <Row gutter={[24, 24]}>
      <Col xs={24} md={12} lg={8}>
        <MetricTile title="Plazas ocupadas" value={occupied} suffix={`/${total}`} extra={<Text type="secondary">{occupiedPct}% ocupación</Text>} />
      </Col>
      <Col xs={24} md={12} lg={8}>
        <MetricTile title="Reservas activas" value={reserved} suffix={`/${total}`} extra={<Text type="secondary">{reservedPct}% bloqueadas</Text>} />
      </Col>
      <Col xs={24} lg={8}>
        <Card bordered={false} style={{ borderRadius: 16 }}>
          <Space direction="vertical" size={12} style={{ width: '100%' }}>
            <Text strong>Nivel de ocupación en tiempo real</Text>
            <Progress percent={occupiedPct} status={occupiedPct > 85 ? 'exception' : 'normal'} strokeWidth={12} />
            <Text type="secondary">Disponibles: {availability}</Text>
          </Space>
        </Card>
      </Col>
    </Row>
  );
};

export default OccupancySummary;
