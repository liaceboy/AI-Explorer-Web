export type CategoryId = 'ai' | 'dev' | 'design' | 'media' | 'learn' | 'tool' | 'cloud';

export interface Tool {
  id: string;
  name: string;
  url: string;
  domain: string;
  desc: string;
  descEn: string;
  tag: string;
  category: CategoryId;
  isFeatured?: boolean;
  emoji: string;
}

export interface CategoryMeta {
  id: CategoryId | 'all';
  color: string;
  labelZh: string;
  labelEn: string;
}

export const CATEGORIES: CategoryMeta[] = [
  { id: 'ai', color: '#00e5ff', labelZh: 'AI 工具', labelEn: 'AI Tools' },
  { id: 'dev', color: '#39ff14', labelZh: '开发 & 技术', labelEn: 'Dev & Tech' },
  { id: 'design', color: '#ff2d78', labelZh: '设计 & 创意', labelEn: 'Design' },
  { id: 'media', color: '#ffd700', labelZh: '媒体 & 社交', labelEn: 'Media' },
  { id: 'learn', color: '#b44bff', labelZh: '学习 & 知识', labelEn: 'Learning' },
  { id: 'tool', color: '#39ff14', labelZh: '效率 & 工具', labelEn: 'Productivity' },
  { id: 'cloud', color: '#00e5ff', labelZh: '云服务 & 基础设施', labelEn: 'Cloud' },
];

export const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map(c => [c.id, c])
) as Record<CategoryId, CategoryMeta>;

