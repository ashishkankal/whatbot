import Container from "@/shared/components/Container";
import Navbar from "@/shared/components/Navbar";
import { getSystemPrompt, getTemplates, getUserPrompt } from "@/shared/network";
import mustache from "@/shared/utils/mustache";
import Head from "next/head";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { TemplateInput } from "../../shared/components/TemplateInput";

function combinePrompts(systemPrompt, userPrompt) {
  return `${systemPrompt}\n\n${userPrompt}`;
}

export default function TemplatePage({ template, systemPrompt, userPrompt }) {
  const [inputData, setInputData] = useState({});

  const fullPrompt = combinePrompts(systemPrompt, userPrompt);
  const inputs = template.inputs || [];
  const hasInputs = inputs.length > 0;

  const filledPrompt = hasInputs ? mustache(fullPrompt, inputData) : fullPrompt;

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
          <div className="my-4 text-base text-gray-500 max-w-xl text-center mx-auto">
            {template.description}
          </div>

          <div>
            {inputs.map((inputInfo) => (
              <TemplateInput
                key={inputInfo.field}
                {...inputInfo}
                value={inputData[inputInfo.field]}
                onChange={(value) =>
                  setInputData({ ...inputData, [inputInfo.field]: value })
                }
              />
            ))}
          </div>

          <div className="block text-sm font-medium leading-6 text-gray-900">
            ChatGPT Message
          </div>

          <pre className="border rounded-md p-2 bg-gray-50 whitespace-pre-wrap mt-2 mb-4">
            {filledPrompt}
          </pre>
          <CopyToClipboard text={filledPrompt}>
            <button
              type="button"
              onClick={() => toast.success("Copied to clipboard")}
              className="rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Copy Message
            </button>
          </CopyToClipboard>

          <a href="https://chat.openai.com/chat" target="_blank">
            <button
              type="button"
              className=" ml-3 rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Open ChatGPT
            </button>
          </a>

          <Toaster position="bottom-center" />
        </Container>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.params;

  const [templates, systemPrompt, userPrompt] = await Promise.all([
    getTemplates(),
    getSystemPrompt(slug),
    getUserPrompt(slug),
  ]);

  const template = templates.find((t) => t.slug === slug);

  return {
    props: { systemPrompt, userPrompt, template, slug },
  };
}
