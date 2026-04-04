# Git 新手教程

Git 是**版本控制**工具：记录项目里文件随时间的变化，方便回溯、协作和在多台电脑上同步代码。本教程面向零基础，命令以终端（macOS **终端**、Windows **PowerShell** 或 **Git Bash**）为例。

---

## 1. 安装与初次配置

### 安装

- **Windows**：安装 [Git for Windows](https://git-scm.com/download/win)，勾选默认选项即可；安装后可用 **Git Bash** 或 **PowerShell**。
- **macOS**：通常已自带 `git`；若没有，可安装 [Xcode Command Line Tools](https://developer.apple.com/download/all/) 或通过 Homebrew：`brew install git`。

终端输入以下命令，能显示版本号即表示安装成功：

```bash
git --version
```

### 告诉 Git 你是谁（只需配置一次）

提交记录会带上你的名字和邮箱，请换成你自己的：

```bash
git config --global user.name "你的名字"
git config --global user.email "your_email@example.com"
```

查看当前配置：

```bash
git config --global --list
```

---

## 2. 核心概念（先读这一段）

| 概念 | 简单理解 |
|------|----------|
| **仓库（Repository）** | 项目目录 + 隐藏的 `.git` 文件夹，里面存历史版本。 |
| **工作区** | 你平时编辑的文件所在目录。 |
| **暂存区（Index）** | `git add` 之后，变更被“放进购物车”，准备提交。 |
| **提交（Commit）** | 一次快照，带说明文字，可永久保存在本机历史里。 |

典型流程：**改文件 → `add` → `commit`**。

---

## 3. 在新项目里开始使用

进入你的项目根目录（例如本仓库）：

```bash
cd /path/to/wetland-youth-platform
```

### 初始化仓库

若目录里还没有 Git：

```bash
git init
```

会生成 `.git` 目录（不要手动删改里面的内容，除非你知道在做什么）。

### 查看状态

```bash
git status
```

红色：已修改但未暂存；绿色：已暂存待提交。

### 把文件加入暂存区

添加**单个文件**：

```bash
git add README.md
```

添加**当前目录下所有变更**（慎用，先 `git status` 看清楚）：

```bash
git add .
```

### 提交到本地历史

```bash
git commit -m "简要说明这次改了什么"
```

`-m` 后面是一句**提交说明**，写清楚便于以后查找。

### 查看提交历史

```bash
git log --oneline
```

按 `q` 可退出日志浏览（若进入分页器）。

---

## 4. 忽略不需要版本管理的文件

不要提交 `node_modules`、构建产物、本地密钥等。在项目根目录的 **`.gitignore`** 里写规则（本仓库已有示例）。

例如忽略环境变量文件：

```text
.env
```

若误把大文件或密钥提交过，需要从历史中清理（超出新手范围，可搜索 `git filter-repo` 或寻求有经验同事帮助）。

---

## 5. 分支（简单用法）

分支让你可以在**不影响主线**的情况下尝试新功能。

- 查看分支：

  ```bash
  git branch
  ```

- 新建并切换到新分支：

  ```bash
  git checkout -b feature/my-change
  ```

  （Git 2.23+ 也可用：`git switch -c feature/my-change`。）

- 切回主分支（常见名为 `main` 或 `master`）：

  ```bash
  git checkout main
  ```

  或：`git switch main`。

在分支上同样使用 `add` → `commit`。合并分支属于进阶内容，此处不展开。

---

## 6. 与远程仓库协作（GitHub 等）

### 克隆已有仓库（从远程拷到本机）

```bash
git clone https://github.com/OWNER/REPO.git
cd REPO
```

使用 SSH 地址时：

```bash
git clone git@github.com:OWNER/REPO.git
```

SSH 配置见同目录下的 [github-ssh-push.md](./github-ssh-push.md)。

### 查看远程

```bash
git remote -v
```

### 拉取远程更新（不合并本地改动时）

```bash
git fetch origin
```

### 拉取并合并到当前分支

```bash
git pull origin main
```

把 `main` 换成你实际的分支名。

### 首次推送并关联上游分支

```bash
git push --set-upstream origin main
```

之后在同一分支上通常只需：

```bash
git push
```

---

## 7. 新手常见场景

### 想撤销工作区里某个文件的修改（未 `add`）

**注意：会丢掉未提交的修改。**

```bash
git checkout -- 文件名
```

或 Git 2.23+：

```bash
git restore 文件名
```

### 已 `add` 但想取消暂存

```bash
git restore --staged 文件名
```

### 想改上一次提交说明（尚未推送或团队允许时）

```bash
git commit --amend -m "新的说明"
```

### 查看某文件与上一次提交的差异

```bash
git diff 文件名
```

---

## 8. 建议养成的习惯

1. **经常 `git status`**，清楚当前哪些文件会变入下一次提交。  
2. **提交说明写清楚**（做了什么、为什么），避免全是 `update`。  
3. **推送前先 `git pull`**，减少与他人的冲突。  
4. **不要把密码、Token、`.env` 提交到公开仓库**。  
5. 大型二进制或依赖目录交给 **`.gitignore`**，不要进版本库。

---

## 9. 进一步学习

- 官方书（免费在线）： [Pro Git](https://git-scm.com/book/zh/v2)  
- GitHub 文档： [Get started with Git](https://docs.github.com/en/get-started/git-basics)  
- 本仓库 SSH 推送步骤：[github-ssh-push.md](./github-ssh-push.md)

---

## 10. 命令速查表

| 目的 | 命令 |
|------|------|
| 初始化仓库 | `git init` |
| 查看状态 | `git status` |
| 暂存文件 | `git add <文件>` 或 `git add .` |
| 提交 | `git commit -m "说明"` |
| 历史（简洁） | `git log --oneline` |
| 克隆 | `git clone <地址>` |
| 拉取并合并 | `git pull` |
| 推送 | `git push` |
| 新建并切换分支 | `git checkout -b <分支名>` |

遇到报错可把**完整英文报错**复制到搜索引擎，多数问题都有成熟解答。
