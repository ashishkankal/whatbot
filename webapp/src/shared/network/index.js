export const TEMPLATES_BASE_URL =
  "https://raw.githubusercontent.com/JovianHQ/chathub/main/templates";

export async function getTemplates() {
  const res = await fetch(`${TEMPLATES_BASE_URL}/index.json`);
  return res.json();
}

export async function getSystemPrompt(slug) {
  const res = await fetch(`${TEMPLATES_BASE_URL}/${slug}/system.md`);
  return res.text();
}

export async function getUserPrompt(slug) {
  const res = await fetch(`${TEMPLATES_BASE_URL}/${slug}/user.md`);
  return res.text();
}
