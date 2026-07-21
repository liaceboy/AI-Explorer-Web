# AI Explorer Demo

开源 UI 展示项目，视觉风格参考 [aiexplore.top](https://www.aiexplore.top)。

**仅用于 GitHub Showcase** — 所有数据均为 Mock，不包含任何生产逻辑。

## 包含功能

- 首页 Hero + 深色渐变主题
- Agent Search（太阳系动画、模式切换、Mock 搜索结果）
- 工具卡片列表
- 分类导航 Tab

## 不包含

Supabase · 后台管理 · 真实搜索算法 · Agent Prompt · API Key · 支付 · 登录 · CMS · SEO

## 快速开始

```bash
npm install
npm run dev
```

打开 http://localhost:5173

## 构建

```bash
npm run build
npm run preview
```

## 技术栈

- Vite + React 19 + TypeScript
- 纯 CSS（无 UI 框架）
- 客户端 Mock 数据过滤

## 目录结构

```
src/
  components/   # Header, SearchAgent, ToolCard …
  data/         # Mock 工具 & 搜索数据
  hooks/        # useLang
  types/        # 类型定义
```

## License

MIT
