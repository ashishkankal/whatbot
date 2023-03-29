import { getSystemPrompt, getTemplates, getUserPrompt } from "@/shared/network";
import mustache from "@/shared/utils/mustache";

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

  const DEFAULT_OPTIONS = {
    model: "gpt-3.5-turbo",
    max_tokens: 800,
    temperature: 0.8,
  };

  if (req.method === "POST") {
    const { inputs, apiKey, options, messages = [] } = req.body;
    const fullMessages = [
      { role: "system", content: mustache(systemPrompt, inputs) },
      { role: "user", content: mustache(userPrompt, inputs) },
      ...messages,
    ];

    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      method: "POST",
      body: JSON.stringify({
        messages: fullMessages,
        ...DEFAULT_OPTIONS,
        ...options,
      }),
    });

    const resJson = await resp.json();

    console.log("OpenAI Response:", resJson);

    res.status(200).json(resJson);
  } else {
    res.status(200).json({ success: true, data: template });
  }
}
