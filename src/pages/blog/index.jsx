import Head from 'next/head'
import { isEmpty } from 'lodash'
import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { formatDate } from '@/lib/formatDate'
import client from '../../../.tina/__generated__/client'

function Post({ post }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/blog/${post.slug}`}>{post.title}</Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={post.date}
          className="md:hidden"
          decorate
        >
          {formatDate(post.date)}
        </Card.Eyebrow>
        <Card.Description>{post.description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={post.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(post.date)}
      </Card.Eyebrow>
    </article>
  )
}

export default function Page({ posts, postCount, pageInfo }) {
  return (
    <>
      <Head>
        <title>Blog | Justin Sorensen</title>
        <meta
          name="description"
          content="A place to keep my long-form thoughts on development, design, fish keeping, and the great outdoors."
        />
      </Head>
      <SimpleLayout
        title="A place to keep my long-form thoughts on development, design, and whatever the heck else I feel like writing down."
        // intro="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
      >
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {!isEmpty(posts) ? (
              posts.map((post) => <Post key={post.slug} post={post} />)
            ) : (
              <p className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                Clearly, I dont have time for this...
              </p>
            )}
          </div>
        </div>
      </SimpleLayout>
    </>
  )
}

export async function getStaticProps() {
  const postsResponse = await client.queries.postConnection()
  const posts = postsResponse.data.postConnection.edges.map((x) => {
    return { ...x.node, slug: x.node._sys.filename }
  })

  return {
    props: {
      posts,
      postCount: postsResponse.data.postConnection.totalCount,
      pageInfo: postsResponse.data.postConnection.pageInfo,
    },
  }
}
