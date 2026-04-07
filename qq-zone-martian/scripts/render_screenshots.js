/**
 * QQ空间火星文 Skill 测试截图渲染器 v5
 * Y2K 千禧年视觉风格 · 小红书 1080×1440 (3:4) 规格
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const PROJECT = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(PROJECT, '测试截图');

const TESTS = [
  {
    id: '01-基础转换',
    title: 'AI × 杀马特',
    subtitle: '✦ 当 2026 的 AI 第一次接触 2010 的非主流 ✦',
    badge: 'TEST.01',
    meme: '"妗兲兲气眞恏"   ⟶   Claude Opus 4.6',
    prompt: '把这句话转成中度强度的火星文：今天天气真好，我想去公园玩。',
    outputFile: '01-基础转换.txt',
    truncate: false,
  },
  {
    id: '02-网名签名',
    title: '葬爱 · 招新',
    subtitle: '✦ AI 取的网名 · 比你当年还非主流 ✦',
    badge: 'TEST.02',
    meme: '"╮丶葬愛灬小毅︶ㄣ"   ⟶   AI Generated',
    prompt: '给我起 3 个非主流网名，再配 3 句个性签名。',
    outputFile: '02-nickname-signature.txt',
    truncate: false,
  },
  {
    id: '03-空间日志',
    title: '青春疼痛.exe',
    subtitle: '✦ AI 写的青春疼痛 · 比我当年还狗血 ✦',
    badge: 'TEST.03',
    meme: '"莪炛伱赱叻ωǒ"   ⟶   是 Claude 写的 💀',
    prompt: '写一篇 QQ 空间日志：高考结束，和暗恋的女生告别。重度火星文。',
    outputFile: '03-空间日志.txt',
    truncate: true,
  },
];

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildHtml({ title, subtitle, badge, meme, prompt, output, truncate }) {
  return `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=ZCOOL+KuaiLe&family=ZCOOL+QingKe+HuangYou&family=JetBrains+Mono:wght@400;700&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  html, body { width: 1080px; height: 1440px; }

  body {
    font-family: 'ZCOOL QingKe HuangYou', 'PingFang SC', sans-serif;
    background:
      linear-gradient(135deg,
        #B5EFFF 0%,
        #FFB5EF 18%,
        #D5B5FF 36%,
        #B5FFE5 54%,
        #FFE5B5 72%,
        #FFB5EF 90%,
        #B5EFFF 100%);
    background-size: 200% 200%;
    padding: 50px 50px;
    color: #1a1a3a;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  body::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background:
      radial-gradient(ellipse 700px 500px at 20% 15%, rgba(255,255,255,0.7) 0%, transparent 50%),
      radial-gradient(ellipse 600px 500px at 80% 85%, rgba(255,255,255,0.5) 0%, transparent 50%),
      radial-gradient(circle 200px at 90% 30%, rgba(255,20,147,0.25) 0%, transparent 70%),
      radial-gradient(circle 200px at 10% 70%, rgba(0,191,255,0.25) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  body::after {
    content: '★      ✦       ❀         ★      ✿         ★      ✦      ❀';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    font-size: 32px;
    color: rgba(255,255,255,0.7);
    text-shadow: 0 0 10px #FF1493, 0 0 18px #00FFFF;
    pointer-events: none;
    word-spacing: 60px;
    line-height: 230px;
    padding: 40px;
    z-index: 0;
  }

  .container {
    position: relative;
    z-index: 2;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  /* 顶部 header */
  .header {
    text-align: center;
    margin-bottom: 24px;
  }

  .header-deco {
    font-family: 'Orbitron', sans-serif;
    color: #fff;
    font-size: 14px;
    font-weight: 900;
    letter-spacing: 6px;
    margin-bottom: 12px;
    text-shadow:
      2px 2px 0 #FF1493,
      -1px -1px 0 #00FFFF;
  }

  .title {
    font-family: 'ZCOOL KuaiLe', 'PingFang SC', sans-serif;
    font-size: 92px;
    font-weight: 900;
    line-height: 0.95;
    color: #fff;
    -webkit-text-stroke: 5px #1a1a3a;
    text-shadow:
      0 2px 0 #FF1493,
      0 4px 0 #FF1493,
      0 6px 0 #FF1493,
      0 8px 0 #FF1493,
      0 10px 0 #1a1a3a,
      8px 8px 20px rgba(0,191,255,0.7),
      -2px -2px 4px rgba(255,255,255,1);
    letter-spacing: 4px;
    margin-bottom: 16px;
    transform: skewX(-3deg);
  }

  .subtitle {
    font-family: 'ZCOOL KuaiLe', sans-serif;
    font-size: 22px;
    color: #fff;
    text-shadow:
      2px 2px 0 #FF1493,
      -1px -1px 0 #00FFFF,
      4px 4px 8px rgba(255,20,147,0.5);
    letter-spacing: 2px;
    margin-bottom: 16px;
  }

  .badges {
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  .badge {
    font-family: 'Orbitron', sans-serif;
    background: linear-gradient(180deg,
      rgba(255,255,255,0.95) 0%,
      rgba(255,255,255,0.7) 45%,
      rgba(0,191,255,0.5) 50%,
      rgba(255,20,147,0.6) 100%);
    border: 2px solid #fff;
    color: #fff;
    padding: 7px 18px;
    border-radius: 100px;
    font-size: 12px;
    font-weight: 900;
    letter-spacing: 1.5px;
    box-shadow:
      0 0 0 2px rgba(255,20,147,0.6),
      0 4px 12px rgba(255,20,147,0.5),
      inset 0 1px 0 #fff;
    text-shadow: 1px 1px 0 #FF1493, 2px 2px 4px rgba(0,0,0,0.3);
  }

  .badge.cyan {
    background: linear-gradient(180deg,
      rgba(255,255,255,0.95) 0%,
      rgba(255,255,255,0.7) 45%,
      rgba(0,255,255,0.6) 50%,
      rgba(0,191,255,0.7) 100%);
    box-shadow:
      0 0 0 2px rgba(0,191,255,0.6),
      0 4px 12px rgba(0,191,255,0.5),
      inset 0 1px 0 #fff;
    text-shadow: 1px 1px 0 #0080FF, 2px 2px 4px rgba(0,0,0,0.3);
  }

  /* 全息相框 */
  .photo-frame {
    position: relative;
    padding: 12px;
    background: linear-gradient(135deg,
      #FF1493 0%, #FFD700 14%, #00FFFF 28%, #FF1493 42%,
      #9B30FF 56%, #00FF88 70%, #FFD700 84%, #FF1493 100%);
    border-radius: 20px;
    box-shadow:
      0 0 0 3px #fff,
      0 0 0 6px rgba(255,255,255,0.6),
      0 20px 50px rgba(255,20,147,0.5),
      0 30px 70px rgba(0,191,255,0.4);
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  .corner {
    position: absolute;
    font-size: 42px;
    z-index: 10;
    filter: drop-shadow(0 0 8px rgba(255,255,255,0.8));
  }
  .corner.tl { top: -22px; left: -22px; color: #FF1493; }
  .corner.tr { top: -22px; right: -22px; color: #00FFFF; }
  .corner.bl { bottom: -22px; left: -22px; color: #FFD700; }
  .corner.br { bottom: -22px; right: -22px; color: #9B30FF; }

  /* 终端窗口 */
  .window {
    background: #0d0d1a;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.2);
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  .title-bar {
    background: linear-gradient(180deg, #2a2a4a 0%, #1a1a2e 100%);
    height: 34px;
    display: flex;
    align-items: center;
    padding: 0 14px;
    border-bottom: 1px solid #000;
    position: relative;
    flex-shrink: 0;
  }

  .dots { display: flex; gap: 8px; }
  .dot { width: 12px; height: 12px; border-radius: 50%; box-shadow: inset 0 1px 1px rgba(255,255,255,0.5); }
  .dot.red { background: radial-gradient(circle at 30% 30%, #ff8a85, #ff5f57); }
  .dot.yellow { background: radial-gradient(circle at 30% 30%, #ffd47e, #febc2e); }
  .dot.green { background: radial-gradient(circle at 30% 30%, #6ee885, #28c840); }

  .title-text {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    color: #aaa;
    font-size: 11px;
    font-family: 'JetBrains Mono', monospace;
  }

  .term-content {
    padding: 22px 26px 24px;
    font-size: 13px;
    line-height: 1.65;
    font-family: 'JetBrains Mono', 'PingFang SC', monospace;
    color: #e0e0ff;
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  .welcome {
    border: 1px solid #FF1493;
    border-radius: 8px;
    padding: 12px 18px;
    margin-bottom: 14px;
    background: linear-gradient(135deg, rgba(255,20,147,0.08), rgba(0,191,255,0.08));
    box-shadow: 0 0 12px rgba(255,20,147,0.2);
    flex-shrink: 0;
  }

  .welcome-line1 {
    color: #FF69B4;
    font-weight: 700;
    font-size: 13px;
    text-shadow: 0 0 8px rgba(255,20,147,0.8);
  }

  .welcome-line2 {
    color: #888;
    font-size: 11px;
    margin-top: 3px;
  }

  .welcome-line2 .key { color: #00FFFF; }

  .meta-line {
    color: #666;
    font-size: 11px;
    margin: 8px 0 3px;
    flex-shrink: 0;
  }
  .meta-line .label { color: #888; }
  .meta-line .val { color: #b8b8ff; }

  .skill-loaded {
    color: #00FF88;
    font-size: 11px;
    margin-bottom: 14px;
    text-shadow: 0 0 8px rgba(0,255,136,0.8);
    flex-shrink: 0;
  }

  .prompt-box {
    border: 1px solid #00FFFF;
    border-radius: 8px;
    padding: 12px 16px;
    margin-bottom: 16px;
    background: linear-gradient(135deg, rgba(0,191,255,0.05), rgba(255,20,147,0.05));
    box-shadow: 0 0 12px rgba(0,191,255,0.2);
    flex-shrink: 0;
  }

  .prompt-line {
    color: #fff;
    font-size: 13px;
    line-height: 1.55;
  }

  .prompt-line .arrow {
    color: #00FFFF;
    font-weight: 700;
    margin-right: 8px;
    text-shadow: 0 0 8px rgba(0,255,255,0.9);
  }

  .response-wrap {
    flex: 1;
    overflow: hidden;
    position: relative;
    min-height: 0;
  }

  .assistant-mark {
    color: #FF1493;
    margin-right: 10px;
    text-shadow: 0 0 8px rgba(255,20,147,0.9);
  }

  .response {
    white-space: pre-wrap;
    word-wrap: break-word;
    color: #d0d0ff;
    font-size: 13px;
    line-height: 1.7;
  }

  .response.truncate {
    -webkit-mask-image: linear-gradient(180deg, #000 0%, #000 75%, transparent 100%);
    mask-image: linear-gradient(180deg, #000 0%, #000 75%, transparent 100%);
  }

  /* 底部 */
  .meme-area {
    margin-top: 22px;
    text-align: center;
    flex-shrink: 0;
  }

  .meme-divider {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-bottom: 12px;
  }

  .div-line {
    flex: 1;
    height: 3px;
    background: linear-gradient(90deg, transparent, #FF1493, #00FFFF, #FF1493, transparent);
    max-width: 200px;
    border-radius: 2px;
    box-shadow: 0 0 8px rgba(255,20,147,0.6);
  }

  .div-icon {
    font-size: 22px;
    color: #fff;
    text-shadow: 0 0 8px #FF1493, 0 0 14px #00FFFF;
  }

  .meme {
    font-family: 'ZCOOL KuaiLe', sans-serif;
    font-size: 22px;
    color: #fff;
    text-shadow:
      2px 2px 0 #FF1493,
      -1px -1px 0 #00FFFF,
      3px 3px 10px rgba(255,20,147,0.6);
    letter-spacing: 1.5px;
    line-height: 1.4;
    padding: 0 20px;
  }

  .footer {
    margin-top: 12px;
    color: #fff;
    font-size: 11px;
    letter-spacing: 3px;
    font-family: 'Orbitron', sans-serif;
    font-weight: 700;
    text-shadow: 2px 2px 0 #FF1493, -1px -1px 0 #00FFFF;
  }

  .footer .star { color: #FFD700; margin: 0 6px; text-shadow: 0 0 8px #FFD700; }
</style>
</head>
<body>
<div class="container">

  <div class="header">
    <div class="header-deco">★ Y2K · MARTIAN · TEST ★</div>
    <div class="title">${escapeHtml(title)}</div>
    <div class="subtitle">${escapeHtml(subtitle)}</div>
    <div class="badges">
      <span class="badge">${escapeHtml(badge)}</span>
      <span class="badge cyan">qq-zone-martian.skill</span>
      <span class="badge">CLAUDE v2.1.89</span>
    </div>
  </div>

  <div class="photo-frame">
    <div class="corner tl">★</div>
    <div class="corner tr">❀</div>
    <div class="corner bl">✿</div>
    <div class="corner br">★</div>

    <div class="window">
      <div class="title-bar">
        <div class="dots">
          <span class="dot red"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
        </div>
        <div class="title-text">claude — 整活 skill 集合 — zsh</div>
      </div>
      <div class="term-content">

        <div class="welcome">
          <div class="welcome-line1">✻ Welcome to Claude Code!</div>
          <div class="welcome-line2">
            <span class="key">/help</span> for help, <span class="key">/status</span> for your current setup
          </div>
        </div>

        <div class="meta-line"><span class="label">cwd:</span> <span class="val">~/Documents/整活 skill 集合</span></div>
        <div class="meta-line"><span class="label">model:</span> <span class="val">claude-opus-4-6 (1M context)</span></div>
        <div class="skill-loaded">⏺ Loaded skill: qq-zone-martian (5 references, 1 script)</div>

        <div class="prompt-box">
          <div class="prompt-line">
            <span class="arrow">&gt;</span>${escapeHtml(prompt)}
          </div>
        </div>

        <div class="response-wrap">
          <div class="response${truncate ? ' truncate' : ''}"><span class="assistant-mark">⏺</span>${escapeHtml(output)}</div>
        </div>

      </div>
    </div>
  </div>

  <div class="meme-area">
    <div class="meme-divider">
      <div class="div-line"></div>
      <span class="div-icon">★</span>
      <div class="div-line"></div>
    </div>
    <div class="meme">${escapeHtml(meme)}</div>
    <div class="footer">
      ★ Y2K REVIVAL <span class="star">·</span> 整活 SKILL 集合 <span class="star">·</span> @PEACE8426 ★
    </div>
  </div>

</div>
</body>
</html>`;
}

(async () => {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const test of TESTS) {
    const outputPath = path.join(PROJECT, '测试输出', test.outputFile);
    if (!fs.existsSync(outputPath)) {
      console.error(`❌ Missing: ${outputPath}`);
      continue;
    }
    const output = fs.readFileSync(outputPath, 'utf8').trim();
    const html = buildHtml({
      title: test.title,
      subtitle: test.subtitle,
      badge: test.badge,
      meme: test.meme,
      prompt: test.prompt,
      output,
      truncate: test.truncate,
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1080, height: 1440, deviceScaleFactor: 2 });
    await page.setContent(html, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1500));

    const pngPath = path.join(OUTPUT_DIR, `${test.id}.png`);
    await page.screenshot({ path: pngPath, fullPage: false, clip: { x: 0, y: 0, width: 1080, height: 1440 } });
    console.log(`✅ ${pngPath}`);
    await page.close();
  }

  await browser.close();
})();
