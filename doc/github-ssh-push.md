# 使用 SSH 推送到 GitHub 教程

通过 SSH 与 GitHub 通信时，无需在每次 `git push` 时输入用户名和密码（或 Token）。下面以 **macOS / Linux** 为主说明；Windows 用户可在 **Git Bash** 或 **PowerShell** 中执行相同命令（路径略有不同）。

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
ssh-keygen -t ed25519 -C "liuwei.daer@gmail.com" -f ~/.ssh/id_ed25519
```



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

## 常见问题简表


| 现象                              | 处理方向                                                                                                                                                                     |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Permission denied (publickey)` | 公钥是否已添加到 GitHub；`ssh-add` 是否已加载私钥；`~/.ssh/config` 是否指对了 `IdentityFile`。                                                                                                  |
| 仍提示要输入 HTTPS 密码                 | 远程仍是 `https://`，执行 `git remote set-url` 改为 `git@github.com:...`。                                                                                                         |
| 公司网络拦截 SSH 22 端口                | 可在 `~/.ssh/config` 里为 `github.com` 配置 `Port 443` 走 HTTPS 端口（见 [GitHub 文档](https://docs.github.com/en/authentication/troubleshooting-ssh/using-ssh-over-the-https-port)）。 |


---

## 参考链接

- [Connecting to GitHub with SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
- [Managing remote repositories](https://docs.github.com/en/get-started/git-basics/managing-remote-repositories)

