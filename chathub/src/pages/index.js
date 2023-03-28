import PromptGrid from "@/modules/explore/components/PromptGrid";
import Navbar from "@/shared/components/Navbar";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>ChatHub | Prompts and Apps Powered by GPT-4</title>
        <meta name="description" content="Prompts and Apps Powered by GPT-4" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div>
        <Navbar />
        <div className="py-10">
          <header>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
                Explore
              </h1>
            </div>
          </header>
          <main className="mt-8">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
              <PromptGrid />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
