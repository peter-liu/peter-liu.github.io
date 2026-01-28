# 图虫图片搜索和下载技能

## 概述

本技能描述如何从图虫创意（https://stock.tuchong.com）搜索和下载高质量的图片素材。

## 前置条件

### 用户手工登录
**重要说明：在使用Playwright访问图虫网站时，需要用户手工登录账号。**

登录步骤：
1. 打开图虫网站
2. 使用账号密码或其他方式登录
3. 登录后，自动化脚本才能正常访问搜索结果

## 成功经验

### 1. 正确的图片容器位置

搜索结果的图片位于页面的特定容器中：

```javascript
const justifiedLayout = document.querySelector('.justified-layout');
const imageItems = justifiedLayout.querySelectorAll('.image-item');
```

**关键点：**
- 不要在`.photo`元素中查找，这些是占位符或轮播图
- 真正的搜索结果在`.justified-layout`容器中
- 每次搜索通常返回约100张相关图片

### 2. 正确的图片URL获取

图片URL存储在`data-lazy-url`属性中：

```javascript
const lazyUrl = item.getAttribute('data-lazy-url');
// 返回格式: //image-cdn.tuchong.com/weili/image/ml/1682133493553037338.webp
```

**URL格式说明：**
- 使用`//`开头的协议相对URL
- 路径格式：`/weili/image/ml/{数字ID}.webp`
- 需要添加`https:`前缀才能下载

### 3. 图片加载等待机制

由于图片采用懒加载，需要等待图片加载完成：

```javascript
window.scrollTo(0, 500); // 滚动页面触发加载

return new Promise((resolve) => {
  setTimeout(() => {
    // 提取图片URL
    const imageItems = justifiedLayout.querySelectorAll('.image-item');
    const imageUrls = [];
    imageItems.forEach((item, index) => {
      const lazyUrl = item.getAttribute('data-lazy-url');
      if (lazyUrl && index < 5) {
        imageUrls.push({
          index: index,
          lazyUrl: lazyUrl
        });
      }
    });
    resolve({ images: imageUrls });
  }, 2000); // 等待2-3秒
});
```

### 4. 正确的下载方法

使用curl下载时必须添加正确的HTTP头：

```bash
curl -L -o output.webp \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://stock.tuchong.com/" \
  https://image-cdn.tuchong.com/weili/image/ml/{图片ID}.webp
```

**HTTP头说明：**
- `User-Agent`: 模拟浏览器访问
- `Referer`: 必须设置为`https://stock.tuchong.com/`，否则会返回403 Forbidden错误
- `-L`: 跟随重定向

### 5. 完整的工作流程

```javascript
// 1. 导航到搜索页面
navigate_page(url);

// 2. 滚动并等待图片加载
window.scrollTo(0, 500);

// 3. 等待2-3秒
setTimeout(() => {
  // 4. 提取图片URL
  const justifiedLayout = document.querySelector('.justified-layout');
  const imageItems = justifiedLayout.querySelectorAll('.image-item');
  
  imageItems.forEach((item, index) => {
    const lazyUrl = item.getAttribute('data-lazy-url');
    if (lazyUrl) {
      // 5. 使用curl下载图片
      // 添加https:前缀
      const fullUrl = 'https:' + lazyUrl;
    }
  });
}, 2000);
```

## 错误经验总结

### 错误1：查找错误的容器

**错误做法：**
```javascript
// ❌ 错误：查找.photo元素
const photos = document.querySelectorAll('.photo');
const img = photo.querySelector('img');
const src = img.src; // 获取到的是占位符或轮播图
```

**结果：**
- 获取到的图片URL格式为`/weili/sm/xxx.webp`
- 这些图片不对应实际的搜索结果
- 每次搜索都返回相同的图片

**正确做法：**
```javascript
// ✅ 正确：查找.justified-layout
const justifiedLayout = document.querySelector('.justified-layout');
const imageItems = justifiedLayout.querySelectorAll('.image-item');
const lazyUrl = item.getAttribute('data-lazy-url');
```

### 错误2：URL格式错误

**错误URL格式：**
```
https://image-cdn.tuchong.com/weili/sm/901810142857658373.webp
```

**问题：**
- 这些URL对应的是占位符图片
- 不是搜索结果中的真实图片

