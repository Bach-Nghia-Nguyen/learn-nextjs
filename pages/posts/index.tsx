import { GetStaticProps, GetStaticPropsContext } from 'next'
import React from 'react'

export interface PostListPageProps {
  posts: any[]
}

export default function PostListPage({ posts }: PostListPageProps) {
  console.log('posts', posts)
  return (
    <div>
      <h1>Post List Page</h1>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  )
}

export const getStaticProps: GetStaticProps<PostListPageProps> = async (
  context: GetStaticPropsContext
) => {
  // server-side: ham nay chi chay phia server thoi, khong phai client
  // co the viet code nodejs o day
  // build-time
  console.log('static props ')
  const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1')
  const data = await response.json()
  console.log(data)

  return {
    props: {
      posts: data.data.map((item: any) => ({ id: item.id, title: item.title })),
    },
  }
}
