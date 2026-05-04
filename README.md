# My Apps – PWA ランチャー

GitHubで作ったアプリを一覧表示するホーム画面ランチャーのPWA版です。

## ファイル構成

```
myapps/
├── index.html          # メインページ
├── manifest.json       # Web App Manifest（PWA設定）
├── sw.js               # Service Worker（オフライン対応）
└── icons/
    ├── icon-48.png
    ├── icon-72.png
    ├── icon-96.png
    ├── icon-144.png
    ├── icon-192.png
    ├── icon-192-maskable.png  ← Androidのアダプティブアイコン用
    ├── icon-384.png
    ├── icon-512.png
    └── icon-512-maskable.png  ← Androidのアダプティブアイコン用
```

## GitHub Pages へのデプロイ手順

1. このフォルダの中身をそのままGitHubリポジトリのルートに配置
2. リポジトリの Settings → Pages → Source を `main` ブランチに設定
3. `https://<ユーザー名>.github.io/<リポジトリ名>/` にアクセス

## Androidでのインストール方法

1. Chrome で上記URLを開く
2. 画面上部に「ホーム画面に追加」バナーが表示される
3. 「インストール」をタップ
4. ホーム画面にアプリアイコンが追加される

## PWA機能

- ✅ **オフライン対応** – Service Workerがページをキャッシュ
- ✅ **インストール可能** – ホーム画面に追加してアプリとして起動
- ✅ **スタンドアロン表示** – ブラウザのUIなしで全画面表示
- ✅ **アダプティブアイコン** – Androidのマスカブルアイコン対応
- ✅ **ショートカット** – アイコン長押しでよく使うアプリに直接アクセス
- ✅ **テーマカラー** – ステータスバーがダークテーマに統一
