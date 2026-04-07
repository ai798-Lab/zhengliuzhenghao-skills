/**
 * 封面 v3 — Y2K 千禧年风格
 */
const puppeteer = require('puppeteer');
const path = require('path');

const OUTPUT = path.resolve(__dirname, '../测试截图/00-封面.png');

const html = `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=ZCOOL+KuaiLe&family=ZCOOL+QingKe+HuangYou&family=JetBrains+Mono:wght@400;700&display=swap');
* { margin:0; padding:0; box-sizing:border-box; }

body {
  font-family: 'ZCOOL QingKe HuangYou', 'PingFang SC', sans-serif;
  width: 1080px; height: 1440px;
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
  display: flex;
  flex-direction: column;
  padding: 80px 70px;
  position: relative;
  overflow: hidden;
}

/* 全息光斑 */
body::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background:
    radial-gradient(ellipse 700px 500px at 25% 15%, rgba(255,255,255,0.7) 0%, transparent 50%),
    radial-gradient(ellipse 600px 500px at 75% 85%, rgba(255,255,255,0.5) 0%, transparent 50%),
    radial-gradient(circle 200px at 90% 30%, rgba(255,20,147,0.3) 0%, transparent 70%),
    radial-gradient(circle 200px at 10% 70%, rgba(0,191,255,0.3) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

/* 浮动星星 */
body::after {
  content: '★      ✦       ❀         ★      ✿         ★      ✦      ❀        ★      ✿';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  font-size: 38px;
  color: rgba(255,255,255,0.85);
  text-shadow:
    0 0 10px #FF1493,
    0 0 20px #00FFFF;
  pointer-events: none;
  word-spacing: 50px;
  line-height: 250px;
  padding: 30px;
  z-index: 0;
}

.content {
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* 顶部 Y2K 标签 */
.top-tag {
  font-family: 'Orbitron', sans-serif;
  background: linear-gradient(180deg,
    rgba(255,255,255,0.95) 0%,
    rgba(255,255,255,0.7) 45%,
    rgba(0,191,255,0.6) 50%,
    rgba(255,20,147,0.7) 100%);
  border: 2px solid #fff;
  color: #fff;
  padding: 14px 32px;
  border-radius: 100px;
  font-size: 22px;
  font-weight: 900;
  letter-spacing: 4px;
  align-self: flex-start;
  margin-bottom: 60px;
  box-shadow:
    0 0 0 3px rgba(255,20,147,0.6),
    0 8px 30px rgba(255,20,147,0.5),
    inset 0 1px 0 #fff;
  text-shadow: 2px 2px 0 #FF1493, 3px 3px 6px rgba(0,0,0,0.3);
}

/* 副标题 */
.deco-top {
  font-family: 'Orbitron', sans-serif;
  color: #fff;
  font-size: 18px;
  font-weight: 900;
  letter-spacing: 6px;
  margin-bottom: 16px;
  text-shadow:
    2px 2px 0 #FF1493,
    -1px -1px 0 #00FFFF;
}

/* 主标题 — 超大铬色 3D bubble */
.title {
  font-family: 'ZCOOL KuaiLe', sans-serif;
  font-size: 165px;
  font-weight: 900;
  line-height: 0.95;
  color: #fff;
  -webkit-text-stroke: 6px #1a1a3a;
  text-shadow:
    0 2px 0 #FF1493,
    0 4px 0 #FF1493,
    0 6px 0 #FF1493,
    0 8px 0 #FF1493,
    0 10px 0 #FF1493,
    0 12px 0 #FF1493,
    0 14px 0 #1a1a3a,
    16px 16px 30px rgba(0,191,255,0.8),
    -3px -3px 6px rgba(255,255,255,1);
  letter-spacing: 4px;
  margin-bottom: 30px;
  transform: skewX(-3deg);
}

.subtitle {
  font-family: 'ZCOOL KuaiLe', sans-serif;
  font-size: 36px;
  color: #fff;
  text-shadow:
    3px 3px 0 #FF1493,
    -2px -2px 0 #00FFFF,
    5px 5px 12px rgba(255,20,147,0.6);
  letter-spacing: 4px;
  margin-bottom: 50px;
}

/* Y2K 全息相框 */
.frame {
  position: relative;
  padding: 16px;
  background: linear-gradient(135deg,
    #FF1493 0%,
    #FFD700 14%,
    #00FFFF 28%,
    #FF1493 42%,
    #9B30FF 56%,
    #00FF88 70%,
    #FFD700 84%,
    #FF1493 100%);
  background-size: 300% 300%;
  border-radius: 24px;
  box-shadow:
    0 0 0 4px #fff,
    0 0 0 8px rgba(255,255,255,0.6),
    0 30px 80px rgba(255,20,147,0.5),
    0 40px 100px rgba(0,191,255,0.4);
  margin-bottom: 50px;
}

.corner {
  position: absolute;
  font-size: 56px;
  z-index: 10;
  filter: drop-shadow(0 0 12px rgba(255,255,255,0.9));
}
.corner.tl { top: -28px; left: -28px; color: #FF1493; }
.corner.tr { top: -28px; right: -28px; color: #00FFFF; }
.corner.bl { bottom: -28px; left: -28px; color: #FFD700; }
.corner.br { bottom: -28px; right: -28px; color: #9B30FF; }

.window {
  background: #0d0d1a;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.2);
}

.bar {
  background: linear-gradient(180deg, #2a2a4a 0%, #1a1a2e 100%);
  height: 44px;
  display: flex;
  align-items: center;
  padding: 0 18px;
  gap: 9px;
  position: relative;
}

.dot { width: 14px; height: 14px; border-radius: 50%; box-shadow: inset 0 1px 1px rgba(255,255,255,0.5); }
.r { background: radial-gradient(circle at 30% 30%, #ff8a85, #ff5f57); }
.y { background: radial-gradient(circle at 30% 30%, #ffd47e, #febc2e); }
.g { background: radial-gradient(circle at 30% 30%, #6ee885, #28c840); }

.bar-title {
  position: absolute; left: 50%; transform: translateX(-50%);
  color: #aaa; font-size: 14px;
  font-family: 'JetBrains Mono', monospace;
}

.term {
  padding: 32px 38px 38px;
  font-family: 'JetBrains Mono', 'PingFang SC', monospace;
  color: #d4d4ff;
  font-size: 22px;
  line-height: 1.7;
}

.welcome {
  border: 1px solid #FF1493;
  border-radius: 10px;
  padding: 18px 24px;
  margin-bottom: 22px;
  background: linear-gradient(135deg, rgba(255,20,147,0.08), rgba(0,191,255,0.08));
  box-shadow: 0 0 20px rgba(255,20,147,0.3);
}

.welcome-line {
  color: #FF69B4;
  font-weight: 700;
  font-size: 22px;
  text-shadow: 0 0 12px rgba(255,20,147,0.9);
}

.skill-loaded {
  color: #00FF88;
  font-size: 20px;
  margin-bottom: 22px;
  text-shadow: 0 0 12px rgba(0,255,136,0.9);
}

.prompt-box {
  border: 1px solid #00FFFF;
  border-radius: 10px;
  padding: 18px 24px;
  background: linear-gradient(135deg, rgba(0,191,255,0.05), rgba(255,20,147,0.05));
  margin-bottom: 26px;
  box-shadow: 0 0 20px rgba(0,191,255,0.3);
}

.prompt-arrow { color: #00FFFF; font-weight: 700; text-shadow: 0 0 10px #00FFFF; }
.prompt-text { color: #fff; }

.response { color: #d4d4ff; font-size: 24px; line-height: 1.85; padding-left: 8px; }
.response .mark { color: #FF1493; margin-right: 14px; text-shadow: 0 0 10px #FF1493; }
.frame-line { color: #FF69B4; text-shadow: 0 0 8px #FF1493; }

/* 底部 */
.footer-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
  gap: 18px;
}

.footer-meme {
  font-family: 'ZCOOL KuaiLe', sans-serif;
  color: #fff;
  font-size: 38px;
  font-weight: 700;
  letter-spacing: 3px;
  text-align: center;
  text-shadow:
    3px 3px 0 #FF1493,
    -2px -2px 0 #00FFFF,
    5px 5px 14px rgba(255,20,147,0.7);
}

.footer-tag {
  font-family: 'Orbitron', sans-serif;
  color: #fff;
  font-size: 22px;
  letter-spacing: 6px;
  font-weight: 900;
  text-shadow: 2px 2px 0 #FF1493, -1px -1px 0 #00FFFF;
}
</style></head>
<body>
<div class="content">

  <div class="top-tag">★ Y2K · MARTIAN · TEST ★</div>

  <div class="deco-top">★ MILLENNIUM · REVIVAL ★</div>
  <div class="title">QQ空间<br/>火星文</div>
  <div class="subtitle">用 2026 的 AI · 写 2010 的非主流</div>

  <div class="frame">
    <div class="corner tl">★</div>
    <div class="corner tr">❀</div>
    <div class="corner bl">✿</div>
    <div class="corner br">★</div>

    <div class="window">
      <div class="bar">
        <div class="dot r"></div><div class="dot y"></div><div class="dot g"></div>
        <div class="bar-title">claude — 整活 skill 集合</div>
      </div>
      <div class="term">
        <div class="welcome">
          <div class="welcome-line">✻ Welcome to Claude Code!</div>
        </div>
        <div class="skill-loaded">⏺ Loaded skill: qq-zone-martian</div>
        <div class="prompt-box">
          <span class="prompt-arrow">&gt;</span> <span class="prompt-text">把"今天天气真好，我想念你"转成火星文</span>
        </div>
        <div class="response">
          <span class="mark">⏺</span><span class="frame-line">━━━━━━━━━━━━━━━━━</span><br/>
          <span style="margin-left:36px;">妗兲兲気眞恏ヽ莪缃唸沵ㄣ</span><br/>
          <span style="margin-left:36px;" class="frame-line">━━━━━━━━━━━━━━━━━</span>
        </div>
      </div>
    </div>
  </div>

  <div class="footer-area">
    <div class="footer-meme">"莪dē青春 · 由 AI 帮我葬"</div>
    <div class="footer-tag">★ 3 TESTS · REAL OUTPUT · TIME TRAVEL ★</div>
  </div>

</div>
</body></html>`;

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1440, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: OUTPUT });
  await browser.close();
  console.log('✅ ' + OUTPUT);
})();
