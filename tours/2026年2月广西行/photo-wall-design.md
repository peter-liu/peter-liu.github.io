# 动态照片墙UI设计方案
## "去广西晒晒太阳" Hero区域

**项目名称**：2026年2月广西行  
**设计目标**：在Hero背景层之上创建动态照片墙，增强视觉层次感和生动性  
**设计风格**：小红书风格 - 年轻、活力、视觉冲击力  
**创建日期**：2026年1月28日  

---

## 📐 一、照片墙布局方案

### 1.1 照片数量与位置

#### 桌面端（≥ 1200px）
- **同时展示照片数量**：6张
- **布局方式**：随机散布 + 网格对齐
- **位置分布**：
  - 左上区域：2张（大尺寸）
  - 右上区域：1张（中尺寸）
  - 左下区域：1张（中尺寸）
  - 右下区域：2张（混合尺寸）

#### 平板端（768px - 1199px）
- **同时展示照片数量**：4张
- **布局方式**：简化分布
- **位置分布**：
  - 左侧：2张
  - 右侧：2张
  - 避免遮挡标题区域

#### 移动端（< 768px）
- **同时展示照片数量**：3张
- **布局方式**：底部散布
- **位置分布**：
  - 下方区域：3张小尺寸照片
  - 避免遮挡标题和按钮

### 1.2 照片大小规格

```css
/* 桌面端尺寸 */
.photo-large {
    width: 240px;
    height: 320px;  /* 3:4 比例 */
}

.photo-medium {
    width: 180px;
    height: 240px;  /* 3:4 比例 */
}

.photo-small {
    width: 140px;
    height: 140px;  /* 1:1 比例 */
}

/* 平板端尺寸 */
.photo-tablet-large {
    width: 200px;
    height: 266px;
}

.photo-tablet-medium {
    width: 160px;
    height: 213px;
}

/* 移动端尺寸 */
.photo-mobile {
    width: 100px;
    height: 100px;
}
```

### 1.3 布局网格系统

使用CSS绝对定位 + 百分比定位系统，确保响应式适配：

```css
/* 照片容器 */
.photo-wall-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;  /* 背景层之上，文字层之下 */
    pointer-events: none;  /* 不干扰文字交互 */
}

/* 照片定位 - 桌面端 */
.photo-item {
    position: absolute;
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 照片位置示例 */
.photo-1 {
    top: 15%;
    left: 5%;
}

.photo-2 {
    top: 10%;
    right: 10%;
}

.photo-3 {
    top: 55%;
    left: 8%;
}

.photo-4 {
    top: 45%;
    right: 15%;
}

.photo-5 {
    bottom: 20%;
    left: 20%;
}

.photo-6 {
    bottom: 25%;
    right: 5%;
}
```

---

## 🖼️ 二、相框设计规范

### 2.1 相框样式

#### 白色相框样式（第一张照片）
```css
.photo-frame-white {
    background: #FFFFFF;
    padding: 12px;
    border-radius: 4px;
    box-shadow: 
        0 4px 8px rgba(0, 0, 0, 0.15),
        0 8px 16px rgba(0, 0, 0, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

/* 相框内图片 */
.photo-frame-white img {
    display: block;
    border-radius: 2px;
}

/* 相框纹理效果（可选） */
.photo-frame-texture {
    background: 
        linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%);
    border: 1px solid rgba(0, 0, 0, 0.05);
}
```

#### 极简相框样式（其他照片）
```css
.photo-frame-minimal {
    padding: 0;
    border: 2px solid rgba(255, 255, 255, 0.9);
    border-radius: 8px;
    background: transparent;
}

/* 柔和边框 */
.photo-frame-soft {
    border: 8px solid rgba(255, 255, 255, 0.7);
    border-radius: 8px;
    backdrop-filter: blur(2px);
}

/* 渐变边框 */
.photo-frame-gradient {
    padding: 8px;
    background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.9) 0%,
        rgba(255, 255, 255, 0.6) 100%
    );
    border-radius: 8px;
}
```

#### 无边框样式（部分照片）
```css
.photo-frame-none {
    padding: 0;
    border: none;
    border-radius: 8px;
    background: transparent;
}
```

### 2.2 相框阴影效果

```css
/* 标准阴影 */
.shadow-standard {
    box-shadow: 
        0 4px 12px rgba(0, 0, 0, 0.15),
        0 8px 24px rgba(0, 0, 0, 0.1);
}

/* 深度阴影（用于突出照片） */
.shadow-deep {
    box-shadow: 
        0 8px 16px rgba(0, 0, 0, 0.2),
        0 16px 32px rgba(0, 0, 0, 0.15),
        0 24px 48px rgba(0, 0, 0, 0.1);
}

/* 柔和阴影 */
.shadow-soft {
    box-shadow: 
        0 2px 8px rgba(0, 0, 0, 0.1),
        0 4px 16px rgba(0, 0, 0, 0.08);
}

/* 内阴影（增加立体感） */
.shadow-inner {
    box-shadow: 
        inset 0 1px 0 rgba(255, 255, 255, 0.8),
        0 4px 12px rgba(0, 0, 0, 0.15);
}
```

### 2.3 倾斜角度范围

```css
/* 随机倾斜角度 */
.rotate-left { transform: rotate(-12deg); }
.rotate-left-small { transform: rotate(-8deg); }
.rotate-left-tiny { transform: rotate(-5deg); }
.rotate-straight { transform: rotate(0deg); }
.rotate-right-tiny { transform: rotate(5deg); }
.rotate-right-small { transform: rotate(8deg); }
.rotate-right { transform: rotate(12deg); }

/* 角度范围：-15° 到 +15° */
/* 使用JavaScript动态分配 */
```

### 2.4 相框组合样式

