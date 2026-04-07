# 安装

## 方式一：克隆整个整活 skill 集合（推荐）

```bash
git clone https://github.com/ai798-Lab/zhenghuo-skills ~/.claude/skills/zhenghuo
ln -sf "$HOME/.claude/skills/zhenghuo/qq-zone-martian" "$HOME/.claude/skills/qq-zone-martian"
```

## 方式二：只装这一个

```bash
git clone --filter=blob:none --sparse https://github.com/ai798-Lab/zhenghuo-skills ~/.claude/skills/zhenghuo
cd ~/.claude/skills/zhenghuo
git sparse-checkout set qq-zone-martian
ln -sf "$(pwd)/qq-zone-martian" "$HOME/.claude/skills/qq-zone-martian"
```

## 方式三：手动下载

把 `qq-zone-martian/` 整个目录放到 `~/.claude/skills/qq-zone-martian/` 即可。

## 前置依赖

非主流宇宙生成器需要 Puppeteer 来把 HTML 渲染成 PNG：

```bash
npm install -g puppeteer
```

字符转换器是纯 Python，无依赖：

```bash
python3 ~/.claude/skills/qq-zone-martian/scripts/martian.py "测试一下"
```

## 验证安装

启动 Claude Code，输入：

```
> 给我做一个非主流宇宙：我叫张三，是大学生，喜欢打篮球
```

如果 Claude 正确加载了 skill，会自动生成一个 HTML 文件 + PNG 截图。

## 卸载

```bash
rm -rf ~/.claude/skills/qq-zone-martian
```
