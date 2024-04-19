'use client'

import { useEffect, useState } from 'react'
import { Typography, Form, Input, Button, Spin } from 'antd'
import { EditOutlined } from '@ant-design/icons'
const { Title, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function BlogEditPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [postData, setPostData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    const fetchPostData = async () => {
      setLoading(true)
      try {
        const data = await Api.PostData.findOne(params.id, {
          includes: ['user'],
        })
        setPostData(data)
        form.setFieldsValue({
          title: data.title,
          content: data.content,
        })
      } catch (error) {
        enqueueSnackbar('Failed to fetch post data', { variant: 'error' })
        router.push('/blogs')
      }
      setLoading(false)
    }

    if (params.id) {
      fetchPostData()
    }
  }, [params.id, form, router])

  const handleUpdate = async values => {
    setLoading(true)
    try {
      await Api.PostData.updateOne(params.id, { ...values, userId })
      enqueueSnackbar('Post updated successfully', { variant: 'success' })
      router.push(`/blog/${params.id}`)
    } catch (error) {
      enqueueSnackbar('Failed to update post', { variant: 'error' })
    }
    setLoading(false)
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>
        <EditOutlined /> Edit Blog Post
      </Title>
      <Paragraph>Edit your existing blog post below.</Paragraph>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Form form={form} onFinish={handleUpdate} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
                message: 'Please input the title of the post!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="content"
            label="Content"
            rules={[
              {
                required: true,
                message: 'Please input the content of the post!',
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Post
            </Button>
          </Form.Item>
        </Form>
      )}
    </PageLayout>
  )
}
