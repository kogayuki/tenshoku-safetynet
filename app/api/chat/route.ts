import { NextRequest } from "next/server";
import { anthropic, MODEL, SHARED_DISCLAIMER } from "@/lib/anthropic";
import { getAllSystems } from "@/lib/systems";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages)) {
      return new Response("Invalid input", { status: 400 });
    }

    const systems = getAllSystems();
    const systemContext = systems
      .map(
        (s) => `### ${s.name}（${s.shortName}）
- 区分: ${s.category}
- 概要: ${s.summary}
- 対象: ${s.who}
- 金額: ${s.amount}
- 詳細: ${s.body.slice(0, 1500)}`
      )
      .join("\n\n");

    const systemPrompt = `あなたは「転職セーフティネット.AI」のアシスタントです。
転職時に使える日本の公的支援制度について、ユーザーの質問に答えます。

# 参照する制度データベース
${systemContext}

# 行動原則
${SHARED_DISCLAIMER}

# 応答スタイル
- 結論ファーストで、簡潔に
- 必要に応じてMarkdownの見出し・箇条書きで構造化
- 数値・条件は「執筆時点の目安」と必ず明示
- 制度名を出すときは正式名称（短縮形でも可）で
- 制度データベースに含まれない情報については「最寄りのハローワーク・自治体窓口・専門家にご確認ください」と案内
- ユーザーが個別判断を求める質問（「私の場合は対象になりますか？」など）には、確定的に答えず判断材料を提示する形で
- ユーザーが感情的な相談（退職決断の不安など）をしてきた場合は、まず受け止めた上で情報提供

# 重要な禁止事項
- 「あなたは○○の対象です」のような断定
- 制度データベースに載っていない数値・条件を創作すること
- 法的・税務的助言と誤解されうる表現
- 特定の企業・転職エージェント・士業事務所への送客`;

    const stream = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 1500,
      system: systemPrompt,
      messages: messages.map((m: { role: "user" | "assistant"; content: string }) => ({
        role: m.role,
        content: m.content,
      })),
      stream: true,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
          controller.close();
        } catch (err) {
          console.error("Stream error:", err);
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    console.error("Chat API error:", err);
    return new Response("Server error", { status: 500 });
  }
}
