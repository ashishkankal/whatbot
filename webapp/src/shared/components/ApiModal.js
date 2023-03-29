import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-hot-toast";
import Link from "next/link";

function makeRequestBody(template) {
  return `{
  apiKey: "YOUR OPENAI API KEY",
  inputs: {${(template.inputs || []).map(
    (inputInfo) => `\n    "${inputInfo.field}": "${inputInfo.placeholder}"`
  )}
  },
  messages: [],
  options: {
    model: "gpt-3.5-turbo",
    max_tokens: 800,
    temperature: 0.8,
    stream: false,
  }
}`;
}

export default function ApiModal({ open, setOpen, template }) {
  const cancelButtonRef = useRef(null);
  const requestBody = makeRequestBody(template);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div>
                    <Dialog.Title
                      as="h3"
                      className="text-base text-center font-semibold leading-6 text-gray-900"
                    >
                      Use as API - {template.title}
                    </Dialog.Title>

                    <div className="mt-2 mb-4 mx-4">
                      <p className="text-sm text-gray-500 text-center">
                        {
                          "Build your own AI-powered application using this prompt template as an API. We never store your "
                        }
                        <Link
                          href="https://platform.openai.com/docs/introduction"
                          target="_blank"
                        >
                          <span className="text-blue-500 hover:text-blue-700">
                            OpenAI API Key
                          </span>
                        </Link>
                        {"."}
                      </p>
                    </div>

                    <div className="block text-sm font-medium leading-6 text-gray-900">
                      API Endpoint
                    </div>

                    <pre className="border text-sm rounded-md p-2 bg-gray-50 whitespace-pre-wrap mt-2 mb-4">
                      {`POST https://whatbot.ai/api/templates/${template.slug}`}
                    </pre>

                    <div className="block text-sm font-medium leading-6 text-gray-900">
                      Request Body
                    </div>

                    <pre className="border text-sm rounded-md p-2 bg-gray-50 whitespace-pre-wrap mt-2 mb-4">
                      {requestBody}
                    </pre>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                    onClick={() => setOpen(false)}
                  >
                    Done
                  </button>
                  <CopyToClipboard text={requestBody}>
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                      onClick={() => toast.success("Copied to clipboard")}
                      ref={cancelButtonRef}
                    >
                      Copy Request Body
                    </button>
                  </CopyToClipboard>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
