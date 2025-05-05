import About from '../pages/About'
import ExpenseTracker from '../pages/ExpenseTracker'
import Home from '../pages/Home'
import Settings from '../pages/Settings'
import User from '../pages/User'
import {
  HomeOutlined,
  InfoCircleOutlined,
  SettingOutlined,
  DollarOutlined,
  UserOutlined,
} from '@ant-design/icons'

const routes = [
  {
    path: '/',
    component: <Home />,
    text: '首页',
    icon: <HomeOutlined />,
  },
  {
    path: '/expense-tracker',
    component: <ExpenseTracker />,
    text: '记账',
    icon: <DollarOutlined />,
  },
  {
    path: '/about',
    component: <About />,
    text: '关于',
    icon: <InfoCircleOutlined />,
  },
  {
    path: '/settings',
    component: <Settings />,
    text: '设置',
    icon: <SettingOutlined />,
  },
  {
    path: '/user',
    component: <User />,
    text: '登录/注册',
    icon: <UserOutlined />,
  },
]

export default routes