```css
/* 完整相框组件 */
.photo-frame {
    position: relative;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform, opacity;
}

/* 相框容器 */
.photo-frame::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: inherit;
    background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.4) 0%,
        rgba(255, 255, 255, 0.1) 100%
    );
    pointer-events: none;
}

/* 图片样式 */
.photo-frame img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
}
```

---

## ✨ 三、动画效果设计

### 3.1 照片切换动画类型

#### 淡入淡出（Fade In/Out）
```css
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale(0.9);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes fadeOut {
    from {
        opacity: 1;
        transform: scale(1);
    }
    to {
        opacity: 0;
        transform: scale(0.9);
    }
}

.animation-fade-in {
    animation: fadeIn 0.8s ease-out forwards;
}

.animation-fade-out {
    animation: fadeOut 0.6s ease-in forwards;
}
```

#### 缩放效果（Scale）
```css
@keyframes scaleIn {
    from {
        opacity: 0;
        transform: scale(0.8) rotate(var(--rotation));
    }
    to {
        opacity: 1;
        transform: scale(1) rotate(var(--rotation));
    }
}

@keyframes scaleOut {
    from {
        opacity: 1;
        transform: scale(1) rotate(var(--rotation));
    }
    to {
        opacity: 0;
        transform: scale(1.1) rotate(var(--rotation));
    }
}

.animation-scale-in {
    animation: scaleIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.animation-scale-out {
    animation: scaleOut 0.5s ease-in forwards;
}
```

#### 滑动效果（Slide）
```css
@keyframes slideInFromLeft {
    from {
        opacity: 0;
        transform: translateX(-50px) rotate(var(--rotation));
    }
    to {
        opacity: 1;
        transform: translateX(0) rotate(var(--rotation));
    }
}

@keyframes slideInFromRight {
    from {
        opacity: 0;
        transform: translateX(50px) rotate(var(--rotation));
    }
    to {
        opacity: 1;
        transform: translateX(0) rotate(var(--rotation));
    }
}

@keyframes slideInFromTop {
    from {
        opacity: 0;
        transform: translateY(-50px) rotate(var(--rotation));
    }
    to {
        opacity: 1;
        transform: translateY(0) rotate(var(--rotation));
    }
}

@keyframes slideInFromBottom {
    from {
        opacity: 0;
        transform: translateY(50px) rotate(var(--rotation));
    }
    to {
        opacity: 1;
        transform: translateY(0) rotate(var(--rotation));
    }
}
```

#### 旋转效果（Rotate）
```css
@keyframes rotateIn {
    from {
        opacity: 0;
        transform: rotate(-180deg) scale(0.5);
    }
    to {
        opacity: 1;
        transform: rotate(var(--rotation)) scale(1);
    }
}

.animation-rotate-in {
    animation: rotateIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
```

### 3.2 动画时长和缓动函数

```css
/* 动画时长 */
.duration-fast { animation-duration: 0.5s; }
.duration-normal { animation-duration: 0.8s; }
.duration-slow { animation-duration: 1.2s; }

/* 缓动函数 */
.easing-ease { animation-timing-function: ease; }
.easing-ease-in { animation-timing-function: ease-in; }
.easing-ease-out { animation-timing-function: ease-out; }
.easing-ease-in-out { animation-timing-function: ease-in-out; }
.easing-bounce { animation-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1); }
.easing-smooth { animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
```

### 3.3 浮动效果参数

```css
/* 缓慢浮动动画 */
@keyframes float {
    0%, 100% {
        transform: translateY(0) rotate(var(--rotation));
    }
    50% {
        transform: translateY(-10px) rotate(var(--rotation));
    }
}

/* 摇晃动画 */
@keyframes wobble {
    0%, 100% {
        transform: translateY(0) rotate(var(--rotation));
    }
    25% {
        transform: translateY(-5px) rotate(calc(var(--rotation) - 2deg));
    }
    75% {
        transform: translateY(-5px) rotate(calc(var(--rotation) + 2deg));
    }
}

/* 呼吸效果 */
@keyframes breathe {
    0%, 100% {
        transform: scale(1) rotate(var(--rotation));
        opacity: 0.85;
    }
    50% {
        transform: scale(1.02) rotate(var(--rotation));
        opacity: 0.95;
    }
}

/* 应用浮动效果 */
.photo-float {
    animation: float 6s ease-in-out infinite;
}

.photo-wobble {
    animation: wobble 8s ease-in-out infinite;
}

.photo-breathe {
    animation: breathe 4s ease-in-out infinite;
}

/* 为不同照片添加延迟 */
.photo-delay-1 { animation-delay: 0s; }
.photo-delay-2 { animation-delay: 1s; }
.photo-delay-3 { animation-delay: 2s; }
.photo-delay-4 { animation-delay: 3s; }
.photo-delay-5 { animation-delay: 4s; }
.photo-delay-6 { animation-delay: 5s; }
```

### 3.4 轮播切换动画序列

```css
/* 照片进入动画序列 */
.photo-enter {
    opacity: 0;
    transform: scale(0.9) rotate(var(--rotation));
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.photo-enter.active {
    opacity: 1;
    transform: scale(1) rotate(var(--rotation));
}

/* 照片退出动画序列 */
.photo-exit {
    opacity: 1;
    transform: scale(1) rotate(var(--rotation));
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.photo-exit.active {
    opacity: 0;
    transform: scale(1.1) rotate(var(--rotation));
}

/* 交错动画 */
.stagger-1 { transition-delay: 0ms; }
.stagger-2 { transition-delay: 100ms; }
.stagger-3 { transition-delay: 200ms; }
.stagger-4 { transition-delay: 300ms; }
.stagger-5 { transition-delay: 400ms; }
.stagger-6 { transition-delay: 500ms; }
```

---

## 🎨 四、视觉层次说明

