/**
 * 2026年2月广西行 - 主要交互脚本
 * 小红书风格旅行计划页面
 */

// ==================== 等待DOM加载完成 ====================
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initNavigation();
    initAccordion();
    initBackToTop();
    initSmoothScroll();
    initScrollAnimations();
    initPhotoWall();
    initMap(); // 添加地图初始化
    initTimelineClick(); // 初始化时间线点击事件
});

// ==================== 导航栏功能 ====================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // 滚动时改变导航栏样式
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // 移动端菜单切换
    navToggle.addEventListener('click', function() {
        const isActive = navMenu.classList.toggle('active');
        const icon = navToggle.querySelector('i');

        // 更新 ARIA 属性
        navToggle.setAttribute('aria-expanded', isActive);
        navToggle.setAttribute('aria-label', isActive ? '关闭导航菜单' : '打开导航菜单');

        if (isActive) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // 点击导航链接关闭移动端菜单
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');

                // 更新 ARIA 属性
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.setAttribute('aria-label', '打开导航菜单');
            }
        });
    });
    
    // 滚动时高亮当前导航项
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// ==================== 手风琴功能 ====================
function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const isActive = this.classList.contains('active');
            
            // 关闭所有其他手风琴项
            accordionHeaders.forEach(otherHeader => {
                otherHeader.classList.remove('active');
                const content = otherHeader.nextElementSibling;
                content.classList.remove('active');
            });
            
            // 切换当前项
            if (!isActive) {
                this.classList.add('active');
                const content = this.nextElementSibling;
                content.classList.add('active');
            }
        });
    });
}

// ==================== 返回顶部功能 ====================
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    // 滚动时显示/隐藏按钮
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // 点击返回顶部
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        // 聚焦到页面顶部，支持键盘导航
        document.body.focus();
    });
}

// ==================== 平滑滚动 ====================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==================== 滚动动画 ====================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.day-section, .attractions-section, .food-section, .tips-section'
    );
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// ==================== 图片懒加载 ====================
// 注意：HTML中已经添加了loading="lazy"属性，这是浏览器原生支持的方式
// 如果需要更高级的懒加载，可以使用Intersection Observer API

function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // 图片已经由浏览器自动加载
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
}

// ==================== 横向滚动支持 ====================
function initHorizontalScroll() {
    const scrollContainers = document.querySelectorAll('.attractions-scroll');
    
    scrollContainers.forEach(container => {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        container.addEventListener('mousedown', function(e) {
            isDown = true;
            container.style.cursor = 'grabbing';
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });
        
        container.addEventListener('mouseleave', function() {
            isDown = false;
            container.style.cursor = 'grab';
        });
        
        container.addEventListener('mouseup', function() {
            isDown = false;
            container.style.cursor = 'grab';
        });
        
        container.addEventListener('mousemove', function(e) {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2;
            container.scrollLeft = scrollLeft - walk;
        });
    });
}

// ==================== 触摸滑动支持 ====================
function initTouchSwipe() {
    let touchStartX = 0;
    let touchEndX = 0;
    
    const touchContainer = document.querySelector('.attractions-scroll');
    
    if (touchContainer) {
        touchContainer.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        touchContainer.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            const container = document.querySelector('.attractions-scroll');
            if (container) {
                container.scrollBy({
                    left: diff > 0 ? 300 : -300,
                    behavior: 'smooth'
                });
            }
        }
    }
}

// ==================== 预加载关键图片 ====================
function preloadCriticalImages() {
    const criticalImages = [
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// ==================== 性能优化：节流函数 ====================
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==================== 性能优化：防抖函数 ====================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ==================== 页面可见性变化处理 ====================
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // 页面隐藏时暂停动画等
        document.body.classList.add('page-hidden');
    } else {
        // 页面可见时恢复
        document.body.classList.remove('page-hidden');
    }
});

