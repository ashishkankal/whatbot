import Container from "@/shared/components/Container";
import Navbar from "@/shared/components/Navbar";
import Head from "next/head";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import templates from "@/templates";
import fs from "fs";
import { Toaster } from "react-hot-toast";

export default function TemplatePage({ slug, template, markdown }) {
  if (!template) {
    return <div>Not Found</div>;
  }

  return (
    <>
      <Head>
        <title>ChatHub | Prompt Templates for GPT-4</title>
        <meta name="description" content="Prompts and Apps Powered by GPT-4" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div>
        <Navbar />
        <Container title={template.title}>
          <div className="my-4 text-base text-gray-500">
            {template.description}
          </div>
          <pre className="border rounded-md p-2 bg-gray-50 whitespace-pre-wrap mb-4">
            {markdown}
          </pre>
          <CopyToClipboard text={markdown}>
            <button
              type="button"
              onClick={() => toast.success("Copied to clipboard")}
              className="rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Copy Template
            </button>
          </CopyToClipboard>
          <Toaster position="bottom-center" />
        </Container>
      </div>
    </>
  );
}

export async function getStaticPaths(context) {
  return {
    paths: [{ params: { slug: "leetcode-assistant" } }],
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { slug } = context.params;
  const markdown = fs
    .readFileSync(`src/templates/leetcode-assistant/prompt.md`)
    .toString();
  const template = templates.find((t) => t.slug === slug);

  return {
    props: { markdown, template, slug },
  };
}
