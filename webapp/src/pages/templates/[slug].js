import ApiModal from "@/shared/components/ApiModal";
import Container from "@/shared/components/Container";
import Footer from "@/shared/components/Footer";
import Navbar from "@/shared/components/Navbar";
import { getSystemPrompt, getTemplates, getUserPrompt } from "@/shared/network";
import mustache from "@/shared/utils/mustache";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { TemplateInput } from "../../shared/components/TemplateInput";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

function combinePrompts(systemPrompt, userPrompt) {
  return `${systemPrompt}\n\n${userPrompt}`;
}

export default function TemplatePage({ template, systemPrompt, userPrompt }) {
  const [inputData, setInputData] = useState({});
  const [showModal, setShowModal] = useState(false);

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
        <title>{`${template.title} | WhatBot`}</title>
        <meta name="description" content={template.description} />
        <meta name="og:description" content={template.description} />
        <meta name="og:title" content={template.title} />
      </Head>
      <div>
        <Navbar />
        <Container title={template.title}>
          <div className="my-4 sm:text-base text-gray-500 max-w-2xl text-center mx-auto">
            {template.description}
          </div>

          <div className="mb-4">
            <Link href="/">
              <div className="text-sm font-medium flex items-center text-gray-500 hover:text-blue-700 active:text-blue-800">
                <ArrowLeftIcon className="h-3 w-3 inline" />
                <div className="ml-1">Back</div>
              </div>
            </Link>
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

          <pre className="border text-sm rounded-md p-2 bg-gray-50 whitespace-pre-wrap mt-2 mb-4">
            {filledPrompt}
          </pre>

          <div>
            <CopyToClipboard text={filledPrompt}>
              <button
                type="button"
                onClick={() => toast.success("Copied to clipboard")}
                className="rounded-md  py-2 px-3 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
              >
                Copy Message
              </button>
            </CopyToClipboard>

            <a href="https://chat.openai.com/chat" target="_blank">
              <button
                type="button"
                className=" ml-3 rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 active:bg-gray-100"
              >
                Open ChatGPT
              </button>
            </a>

            <button
              type="button"
              className=" ml-3 rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 active:bg-gray-100"
              onClick={() => setShowModal(true)}
            >
              Use as API
            </button>
          </div>

          <div className="block text-sm font-medium text-gray-900 mt-4">
            Copy the above message and paste it on ChatGPT to start a
            conversation.
          </div>

          <Toaster position="bottom-center" />
        </Container>
        <Footer />
        <ApiModal open={showModal} setOpen={setShowModal} template={template} />
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
