# FrameFlow AI

用于 AI 产品经理笔试展示的前端交互原型，React + Vite + 原生 CSS。无需后端、数据库、登录或 API Key。

## 运行

```bash
npm install
npm run dev
```

打开终端显示的本地地址（通常 http://localhost:5173）。

```bash
npm run build
npm run preview
```

## 建议演示流程

1. 首页点击 Start Creating。
2. 修改创作想法，切换平台、时长、风格；默认六段咖啡店示例素材已选。点击卡片选择或取消，拖入上方区域可选中。已选素材单独展示，生成分镜仅使用已选素材。也可上传本地图片或视频；按文件内容去重，重复文件会选中已有素材。
3. 点击 Generate Story，等待 2.6 秒的分阶段模拟分析。
4. 在五幕分镜中 Edit Script 并保存、Replace Media 或 Regenerate 单个分镜；可用上下箭头调整顺序、加减单幕时长、Preview scene 从当前幕开始预览，或 Undo 撤销最近修改（最多 20 步）。
5. 在 Low confidence 卡片点击 Choose manually 分配用途，或 Analyze again；不会重置整个故事。
6. Generate Video Draft，进入 9:16 预览，播放、暂停或拖动进度。
7. 可返回分镜继续修改，或 Regenerate Draft。
8. Export Video → Download Video 显示模拟导出完成；Create Another Video 开始新创作。

## 主要文件

- `src/main.jsx`：页面组件、状态与完整交互流程
- `src/components.jsx`：品牌导航与步骤指示器
- `src/data.js`：素材及五幕分镜、局部生成的模拟数据
- `src/storyUtils.js`：顺序、连续时间计算与素材内容指纹
- `tests/storyUtils.test.js`：使用 `node --test tests/storyUtils.test.js` 验证关键逻辑
- `src/styles.css`：响应式布局与视觉样式
- `public/media/`：本地咖啡主题素材（Unsplash 示例图片）
- `index.html`：入口与页面元信息

## 原型边界

AI 分析、生成和导出均为前端模拟，不产生 MP4。预览是随时长推进的素材轮播及字幕，没有音轨。平台与风格会反映在界面和草稿设置中；预设文案围绕固定杭州咖啡店案例，不实际根据任意输入生成。15/30/60 秒选项决定初始分镜时间；调整单幕时长后，整体时长和预览、导出提示同步更新，时间段连续且无重叠。数据仅保留在当前页面内存中，刷新后重置。本地素材不上传服务器。

素材来源：Unsplash（图片 ID：photo-1501339847302-ac426a4a7cbb、photo-1554118811-1e0d58224f24、photo-1442512595331-e89e73853f31、photo-1447933601403-0c6688de566e、photo-1559925393-8be0ec4767c8）。图片为氛围示意，不代表真实杭州店铺。

2026 solo project