### 4.1 z-index层级设置

```css
/* 层级结构 */
.hero-background {
    z-index: 0;  /* 最底层 - 背景图片 */
}

.photo-wall-container {
    z-index: 1;  /* 中间层 - 照片墙 */
}

.photo-frame {
    z-index: 10;  /* 照片本身 */
}

.photo-frame:hover {
    z-index: 20;  /* 悬停时提升层级 */
}

.hero-overlay {
    z-index: 2;  /* 渐变遮罩层 */
}

.hero-content {
    z-index: 100;  /* 最顶层 - 文字内容 */
}
```

### 4.2 透明度和混合模式

```css
/* 照片透明度 */
.photo-frame {
    opacity: 0.85;  /* 基础透明度，不遮挡文字 */
}

.photo-frame:hover {
    opacity: 1;  /* 悬停时完全不透明 */
}

/* 混合模式 */
.photo-blend-normal {
    mix-blend-mode: normal;
}

.photo-blend-multiply {
    mix-blend-mode: multiply;
    opacity: 0.9;
}

.photo-blend-overlay {
    mix-blend-mode: overlay;
    opacity: 0.85;
}

/* 推荐使用 */
.photo-frame {
    opacity: 0.85;
    mix-blend-mode: normal;
}

/* 第一张照片（白色相框）可以完全不透明 */
.photo-frame-first {
    opacity: 0.95;
}
```

### 4.3 渐变遮罩参数

```css
/* Hero区域渐变遮罩 */
.hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
        180deg,
        rgba(74, 144, 226, 0.7) 0%,
        rgba(45, 91, 141, 0.5) 50%,
        rgba(45, 91, 141, 0.6) 100%
    );
    z-index: 2;
    pointer-events: none;
}

/* 照片区域额外遮罩（可选） */
.photo-region-mask {
    position: absolute;
    background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.1) 0%,
        transparent 50%
    );
    z-index: 1;
}

/* 文字区域保护遮罩 */
.hero-content-mask {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 300px;
    background: radial-gradient(
        ellipse at center,
        rgba(74, 144, 226, 0.3) 0%,
        transparent 70%
    );
    z-index: 3;
    pointer-events: none;
}
```

### 4.4 滤镜效果

```css
/* 照片滤镜 - 增强视觉效果 */
.photo-filter-bright {
    filter: brightness(1.1) saturate(1.1);
}

.photo-filter-soft {
    filter: brightness(1.05) saturate(1.05) contrast(1.05);
}

.photo-filter-vintage {
    filter: sepia(0.1) saturate(1.1) contrast(1.05);
}

/* 推荐使用柔和滤镜 */
.photo-frame img {
    filter: brightness(1.05) saturate(1.08) contrast(1.03);
}

/* 悬停效果 */
.photo-frame:hover img {
    filter: brightness(1.1) saturate(1.15) contrast(1.05);
}
```

---

## 📱 五、响应式设计

### 5.1 移动端适配方案（< 576px）

```css
@media (max-width: 576px) {
    /* 照片数量减少 */
    .photo-item:nth-child(4),
    .photo-item:nth-child(5),
    .photo-item:nth-child(6) {
        display: none;
    }
    
    /* 照片尺寸调整 */
    .photo-large,
    .photo-medium,
    .photo-small {
        width: 80px;
        height: 80px;
    }
    
    /* 照片位置调整 - 全部在底部 */
    .photo-1 {
        top: auto;
        bottom: 15%;
        left: 5%;
    }
    
    .photo-2 {
        top: auto;
        bottom: 15%;
        left: 50%;
        transform: translateX(-50%);
    }
    
    .photo-3 {
        top: auto;
        bottom: 15%;
        right: 5%;
    }
    
    /* 照片透明度降低 */
    .photo-frame {
        opacity: 0.75;
    }
    
    /* 倾斜角度减小 */
    .photo-item {
        transform: rotate(var(--rotation)) scale(0.8);
    }
    
    /* 动画速度加快 */
    .photo-float {
        animation-duration: 4s;
    }
    
    /* 禁用悬停效果 */
    .photo-frame:hover {
        transform: none;
        z-index: 10;
    }
}
```

### 5.2 平板端适配方案（576px - 991px）

```css
@media (min-width: 576px) and (max-width: 991px) {
    /* 照片数量 */
    .photo-item:nth-child(5),
    .photo-item:nth-child(6) {
        display: none;
    }
    
    /* 照片尺寸调整 */
    .photo-large {
        width: 160px;
        height: 213px;
    }
    
    .photo-medium {
        width: 140px;
        height: 186px;
    }
    
    .photo-small {
        width: 120px;
        height: 120px;
    }
    
    /* 照片位置调整 */
    .photo-1 {
        top: 12%;
        left: 3%;
    }
    
    .photo-2 {
        top: 10%;
        right: 5%;
    }
    
    .photo-3 {
        top: 50%;
        left: 5%;
    }
    
    .photo-4 {
        top: 45%;
        right: 8%;
    }
    
    /* 照片透明度 */
    .photo-frame {
        opacity: 0.8;
    }
}
```

### 5.3 桌面端适配方案（≥ 992px）

