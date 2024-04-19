'use client'

import React, { useEffect, useState } from 'react'
import { Typography, Card, Col, Row, Avatar, Space } from 'antd'
import { ReadOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function HomePage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const { enqueueSnackbar } = useSnackbar()
  const [posts, setPosts] = useState<Model.PostData[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postDatasFound = await Api.PostData.findMany({
          includes: ['user'],
        })
        setPosts(postDatasFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch posts', { variant: 'error' })
      }
    }

    fetchPosts()
  }, [])

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Welcome to the Blog</Title>
      <Text type="secondary">
        Here you can find the latest posts from our community.
      </Text>
      <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
        {posts?.map(post => (
          <Col key={post.id} xs={24} sm={12}>
            <Card
              hoverable
              onClick={() => router.push(`/blog/${post.id}`)}
              cover={
                post.user?.pictureUrl ? (
                  <Avatar
                    size={64}
                    src={post.user.pictureUrl}
                    alt={post.user?.name}
                    style={{
                      marginTop: 20,
                      marginLeft: 16
                     }}
                  />
                ) : (
                  <Avatar size={64} icon={<ReadOutlined />} 
                  style={{
                    marginTop: 20,
                    marginLeft: 16
                   }}/>
                )
              }
              title={post.title}
              bordered={false}
            >
              <Card.Meta
                title={post.user?.name || 'Unknown Author'}
                description={`${post.content.substring(0, 100)}...`}
              />
              <Space style={{ marginTop: 10 }}>
                <Text type="secondary">
                  {dayjs(post.dateCreated).format('DD MMM YYYY')}
                </Text>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </PageLayout>
  )
}
