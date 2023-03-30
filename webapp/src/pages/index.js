import TemplateGrid from "@/shared/components/TemplateGrid";
import Container from "@/shared/components/Container";
import Navbar from "@/shared/components/Navbar";
import Head from "next/head";
import { getTemplates } from "@/shared/network";
import Footer from "@/shared/components/Footer";

export default function Home({ templates }) {
  return (
    <>
      <Head>
        <title>WhatBot | ChatGPT Templates</title>
        <meta name="description" content="Prompts and apps powered by GPT-4" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/whatbot_icon.png" />
      </Head>
      <div>
        <Navbar />
        <Container title="ChatGPT Templates">
          <div className="my-4 sm:text-base text-gray-500 max-w-2xl text-center mx-auto">
            Get the most out of ChatGPT with carefully crafted and optmized
            message templates
          </div>
          <TemplateGrid templates={templates} />
        </Container>
        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const templates = await getTemplates();
  return {
    props: { templates },
  };
}