// ==================== 错误处理 ====================
window.addEventListener('error', function(e) {
    console.error('页面错误:', e.message);
    // 可以在这里添加错误上报逻辑
});

// ==================== 工具函数 ====================

/**
 * 检查元素是否在视口中
 */
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * 格式化日期
 */
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('zh-CN', options);
}

/**
 * 复制文本到剪贴板
 */
function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
            .then(() => {
                console.log('复制成功');
            })
            .catch(err => {
                console.error('复制失败:', err);
            });
    } else {
        // 降级方案
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
}

// ==================== 初始化其他功能 ====================
document.addEventListener('DOMContentLoaded', function() {
    // 预加载关键图片
    preloadCriticalImages();
    
    // 初始化横向滚动
    initHorizontalScroll();
    
    // 初始化触摸滑动
    initTouchSwipe();
    
    // 添加键盘导航支持
    document.addEventListener('keydown', function(e) {
        // ESC键关闭手风琴和移动端菜单
        if (e.key === 'Escape') {
            // 关闭手风琴
            const activeHeaders = document.querySelectorAll('.accordion-header.active');
            activeHeaders.forEach(header => {
                header.classList.remove('active');
                header.nextElementSibling.classList.remove('active');
            });

            // 关闭移动端菜单
            const navMenu = document.getElementById('navMenu');
            const navToggle = document.getElementById('navToggle');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.setAttribute('aria-label', '打开导航菜单');
            }
        }
    });
});

// ==================== 页面加载完成后的处理 ====================
window.addEventListener('load', function() {
    // 移除加载动画（如果有）
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 300);
    }
    
    // 触发第一个手风琴项打开
    const firstAccordion = document.querySelector('.accordion-header');
    if (firstAccordion) {
        // 可选：默认打开第一个手风琴项
        // firstAccordion.click();
    }
    
    console.log('页面加载完成 - 2026年2月广西行旅行计划');
});

// ==================== 导出函数（用于调试） ====================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initNavigation,
        initAccordion,
        initBackToTop,
        initSmoothScroll,
        initScrollAnimations,
        initPhotoWall
    };
}

// ==================== 动态照片墙功能 ====================

/**
 * 照片数据
 */
const photos = [
    { url: 'images/beihai/beihai-old-street-01.jpg', title: '北海老街', day: 'day1' },
    { url: 'images/beihai/weizhou-island-01.jpg', title: '涠洲岛', day: 'day2' },
    { url: 'images/others/beach-sunrise.jpg', title: '涠洲岛日出', day: 'day3' },
    { url: 'images/fangchenggang/golden-beach-01.jpg', title: '金滩', day: 'day4' },
    { url: 'images/fangchenggang/white-wave-beach.jpg', title: '白浪滩', day: 'day5' },
    { url: 'images/beihai/beihai-silver-beach-tuchong-01.webp', title: '北海银滩', day: 'attractions' },
    { url: 'images/beihai/eyushan-tuchong-01.webp', title: '鳄鱼山', day: 'attractions' },
    { url: 'images/fangchenggang/strange-rock-beach.jpg', title: '怪石滩', day: 'attractions' },
    { url: 'images/beihai/beihai-old-street-02.jpg', title: '北海老街', day: 'day1' },
    { url: 'images/food/street-food.jpg', title: '侨港风情街', day: 'day1' },
    { url: 'images/beihai/rocky-coastline.jpg', title: '外沙岛', day: 'day1' },
    { url: 'images/beihai/volcanic-rock-02.jpg', title: '鳄鱼山', day: 'day2' },
    { url: 'images/others/coastal-sunrise.jpg', title: '沿海日出', day: 'day3' },
    { url: 'images/beihai/beihai-silver-beach-02.jpg', title: '北海银滩', day: 'day3' },
    { url: 'images/beihai/white-sand-beach.jpg', title: '白沙滩', day: 'day3' },
    { url: 'images/fangchenggang/golden-beach-02.jpg', title: '金滩', day: 'day4' },
    { url: 'images/fangchenggang/border-crossing.jpg', title: '东兴口岸', day: 'day5' },
    { url: 'images/others/beach-sunset-01.jpg', title: '海滩日落', day: 'others' },
    { url: 'images/others/snorkeling.jpg', title: '浮潜', day: 'others' }
];

