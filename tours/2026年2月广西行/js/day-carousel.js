/**
 * 行程轮播图类
 * 管理每一天行程的图片轮播功能
 */
class DayCarousel {
    constructor(container) {
        this.container = container;
        this.slides = container.querySelectorAll('.carousel-slide');
        this.prevBtn = container.querySelector('.carousel-prev');
        this.nextBtn = container.querySelector('.carousel-next');
        this.indicators = container.querySelectorAll('.indicator');
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000; // 5秒自动切换

        this.init();
    }

    init() {
        // 初始化显示第一张
        this.showSlide(0);

        // 绑定事件
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());

        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goTo(index));
        });

        // 鼠标悬停暂停自动播放
        this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.container.addEventListener('mouseleave', () => this.startAutoPlay());

        // 启动自动播放
        this.startAutoPlay();
    }

    showSlide(index) {
        // 隐藏所有slide
        this.slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.opacity = '0';
            slide.style.transform = 'translateX(100%)';
        });

        // 移除所有指示器的active状态
        this.indicators.forEach(indicator => {
            indicator.classList.remove('active');
            indicator.setAttribute('aria-selected', 'false');
        });

        // 显示当前slide
        const currentSlide = this.slides[index];
        currentSlide.classList.add('active');
        currentSlide.style.opacity = '1';
        currentSlide.style.transform = 'translateX(0)';

        // 激活当前指示器
        this.indicators[index].classList.add('active');
        this.indicators[index].setAttribute('aria-selected', 'true');

        // 更新索引
        this.currentIndex = index;
    }

    next() {
        const nextIndex = (this.currentIndex + 1) % this.slides.length;
        this.showSlide(nextIndex);
    }

    prev() {
        const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.showSlide(prevIndex);
    }

    goTo(index) {
        this.showSlide(index);
    }

    startAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
        this.autoPlayInterval = setInterval(() => {
            this.next();
        }, this.autoPlayDelay);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    destroy() {
        this.stopAutoPlay();
        this.prevBtn.removeEventListener('click', () => this.prev());
        this.nextBtn.removeEventListener('click', () => this.next());
        this.indicators.forEach((indicator, index) => {
            indicator.removeEventListener('click', () => this.goTo(index));
        });
    }
}

// 初始化所有行程轮播图
function initDayCarousels() {
    const carousels = document.querySelectorAll('.day-image-carousel');
    const carouselInstances = [];

    carousels.forEach(carousel => {
        const carouselContainer = carousel.querySelector('.carousel-container');
        if (carouselContainer) {
            const instance = new DayCarousel(carouselContainer);
            carouselInstances.push(instance);
        }
    });

    return carouselInstances;
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initDayCarousels();
    initTouchSwipe();
});

// 为每个轮播图添加触摸滑动支持
function initTouchSwipe() {
    document.querySelectorAll('.day-image-carousel').forEach(carousel => {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        }, { passive: true });

        carousel.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        }, { passive: true });

        carousel.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;

            const diff = currentX - startX;
            if (Math.abs(diff) > 50) { // 滑动超过50px才触发
                if (diff > 0) {
                    // 向右滑动，显示上一张
                    carousel.querySelector('.carousel-prev').click();
                } else {
                    // 向左滑动，显示下一张
                    carousel.querySelector('.carousel-next').click();
                }
            }
        });
    });
}

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DayCarousel, initDayCarousels };
}