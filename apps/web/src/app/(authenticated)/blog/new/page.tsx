'use client'

import { useState } from 'react'
import { Button, Form, Input, Typography } from 'antd'
const { Title, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function BlogCreationPage() {
  const [form] = Form.useForm()
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const userId = authentication.user?.id

  const handleSubmit = async (values: { title: string; content: string }) => {
    if (!userId) {
      enqueueSnackbar('You must be logged in to create a post.', {
        variant: 'error',
      })
      return
    }

    try {
      const postData = await Api.PostData.createOneByUserId(userId, {
        title: values.title,
        content: values.content,
        userId: userId,
      })
      enqueueSnackbar('Post created successfully!', { variant: 'success' })
      router.push(`/blog/${postData.id}`)
    } catch (error) {
      enqueueSnackbar('Failed to create post.', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Create a New Blog Post</Title>
      <Paragraph>
        Share your thoughts and experiences by creating a new blog post. Fill
        out the form below to publish your content.
      </Paragraph>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="title"
          label="Title"
          rules={[
            { required: true, message: 'Please input the title of the post!' },
          ]}
        >
          <Input placeholder="Enter the title of your post" />
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
          <Input.TextArea rows={4} placeholder="What are you thinking about?" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit Post
          </Button>
        </Form.Item>
      </Form>
    </PageLayout>
  )
}