```css
@media (min-width: 992px) {
    /* 完整照片数量（6张） */
    .photo-item {
        display: block;
    }
    
    /* 原始尺寸 */
    .photo-large {
        width: 240px;
        height: 320px;
    }
    
    .photo-medium {
        width: 180px;
        height: 240px;
    }
    
    .photo-small {
        width: 140px;
        height: 140px;
    }
    
    /* 完整布局 */
    .photo-1 {
        top: 15%;
        left: 5%;
    }
    
    .photo-2 {
        top: 10%;
        right: 10%;
    }
    
    .photo-3 {
        top: 55%;
        left: 8%;
    }
    
    .photo-4 {
        top: 45%;
        right: 15%;
    }
    
    .photo-5 {
        bottom: 20%;
        left: 20%;
    }
    
    .photo-6 {
        bottom: 25%;
        right: 5%;
    }
    
    /* 照片透明度 */
    .photo-frame {
        opacity: 0.85;
    }
    
    /* 启用悬停效果 */
    .photo-frame:hover {
        transform: scale(1.05) rotate(var(--rotation)) !important;
        z-index: 20;
        box-shadow: 
            0 12px 24px rgba(0, 0, 0, 0.2),
            0 24px 48px rgba(0, 0, 0, 0.15);
    }
}
```

### 5.4 大屏幕适配方案（≥ 1440px）

```css
@media (min-width: 1440px) {
    /* 照片尺寸放大 */
    .photo-large {
        width: 300px;
        height: 400px;
    }
    
    .photo-medium {
        width: 240px;
        height: 320px;
    }
    
    .photo-small {
        width: 180px;
        height: 180px;
    }
    
    /* 照片间距增加 */
    .photo-wall-container {
        padding: 40px;
    }
    
    /* 可以增加照片数量到8张 */
    .photo-item:nth-child(7),
    .photo-item:nth-child(8) {
        display: block;
    }
    
    .photo-7 {
        top: 20%;
        left: 25%;
    }
    
    .photo-8 {
        bottom: 30%;
        right: 25%;
    }
}
```

---

## 💻 六、CSS代码示例

### 6.1 照片容器样式

```css
/* 照片墙容器 */
.photo-wall-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    pointer-events: none;
    overflow: hidden;
}

/* 照片包装器 */
.photo-wrapper {
    position: absolute;
    opacity: 0;
    transform: scale(0.9);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: auto;
    cursor: pointer;
}

.photo-wrapper.active {
    opacity: 1;
    transform: scale(1);
}

.photo-wrapper.exiting {
    opacity: 0;
    transform: scale(1.1);
}

/* 照片基础样式 */
.photo-item {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    overflow: hidden;
}

/* 照片尺寸类 */
.photo-size-large {
    width: 240px;
    height: 320px;
}

.photo-size-medium {
    width: 180px;
    height: 240px;
}

.photo-size-small {
    width: 140px;
    height: 140px;
}

.photo-size-square {
    width: 160px;
    height: 160px;
}
```

### 6.2 相框样式

```css
/* 白色相框 - 第一张照片 */
.photo-frame-white {
    background: #FFFFFF;
    padding: 12px;
    border-radius: 4px;
    box-shadow: 
        0 4px 8px rgba(0, 0, 0, 0.15),
        0 8px 16px rgba(0, 0, 0, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.6);
    position: relative;
}

.photo-frame-white::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 4px;
    background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.4) 0%,
        rgba(255, 255, 255, 0.1) 100%
    );
    pointer-events: none;
}

/* 极简相框 */
.photo-frame-minimal {
    border: 2px solid rgba(255, 255, 255, 0.9);
    border-radius: 8px;
    background: transparent;
    padding: 0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* 柔和边框 */
.photo-frame-soft {
    border: 8px solid rgba(255, 255, 255, 0.7);
    border-radius: 8px;
    backdrop-filter: blur(2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* 渐变边框 */
.photo-frame-gradient {
    padding: 8px;
    background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.95) 0%,
        rgba(255, 255, 255, 0.7) 100%
    );
    border-radius: 8px;
    box-shadow: 
        0 4px 12px rgba(0, 0, 0, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

/* 无边框 */
.photo-frame-none {
    border: none;
    padding: 0;
    border-radius: 8px;
    background: transparent;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* 图片样式 */
.photo-frame img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
    filter: brightness(1.05) saturate(1.08) contrast(1.03);
    transition: filter 0.3s ease;
}

.photo-frame:hover img {
    filter: brightness(1.1) saturate(1.15) contrast(1.05);
}
```

### 6.3 动画关键帧

```css
/* 淡入动画 */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px) scale(0.9);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

/* 淡出动画 */
@keyframes fadeOutDown {
    from {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
    to {
        opacity: 0;
        transform: translateY(-30px) scale(1.1);
    }
}

/* 缩放进入 */
@keyframes scaleIn {
    from {
        opacity: 0;
        transform: scale(0.6) rotate(var(--rotation));
    }
    to {
        opacity: 1;
        transform: scale(1) rotate(var(--rotation));
    }
}

/* 缩放退出 */
@keyframes scaleOut {
    from {
        opacity: 1;
        transform: scale(1) rotate(var(--rotation));
    }
    to {
        opacity: 0;
        transform: scale(1.2) rotate(var(--rotation));
    }
}

/* 浮动动画 */
@keyframes float {
    0%, 100% {
        transform: translateY(0) rotate(var(--rotation));
    }
    50% {
        transform: translateY(-12px) rotate(var(--rotation));
    }
}

/* 摇晃动画 */
@keyframes wobble {
    0%, 100% {
        transform: translateY(0) rotate(var(--rotation));
    }
    25% {
        transform: translateY(-6px) rotate(calc(var(--rotation) - 3deg));
    }
    75% {
        transform: translateY(-6px) rotate(calc(var(--rotation) + 3deg));
    }
}

/* 呼吸动画 */
@keyframes breathe {
    0%, 100% {
        transform: scale(1) rotate(var(--rotation));
        opacity: 0.85;
    }
    50% {
        transform: scale(1.03) rotate(var(--rotation));
        opacity: 0.95;
    }
}

/* 旋转进入 */
@keyframes rotateIn {
    from {
        opacity: 0;
        transform: rotate(-180deg) scale(0.5);
    }
    to {
        opacity: 1;
        transform: rotate(var(--rotation)) scale(1);
    }
}

/* 动画类 */
.animation-fade-in {
    animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.animation-fade-out {
    animation: fadeOutDown 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.animation-scale-in {
    animation: scaleIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.animation-scale-out {
    animation: scaleOut 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.animation-float {
    animation: float 6s ease-in-out infinite;
}

.animation-wobble {
    animation: wobble 8s ease-in-out infinite;
}

.animation-breathe {
    animation: breathe 4s ease-in-out infinite;
}

.animation-rotate-in {
    animation: rotateIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

/* 延迟类 */
.delay-0 { animation-delay: 0ms; }
.delay-100 { animation-delay: 100ms; }
.delay-200 { animation-delay: 200ms; }
.delay-300 { animation-delay: 300ms; }
.delay-400 { animation-delay: 400ms; }
.delay-500 { animation-delay: 500ms; }
.delay-600 { animation-delay: 600ms; }
```

