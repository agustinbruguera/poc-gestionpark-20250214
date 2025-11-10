import { Layout, Menu, Typography, theme, Avatar, Badge, Space } from 'antd';
import {
  DashboardOutlined,
  CarOutlined,
  CalendarOutlined,
  DollarCircleOutlined,
  SettingOutlined,
  BellOutlined
} from '@ant-design/icons';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import type { ItemType } from 'antd/es/menu/hooks/useItems';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const menuItems: Array<ItemType & { key: string; path: string }> = [
  { key: 'dashboard', icon: <DashboardOutlined />, label: 'Dashboard', path: '/' },
  { key: 'parking', icon: <CarOutlined />, label: 'Plazas', path: '/parking' },
  { key: 'reservations', icon: <CalendarOutlined />, label: 'Reservas', path: '/reservations' },
  { key: 'billing', icon: <DollarCircleOutlined />, label: 'Cobros', path: '/billing' },
  { key: 'settings', icon: <SettingOutlined />, label: 'Configuración', path: '/settings' }
];

const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  const selectedKey =
    menuItems.find((item) => location.pathname === '/' ? item.path === '/' : location.pathname.startsWith(item.path))?.key ??
    'dashboard';

  return (
    <Layout hasSider>
      <Sider
        width={240}
        style={{ minHeight: '100vh', background: '#0f172a' }}
        breakpoint="lg"
        collapsedWidth={80}
      >
        <div style={{ padding: '24px 16px', color: 'white', fontWeight: 700, fontSize: 20 }}>GestiónPark</div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={({ key }) => {
            const destination = menuItems.find((item) => item?.key === key)?.path;
            if (destination) navigate(destination);
          }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: colorBgContainer,
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <Text strong style={{ fontSize: 18 }}>
              Control en tiempo real
            </Text>
            <Text type="secondary" style={{ marginLeft: 12 }}>
              Monitor de ocupación y operaciones del parking
            </Text>
          </div>
          <Space size={20}>
            <Badge dot>
              <BellOutlined style={{ fontSize: 20 }} />
            </Badge>
            <Space size={12} align="center">
              <Avatar size="large" style={{ backgroundColor: '#1d4ed8' }}>
                GP
              </Avatar>
              <div style={{ lineHeight: 1 }}>
                <Text strong>Operador Demo</Text>
                <br />
                <Text type="secondary">Turno AM</Text>
              </div>
            </Space>
          </Space>
        </Header>
        <Content style={{ margin: 24 }}>
          <div
            style={{
              background: colorBgContainer,
              borderRadius: 24,
              padding: 32,
              boxShadow: '0 12px 40px rgba(15, 23, 42, 0.08)'
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