**正确URL格式：**
```
https://image-cdn.tuchong.com/weili/image/ml/1682133493553037338.webp
```

### 错误3：缺少HTTP头导致403错误

**错误做法：**
```bash
# ❌ 没有添加Referer头
curl -L -o output.webp https://image-cdn.tuchong.com/weili/image/ml/xxx.webp
```

**结果：**
- 返回HTTP 403 Forbidden
- 下载的文件只有170字节（HTML错误页面）

**正确做法：**
```bash
# ✅ 添加User-Agent和Referer头
curl -L -o output.webp \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://stock.tuchong.com/" \
  https://image-cdn.tuchong.com/weili/image/ml/xxx.webp
```

### 错误4：不等待图片加载

**错误做法：**
```javascript
// ❌ 立即提取，不等待
const justifiedLayout = document.querySelector('.justified-layout');
const imageItems = justifiedLayout.querySelectorAll('.image-item');
// 立即获取URL，此时图片可能还未加载
```

**正确做法：**
```javascript
// ✅ 滚动并等待
window.scrollTo(0, 500);
setTimeout(() => {
  // 等待2-3秒后提取
  const imageItems = justifiedLayout.querySelectorAll('.image-item');
}, 2000);
```

### 错误5：忽略懒加载机制

**问题：**
图虫使用懒加载技术，图片不会一次性全部加载。

**解决方法：**
1. 滚动页面触发加载
2. 等待足够的时间
3. 检查图片的自然尺寸确认已加载

```javascript
// 检查图片是否已加载
if (img.naturalWidth > 0) {
  // 图片已加载
}
```

## 实际应用示例

### 搜索关键词

图虫支持中文关键词搜索，建议使用更具体的关键词：

```javascript
// ✅ 好的关键词（包含地点）
"北海老街"
"涠洲岛 北海"
"防城港金滩"
"外沙岛 北海"

// ❌ 不好的关键词（太泛）
"老街"
"金滩"
"岛屿"
```

### 图片分类和命名

根据景点分类保存图片：

```
images/
├── beihai/           # 北海景点
│   ├── beihai-old-street-tuchong-01.webp
│   ├── waisha-tuchong-01.webp
│   ├── weizhou-island-tuchong-01.webp
│   ├── eyushan-tuchong-01.webp
│   └── beihai-silver-beach-tuchong-01.webp
├── food/             # 美食
│   └── qiaogang-tuchong-01.webp
└── fangchenggang/    # 防城港景点
    ├── jintan-tuchong-01.webp
    ├── guaishitan-tuchong-01.webp
    ├── bailangtan-tuchong-01.webp
    └── dongxing-tuchong-01.webp
```

### 批量下载脚本

```bash
#!/bin/bash

# 批量下载图虫图片
# 使用方法: ./download_tuchong.sh <图片ID> <输出文件>

IMAGE_ID=$1
OUTPUT_FILE=$2

curl -L -o "$OUTPUT_FILE" \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://stock.tuchong.com/" \
  "https://image-cdn.tuchong.com/weili/image/ml/${IMAGE_ID}.webp"

# 验证下载的文件
if [ -s "$OUTPUT_FILE" ]; then
  echo "✅ 下载成功: $OUTPUT_FILE"
  ls -lh "$OUTPUT_FILE"
else
  echo "❌ 下载失败: $OUTPUT_FILE"
fi
```

## 技术要点总结

1. **正确的容器：** `.justified-layout` 而不是 `.photo`
2. **正确的属性：** `data-lazy-url` 而不是 `src`
3. **正确的URL格式：** `/weili/image/ml/` 而不是 `/weili/sm/`
4. **HTTP头必须：** `User-Agent` 和 `Referer`
5. **等待加载：** 滚动后等待2-3秒
6. **用户登录：** 需要用户手工登录图虫账号

## 注意事项

1. **版权问题：** 图虫是付费图库，下载的图片仅用于学习参考
2. **登录状态：** 确保用户已登录，否则可能无法访问某些功能
3. **网络稳定：** 下载过程中保持网络连接稳定
4. **文件验证：** 下载后检查文件大小，确保不是403错误页面（通常小于1KB）
5. **批量操作：** 避免短时间内大量请求，可能触发反爬机制

## 参考资源

- 图虫创意：https://stock.tuchong.com
- 图片CDN：https://image-cdn.tuchong.com