### 6.4 完整照片组件

```css
/* 完整照片组件 */
.photo-component {
    position: absolute;
    --rotation: 0deg;
    --x: 0;
    --y: 0;
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform, opacity;
    cursor: pointer;
    pointer-events: auto;
}

.photo-component .photo-frame {
    opacity: 0.85;
    transition: opacity 0.3s ease, box-shadow 0.3s ease;
}

.photo-component:hover .photo-frame {
    opacity: 1;
    box-shadow: 
        0 12px 24px rgba(0, 0, 0, 0.2),
        0 24px 48px rgba(0, 0, 0, 0.15);
    z-index: 20;
}

.photo-component:hover {
    transform: translate(var(--x), var(--y)) scale(1.05) rotate(var(--rotation)) !important;
}

/* 照片进入状态 */
.photo-component.entering {
    opacity: 0;
    transform: translate(var(--x), var(--y)) scale(0.8) rotate(var(--rotation));
}

.photo-component.entered {
    opacity: 1;
    transform: translate(var(--x), var(--y)) scale(1) rotate(var(--rotation));
}

/* 照片退出状态 */
.photo-component.exiting {
    opacity: 0;
    transform: translate(var(--x), var(--y)) scale(1.15) rotate(var(--rotation));
}

/* 照片浮动效果 */
.photo-component.floating {
    animation: float 6s ease-in-out infinite;
}

/* 照片摇晃效果 */
.photo-component.wobbling {
    animation: wobble 8s ease-in-out infinite;
}

/* 照片呼吸效果 */
.photo-component.breathing {
    animation: breathe 4s ease-in-out infinite;
}
```

---

## 🎯 七、JavaScript实现建议

### 7.1 照片数据结构

```javascript
// 照片数据结构
const photoData = [
    {
        id: 1,
        url: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800',
        title: '北海老街',
        description: '百年骑楼建筑群',
        day: 1,
        frameType: 'white',  // white, minimal, soft, gradient, none
        size: 'large',       // large, medium, small, square
        category: 'attraction',
        priority: 1
    },
    {
        id: 2,
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
        title: '涠洲岛',
        description: '中国最年轻的火山岛',
        day: 2,
        frameType: 'minimal',
        size: 'large',
        category: 'attraction',
        priority: 2
    },
    {
        id: 3,
        url: 'https://images.unsplash.com/photo-1505881402582-c5bc11054f91?w=800',
        title: '五彩滩日出',
        description: '绝美日出美景',
        day: 3,
        frameType: 'soft',
        size: 'medium',
        category: 'attraction',
        priority: 3
    },
    {
        id: 4,
        url: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=800',
        title: '金滩',
        description: '金色滩涂风光',
        day: 4,
        frameType: 'gradient',
        size: 'medium',
        category: 'attraction',
        priority: 4
    },
    {
        id: 5,
        url: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800',
        title: '白浪滩',
        description: '白色沙滩和海浪',
        day: 5,
        frameType: 'minimal',
        size: 'small',
        category: 'attraction',
        priority: 5
    },
    {
        id: 6,
        url: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=400',
        title: '北海银滩',
        description: '天下第一滩',
        day: 3,
        frameType: 'none',
        size: 'small',
        category: 'attraction',
        priority: 6
    },
    {
        id: 7,
        url: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=400',
        title: '鳄鱼山',
        description: '火山地质公园',
        day: 2,
        frameType: 'soft',
        size: 'small',
        category: 'attraction',
        priority: 7
    },
    {
        id: 8,
        url: 'https://images.unsplash.com/photo-1505881402582-c5bc11054f91?w=400',
        title: '怪石滩',
        description: '海蚀奇石景观',
        day: 4,
        frameType: 'gradient',
        size: 'small',
        category: 'attraction',
        priority: 8
    }
];

// 照片位置配置（桌面端）
const photoPositions = [
    { top: '15%', left: '5%' },
    { top: '10%', right: '10%' },
    { top: '55%', left: '8%' },
    { top: '45%', right: '15%' },
    { bottom: '20%', left: '20%' },
    { bottom: '25%', right: '5%' }
];

// 动画类型配置
const animationTypes = ['fade', 'scale', 'slide-left', 'slide-right', 'slide-top', 'slide-bottom', 'rotate'];

// 浮动效果类型
const floatTypes = ['float', 'wobble', 'breathe'];
```

### 7.2 轮播逻辑

