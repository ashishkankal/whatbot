import Handlebars from "handlebars";
import startOpenAIStream from "@/shared/utils/startOpenAIStream";
import { getSystemPrompt, getTemplates, getUserPrompt } from "@/shared/network";

function fillTemplate(template, inputs) {
  const compiledTemplate = Handlebars.compile(template);
  return compiledTemplate(inputs);
}

export default async function handler(req, res) {
  const { slug } = req.query;

  const [templates, systemPrompt, userPrompt] = await Promise.all([
    getTemplates(),
    getSystemPrompt(slug),
    getUserPrompt(slug),
  ]);

  const template = templates.find((t) => t.slug === slug);

  template.systemPrompt = systemPrompt;
  template.userPrompt = userPrompt;

  if (req.method === "POST") {
    const { inputs, apiKey, options, messages = [] } = req.body;
    const fullMessages = [
      { role: "system", content: fillTemplate(systemPrompt, inputs) },
      { role: "user", content: fillTemplate(userPrompt, inputs) },
      ...messages,
    ];
    const stream = await startOpenAIStream(fullMessages, apiKey, options);
    return new Response(stream);
  } else {
    res.status(200).json({ success: true, data: template });
  }
}
