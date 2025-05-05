import request from '@/request'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import { Form, Input, Button, Tabs, message, Card } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface LoginForm {
  username: string
  password: string
}

interface RegisterForm extends LoginForm {
  confirmPassword: string
}

const User = () => {
  const [activeTab, setActiveTab] = useState('login')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // 登录表单提交
  const handleLogin = async (values: LoginForm) => {
    try {
      setLoading(true)
      const response = await request.post('/user/login', values)
      message.success('登录成功')
      // 登录成功后跳转到首页
      navigate('/')
    } catch (error: any) {
      message.error(error.response?.data?.error || '登录失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  // 注册表单提交
  const handleRegister = async (values: RegisterForm) => {
    // 确认密码验证
    if (values.password !== values.confirmPassword) {
      message.error('两次输入的密码不一致')
      return
    }

    try {
      setLoading(true)
      // 移除确认密码字段，只发送用户名和密码
      const { confirmPassword, ...registerData } = values
      const response = await request.post('/user/register', registerData)
      message.success('注册成功，请登录')
      setActiveTab('login')
    } catch (error: any) {
      message.error(error.response?.data?.error || '注册失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center h-full">
      <Card className="w-full max-w-md">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          centered
          items={[
            {
              key: 'login',
              label: '登录',
              children: (
                <Form
                  name="login"
                  initialValues={{ remember: true }}
                  onFinish={handleLogin}
                  size="large"
                  layout="vertical"
                >
                  <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
                    <Input prefix={<UserOutlined />} placeholder="用户名" />
                  </Form.Item>

                  <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
                    <Input.Password prefix={<LockOutlined />} placeholder="密码" />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                      登录
                    </Button>
                  </Form.Item>
                </Form>
              ),
            },
            {
              key: 'register',
              label: '注册',
              children: (
                <Form name="register" onFinish={handleRegister} size="large" layout="vertical">
                  <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
                    <Input prefix={<UserOutlined />} placeholder="用户名" />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[
                      { required: true, message: '请输入密码' },
                      { min: 6, message: '密码长度不能少于6位' },
                    ]}
                  >
                    <Input.Password prefix={<LockOutlined />} placeholder="密码" />
                  </Form.Item>

                  <Form.Item
                    name="confirmPassword"
                    rules={[
                      { required: true, message: '请确认密码' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve()
                          }
                          return Promise.reject(new Error('两次输入的密码不一致'))
                        },
                      }),
                    ]}
                  >
                    <Input.Password prefix={<LockOutlined />} placeholder="确认密码" />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                      注册
                    </Button>
                  </Form.Item>
                </Form>
              ),
            },
          ]}
        />
      </Card>
    </div>
  )
}

export default User
