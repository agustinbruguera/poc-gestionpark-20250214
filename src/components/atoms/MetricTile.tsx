import { Card, Statistic } from 'antd';
import type { ReactNode } from 'react';

interface MetricTileProps {
  title: string;
  value: number | string;
  suffix?: string;
  prefix?: ReactNode;
  extra?: ReactNode;
}

const MetricTile = ({ title, value, suffix, prefix, extra }: MetricTileProps) => (
  <Card bordered={false} hoverable style={{ borderRadius: 16 }} bodyStyle={{ padding: 20 }}>
    <Statistic title={title} value={value} suffix={suffix} prefix={prefix} valueStyle={{ fontSize: 32 }} />
    {extra && <div style={{ marginTop: 12 }}>{extra}</div>}
  </Card>
);

export default MetricTile;
