import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { getContentBySlug, getAllContents } from '../../lib/api'
import Head from 'next/head'
import markdownToHtml from '../../lib/mdToHtml'
import { Nav } from '../../components/Nav'
import { Box } from '@chakra-ui/react'
import { Sidebar } from '../../components/Sidebar'
import link from 'next/link'

export default function Post({ post, allContent }) {
  console.log(allContent)
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <div>
      {router.isFallback ? (
        <span>Loading…</span>
      ) : (
        <Box>
          <Nav />
          <Sidebar docs={allContent} />
          {/* // insert the html */}

          <Box pt="32">
            {' '}
            <div
              dangerouslySetInnerHTML={{
                __html: post.content,
              }}
            />
          </Box>
        </Box>
      )}
    </div>
  )
}

export async function getStaticProps({ params }) {
  const allContent = getAllContents([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  const post = getContentBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'status',
    'content',
    'ogImage',
    'coverImage',
  ])
  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      allContent,
      post: {
        ...post,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllContents(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}
