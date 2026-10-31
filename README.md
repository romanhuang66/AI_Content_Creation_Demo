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
2. 创作页默认空白：自行输入 Idea，或点击主题示例填入。上传自己的图片/视频；素材不足时点击 Generate 素材库，模拟生成咖啡、旅行、产品或通用生活主题的六张素材。生成素材自动选中，重新生成会替换上一批模拟素材并保留自己的上传。点击卡片选择或取消，拖入上方区域可选中。重复文件按内容去重。
3. 点击 Generate Story，等待 2.6 秒的分阶段模拟分析。标题和旁白基于当前主题模板生成，所有已选素材都会分配到五幕中；多于五张时每幕可包含多张。页面显示使用数量。
4. 在五幕分镜中 Edit Script 并保存、Replace Media 或 Regenerate 单个分镜；可用上下箭头调整顺序、加减单幕时长、Preview scene 从当前幕开始预览，或 Undo 撤销最近修改（最多 20 步）。
5. 在 Low confidence 卡片点击 Choose manually 分配用途，或 Analyze again；不会重置整个故事。
6. Generate Video Draft，进入 9:16 预览，播放、暂停或拖动进度。
7. 可返回分镜继续修改，或 Regenerate Draft。
8. Export Video → Download Video 显示模拟导出完成；Create Another Video 开始新创作。

## 主要文件

- `src/main.jsx`：页面组件、状态与完整交互流程
- `src/components.jsx`：品牌导航与步骤指示器
- `src/data.js`：首页演示素材与基础分镜结构
- `src/mockCreative.js`：主题关键词、模拟素材库、主题脚本及局部备选文案
- `src/storyUtils.js`：顺序、连续时间计算与素材内容指纹
- `tests/storyUtils.test.js`：使用 `node --test tests/*.test.js` 验证关键逻辑
- `src/styles.css`：响应式布局与视觉样式
- `public/media/`：本地咖啡主题素材（Unsplash 示例图片）
- `index.html`：入口与页面元信息

## 原型边界

AI 分析、生成和导出均为前端模拟，不产生 MP4。预览是随时长推进的素材轮播及字幕，没有音轨。平台与风格会反映在界面和草稿设置中；创作输入可自定义；素材生成按关键词从四类本地预置照片中提供模拟结果，并不真实绘制图片。分镜按主题模板生成，未知题材采用通用记录模板；不识别上传图片内容，也不具备真实 AI 语义理解。生成器将全部已选素材按顺序分配进五幕，用户可继续替换和调整。15/30/60 秒选项决定初始分镜时间；调整单幕时长后，整体时长和预览、导出提示同步更新，时间段连续且无重叠。数据仅保留在当前页面内存中，刷新后重置。本地素材不上传服务器。

素材来源：Unsplash（图片 ID：photo-1501339847302-ac426a4a7cbb、photo-1554118811-1e0d58224f24、photo-1442512595331-e89e73853f31、photo-1447933601403-0c6688de566e、photo-1559925393-8be0ec4767c8）。图片为氛围示意，不代表真实杭州店铺。

2026 solo project

新增主题素材：Unsplash photo-1464822759023-fed622ff2c3b、photo-1476514525535-07fb3b4ae5f1、photo-1500534623283-312aade485b7、photo-1523275335684-37898b6baf30、photo-1505740420928-5e560c06d30e、photo-1495474472287-4d71bcdd2085。所有主题图片均为氛围示意。