/**
 * 照片位置配置（桌面端）
 */
const photoPositions = [
    { top: '15%', left: '5%' },
    { top: '10%', right: '10%' },
    { top: '55%', left: '8%' },
    { top: '45%', right: '15%' },
    { bottom: '20%', left: '20%' },
    { bottom: '25%', right: '5%' }
];

/**
 * 照片尺寸配置
 */
const photoSizes = [
    'photo-size-large',
    'photo-size-large',
    'photo-size-medium',
    'photo-size-medium',
    'photo-size-small',
    'photo-size-small'
];

/**
 * 相框类型配置
 */
const frameTypes = [
    'photo-frame-white',
    'photo-frame-minimal',
    'photo-frame-soft',
    'photo-frame-gradient',
    'photo-frame-none',
    'photo-frame-minimal'
];

/**
 * 浮动动画类型
 */
const floatTypes = ['animation-float', 'animation-wobble', 'animation-breathe'];

/**
 * 飞入方向数组
 */
const flyDirections = [
    'fromLeft', 'fromRight', 'fromTop', 'fromBottom'
];

/**
 * 照片墙管理类
 */
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

    /**
     * 根据屏幕尺寸获取显示照片数量
     */
    getDisplayCount() {
        const width = window.innerWidth;
        if (width >= 992) return 6;
        if (width >= 768) return 4;
        return 3;
    }

    /**
     * 初始化照片墙
     */
    init() {
        this.createPhotos();
        this.startRotation();

        // 监听窗口大小变化
        window.addEventListener('resize', debounce(() => {
            const newCount = this.getDisplayCount();
            if (newCount !== this.displayCount) {
                this.displayCount = newCount;
                this.recreatePhotos();
            }
        }, 300));
    }

    /**
     * 创建照片
     */
    createPhotos() {
        this.clearPhotos();

        // 获取当前批次照片，确保不重复
        const photosToShow = this.getUniquePhotos(this.currentIndex, this.displayCount);

        photosToShow.forEach((photo, index) => {
            const photoElement = this.createPhotoElement(photo, index);
            this.container.appendChild(photoElement);
            this.activePhotos.push(photoElement);

            // 触发进入动画
            setTimeout(() => {
                photoElement.classList.add('active');
            }, index * 100);
        });
    }

    /**
     * 获取不重复的照片列表
     */
    getUniquePhotos(startIndex, count) {
        const uniquePhotos = [];
        const usedIndices = new Set();
        
        // 尝试从startIndex开始获取
        let currentIndex = startIndex;
        
        while (uniquePhotos.length < count && uniquePhotos.length < this.photos.length) {
            // 防止无限循环
            if (usedIndices.size >= this.photos.length) break;
            
            const photo = this.photos[currentIndex % this.photos.length];
            
            // 检查是否已经在当前批次中
            if (!usedIndices.has(currentIndex % this.photos.length)) {
                uniquePhotos.push(photo);
                usedIndices.add(currentIndex % this.photos.length);
            }
            
            currentIndex++;
        }
        
        return uniquePhotos;
    }

    /**
     * 创建单个照片元素
     */
    createPhotoElement(photo, index) {
        const wrapper = document.createElement('div');
        wrapper.className = 'photo-wrapper';
        wrapper.style.setProperty('--rotation', this.getRandomRotation());

        // 生成随机位置
        const position = this.generateRandomPosition();
        Object.assign(wrapper.style, position);
        wrapper.style.setProperty('--x', '0');
        wrapper.style.setProperty('--y', '0');

        // 随机选择飞入方向
        const flyDirection = flyDirections[Math.floor(Math.random() * flyDirections.length)];
        wrapper.dataset.flyDirection = flyDirection;

        // 随机选择浮动效果
        const floatType = floatTypes[Math.floor(Math.random() * floatTypes.length)];
        wrapper.classList.add(floatType);
        wrapper.classList.add(`delay-${index * 100}`);

        // 随机选择相框类型
        const frameType = frameTypes[Math.floor(Math.random() * frameTypes.length)];
        
        // 随机选择照片尺寸
        const sizeType = photoSizes[Math.floor(Math.random() * photoSizes.length)];

        // 创建相框
        const frame = document.createElement('div');
        frame.className = `${frameType} photo-item ${sizeType}`;

        // 创建图片
        const img = document.createElement('img');
        img.src = photo.url;
        img.alt = photo.title;
        img.loading = 'lazy';

        frame.appendChild(img);
        wrapper.appendChild(frame);

        // 应用飞入动画
        const flyInAnimation = `flyIn${flyDirection.charAt(0).toUpperCase() + flyDirection.slice(1)} 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards, float 6s ease-in-out infinite 0.8s`;
        wrapper.style.animation = flyInAnimation;

        // 添加点击事件
        wrapper.addEventListener('click', () => {
            this.navigateToSection(photo.day);
        });

        return wrapper;
    }

    /**
     * 生成随机倾斜角度（-15° 到 +15°）
     */
    getRandomRotation() {
        const angle = (Math.random() * 30 - 15).toFixed(1);
        return `${angle}deg`;
    }

    /**
     * 生成随机位置
     */
    generateRandomPosition() {
        const maxAttempts = 5; // 最大尝试次数
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // 定义中心避让区域：中心100px × 100px
        const centerX = viewportWidth / 2;
        const centerY = viewportHeight / 2;
        const avoidHalfWidth = 50; // 100px宽度的一半
        const avoidHalfHeight = 50; // 100px高度的一半
        
        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            // 生成随机位置
            const top = Math.random() * 60 + 10; // 10% - 70%
            const left = Math.random() * 80 + 5; // 5% - 85%
            
            // 计算实际像素位置
            const actualTop = (top / 100) * viewportHeight;
            const actualLeft = (left / 100) * viewportWidth;
            
            // 检查是否在中心避让区域内
            const inCenterZone = (
                actualLeft >= centerX - avoidHalfWidth - 100 && 
                actualLeft <= centerX + avoidHalfWidth + 100 &&
                actualTop >= centerY - avoidHalfHeight - 100 &&
                actualTop <= centerY + avoidHalfHeight + 100
            );
            
            // 如果在中心区域，跳过这次尝试
            if (inCenterZone) {
                continue;
            }
            
            // 检查与其他照片的重叠
            const hasSevereOverlap = this.checkOverlap(actualTop, actualLeft);
            
            // 如果严重重叠，跳过这次尝试
            if (hasSevereOverlap) {
                continue;
            }
            
            // 找到合适的位置
            const useTop = Math.random() > 0.5;
            const useLeft = Math.random() > 0.5;
            
            const position = {};
            if (useTop) {
                position.top = `${top}%`;
            } else {
                position.bottom = `${100 - top}%`;
            }
            
            if (useLeft) {
                position.left = `${left}%`;
            } else {
                position.right = `${100 - left}%`;
            }
            
            return position;
        }
        
        // 如果尝试多次仍未找到合适位置，返回最后一个生成的位置
        const top = Math.random() * 60 + 10;
        const left = Math.random() * 80 + 5;
        
        const useTop = Math.random() > 0.5;
        const useLeft = Math.random() > 0.5;
        
        const position = {};
        if (useTop) {
            position.top = `${top}%`;
        } else {
            position.bottom = `${100 - top}%`;
        }
        
        if (useLeft) {
            position.left = `${left}%`;
        } else {
            position.right = `${100 - left}%`;
        }
        
        return position;
    }
    
    /**
     * 检查位置是否与其他照片严重重叠
     * 允许轻微重叠（10%以内），但不允许严重重叠
     */
    checkOverlap(top, left) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // 估算照片尺寸（基于photoSizes的平均值）
        const photoWidth = 200; // 像素
        const photoHeight = 160; // 像素
        
        for (const photoElement of this.activePhotos) {
            // 获取现有照片的位置
            const existingTop = parseFloat(photoElement.style.top) || parseFloat(photoElement.style.bottom ? (100 - parseFloat(photoElement.style.bottom)) * viewportHeight / 100 : 0);
            const existingLeft = parseFloat(photoElement.style.left) || parseFloat(photoElement.style.right ? (100 - parseFloat(photoElement.style.right)) * viewportWidth / 100 : 0);
            
            // 计算重叠区域
            const overlapWidth = Math.max(0, Math.min(left + photoWidth, existingLeft + photoWidth) - Math.max(left, existingLeft));
            const overlapHeight = Math.max(0, Math.min(top + photoHeight, existingTop + photoHeight) - Math.max(top, existingTop));
            
            if (overlapWidth > 0 && overlapHeight > 0) {
                // 计算重叠面积占比
                const overlapArea = overlapWidth * overlapHeight;
                const photoArea = photoWidth * photoHeight;
                const overlapRatio = overlapArea / photoArea;
                
                // 如果重叠超过10%，认为是严重重叠
                if (overlapRatio > 0.1) {
                    return true;
                }
            }
        }
        
        return false;
    }

    /**
     * 清除照片
     */
    clearPhotos() {
        this.activePhotos.forEach(photo => {
            photo.classList.remove('active');
            photo.classList.add('exiting');

            // 获取飞入方向，应用相反的飞出动画
            const flyInDirection = photo.dataset.flyDirection;
            const flyOutMap = {
                'fromLeft': 'toRight',
                'fromRight': 'toLeft',
                'fromTop': 'toBottom',
                'fromBottom': 'toTop'
            };
            const outDirection = flyOutMap[flyInDirection] || 'toRight';
            const flyOutAnimation = `flyOut${outDirection.charAt(0).toUpperCase() + outDirection.slice(1)} 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`;
            photo.style.animation = flyOutAnimation;

            setTimeout(() => {
                if (photo.parentNode) {
                    photo.parentNode.removeChild(photo);
                }
            }, 600);
        });
        this.activePhotos = [];
    }

    /**
     * 重新创建照片（响应式）
     */
    recreatePhotos() {
        this.stopRotation();
        setTimeout(() => {
            this.createPhotos();
            this.startRotation();
        }, 600);
    }

    /**
     * 开始轮播
     */
    startRotation() {
        if (this.interval) {
            clearInterval(this.interval);
        }

        this.interval = setInterval(() => {
            this.rotatePhotos();
        }, 5000);
    }

    /**
     * 停止轮播
     */
    stopRotation() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    /**
     * 轮播照片
     */
    rotatePhotos() {
        this.currentIndex = (this.currentIndex + 1) % (this.photos.length - this.displayCount + 1);
        this.createPhotos();
    }

    /**
     * 导航到对应行程
     */
    navigateToSection(day) {
        const section = document.getElementById(day);
        if (section) {
            const navHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = section.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    /**
     * 销毁
     */
    destroy() {
        this.stopRotation();
        this.clearPhotos();
    }
}

/**
 * 初始化照片墙
 */
function initPhotoWall() {
    const container = document.getElementById('photoWall');
    if (container) {
        new PhotoWall(container, photos);
    }
}

/**
 * 初始化地图
 */
function initMap() {
    const mapContainer = document.getElementById('mapContainer');
    if (!mapContainer) return;

    // 检查高德地图API是否加载
    if (typeof AMap === 'undefined') {
        console.error('高德地图API未加载');
        return;
    }

    // 创建地图实例，调整缩放级别以显示所有景点
    const map = new AMap.Map('mapContainer', {
        zoom: 8, // 降低缩放级别以显示更大范围
        center: [108.5, 21.3], // 调整中心点到北海和防城港之间
        viewMode: '2D',
        mapStyle: 'amap://styles/normal',
        resizeEnable: true
    });

    // 添加缩放工具
    map.addControl(new AMap.Scale());
    map.addControl(new AMap.ToolBar({
        position: {
            top: '110px',
            right: '40px'
        }
    }));

    // 添加移动端优化的控件样式
    if (window.innerWidth <= 768) {
        const mapControls = mapContainer.querySelectorAll('.amap-control, .amap-control-container');
        mapControls.forEach(control => {
            control.style.padding = '8px';
            control.style.gap = '8px';
        });
    }

    // 景点标记点数据
    const mapMarkers = [
        { name: '北海老街', lon: 109.13, lat: 21.48, address: '百年骑楼建筑群' },
        { name: '侨港风情街', lon: 109.10, lat: 21.47, address: '越南风情美食街' },
        { name: '外沙岛', lon: 109.12, lat: 21.49, address: '岛屿度假村' },
        { name: '涠洲岛', lon: 109.12, lat: 21.02, address: '中国最大最年轻的火山岛' },
        { name: '鳄鱼山', lon: 109.11, lat: 21.03, address: '火山地质公园' },
        { name: '北海银滩', lon: 109.12, lat: 21.48, address: '天下第一滩' },
        { name: '金滩', lon: 108.35, lat: 21.54, address: '防城港最大海滩' },
        { name: '怪石滩', lon: 108.38, lat: 21.56, address: '奇特的海蚀地貌' },
        { name: '白浪滩', lon: 108.40, lat: 21.58, address: '黑沙滩，冲浪胜地' },
        { name: '东兴口岸', lon: 107.33, lat: 21.55, address: '中越边境口岸' }
    ];

    // 为每个景点创建标记点
    mapMarkers.forEach((marker, index) => {
        const markerInstance = new AMap.Marker({
            position: [marker.lon, marker.lat],
            title: marker.name,
            content: `<div style="
                background-color: #E53E3E;
                color: white;
                padding: 8px 16px;
                border-radius: 4px;
                font-size: 14px;
                font-weight: bold;
                white-space: nowrap;
                box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            ">${index + 1}. ${marker.name}</div>`,
            offset: new AMap.Pixel(-16, -40),
            zIndex: 100
        });

        // 添加信息窗体
        const infoWindow = new AMap.InfoWindow({
            content: `
                <div style="padding: 12px; min-width: 200px;">
                    <h3 style="margin: 0 0 8px 0; color: #E53E3E; font-size: 16px;">${marker.name}</h3>
                    <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">${marker.address}</p>
                    <p style="margin: 0; color: #999; font-size: 12px;">坐标: ${marker.lon}, ${marker.lat}</p>
                </div>
            `,
            offset: new AMap.Pixel(0, -40)
        });

        // 点击标记点显示信息窗体
        markerInstance.on('click', () => {
            infoWindow.open(map, markerInstance.getPosition());
        });

        // 添加标记点到地图
        map.add(markerInstance);
    });

    // 添加地图类型切换控件
    map.addControl(new AMap.MapType({
        position: {
            top: '10px',
            right: '10px'
        }
    }));

    console.log('地图初始化完成 - 2026年2月广西行，共标记', mapMarkers.length, '个景点');
}

// ==================== 时间线点击事件 ====================
function initTimelineClick() {
    const timelineItems = document.querySelectorAll('.timeline-day-item');

    timelineItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;

                // 平滑滚动到目标位置
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // 添加高亮效果
                targetSection.style.transition = 'background-color 0.3s ease';
                targetSection.style.backgroundColor = '#FFF0F3';
                setTimeout(() => {
                    targetSection.style.backgroundColor = '';
                }, 1000);
            }
        });
    });
}