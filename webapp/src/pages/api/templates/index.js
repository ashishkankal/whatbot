import { getTemplates } from "@/shared/network";

export default async function handler(req, res) {
  const templates = await getTemplates();
  res.status(200).json({ success: true, data: templates });
}
