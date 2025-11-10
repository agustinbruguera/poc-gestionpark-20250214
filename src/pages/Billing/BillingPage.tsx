import { useEffect, useMemo, useState } from 'react';
import { Card, Col, Row, Space, Statistic, Table, Tag, Typography } from 'antd';
import { parkingService, PaymentRecord } from '../../services/parkingService';

const { Title } = Typography;

const BillingPage = () => {
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadPayments = async () => {
      setLoading(true);
      const response = await parkingService.listPayments();
      setPayments(response);
      setLoading(false);
    };
    loadPayments();
  }, []);

  const { totalCollected, totalPending } = useMemo(() => {
    return payments.reduce(
      (acc, record) => {
        if (record.status === 'paid') {
          acc.totalCollected += record.amount;
        } else {
          acc.totalPending += record.amount;
        }
        return acc;
      },
      { totalCollected: 0, totalPending: 0 }
    );
  }, [payments]);

  return (
    <Space direction="vertical" size={24} style={{ width: '100%' }}>
      <Title level={3} style={{ margin: 0 }}>
        Cobros y transacciones
      </Title>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={12} lg={8}>
          <Card bordered={false} style={{ borderRadius: 16 }}>
            <Statistic title="Cobrado hoy" value={totalCollected} prefix="$" precision={0} />
          </Card>
        </Col>
        <Col xs={24} md={12} lg={8}>
          <Card bordered={false} style={{ borderRadius: 16 }}>
            <Statistic title="Pendiente de cobro" value={totalPending} prefix="$" precision={0} valueStyle={{ color: '#f97316' }} />
          </Card>
        </Col>
      </Row>

      <Card title="Últimas transacciones" bodyStyle={{ padding: 0 }}>
        <Table<PaymentRecord>
          rowKey="id"
          loading={loading}
          dataSource={payments}
          pagination={{ pageSize: 8 }}
          columns={[
            { title: 'ID', dataIndex: 'id', width: 160 },
            { title: 'Concepto', dataIndex: 'concept' },
            {
              title: 'Monto',
              dataIndex: 'amount',
              render: (value: number, record) => `${record.currency} ${value.toLocaleString('es-AR')}`
            },
            {
              title: 'Método',
              dataIndex: 'method',
              render: (value: PaymentRecord['method']) => value.toUpperCase()
            },
            {
              title: 'Estado',
              dataIndex: 'status',
              render: (value: PaymentRecord['status']) => (
                <Tag color={value === 'paid' ? 'green' : 'red'}>{value === 'paid' ? 'Pagado' : 'Pendiente'}</Tag>
              )
            },
            {
              title: 'Emitido',
              dataIndex: 'issuedAt',
              render: (value: string) => new Date(value).toLocaleString('es-AR')
            }
          ]}
        />
      </Card>
    </Space>
  );
};

export default BillingPage;
