# 転職セーフティネット.AI

転職時に使える公的支援制度を網羅したデータベースと、AIによる個別タイムライン提案を提供する情報サイトのMVP。

## 構成

```
tenshoku-safetynet/
├── app/                      Next.js App Router
│   ├── page.tsx              LP
│   ├── layout.tsx            ルートレイアウト
│   ├── globals.css           グローバルスタイル
│   ├── systems/              制度ページ
│   ├── diagnosis/            AIタイムライン診断
│   ├── chat/                 AI相談チャット
│   ├── articles/             記事ページ
│   ├── api/                  API ルート
│   ├── sitemap.ts            sitemap.xml の自動生成
│   └── robots.ts             robots.txt
├── components/               ヘッダー / フッター
├── content/
│   ├── systems/              ★ 制度コンテンツ（Markdown）9ファイル
│   └── articles/             ★ 記事コンテンツ（Markdown、空でOK）
├── lib/
│   ├── systems.ts            制度の読込ロジック
│   ├── articles.ts           記事の読込ロジック
│   └── anthropic.ts          Claude API クライアント
├── tailwind.config.ts        デザインシステム
├── package.json
└── README.md
```

## 編集ポイント

このサイトの差別化は **content/systems/*.md** です。9ファイルを書き込めば書き込むほど、AI診断とAIチャットの精度が上がります。

各 Markdown ファイルの Frontmatter フィールド：
- `name`: 制度の正式名称
- `shortName`: 表示用の短縮名
- `category`: 失業給付 / 再就職支援 / 教育訓練 / 住居支援 / 税・社会保険 / 雇用保険認定
- `summary`: 1行サマリー（カードに表示）
- `amount`: 金額の目安
- `who`: 対象者
- `ministry`: 所管省庁
- `officialUrl`: 公式情報のURL
- `order`: 一覧での表示順

本文は通常のMarkdown。h2 / h3、箇条書き、強調、リンクなど自由に。

## ローカル起動

```bash
# 依存関係インストール
npm install

# 環境変数設定
cp .env.example .env.local
# .env.local の ANTHROPIC_API_KEY を編集

# 開発サーバー起動
npm run dev
# → http://localhost:3000
```

## Vercel デプロイ

1. このリポジトリを GitHub にプッシュ
2. <https://vercel.com/new> でリポジトリをインポート
3. 環境変数を設定：
   - `ANTHROPIC_API_KEY`：Anthropic から取得した API キー
   - `NEXT_PUBLIC_SITE_URL`：本番ドメイン（例: `https://tenshoku-safetynet.ai`）
4. デプロイ

ビルド時に Markdown が静的生成されるので、コンテンツ追加後は再デプロイ（または `git push` で自動反映）。

## 9つの制度（初期搭載）

1. 失業給付（雇用保険の基本手当）
2. 再就職手当
3. 教育訓練給付金（一般・特定一般・専門実践）
4. 求職活動関係役務利用費・移転費・広域求職活動費
5. 住居確保給付金
6. 国民健康保険 vs 任意継続健康保険の選択
7. 退職金の税制優遇申告
8. 住民税の納付方法
9. 雇用保険の特定理由離職者・特定受給資格者の認定

うち詳細執筆済み：1, 2, 3, 6, 7, 8, 9
スタブ（要拡充）：4, 5

スタブのファイルには「> このセクションは要拡充」というブロック引用で、書き足すべき箇所がコメントしてあります。

## 1週間 MVP スケジュール

- **Day 1**: ローカル起動 → デザイン確認 → ロゴ・OGP画像差し替え
- **Day 2-3**: 9制度すべての本文を書き上げる（特に 4, 5 のスタブ拡充）
- **Day 4**: AIタイムライン診断のプロンプト調整（ `app/api/diagnosis/route.ts` ）
- **Day 5**: AI相談チャットのプロンプト調整（ `app/api/chat/route.ts` ）
- **Day 6**: SEO仕上げ（OGP画像、構造化データ、meta description 全ページ確認）、独自ドメイン設定
- **Day 7**: 公開、X告知、初期記事1〜2本投入

## AI機能の調整

### AIタイムライン診断
`app/api/diagnosis/route.ts` の `systemPrompt` を編集すると診断のスタイルを変えられます。
特に「出力形式」セクションの構成を変えると、結果のレイアウトが変わります。

質問項目の追加・変更は `app/diagnosis/DiagnosisFlow.tsx` の `questions` 配列を編集。

### AI相談チャット
`app/api/chat/route.ts` の `systemPrompt` を編集。
チャット欄のサジェスト質問は `app/chat/ChatWindow.tsx` の `SUGGESTED_PROMPTS` 配列を編集。

両方とも、制度Markdownの内容を自動的にコンテキストとして渡しているので、コンテンツを充実させればAIの回答品質も上がります。

## 記事自動生成（Phase 2 で実装予定）

`content/articles/*.md` に Markdown を置くだけで `/articles` 配下に記事として公開されます。
将来的には、以下のようなパイプラインを追加予定：

```
[記事テーマリスト]
       ↓
GitHub Actions（週次）
       ↓
Claude API でMarkdown下書き生成
       ↓
PRとしてリポジトリに自動提案
       ↓
人間レビュー → マージで公開
```

これは `tenshoku-safetynet/.github/workflows/article-generation.yml` として後付けで追加できます。
重要なのは、人間レビューを必ず通すこと。AIが事実を間違えるリスクを減らすため、自動公開はしない設計を推奨します。

## 重要な注意事項

### 法的アドバイスの線引き
本サイトの情報は「一般的な情報提供」に留めています。AI出力もシステムプロンプトで断定的助言を禁じています。
ただし、**運用中にユーザーから「私の場合はどうですか？」と個別判断を求められた場合**、AIが断定的に答えてしまわないかを定期的に監査することを推奨します。

### 情報の鮮度
雇用保険・健康保険・税制は毎年改正されます。本MVPは執筆時点の一般情報です。
最低でも年1回、できれば四半期ごとに各制度Markdownの数値・条件を見直してください。
将来的には Claude API で公式サイトを差分監視するパイプラインも組めます。

### コスト
- Vercel：Hobbyプランで十分（無料）
- Anthropic API：1診断あたり概算 \$0.05〜0.1、チャット1往復あたり \$0.01〜0.03。
  月1,000回利用で \$50〜100程度の見込み。アクセスが増えたら API キーごとの利用上限を設定してください。

## 使用技術

- Next.js 15（App Router）
- React 19
- TypeScript
- Tailwind CSS（カスタムデザイントークン）
- Anthropic SDK（Claude Sonnet 4.6）
- gray-matter（Frontmatter パーサ）
- react-markdown（Markdown レンダリング）
- Shippori Mincho B1 + Noto Sans JP（Google Fonts）
