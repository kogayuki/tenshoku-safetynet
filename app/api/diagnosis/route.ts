import { NextRequest, NextResponse } from "next/server";
import { anthropic, MODEL, SHARED_DISCLAIMER } from "@/lib/anthropic";
import { getAllSystems } from "@/lib/systems";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { answers } = await req.json();

    if (!answers || typeof answers !== "object") {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const systems = getAllSystems();
    const systemContext = systems
      .map(
        (s) => `### ${s.name}（${s.shortName}）
- 区分: ${s.category}
- 概要: ${s.summary}
- 対象: ${s.who}
- 金額: ${s.amount}`
      )
      .join("\n\n");

    const userSituation = Object.entries(answers)
      .map(([key, value]) => {
        const labels: Record<string, string> = {
          status: "現在の状況",
          reason: "退職理由",
          tenure: "雇用保険加入期間",
          age: "年齢層",
          plan: "転職活動の方向性",
          household: "家計・住居の状況",
        };
        return `- ${labels[key] ?? key}: ${value}`;
      })
      .join("\n");

    const systemPrompt = `あなたは転職時に使える公的支援制度の専門ガイドです。
以下に登録されている制度情報を参照しながら、ユーザーの状況に合った制度の活用タイムラインを提案してください。

# 制度データベース（執筆時点）
${systemContext}

# 行動原則
${SHARED_DISCLAIMER}

# 出力形式
Markdown形式で、以下の構成で回答してください：

## 全体像（3行程度）
あなたの状況を要約し、特に注目すべきポイントを述べる。

## 推奨タイムライン
時系列に沿って、いつ・何をすべきかを箇条書きで示す。各項目には、関連する制度名と「なぜそのタイミングで動くべきか」の理由を添える。
たとえば「退職日の20日前まで：任意継続健康保険の検討開始（理由: 退職日翌日から20日以内が任意継続加入の期限のため）」のように具体的に。

## 特に注目したい制度（最大3つ）
登録制度の中から、このユーザーにとって特にインパクトの大きいものを選び、簡潔に解説。

## 確認すべきこと
ハローワーク窓口・自治体・専門家に確認すべきポイントを箇条書きで示す。

## 注意事項
制度の利用条件は本人の状況により異なる旨と、最新情報を公式ソースで確認するよう促す一文を添える。

# 重要な制約
- 「あなたは必ず○○を申請すべきです」など断定的な助言は避け、「○○の対象になる可能性があります」「○○を検討する価値があります」のような表現で。
- 数値や条件は「執筆時点の目安」と必ず明示する。
- 個別判断（特に税務・法律）は専門家に相談するよう案内する。`;

    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 2000,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: `# ユーザーの状況
${userSituation}

この方に合った、転職時の制度活用タイムラインを提案してください。`,
        },
      ],
    });

    const text =
      message.content[0]?.type === "text" ? message.content[0].text : "";

    return NextResponse.json({ timeline: text });
  } catch (err) {
    console.error("Diagnosis API error:", err);
    return NextResponse.json(
      { error: "診断処理中にエラーが発生しました" },
      { status: 500 }
    );
  }
}
