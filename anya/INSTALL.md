# Installation Guide — 阿尼亚.skill

## Requirements

- [Claude Code](https://claude.ai/code) CLI installed
- Git

## Install (Global — works in all projects)

```bash
git clone --filter=blob:none --sparse https://github.com/ai798-Lab/zhenghuo-skills ~/.claude/skills/zhenghuo
cd ~/.claude/skills/zhenghuo
git sparse-checkout set anya
ln -sf "$(pwd)/anya" "$HOME/.claude/skills/anya"
```

## Install (Per-project — run in git repo root)

```bash
mkdir -p .claude/skills
git clone https://github.com/ai798-Lab/zhenghuo-skills .claude/skills/anya
```

## Verify Installation

In Claude Code, type:

```
阿尼亚
```

## Update

```bash
cd ~/.claude/skills/anya
git pull
```

## Uninstall

```bash
rm -rf ~/.claude/skills/anya
```

## Troubleshooting

**Skill not found?**
Claude Code looks for skills in:
1. `~/.claude/skills/` (global)
2. `.claude/skills/` in the git repo root (project-level)

Make sure you cloned into the correct location.
