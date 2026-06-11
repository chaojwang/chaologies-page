# Chaologies Personal Page

## 快速开始 Quick Start

### 1. 安装 Node.js
去 https://nodejs.org 下载安装（选 LTS 版本）。

### 2. 安装依赖
```bash
cd chaologies-page
npm install
```

### 3. 放头像
把你的头像照片（命名为 `avatar.jpg`）放到 `public/` 文件夹里。

### 4. 本地预览
```bash
npm run dev
```
打开 http://localhost:5173 就能看到了。

### 5. 更新内容
**只需要改 `src/data.js`**，里面有注释说明每个字段怎么填。
改完之后浏览器会自动刷新。

---

## 发布到网上

推荐用 [Vercel](https://vercel.com)（免费）：
1. 把这个文件夹推到 GitHub
2. 在 Vercel 新建项目，导入你的 GitHub 仓库
3. Framework preset 选 Vite，点 Deploy
4. 绑定你的域名

---

## 文件结构

```
public/
  avatar.jpg          ← 你的头像（自己放进来）

src/
  data.js             ← 所有内容在这里改 ✏️
  App.jsx             ← React 组件（一般不用动）
  index.css           ← 所有样式（一般不用动）
  main.jsx            ← 入口（不用动）

index.html            ← HTML 壳（不用动）
```

---

## 颜色系统

| 变量         | 值        | 用途              |
|------------|---------|-----------------|
| near-black | `#111`  | 主文字             |
| gray       | `#888`  | 次要文字            |
| muted      | `#BBB`  | 标签 / eyebrow    |
| border     | `#EBE` | 分割线 / 卡片边框     |
| coral      | `#FF6040` | CTA 唯一亮色       |
