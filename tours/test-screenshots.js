const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const htmlPath = path.join(__dirname, '2026年2月广西行/index.html');
  const fileUrl = `file://${htmlPath}`;

  // 创建截图保存目录
  const screenshotDir = path.join(__dirname, '2026年2月广西行/screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  console.log('正在加载页面...');
  await page.goto(fileUrl, { waitUntil: 'networkidle' });

  // 等待页面完全加载
  await page.waitForTimeout(2000);

  // PC 版截图
  console.log('截取 PC 版完整页面...');
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.screenshot({
    path: path.join(screenshotDir, 'pc-full.png'),
    fullPage: true
  });

  // PC 版视口截图（查看每日行程区域）
  console.log('截取 PC 版每日行程区域...');
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.screenshot({
    path: path.join(screenshotDir, 'pc-viewport.png'),
    fullPage: false
  });

  // 移动版截图
  console.log('截取移动版完整页面...');
  await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE 尺寸
  await page.screenshot({
    path: path.join(screenshotDir, 'mobile-full.png'),
    fullPage: true
  });

  // 移动版视口截图
  console.log('截取移动版每日行程区域...');
  await page.setViewportSize({ width: 375, height: 667 });
  await page.screenshot({
    path: path.join(screenshotDir, 'mobile-viewport.png'),
    fullPage: false
  });

  // 额外截图：平板尺寸
  console.log('截取平板版完整页面...');
  await page.setViewportSize({ width: 768, height: 1024 }); // iPad 尺寸
  await page.screenshot({
    path: path.join(screenshotDir, 'tablet-full.png'),
    fullPage: true
  });

  await browser.close();
  console.log('截图完成！文件保存在:', screenshotDir);
})();