import Head from 'next/head'
import { useRouter } from 'next/router'
import { Container } from '@/components/Container'
import { formatDate } from '@/lib/formatDate'
import { Prose } from '@/components/Prose'
import { useTina } from 'tinacms/dist/react'
import { TinaMarkdown } from '@/components/TinaMarkdown'
import client from '../../../.tina/__generated__/client'

function ArrowLeftIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Page({ previousPathname, ...props }) {
  let router = useRouter()
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  })
  const post = data?.post

  return (
    <>
      <Head>
        <title>{`${post.title} | Justin Sorensen`}</title>
        <meta name="description" content={post.description} />
      </Head>
      <Container className="mt-16 lg:mt-32">
        <div className="xl:relative">
          <div className="mx-auto max-w-2xl">
            {previousPathname && (
              <button
                type="button"
                onClick={() => router.back()}
                aria-label="Go back to articles"
                className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:absolute lg:-left-5 lg:mb-0 lg:-mt-2 xl:-top-1.5 xl:left-0 xl:mt-0"
              >
                <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
              </button>
            )}
            <article>
              <header className="flex flex-col">
                <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                  {post.title}
                </h1>
                <time
                  dateTime={post.date}
                  className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
                >
                  <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                  <span className="ml-3">{formatDate(post.date)}</span>
                </time>
              </header>
              <Prose className="mt-8">
                <TinaMarkdown content={post.body} />
              </Prose>
            </article>
          </div>
        </div>
      </Container>
    </>
  )
}

export const getStaticPaths = async () => {
  const postsListData = await client.queries.postConnection()

  return {
    paths: postsListData.data.postConnection.edges.map((post) => ({
      params: { filename: post.node._sys.filename },
    })),
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  let data = {}
  let query = {}
  let variables = { relativePath: `${params.filename}.md` }

  try {
    const res = await client.queries.post(variables)
    query = res.query
    data = res.data
    variables = res.variables
  } catch {
    // swallow errors related to document creation
  }

  return {
    props: {
      variables: variables,
      data: data,
      query: query,
    },
  }
}