export const TOOLS: Tool[] = [
  { id: 'chatgpt', name: 'ChatGPT', url: 'https://chat.openai.com', domain: 'openai.com', desc: 'OpenAI 旗舰对话 AI，支持 GPT-4o 与多模态', descEn: 'OpenAI flagship chat AI with GPT-4o multimodal', tag: '对话', category: 'ai', isFeatured: true, emoji: '🤖' },
  { id: 'claude', name: 'Claude', url: 'https://claude.ai', domain: 'anthropic.com', desc: 'Anthropic 长上下文 AI 助手，擅长写作与分析', descEn: 'Anthropic assistant with long context', tag: '对话', category: 'ai', isFeatured: true, emoji: '🔮' },
  { id: 'gemini', name: 'Gemini', url: 'https://gemini.google.com', domain: 'google.com', desc: 'Google 多模态 AI，深度整合搜索与 Workspace', descEn: 'Google multimodal AI integrated with search', tag: '多模态', category: 'ai', isFeatured: true, emoji: '✨' },
  { id: 'deepseek', name: 'DeepSeek', url: 'https://chat.deepseek.com', domain: 'deepseek.com', desc: '国产开源大模型，编程与推理能力突出', descEn: 'Open-source LLM strong at coding', tag: '开源', category: 'ai', emoji: '🧠' },
  { id: 'perplexity', name: 'Perplexity', url: 'https://perplexity.ai', domain: 'perplexity.ai', desc: 'AI 搜索引擎，带引用来源的实时回答', descEn: 'AI search with cited real-time answers', tag: '搜索', category: 'ai', emoji: '🔍' },
  { id: 'cursor', name: 'Cursor', url: 'https://cursor.com', domain: 'cursor.com', desc: 'AI 原生代码编辑器，Agent 自动改代码', descEn: 'AI-native IDE with coding agents', tag: '编程', category: 'dev', isFeatured: true, emoji: '⌨️' },
  { id: 'github-copilot', name: 'GitHub Copilot', url: 'https://github.com/features/copilot', domain: 'github.com', desc: 'IDE 内联代码补全与 Chat 助手', descEn: 'Inline code completion in your IDE', tag: '编程', category: 'dev', emoji: '🐙' },
  { id: 'v0', name: 'v0', url: 'https://v0.dev', domain: 'v0.dev', desc: 'Vercel AI UI 生成器，描述即可出 React 组件', descEn: 'Generate React UI from prompts', tag: '前端', category: 'dev', emoji: '⚡' },
  { id: 'replit', name: 'Replit', url: 'https://replit.com', domain: 'replit.com', desc: '云端 IDE + AI Agent 一键部署', descEn: 'Cloud IDE with AI agent deploy', tag: '云端', category: 'dev', emoji: '🌐' },
  { id: 'midjourney', name: 'Midjourney', url: 'https://midjourney.com', domain: 'midjourney.com', desc: 'Discord 驱动的 AI 艺术图像生成', descEn: 'Discord-based AI art generation', tag: '图像', category: 'design', isFeatured: true, emoji: '🎨' },
  { id: 'figma-ai', name: 'Figma AI', url: 'https://figma.com', domain: 'figma.com', desc: '设计工具内置 AI 布局与文案辅助', descEn: 'Design tool with built-in AI assist', tag: '设计', category: 'design', emoji: '🖌️' },
  { id: 'canva', name: 'Canva', url: 'https://canva.com', domain: 'canva.com', desc: 'Magic Design 一键生成海报与社交素材', descEn: 'Magic Design for social graphics', tag: '设计', category: 'design', emoji: '📐' },
  { id: 'runway', name: 'Runway', url: 'https://runwayml.com', domain: 'runwayml.com', desc: 'Gen-3 视频生成与 AI 剪辑套件', descEn: 'Gen-3 video generation suite', tag: '视频', category: 'media', isFeatured: true, emoji: '🎬' },
  { id: 'suno', name: 'Suno', url: 'https://suno.com', domain: 'suno.com', desc: '文字生成完整歌曲，含人声与编曲', descEn: 'Text-to-full song with vocals', tag: '音频', category: 'media', emoji: '🎵' },
  { id: 'elevenlabs', name: 'ElevenLabs', url: 'https://elevenlabs.io', domain: 'elevenlabs.io', desc: '逼真 AI 语音合成与克隆', descEn: 'Realistic AI voice synthesis', tag: '语音', category: 'media', emoji: '🎙️' },
  { id: 'notion-ai', name: 'Notion AI', url: 'https://notion.so', domain: 'notion.so', desc: '笔记工作区内置 AI 写作与总结', descEn: 'AI writing inside your workspace', tag: '办公', category: 'tool', emoji: '📝' },
  { id: 'gamma', name: 'Gamma', url: 'https://gamma.app', domain: 'gamma.app', desc: 'AI 一键生成演示文稿与网页', descEn: 'AI slides and web pages', tag: '演示', category: 'tool', emoji: '📊' },
  { id: 'tldraw', name: 'tldraw', url: 'https://tldraw.com', domain: 'tldraw.com', desc: '白板 + AI 草图转 UI 原型', descEn: 'Whiteboard with sketch-to-UI AI', tag: '白板', category: 'tool', emoji: '✏️' },
  { id: 'khan', name: 'Khanmigo', url: 'https://khanacademy.org', domain: 'khanacademy.org', desc: 'Khan Academy AI 导师，个性化学习', descEn: 'AI tutor for personalized learning', tag: '教育', category: 'learn', emoji: '📚' },
  { id: 'coursera', name: 'Coursera Coach', url: 'https://coursera.org', domain: 'coursera.org', desc: '课程平台 AI 学习助手', descEn: 'AI learning coach on courses', tag: '课程', category: 'learn', emoji: '🎓' },
  { id: 'vercel', name: 'Vercel', url: 'https://vercel.com', domain: 'vercel.com', desc: '前端部署平台，AI SDK 与 v0 生态', descEn: 'Frontend deploy with AI SDK', tag: '部署', category: 'cloud', emoji: '▲' },
  { id: 'supabase-demo', name: 'Supabase', url: 'https://supabase.com', domain: 'supabase.com', desc: '开源 Firebase 替代，含 Vector 与 Edge Functions', descEn: 'Open Firebase alt with vectors', tag: '数据库', category: 'cloud', emoji: '⚡' },
  { id: 'huggingface', name: 'Hugging Face', url: 'https://huggingface.co', domain: 'huggingface.co', desc: '开源模型社区与 Inference API', descEn: 'Open model hub and inference', tag: '模型', category: 'ai', emoji: '🤗' },
  { id: 'dalle', name: 'DALL·E 3', url: 'https://openai.com/dall-e-3', domain: 'openai.com', desc: 'OpenAI 文生图，ChatGPT 内置', descEn: 'OpenAI text-to-image in ChatGPT', tag: '图像', category: 'design', emoji: '🖼️' },
];
