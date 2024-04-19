'use client'

import { Button, Modal, Typography } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { confirm } = Modal
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function BlogDeleteConfirmationPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const handleDelete = async () => {
    try {
      await Api.PostData.deleteOne(params.id)
      enqueueSnackbar('Post deleted successfully', { variant: 'success' })
      router.push('/blogs')
    } catch (error) {
      enqueueSnackbar('Failed to delete the post', { variant: 'error' })
    }
  }

  const showConfirm = () => {
    confirm({
      title: 'Are you sure you want to delete this blog post?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone.',
      onOk() {
        handleDelete()
      },
      onCancel() {
        router.push(`/blog/${params.id}`)
      },
    })
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Delete Blog Post</Title>
      <Text>
        You are about to delete a blog post. This action is irreversible. Please
        confirm your action.
      </Text>
      <Button type="primary" onClick={showConfirm} danger>
        Delete Post
      </Button>
    </PageLayout>
  )
}
