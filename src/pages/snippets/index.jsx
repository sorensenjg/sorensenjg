import Head from 'next/head'
import Image from 'next/image'
import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import client from '../../../.tina/__generated__/client'

function Snippet({ snippet }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="!flex-row items-center md:col-span-3">
        <div className="relative z-10 mr-5 aspect-square w-20 overflow-hidden rounded-full border-2 border-teal-500 bg-white">
          {snippet.image && (
            <Image
              src={snippet.image}
              alt={`${snippet.title} - ${snippet.description}`}
              fill
              style={{
                objectFit: 'cover',
              }}
            />
          )}
        </div>
        <div>
          <Card.Title href={`/snippets/${snippet.slug}`}>
            {snippet.title}
          </Card.Title>
          <Card.Description className="mt-0">
            {snippet.description}
          </Card.Description>
          <Card.Cta className="mt-1">Get snippet</Card.Cta>
        </div>
      </Card>
    </article>
  )
}

export default function Page({ snippets, snippetCount, pageInfo }) {
  return (
    <>
      <Head>
        <title>Snippets | Justin Sorensen</title>
        <meta
          name="description"
          content="A collection of useful snippets I&rsquo;ve collected. Some original, and some sourced."
        />
      </Head>
      <SimpleLayout
        title="A collection of useful snippets I&rsquo;ve collected. Some original, and some sourced."
        // intro="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
      >
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {snippets.map((snippet) => (
              <Snippet key={snippet.slug} snippet={snippet} />
            ))}
          </div>
        </div>
      </SimpleLayout>
    </>
  )
}

export async function getStaticProps() {
  const snippetsResponse = await client.queries.snippetConnection()
  const snippets = snippetsResponse.data.snippetConnection.edges.map((x) => {
    return { ...x.node, slug: x.node._sys.filename }
  })

  return {
    props: {
      snippets,
      snippetCount: snippetsResponse.data.snippetConnection.totalCount,
      pageInfo: snippetsResponse.data.snippetConnection.pageInfo,
    },
  }
}
