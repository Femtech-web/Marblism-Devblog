'use client'

import React, { useEffect, useState } from 'react'
import {
  Button,
  Form,
  Input,
  Switch,
  Typography,
  Row,
  Col,
  Avatar,
  Upload,
} from 'antd'
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  NotificationOutlined,
  UploadOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function UserSettingsPage() {
  const [user, setUser] = useState(null)
  const [form] = Form.useForm()
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const userId = authentication.user?.id

  useEffect(() => {
    if (userId) {
      Api.User.findOne(userId, { includes: ['notifications'] })
        .then(setUser)
        .catch(() =>
          enqueueSnackbar('Failed to fetch user data', { variant: 'error' }),
        )
    }
  }, [userId])

  const handleSubmit = async values => {
    try {
      await Api.User.updateOne(userId, values)
      enqueueSnackbar('Profile updated successfully', { variant: 'success' })
    } catch {
      enqueueSnackbar('Failed to update profile', { variant: 'error' })
    }
  }

  const handleUpload = async options => {
    const { file } = options
    const url = await Api.Upload.upload(file)
    form.setFieldsValue({ pictureUrl: url })
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>User Settings</Title>
      <Text type="secondary">
        Update your profile and manage your settings.
      </Text>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={user}
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              type: 'email',
              message: 'Please input your email!',
            },
          ]}
        >
          <Input prefix={<MailOutlined />} />
        </Form.Item>
        <Form.Item name="name" label="Name">
          <Input prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item name="password" label="Password">
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>
        <Form.Item name="pictureUrl" label="Profile Picture">
          <Upload customRequest={handleUpload} maxCount={1}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="notifications"
          label="Notifications"
          valuePropName="checked"
        >
          <Switch checkedChildren="Enabled" unCheckedChildren="Disabled" />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Button type="primary" htmlType="submit" block>
              Save Changes
            </Button>
          </Col>
          <Col span={12}>
            <Button block onClick={() => router.push('/home')}>
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>
    </PageLayout>
  )
}
