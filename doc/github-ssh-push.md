# 使用 SSH 推送到 GitHub 教程

通过 SSH 与 GitHub 通信时，无需在每次 `git push` 时输入用户名和密码（或 Token）。**第 1～7 节** 适用于 **macOS / Linux**，以及 Windows 上的 **Git Bash**。**Windows 11** 若主要使用 **PowerShell**，请阅读 [Windows 11 PowerShell 命令教程](#windows-11-powershell-命令教程)（位于第 7 节之后、「常见问题」之前）。

---

## 1. 检查是否已有 SSH 密钥

```bash
ls -al ~/.ssh
```

若已存在 `id_ed25519`（推荐）或 `id_rsa`，且你记得当时就是为 GitHub 准备的，可跳到 [第 3 步](#3-将公钥添加到-github)。

---

## 2. 生成新的 SSH 密钥（Ed25519）

把下面命令里的邮箱换成你在 GitHub 上使用的邮箱（仅作注释标识，不影响登录）：

```bash
ssh-keygen -t ed25519 -C "your_email@example.com" -f ~/.ssh/id_ed25519
```

- 提示 **Enter passphrase** 时：可直接回车（无密码）；或设置密码短语（更安全，每次使用密钥时在本机输入一次）。
- 会生成：
  - **私钥**：`~/.ssh/id_ed25519`（**不要**发给任何人、不要提交到仓库）
  - **公钥**：`~/.ssh/id_ed25519.pub`（**将要**粘贴到 GitHub）

查看公钥内容（复制整段，含开头的 `ssh-ed25519`）：

```bash
cat ~/.ssh/id_ed25519.pub
```

---

## 3. 将公钥添加到 GitHub

1. 打开 GitHub：**Settings → SSH and GPG keys**（或直接访问 [https://github.com/settings/keys](https://github.com/settings/keys)）。
2. 点击 **New SSH key**。
3. **Title**：随意填写，例如 `MacBook`。
4. **Key**：粘贴 `id_ed25519.pub` 的**完整一行**。
5. 保存。

官方说明：[Adding a new SSH key to your GitHub account](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)。

---

## 4. （推荐）启动 ssh-agent 并加入私钥

**macOS**（较新系统常用）：

```bash
eval "$(ssh-agent -s)"
ssh-add --apple-use-keychain ~/.ssh/id_ed25519
```

若 `ssh-add` 报错，可改用：

```bash
ssh-add ~/.ssh/id_ed25519
```

**Linux**：

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

可在 `~/.ssh/config` 中为 GitHub 指定密钥（可选，多密钥时很有用）：

```text
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519
  AddKeysToAgent yes
```

---

## 5. 测试与 GitHub 的 SSH 连接

```bash
ssh -T git@github.com
```

首次连接会问 **是否继续连接**，输入 `yes`。成功时大致会看到：

```text
Hi <你的用户名>! You've successfully authenticated, but GitHub does not provide shell access.
```

若失败，请对照 GitHub 文档排查：[Troubleshooting SSH](https://docs.github.com/en/authentication/troubleshooting-ssh)。

---

## 6. 把仓库远程地址改为 SSH

进入你的项目目录，查看当前远程：

```bash
cd /path/to/wetland-youth-platform
git remote -v
```

若显示 `https://github.com/...`，改为 SSH 格式（**把 `OWNER/REPO` 换成你的用户名和仓库名**）：

```bash
git remote set-url origin git@github.com:OWNER/REPO.git
```

本仓库示例：

```bash
git remote set-url origin git@github.com:liuwei-daer/wetland-youth-platform.git
```

再次确认：

```bash
git remote -v
```

应看到 `git@github.com:...`（fetch/push）。

---

## 7. 推送代码

首次推送并建立上游分支：

```bash
git push --set-upstream origin main
```

之后在同一分支上可直接：

```bash
git push
```

---

## Windows 11 PowerShell 命令教程

以下在 **Windows 11** 中打开 **PowerShell**（开始菜单搜索 “PowerShell” 或 “终端”）。**首次**将 `ssh-agent` 服务设为手动并启动时，可能需要 **以管理员身份运行** PowerShell（右键 → 以管理员身份运行）。

### 环境准备

1. 确认已安装 **OpenSSH 客户端**（Win11 多数版本已自带）：

   ```powershell
   ssh -V
   ```

2. 若提示找不到命令：**设置 → 应用 → 可选功能 → 查看功能**，搜索并安装 **OpenSSH 客户端**。

3. 确认已安装 **Git for Windows**（含 `git` 命令）： [https://git-scm.com/download/win](https://git-scm.com/download/win)。安装后可在 **PowerShell** 或 **Git Bash** 中使用 `git`。

### 1）检查是否已有密钥

```powershell
Get-ChildItem -Force $env:USERPROFILE\.ssh
```

若存在 `id_ed25519` / `id_ed25519.pub`（或 `id_rsa` 一对），且确定用于 GitHub，可跳到「3）将公钥添加到 GitHub」。

### 2）生成 Ed25519 密钥

把邮箱换成你在 GitHub 使用的邮箱（仅作注释）：

```powershell
ssh-keygen -t ed25519 -C "your_email@example.com" -f "$env:USERPROFILE\.ssh\id_ed25519"
```

一路回车或按提示设置密码短语。公钥路径：`%USERPROFILE%\.ssh\id_ed25519.pub`。

**复制公钥到剪贴板**（任选其一）：

```powershell
Get-Content $env:USERPROFILE\.ssh\id_ed25519.pub | Set-Clipboard
```

或查看后手动复制：

```powershell
Get-Content $env:USERPROFILE\.ssh\id_ed25519.pub
```

### 3）将公钥添加到 GitHub

与上文 [第 3 步](#3-将公钥添加到-github) 在 GitHub 网页上的操作相同：打开 [SSH keys 设置页](https://github.com/settings/keys)，**New SSH key**，粘贴整行公钥。

### 4）启动 ssh-agent 并添加私钥（Windows 11）

`ssh-agent` 在 Windows 上是一项**服务**，首次可能需要**管理员** PowerShell 将启动类型设为手动并启动：

```powershell
Get-Service ssh-agent | Set-Service -StartupType Manual
Start-Service ssh-agent
```

然后在**普通** PowerShell 中加载密钥：

```powershell
ssh-add $env:USERPROFILE\.ssh\id_ed25519
```

若 `ssh-add` 报错，确认上一步服务已 **Running**：

```powershell
Get-Service ssh-agent
```

**可选**：在 `$env:USERPROFILE\.ssh\config` 中指定 GitHub 使用的密钥（记事本或 VS Code 新建该文件，无扩展名）：

```text
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519
  AddKeysToAgent yes
```

### 5）测试连接

```powershell
ssh -T git@github.com
```

首次会问是否信任主机，输入 `yes`。成功会出现 `Hi <用户名>! ...`。

若出现 **REMOTE HOST IDENTIFICATION HAS CHANGED**，说明本机 `known_hosts` 里 GitHub 的旧指纹与当前不一致（常见于密钥轮换或网络环境变化）。可先移除旧记录再重连：

```powershell
ssh-keygen -R github.com
ssh -T git@github.com
```

核对指纹请以 GitHub 官方为准：[GitHub’s SSH key fingerprints](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/githubs-ssh-key-fingerprints)。

### 6）将远程改为 SSH

```powershell
cd C:\path\to\wetland-youth-platform
git remote -v
git remote set-url origin git@github.com:liuwei-daer/wetland-youth-platform.git
git remote -v
```

（请按实际仓库把 `OWNER/REPO` 改成你的 `用户名/仓库名`。）

### 7）推送

```powershell
git push --set-upstream origin main
```

之后在同一分支：

```powershell
git push
```

### 使用 Git Bash（Windows）时

若你打开的是 **Git Bash** 而不是 PowerShell，可直接按本文 **第 1～7 节** 的 `bash` 命令操作（`~/.ssh` 在 Windows 上对应 `C:\Users\<你的用户名>\.ssh`）。

---

## 常见问题简表


| 现象                              | 处理方向                                                                                                                                                                     |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Permission denied (publickey)` | 公钥是否已添加到 GitHub；`ssh-add` 是否已加载私钥；`~/.ssh/config` 是否指对了 `IdentityFile`。                                                                                                  |
| 仍提示要输入 HTTPS 密码                 | 远程仍是 `https://`，执行 `git remote set-url` 改为 `git@github.com:...`。                                                                                                         |
| 公司网络拦截 SSH 22 端口                | 可在 `~/.ssh/config` 里为 `github.com` 配置 `Port 443` 走 HTTPS 端口（见 [GitHub 文档](https://docs.github.com/en/authentication/troubleshooting-ssh/using-ssh-over-the-https-port)）。 |
| `WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED` | 多为 `known_hosts` 中 GitHub 旧指纹过期。执行 `ssh-keygen -R github.com`（PowerShell / Bash 均可）后重新 `ssh -T git@github.com`，并与 [官方指纹](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/githubs-ssh-key-fingerprints) 核对。 |
| Windows 上 `ssh-add` 找不到 agent      | 用管理员 PowerShell 执行 `Set-Service ssh-agent -StartupType Manual` 与 `Start-Service ssh-agent`，再重试 `ssh-add`。 |


---

## 参考链接

- [Connecting to GitHub with SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
- [Managing remote repositories](https://docs.github.com/en/get-started/git-basics/managing-remote-repositories)