```javascript
class PhotoWall {
    constructor(container, photos) {
        this.container = container;
        this.photos = photos;
        this.currentIndex = 0;
        this.displayCount = this.getDisplayCount();
        this.activePhotos = [];
        this.interval = null;
        
        this.init();
    }
    
    // 根据屏幕尺寸获取显示照片数量
    getDisplayCount() {
        const width = window.innerWidth;
        if (width >= 1440) return 8;
        if (width >= 992) return 6;
        if (width >= 768) return 4;
        return 3;
    }
    
    // 初始化照片墙
    init() {
        this.createPhotos();
        this.startRotation();
        
        // 监听窗口大小变化
        window.addEventListener('resize', () => {
            const newCount = this.getDisplayCount();
            if (newCount !== this.displayCount) {
                this.displayCount = newCount;
                this.recreatePhotos();
            }
        });
    }
    
    // 创建照片
    createPhotos() {
        this.clearPhotos();
        
        const photosToShow = this.photos.slice(this.currentIndex, this.currentIndex + this.displayCount);
        
        photosToShow.forEach((photo, index) => {
            const photoElement = this.createPhotoElement(photo, index);
            this.container.appendChild(photoElement);
            this.activePhotos.push(photoElement);
            
            // 触发进入动画
            setTimeout(() => {
                photoElement.classList.add('entered');
            }, index * 100);
        });
    }
    
    // 创建单个照片元素
    createPhotoElement(photo, index) {
        const wrapper = document.createElement('div');
        wrapper.className = 'photo-component entering';
        wrapper.style.setProperty('--rotation', this.getRandomRotation());
        
        // 设置位置
        const position = photoPositions[index] || { top: '50%', left: '50%' };
        Object.assign(wrapper.style, position);
        wrapper.style.setProperty('--x', '0');
        wrapper.style.setProperty('--y', '0');
        
        // 添加浮动效果
        const floatType = floatTypes[index % floatTypes.length];
        wrapper.classList.add(floatType);
        wrapper.classList.add(`delay-${index * 100}`);
        
        // 创建相框
        const frame = document.createElement('div');
        frame.className = `photo-frame-${photo.frameType}`;
        
        // 创建图片
        const img = document.createElement('img');
        img.src = photo.url;
        img.alt = photo.title;
        img.loading = 'lazy';
        
        frame.appendChild(img);
        wrapper.appendChild(frame);
        
        // 添加点击事件
        wrapper.addEventListener('click', () => {
            this.openLightbox(photo);
        });
        
        return wrapper;
    }
    
    // 随机倾斜角度
    getRandomRotation() {
        const angle = (Math.random() * 30 - 15).toFixed(1); // -15° 到 +15°
        return `${angle}deg`;
    }
    
    // 清除照片
    clearPhotos() {
        this.activePhotos.forEach(photo => {
            photo.classList.remove('entered');
            photo.classList.add('exiting');
            
            setTimeout(() => {
                if (photo.parentNode) {
                    photo.parentNode.removeChild(photo);
                }
            }, 600);
        });
        this.activePhotos = [];
    }
    
    // 重新创建照片（响应式）
    recreatePhotos() {
        this.stopRotation();
        setTimeout(() => {
            this.createPhotos();
            this.startRotation();
        }, 600);
    }
    
    // 开始轮播
    startRotation() {
        if (this.interval) {
            clearInterval(this.interval);
        }
        
        this.interval = setInterval(() => {
            this.rotatePhotos();
        }, 5000); // 每5秒轮播一次
    }
    
    // 停止轮播
    stopRotation() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
    
    // 轮播照片
    rotatePhotos() {
        this.currentIndex = (this.currentIndex + 1) % (this.photos.length - this.displayCount + 1);
        this.createPhotos();
    }
    
    // 打开灯箱
    openLightbox(photo) {
        // 实现灯箱功能
        console.log('Open lightbox for:', photo);
    }
    
    // 销毁
    destroy() {
        this.stopRotation();
        this.clearPhotos();
        window.removeEventListener('resize', this.handleResize);
    }
}

// 使用示例
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('photo-wall-container');
    if (container) {
        new PhotoWall(container, photoData);
    }
});
```

### 7.3 随机倾斜算法

```javascript
// 倾斜角度生成器
class RotationGenerator {
    constructor() {
        this.usedRotations = new Set();
        this.range = { min: -15, max: 15 };
        this.precision = 1; // 小数点后1位
    }
    
    // 生成随机角度
    generate() {
        let rotation;
        let attempts = 0;
        const maxAttempts = 20;
        
        do {
            rotation = this.randomAngle();
            attempts++;
        } while (
            this.isTooClose(rotation) && 
            attempts < maxAttempts
        );
        
        this.usedRotations.add(rotation);
        
        // 限制已使用角度的数量
        if (this.usedRotations.size > 10) {
            this.usedRotations.delete(this.usedRotations.values().next().value);
        }
        
        return rotation;
    }
    
    // 随机角度
    randomAngle() {
        const { min, max } = this.range;
        const angle = Math.random() * (max - min) + min;
        return Math.round(angle * Math.pow(10, this.precision)) / Math.pow(10, this.precision);
    }
    
    // 检查角度是否太接近已使用的角度
    isTooClose(angle) {
        const threshold = 3; // 3度差异
        for (const usedAngle of this.usedRotations) {
            if (Math.abs(angle - usedAngle) < threshold) {
                return true;
            }
        }
        return false;
    }
    
    // 重置
    reset() {
        this.usedRotations.clear();
    }
}

// 使用示例
const rotationGenerator = new RotationGenerator();

const rotation1 = rotationGenerator.generate(); // 例如: 12.3
const rotation2 = rotationGenerator.generate(); // 例如: -8.7
const rotation3 = rotationGenerator.generate(); // 例如: 5.2

console.log(`${rotation1}deg`, `${rotation2}deg`, `${rotation3}deg`);
```

### 7.4 照片选择策略

```javascript
// 照片选择器
class PhotoSelector {
    constructor(photos) {
        this.photos = photos;
        this.usedPhotos = new Set();
        this.currentDay = null;
    }
    
    // 选择照片
    select(count, options = {}) {
        const { 
            preferCurrentDay = true, 
            mixDays = true,
            avoidRepeats = true 
        } = options;
        
        let selected = [];
        
        if (preferCurrentDay && this.currentDay !== null) {
            // 优先选择当前天的照片
            const dayPhotos = this.photos.filter(p => p.day === this.currentDay);
            const fromDay = this.pickRandom(dayPhotos, Math.min(count, dayPhotos.length), avoidRepeats);
            selected = selected.concat(fromDay);
        }
        
        // 如果需要更多照片，从其他天选择
        if (selected.length < count) {
            const remaining = count - selected.length;
            const otherPhotos = this.photos.filter(p => !selected.includes(p));
            
            if (mixDays) {
                // 混合不同天的照片
                const fromOthers = this.pickRandom(otherPhotos, remaining, avoidRepeats);
                selected = selected.concat(fromOthers);
            } else {
                // 按优先级选择
                const sorted = otherPhotos.sort((a, b) => a.priority - b.priority);
                const fromOthers = sorted.slice(0, remaining);
                selected = selected.concat(fromOthers);
            }
        }
        
        // 标记为已使用
        if (avoidRepeats) {
            selected.forEach(photo => this.usedPhotos.add(photo.id));
            
            // 限制已使用照片的数量
            if (this.usedPhotos.size > 15) {
                const ids = Array.from(this.usedPhotos);
                this.usedPhotos.delete(ids[0]);
            }
        }
        
        return this.shuffle(selected);
    }
    
    // 随机选择
    pickRandom(photos, count, avoidRepeats) {
        let available = avoidRepeats 
            ? photos.filter(p => !this.usedPhotos.has(p.id))
            : photos;
        
        if (available.length === 0) {
            available = photos;
            this.usedPhotos.clear();
        }
        
        const shuffled = this.shuffle([...available]);
        return shuffled.slice(0, count);
    }
    
    // 洗牌算法
    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    // 设置当前天
    setCurrentDay(day) {
        this.currentDay = day;
    }
    
    // 重置
    reset() {
        this.usedPhotos.clear();
        this.currentDay = null;
    }
}

// 使用示例
const selector = new PhotoSelector(photoData);

const selectedPhotos = selector.select(6, {
    preferCurrentDay: true,
    mixDays: true,
    avoidRepeats: true
});

console.log(selectedPhotos);
```

### 7.5 完整实现示例

```javascript
// 完整的照片墙实现
class CompletePhotoWall {
    constructor(options) {
        this.container = options.container;
        this.photos = options.photos;
        this.positions = options.positions || photoPositions;
        this.rotationGenerator = new RotationGenerator();
        this.photoSelector = new PhotoSelector(this.photos);
        
        this.currentIndex = 0;
        this.displayCount = this.getDisplayCount();
        this.interval = null;
        this.isPaused = false;
        
        this.init();
    }
    
    getDisplayCount() {
        const width = window.innerWidth;
        if (width >= 1440) return 8;
        if (width >= 992) return 6;
        if (width >= 768) return 4;
        return 3;
    }
    
    init() {
        this.render();
        this.startAutoRotation();
        this.bindEvents();
    }
    
    render() {
        this.container.innerHTML = '';
        
        const photos = this.photoSelector.select(this.displayCount);
        
        photos.forEach((photo, index) => {
            const element = this.createPhotoElement(photo, index);
            this.container.appendChild(element);
            
            setTimeout(() => {
                element.classList.add('entered');
            }, index * 100);
        });
    }
    
    createPhotoElement(photo, index) {
        const rotation = this.rotationGenerator.generate();
        const position = this.positions[index] || { top: '50%', left: '50%' };
        const floatType = floatTypes[index % floatTypes.length];
        
        const wrapper = document.createElement('div');
        wrapper.className = `photo-component entering ${floatType} delay-${index * 100}`;
        wrapper.style.setProperty('--rotation', `${rotation}deg`);
        wrapper.style.setProperty('--x', '0');
        wrapper.style.setProperty('--y', '0');
        
        Object.assign(wrapper.style, position);
        
        const frame = document.createElement('div');
        frame.className = `photo-frame-${photo.frameType}`;
        
        const img = document.createElement('img');
        img.src = photo.url;
        img.alt = photo.title;
        img.loading = 'lazy';
        
        frame.appendChild(img);
        wrapper.appendChild(frame);
        
        wrapper.addEventListener('mouseenter', () => this.pause());
        wrapper.addEventListener('mouseleave', () => this.resume());
        wrapper.addEventListener('click', () => this.onPhotoClick(photo));
        
        return wrapper;
    }
    
    startAutoRotation() {
        this.stopAutoRotation();
        this.interval = setInterval(() => {
            if (!this.isPaused) {
                this.rotate();
            }
        }, 5000);
    }
    
    stopAutoRotation() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
    
    rotate() {
        const elements = Array.from(this.container.children);
        
        elements.forEach(el => {
            el.classList.remove('entered');
            el.classList.add('exiting');
        });
        
        setTimeout(() => {
            this.render();
        }, 600);
    }
    
    pause() {
        this.isPaused = true;
    }
    
    resume() {
        this.isPaused = false;
    }
    
    onPhotoClick(photo) {
        // 打开灯箱或跳转到对应行程
        console.log('Photo clicked:', photo);
        // 可以触发滚动到对应Day
        const daySection = document.getElementById(`day${photo.day}`);
        if (daySection) {
            daySection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    bindEvents() {
        window.addEventListener('resize', () => {
            const newCount = this.getDisplayCount();
            if (newCount !== this.displayCount) {
                this.displayCount = newCount;
                this.render();
            }
        });
        
        // 页面可见性变化
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.stopAutoRotation();
            } else {
                this.startAutoRotation();
            }
        });
    }
    
    destroy() {
        this.stopAutoRotation();
        this.container.innerHTML = '';
        window.removeEventListener('resize', this.handleResize);
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('photo-wall-container');
    if (container) {
        new CompletePhotoWall({
            container: container,
            photos: photoData,
            positions: photoPositions
        });
    }
});
```

---

## 📊 八、性能优化建议

### 8.1 图片优化

```javascript
// 图片懒加载
class LazyImageLoader {
    constructor() {
        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            {
                rootMargin: '50px',
                threshold: 0.1
            }
        );
    }
    
    observe(img) {
        this.observer.observe(img);
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    this.observer.unobserve(img);
                }
            }
        });
    }
}

// 响应式图片
function getResponsiveImageUrl(url, width) {
    // 使用CDN的图片缩放功能
    return `${url}&w=${width}&q=80&f=webp`;
}

// 预加载关键图片
function preloadImages(urls) {
    urls.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = url;
        document.head.appendChild(link);
    });
}
```

### 8.2 动画优化

```css
/* GPU加速 */
.photo-component {
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    will-change: transform, opacity;
}

/* 减少重绘 */
.photo-frame {
    contain: layout style paint;
}

/* 优化过渡 */
.photo-component {
    transition: transform 0.3s ease-out;
}

/* 使用opacity和transform进行动画 */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translate3d(0, 30px, 0) scale(0.9);
    }
    to {
        opacity: 1;
        transform: translate3d(0, 0, 0) scale(1);
    }
}
```

### 8.3 内存优化

```javascript
// 限制DOM元素数量
const MAX_PHOTOS = 8;

// 清理未使用的照片
function cleanupOldPhotos() {
    const photos = document.querySelectorAll('.photo-component');
    if (photos.length > MAX_PHOTOS) {
        const toRemove = Array.from(photos).slice(0, photos.length - MAX_PHOTOS);
        toRemove.forEach(photo => {
            photo.remove();
        });
    }
}

// 使用对象池
class PhotoPool {
    constructor(size) {
        this.pool = [];
        this.size = size;
        this.init();
    }
    
    init() {
        for (let i = 0; i < this.size; i++) {
            const photo = document.createElement('div');
            photo.className = 'photo-component';
            photo.style.display = 'none';
            this.pool.push(photo);
        }
    }
    
    get() {
        return this.pool.find(p => p.style.display === 'none') || this.create();
    }
    
    release(photo) {
        photo.style.display = 'none';
        photo.innerHTML = '';
        photo.className = 'photo-component';
    }
    
    create() {
        const photo = document.createElement('div');
        photo.className = 'photo-component';
        return photo;
    }
}
```

---

## 🎯 九、设计总结

### 9.1 核心设计原则

1. **视觉层次清晰**：背景 → 照片墙 → 遮罩 → 文字
2. **不干扰内容**：照片半透明，不影响文字可读性
3. **动态生动**：浮动、摇晃、呼吸等动画效果
4. **响应式适配**：不同设备显示不同数量和大小的照片
5. **性能优先**：懒加载、GPU加速、内存优化

### 9.2 关键特性

- ✅ 6张照片同时展示（桌面端）
- ✅ 第一张照片白色相框
- ✅ 随机倾斜角度（-15°到+15°）
- ✅ 多种相框样式
- ✅ 浮动/摇晃/呼吸动画
- ✅ 每5秒自动轮播
- ✅ 悬停放大效果
- ✅ 点击跳转到对应行程
- ✅ 完整响应式支持

### 9.3 技术要点

- CSS绝对定位布局
- CSS变量管理倾斜角度
- CSS动画实现动态效果
- JavaScript控制轮播逻辑
- Intersection Observer懒加载
- GPU加速优化性能

---

## 📝 十、实施检查清单

### 阶段一：基础实现
- [ ] 创建照片墙容器HTML结构
- [ ] 实现照片数据结构
- [ ] 创建照片元素渲染函数
- [ ] 实现随机倾斜算法
- [ ] 添加基础CSS样式

### 阶段二：样式完善
- [ ] 实现白色相框样式
- [ ] 实现其他相框样式
- [ ] 添加阴影效果
- [ ] 设置透明度和混合模式
- [ ] 实现渐变遮罩

### 阶段三：动画效果
- [ ] 实现淡入淡出动画
- [ ] 实现缩放动画
- [ ] 实现浮动效果
- [ ] 实现摇晃效果
- [ ] 添加动画延迟

### 阶段四：轮播功能
- [ ] 实现照片选择逻辑
- [ ] 实现自动轮播
- [ ] 添加暂停/恢复功能
- [ ] 实现点击交互
- [ ] 添加过渡效果

### 阶段五：响应式适配
- [ ] 实现移动端布局
- [ ] 实现平板端布局
- [ ] 实现桌面端布局
- [ ] 实现大屏幕布局
- [ ] 添加断点监听

### 阶段六：性能优化
- [ ] 实现图片懒加载
- [ ] 添加GPU加速
- [ ] 优化动画性能
- [ ] 实现对象池
- [ ] 添加内存清理

### 阶段七：测试与调试
- [ ] 测试各浏览器兼容性
- [ ] 测试不同屏幕尺寸
- [ ] 测试动画流畅度
- [ ] 测试交互响应
- [ ] 性能测试

---

## 🚀 十一、后续优化方向

1. **智能照片推荐**：根据用户浏览历史推荐相关照片
2. **照片排序算法**：基于颜色、构图等视觉特征排序
3. **3D效果**：添加3D翻转、堆叠等高级效果
4. **用户自定义**：允许用户自定义照片墙样式
5. **社交分享**：点击照片可直接分享到社交媒体
6. **AR预览**：使用AR技术预览照片墙效果

---

**文档版本**：v1.0  
**创建日期**：2026年1月28日  
**设计师**：AI UI/UX Designer  
**适用项目**：2026年2月广西行 - 去广西晒晒太阳