'use client'

import { useEffect, useState } from 'react'
import { Typography, Card, Avatar, List, Input, Button, Space } from 'antd'
import { HeartOutlined, MessageOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function BlogDetailPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [postData, setPostData] = useState(null)
  const [comments, setComments] = useState([])
  const [reactions, setReactions] = useState([])
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const data = await Api.PostData.findOne(params.id, {
          includes: ['user', 'comments.user', 'reactions'],
        })
        setPostData(data)
        setComments(data.comments)
        setReactions(data.reactions)
      } catch (error) {
        enqueueSnackbar('Failed to fetch post details', { variant: 'error' })
      }
    }

    fetchPostData()
  }, [params.id])

  const handleAddComment = async () => {
    if (!newComment.trim()) return
    try {
      const comment = await Api.Comment.createOneByPostId(postData.id, {
        content: newComment,
        userId,
      })
      setComments([...comments, comment])
      setNewComment('')
      enqueueSnackbar('Comment added successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to add comment', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Blog Post Details</Title>
      {postData && (
        <Card
          title={<Title level={4}>{postData.title}</Title>}
          extra={
            <Text>{dayjs(postData.dateCreated).format('MMMM D, YYYY')}</Text>
          }
        >
          <Text>{postData.content}</Text>
          <Space>
            <HeartOutlined style={{ color: 'red' }} />
            <Text>{reactions.length} Reactions</Text>
            <MessageOutlined style={{ marginLeft: '10px' }} />
            <Text>{comments.length} Comments</Text>
          </Space>
        </Card>
      )}

      <Input.TextArea
        rows={4}
        value={newComment}
        onChange={e => setNewComment(e.target.value)}
        placeholder="Add a comment..."
      />
      <Button
        type="primary"
        onClick={handleAddComment}
        disabled={!newComment.trim()}
      >
        Add Comment
      </Button>

      <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'comments' : 'comment'}`}
        itemLayout="horizontal"
        renderItem={item => (
          <li>
            <List.Item
              actions={[
                <Text>{dayjs(item.dateCreated).format('MMMM D, YYYY')}</Text>,
              ]}
              extra={
                <Avatar src={item.user?.pictureUrl} alt={item.user?.name} />
              }
            >
              <List.Item.Meta
                title={item.user?.name}
                description={<p>{item.content}</p>}
              />
            </List.Item>
          </li>
        )}
      />
    </PageLayout>
  )
}
