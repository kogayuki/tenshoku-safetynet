"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Question = {
  id: string;
  label: string;
  hint?: string;
  options: { value: string; label: string }[];
};

const questions: Question[] = [
  {
    id: "status",
    label: "あなたの現在の状況",
    options: [
      { value: "在職中（退職予定なし、情報収集）", label: "在職中（情報収集中）" },
      { value: "在職中で退職予定が決まっている", label: "退職予定あり" },
      { value: "退職済みで転職活動中", label: "退職済み・転職活動中" },
      { value: "転職先が決まっている", label: "転職先決定済み" },
    ],
  },
  {
    id: "reason",
    label: "退職（予定）の理由",
    hint: "現時点での理由でかまいません",
    options: [
      { value: "自己都合", label: "自己都合" },
      { value: "会社都合（解雇・倒産・退職勧奨）", label: "会社都合" },
      {
        value: "やむを得ない自己都合（健康・介護・通勤困難・ハラスメント等）",
        label: "やむを得ない自己都合",
      },
      { value: "未定", label: "まだ決めていない" },
    ],
  },
  {
    id: "tenure",
    label: "現職での雇用保険加入期間（おおよそ）",
    options: [
      { value: "1年未満", label: "1年未満" },
      { value: "1年以上5年未満", label: "1〜5年" },
      { value: "5年以上10年未満", label: "5〜10年" },
      { value: "10年以上20年未満", label: "10〜20年" },
      { value: "20年以上", label: "20年以上" },
    ],
  },
  {
    id: "age",
    label: "あなたの年齢層",
    options: [
      { value: "20代", label: "20代" },
      { value: "30代", label: "30代" },
      { value: "40代", label: "40代" },
      { value: "50代以上", label: "50代以上" },
    ],
  },
  {
    id: "plan",
    label: "転職活動中の予定",
    hint: "あてはまるものをお選びください",
    options: [
      { value: "通常の転職活動（同業種・近い職種）", label: "通常の転職活動" },
      { value: "未経験職種への転職を検討", label: "未経験への挑戦" },
      { value: "資格取得・スキル習得を考えている", label: "学び直しを検討" },
      { value: "独立・フリーランスを検討", label: "独立・フリー化" },
    ],
  },
  {
    id: "household",
    label: "家計・住居の状況",
    options: [
      { value: "家計に余裕がある", label: "家計に余裕あり" },
      { value: "数か月分の生活費は確保できる", label: "数か月は持つ" },
      { value: "家賃支払いに不安がある", label: "家賃支払い不安あり" },
      { value: "家族に扶養される可能性もある", label: "扶養される可能性" },
    ],
  },
];

export default function DiagnosisFlow() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isComplete = Object.keys(answers).length === questions.length;

  async function submit() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/diagnosis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }
      const data = await res.json();
      setResult(data.timeline);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "診断処理中にエラーが発生しました。少し時間をおいて再度お試しください。"
      );
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setStep(0);
    setAnswers({});
    setResult(null);
    setError(null);
  }

  if (result) {
    return (
      <div className="border border-border bg-paper-card p-8 md:p-12">
        <div className="text-xs tracking-[0.3em] uppercase text-accent mb-4">
          Your Timeline
        </div>
        <h2 className="font-display text-2xl md:text-3xl text-ink mb-8">
          あなたに合った制度活用タイムライン
        </h2>
        <div className="prose-editorial">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{result}</ReactMarkdown>
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row gap-4">
          <button
            onClick={reset}
            className="text-sm px-5 py-2 border border-ink text-ink hover:bg-ink hover:text-paper transition-colors"
          >
            別の条件でもう一度
          </button>
          <a
            href="/chat"
            className="text-sm px-5 py-2 bg-ink text-paper hover:bg-accent transition-colors"
          >
            AIに追加で質問する →
          </a>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="border border-border bg-paper-card p-12 text-center">
        <div className="font-display text-xl text-ink mb-4">診断中...</div>
        <p className="text-sm text-ink-muted">
          あなたの状況に合わせて、最適な制度活用タイムラインを生成しています。
          <br />
          通常10〜20秒ほどかかります。
        </p>
      </div>
    );
  }

  const q = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  return (
    <div>
      {/* プログレス */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs text-ink-subtle mb-2">
          <span>
            Question {step + 1} / {questions.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-px bg-border relative">
          <div
            className="absolute left-0 top-0 h-full bg-accent transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 質問 */}
      <div className="border border-border bg-paper-card p-8 md:p-12">
        <div className="text-xs tracking-[0.3em] uppercase text-accent mb-4">
          Q{step + 1}
        </div>
        <h2 className="font-display text-xl md:text-2xl text-ink mb-2 leading-snug">
          {q.label}
        </h2>
        {q.hint && <p className="text-sm text-ink-subtle mb-6">{q.hint}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
          {q.options.map((opt) => {
            const selected = answers[q.id] === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => {
                  const next = { ...answers, [q.id]: opt.value };
                  setAnswers(next);
                  if (step < questions.length - 1) {
                    setTimeout(() => setStep(step + 1), 200);
                  }
                }}
                className={`text-left px-5 py-4 border transition-all duration-200 ${
                  selected
                    ? "border-accent bg-accent/5 text-ink"
                    : "border-border hover:border-ink-muted text-ink-muted hover:text-ink"
                }`}
              >
                <span className="text-sm">{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ナビゲーション */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="text-sm text-ink-muted hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ← 前の質問
        </button>

        {step === questions.length - 1 && isComplete ? (
          <button
            onClick={submit}
            className="text-sm px-6 py-2.5 bg-ink text-paper hover:bg-accent transition-colors"
          >
            診断する →
          </button>
        ) : (
          <button
            onClick={() => setStep(Math.min(questions.length - 1, step + 1))}
            disabled={!answers[q.id]}
            className="text-sm text-ink-muted hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed"
          >
            次の質問 →
          </button>
        )}
      </div>

      {error && (
        <div className="mt-6 p-4 border border-accent bg-accent/5 text-sm text-accent-dark">
          {error}
        </div>
      )}
    </div>
  );
}
