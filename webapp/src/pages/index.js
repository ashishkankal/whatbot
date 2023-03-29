import TemplateGrid from "@/shared/components/TemplateGrid";
import Container from "@/shared/components/Container";
import Navbar from "@/shared/components/Navbar";
import Head from "next/head";
import { getTemplates } from "@/shared/network";

export default function Home({ templates }) {
  return (
    <>
      <Head>
        <title>WhatBot | Prompt Templates for ChatGPT</title>
        <meta name="description" content="Prompts and apps powered by GPT-4" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/whatbot_icon.png" />
      </Head>
      <div>
        <Navbar />
        <Container title="Explore Templates">
          <TemplateGrid templates={templates} />
        </Container>
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
