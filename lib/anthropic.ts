import Anthropic from "@anthropic-ai/sdk";

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const MODEL = "claude-sonnet-4-6";

export const SHARED_DISCLAIMER = `
重要: あなたが提供する情報は一般的な制度解説と個別の状況に応じた一般的な検討材料の提示に限られます。
- 「あなたはこの制度の対象です」「必ず申請すべきです」などの断定的な助言は禁止
- 法的・税務的な個別判断は社会保険労務士・税理士などの専門家へ案内
- 不確かな点は「ハローワーク・自治体窓口に確認すること」を促す
- 数値や条件は「執筆時点」「目安」と必ず明示する
`;
