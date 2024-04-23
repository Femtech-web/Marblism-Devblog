'use client'

import { useEffect, useState } from 'react'
import { Button, Card, Col, Row, Typography, Space, Modal } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function BlogListPage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [posts, setPosts] = useState<Model.PostData[]>([])

  useEffect(() => {
    if (userId) {
      Api.PostData.findManyByUserId(userId, { includes: ['user'] })
        .then(setPosts)
        .catch(() =>
          enqueueSnackbar('Failed to fetch posts', { variant: 'error' }),
        )
    }
  }, [userId])

  const handleEdit = (postId: string) => {
    router.push(`/blog/edit/${postId}`)
  }

  const handleDelete = (postId: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this post?',
      onOk: () => deletePost(postId),
    })
  }

  const deletePost = (postId: string) => {
    // Since actual delete function does not exist, simulate deletion locally
    setPosts(posts.filter(post => post.id !== postId))
    enqueueSnackbar('Post deletion simulated', { variant: 'info' })
  }

  const handleCreateNew = () => {
    router.push('/blog/new')
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>My Blog Posts</Title>
      <Text type="secondary">Manage and interact with your content.</Text>
      <Button
        type="primary"
        onClick={handleCreateNew}
        style={{ marginBottom: 16 }}
      >
        Create New Post
      </Button>
      <Row gutter={[16, 16]}>
        {posts?.map(post => (
          <Col key={post.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              title={post.title}
              actions={[
                <EditOutlined key="edit" onClick={() => handleEdit(post.id)} />,
                <DeleteOutlined
                  key="delete"
                  onClick={() => handleDelete(post.id)}
                />,
              ]}
            >
              <Text>{post.content.substring(0, 100)}...</Text>
              <br />
              <Text type="secondary">
                Created: {dayjs(post.dateCreated).format('YYYY-MM-DD')}
              </Text>
            </Card>
          </Col>
        ))}
      </Row>
    </PageLayout>
  )
}



 