import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Container } from '@/components/Container'
// import { formatDate } from '@/lib/formatDate'
import { Prose } from '@/components/Prose'
import { useTina } from 'tinacms/dist/react'
import client from '../../../.tina/__generated__/client'
import { TinaMarkdown } from '@/components/TinaMarkdown'

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
  const snippet = data?.snippet

  return (
    <>
      <Head>
        <title>{`${snippet.title} | Justin Sorensen`}</title>
        <meta name="description" content={snippet.description} />
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
              <header className="flex justify-between">
                <div className="flex flex-col">
                  <p className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                    {snippet.title}
                  </p>
                  <h1 className="flex items-center text-base text-zinc-400 dark:text-zinc-500">
                    {snippet.description}
                  </h1>
                </div>
                {snippet.image && (
                  <div className="relative z-10 mr-5 aspect-square w-20 shrink-0 self-start overflow-hidden rounded-full border-2 border-teal-500 bg-white">
                    <Image
                      src={snippet.image}
                      alt={`${snippet.title} - ${snippet.description}`}
                      fill
                      style={{
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                )}
              </header>
              <Prose className="mt-8">
                <TinaMarkdown content={snippet.body} />
              </Prose>
              {snippet.source && (
                <>
                  <div className="my-10 w-20 border-t border-zinc-100  dark:border-zinc-700/40" />
                  <p className="dark:white text-base text-zinc-400">
                    <span className="font-bold text-zinc-400 dark:text-zinc-500">
                      Source:
                    </span>{' '}
                    <a href={snippet.source} target="_blank" rel="noreferrer">
                      {snippet.source}
                    </a>
                  </p>
                </>
              )}
            </article>
          </div>
        </div>
      </Container>
    </>
  )
}

export const getStaticPaths = async () => {
  const snippetsListData = await client.queries.snippetConnection()

  return {
    paths: snippetsListData.data.snippetConnection.edges.map((snippet) => ({
      params: { filename: snippet.node._sys.filename },
    })),
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  let data = {}
  let query = {}
  let variables = { relativePath: `${params.filename}.mdx` }

  try {
    const res = await client.queries.snippet(variables)
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
