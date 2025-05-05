import request from '@/request'
import { Button, Form, Input, InputRef, Radio, Select, Upload } from 'antd'
import { useEffect, useRef, useState } from 'react'

type FormType = {
  amount: number
  category: string
  description: string
}
const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState<[]>([])
  useEffect(() => {
    request.get('/expense').then((res) => {
      console.log(res)
      setExpenses(res.data)
    })
  }, [])
  const onFinish = (values: FormType) => {
    request.post('/expense', {
      ...values,
      amount: Number(values.amount),
    })
  }
  return (
    <div>
      <div className="flex">
        <div>图片识别</div>
        <Upload action="api/upload" listType="picture-card" maxCount={1}>
          +上传
        </Upload>
      </div>
      <Form<FormType> onFinish={onFinish}>
        <Form.Item label="金额" name="amount">
          <Input placeholder="请输入金额" suffix="元" />
        </Form.Item>
        <Form.Item label="分类" name="category">
          <Select
            options={[
              {
                label: '吃饭',
                value: '吃饭',
              },
              {
                label: '看偶',
                value: '看偶',
              },
              {
                label: '买衣服',
                value: '买衣服',
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="备注" name="description">
          <Input placeholder="请输入备注" />
        </Form.Item>
        <Button htmlType="submit">上传</Button>
      </Form>
    </div>
  )
}

export default ExpenseTracker
