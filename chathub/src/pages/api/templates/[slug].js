import fs from "fs/promises";
import templates from "@/templates";
import Handlebars from "handlebars";
import startOpenAIStream from "@/shared/utils/startOpenAIStream";

function fillTemplate(template, inputs) {
  const compiledTemplate = Handlebars.compile(template);
  return compiledTemplate(inputs);
}

export default async function handler(req, res) {
  const { slug } = req.query;
  const systemFileData = await fs.readFile(`src/templates/${slug}/system.md`);
  const systemPrompt = systemFileData.toString();
  const userFileData = await fs.readFile(`src/templates/${slug}/user.md`);
  const userPrompt = userFileData.toString();
  const template = templates.find((t) => t.slug === slug);

  template.systemPrompt = systemPrompt;
  template.userPrompt = userPrompt;

  if (req.method === "GET") {
    res.status(200).json({ success: true, data: template });
  } else if (req.method === "POST") {
    const { inputs, apiKey, options } = req.body;
    const fullMessages = [
      { role: "system", content: fillTemplate(systemPrompt, inputs) },
      { role: "user", content: fillTemplate(userPrompt, inputs) },
      ...messages,
    ];
    const stream = await startOpenAIStream(fullMessages, apiKey, options);
    return new Response(stream);
  } else {
    res.status(404).json({ success: false });
  }
}
