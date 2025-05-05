import routes from '../../router'
import { MenuOutlined } from '@ant-design/icons'
import { Layout, Menu, Typography, Divider, Button } from 'antd'
import { FC, ReactNode, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const { Header, Sider, Content } = Layout

interface MainLayoutProps {
  children: ReactNode
}

const menuItems = routes

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  const handleNavigation = (path: string) => {
    navigate(path)
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems.map((item) => ({
            key: item.path,
            icon: item.icon,
            label: item.text,
            onClick: () => handleNavigation(item.path),
          }))}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: '#fff' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              paddingLeft: 40,
            }}
          >
            <Typography.Title level={4} style={{ margin: 0 }}>
              {menuItems.find((menu) => menu.path === location.pathname)?.text}
            </Typography.Title>
          </div>
        </Header>
        <Content
          style={{
            margin: 24,
            padding: 16,
            background: '#fff',
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout
