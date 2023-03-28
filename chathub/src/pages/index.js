import TemplateGrid from "@/shared/components/TemplateGrid";
import Container from "@/shared/components/Container";
import Navbar from "@/shared/components/Navbar";
import Head from "next/head";

export default function Home({ templates }) {
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
        <Container title="Explore Templates">
          <TemplateGrid templates={templates} />
        </Container>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    "https://raw.githubusercontent.com/JovianHQ/chathub/main/chathub/templates/index.json"
  );
  const templates = await res.json();
  return {
    props: { templates },
  };
}
