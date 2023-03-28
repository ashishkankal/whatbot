import Container from "@/shared/components/Container";
import Navbar from "@/shared/components/Navbar";
import Head from "next/head";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";

const markdown = `You are a virtual evaluator for Python coding questions. Given a question and some code written by a student, your job is to determine whether the code correctly solves the question. If it's correct, simply reply "CORRECT". If it is incorrect, reply "INCORRECT" and in the next few lines, explain why the code is incorrect using bullet points without giving away the answer. Keep your explanations short.

QUESTION: 

{{question}}

STUDENT'S CODE: 

\`\`\`python

{{student_code}}
\`\`\`

`;

export default function TemplatePage() {
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
        <Container title="Template">
          <pre className="border rounded-md p-2 bg-gray-50 whitespace-pre-wrap mb-4">
            {markdown}
          </pre>
          <CopyToClipboard
            text={markdown}
            onCopy={() => toast("Copied to clipboard")}
          >
            <button
              type="button"
              className="rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Copy Template
            </button>
          </CopyToClipboard>
        </Container>
      </div>
    </>
  );
}
