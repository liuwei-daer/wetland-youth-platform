# Youth Wetland Research Platform

青年湿地研究平台前端项目，基于 Vue 3 + Vite 构建，支持中英文切换、页面路由与响应式展示。

## 技术栈

- Vue 3
- Vue Router 4
- vue-i18n 9
- Vite 6
- pnpm

## Windows 下安装 Node 环境

1. 打开 [Node.js 官网](https://nodejs.org/)，下载 **LTS（长期支持版）** 的 Windows 安装包（`.msi`）。
2. 运行安装程序，按向导完成安装；建议勾选 **“Automatically install the necessary tools”**（若出现）以便后续编译原生模块。安装完成后会附带 **npm**。
3. 打开 **PowerShell** 或 **命令提示符**，确认版本：
  ```bash
   node -v
   npm -v
  ```
4. npm 全局安装 pnpm：
  ```bash
   npm install -g pnpm
  ```
5. 确认 pnpm：
  ```bash
   pnpm -v
  ```

## 项目结构

```text
wetland-youth-platform-v1/
├─ doc/                              # 项目文案（含关于我们原始内容）
├─ public/                           # 静态公共资源
├─ scripts/
│  ├─ convert-images-to-webp.mjs     # 图片批量转 webp 脚本
│  └─ split-i18n.mjs               # 将合并的 en/zh JSON 拆成模块（见 pnpm i18n:split）
├─ src/
│  ├─ assets/images/                 # 页面图片资源
│  ├─ components/
│  │  ├─ Home.vue                    # 首页主体
│  │  └─ sections/                   # 首页与通用区块组件（导航、页脚等）
│  ├─ i18n/
│  │  └─ index.js                    # i18n 实例与语言配置
│  ├─ locales/
│  │  ├─ en.js / zh.js               # 聚合各模块后的语言包入口
│  │  └─ modules/
│  │     ├─ en/*.json                # 英文：按顶级 key 拆分（meta、nav、hero…）
│  │     └─ zh/*.json                # 中文：同上
│  ├─ router/
│  │  └─ index.js                    # 路由配置
│  ├─ site/
│  │  └─ siteImages.js               # 图片统一导出
│  ├─ styles/
│  │  └─ landing.css                 # 全局样式
│  ├─ views/
│  │  ├─ AboutUsView.vue             # 关于我们页
│  │  ├─ StarterProjectView.vue      # 初级项目详情页
│  │  └─ WetlandDistributionView.vue # 全球湿地分布页
│  ├─ App.vue                        # 根组件（路由出口、标题逻辑）
│  └─ main.js                        # 应用入口
├─ index.html                        # HTML 入口
├─ vite.config.js                    # Vite 配置（端口/构建目录）
└─ package.json                      # 脚本与依赖
```

## 页面功能

### 1) 首页 `/`

- 展示平台定位、湿地价值、研究模块、行动路径、新闻与导师网络等内容。
- 顶部导航支持站内锚点跳转。
- 支持中英文切换。

### 2) 初级项目页 `/projects/starter`

- 面向青少年的入门研究路径介绍。
- 包含模块说明、建议流程和返回入口。

### 3) 全球湿地分布页 `/maps/wetland-distribution`

- 展示全球湿地分布概览、区域差异和研究建议。
- 采用与项目统一的视觉布局风格。

### 4) 关于我们页 `/about`

- 展示组织介绍、愿景使命、核心价值观、发展故事与联系方式。
- 页面内容来源于 `doc/about us.txt` 并完成中英文映射。

## 开发、编译、打包

> 本项目统一使用 `pnpm`。

### 安装依赖

```bash
pnpm install
```

### 启动开发环境

```bash
pnpm dev
```

- 默认访问地址：`http://localhost:58080/`

### 编译（生产构建）

```bash
pnpm build
```

- 构建输出目录：`wetland-dist/`

### 本地预览构建结果

```bash
pnpm preview
```

### 图片处理（可选）

```bash
pnpm images:webp
```

- 将 `src/assets/images` 下的 jpg/png 批量转换为 webp。

### 国际化文案（模块化）

- 日常维护：编辑 `src/locales/modules/en/` 与 `src/locales/modules/zh/` 下各 JSON（文件名与 `t('aboutUs.xxx')` 等**顶级 key** 一致，如 `aboutUs.json`、`nav.json`）。
- 若你先把中英文合并成 `src/locales/en.json`、`zh.json` 再拆回模块，可执行：`pnpm i18n:split`（会覆盖 `modules/`* 与 `en.js` / `zh.js`）。

## 部署说明

- 将 `pnpm build` 产物目录 `wetland-dist/` 部署到任意静态资源服务器即可。
- 项目使用 `createWebHistory`（History 路由），**必须**让服务器对「无前缀的任意路径」回退到 `index.html`，否则直接访问或刷新子路径（如 `/about`）会出现 **白屏或 404**。

### 本地打包项目

在项目根目录执行：

```bash
pnpm install
pnpm build
```

构建完成后，静态文件在目录 `**wetland-dist/**`（内含 `index.html`、`assets/` 等）。

可选：打 zip 便于上传（需已安装依赖，脚本使用 `bestzip`）：

```bash
pnpm build:zip
```

会在项目根目录生成 `**wetland-dist.zip**`，可在服务器上解压后拷贝到站点目录。

**约定：远端 Nginx（或其它 Web 服务）的网站根目录为 `/var/www/wetland/html/`。**  
部署即把 `wetland-dist/` 内的**全部内容**同步到该目录（使 `index.html` 位于 `html/` 下，而不是多一层 `wetland-dist`）。

**方式一：`ftp工具上传`（简单直接）**

下载ftp工具FileZilla ([https://filezilla-project.org/download.php?show_all=1](https://filezilla-project.org/download.php?show_all=1)) 选择FileZilla_3.69.6_win64.zip 然后解压到

接下来打开软件，按照  doc/文件上传.png 图片进行连接

在左边进入到项目代码目录，然后双击wetland-dist.zip，即可上传到服务器上

### 通过 SSH 登录远端服务器

在 **本机**（Windows 可用 PowerShell、Windows Terminal 或已安装 OpenSSH 客户端的环境）执行：

```bash
ssh root@服务器IP
```

首次连接会提示确认主机指纹，输入 `yes` 后按提示输入密码（或已配置密钥则自动登录）。  

进入服务器部署目录：

```bash
cd /var/www/wetland/html/
```

见图片 doc/更新文件.png   
  
首先备份之前的发布文件 ，0403001修改为当前日期+序号
```bash
mv wetland-dist wetland-dist_0403001bak
```

解压部署文件

```bash
unzip wetland-dist.zip
```
即可完成网站的更新，后续刷新网页即可看到效果。

