import client from "@/tina";
import Editor from "./components/editor";

export default async function SnippetPage({ params }) {
  const data = await client.queries.snippet({
    relativePath: `${params.filename}.mdx`,
  });

  return <Editor {...data} />;
}
