/**
 * 景点图片映射配置
 * 用于行程轮播图和首页照片墙
 */

// 景点图片映射
const attractionImages = {
    // 第1天景点
    'day1': {
        '北海老街': [
            'images/beihai/beihai-old-street-01.jpg',
            'images/beihai/beihai-old-street-02.jpg'
        ],
        '侨港风情街': [
            'images/food/street-food.jpg'
        ],
        '外沙岛': [
            'images/beihai/rocky-coastline.jpg'
        ]
    },

    // 第2天景点
    'day2': {
        '涠洲岛': [
            'images/beihai/weizhou-island-01.jpg'
        ],
        '鳄鱼山火山公园': [
            'images/beihai/eyushan-tuchong-01.webp',
            'images/beihai/volcanic-rock-02.jpg'
        ]
    },

    // 第3天景点
    'day3': {
        '涠洲岛日出': [
            'images/others/beach-sunrise.jpg',
            'images/others/coastal-sunrise.jpg'
        ],
        '北海银滩': [
            'images/beihai/beihai-silver-beach-tuchong-01.webp',
            'images/beihai/beihai-silver-beach-02.jpg',
            'images/beihai/beihai-silver-beach-03.jpg',
            'images/beihai/white-sand-beach.jpg'
        ]
    },

    // 第4天景点
    'day4': {
        '金滩': [
            'images/fangchenggang/golden-beach-01.jpg',
            'images/fangchenggang/golden-beach-02.jpg'
        ],
        '怪石滩': [
            'images/fangchenggang/strange-rock-beach.jpg'
        ]
    },

    // 第5天景点
    'day5': {
        '白浪滩': [
            'images/fangchenggang/white-wave-beach.jpg'
        ],
        '东兴口岸': [
            'images/fangchenggang/border-crossing.jpg'
        ]
    }
};

// 首页照片墙候选图片（所有景点图片汇总）
const heroPhotoWallImages = [
    // 北海景点
    'images/beihai/beihai-old-street-01.jpg',
    'images/beihai/beihai-old-street-02.jpg',
    'images/beihai/rocky-coastline.jpg',
    'images/beihai/weizhou-island-01.jpg',
    'images/beihai/eyushan-tuchong-01.webp',
    'images/beihai/volcanic-rock-02.jpg',
    'images/beihai/beihai-silver-beach-tuchong-01.webp',
    'images/beihai/beihai-silver-beach-02.jpg',
    'images/beihai/beihai-silver-beach-03.jpg',
    'images/beihai/white-sand-beach.jpg',
    'images/beihai/beach-cliff.jpg',

    // 防城港景点
    'images/fangchenggang/golden-beach-01.jpg',
    'images/fangchenggang/golden-beach-02.jpg',
    'images/fangchenggang/strange-rock-beach.jpg',
    'images/fangchenggang/white-wave-beach.jpg',
    'images/fangchenggang/border-crossing.jpg',
    'images/fangchenggang/viewpoint.jpg',

    // 其他景点
    'images/others/beach-sunrise.jpg',
    'images/others/coastal-sunrise.jpg',
    'images/others/beach-sunset-01.jpg',
    'images/others/beach-sunset-02.jpg',
    'images/others/snorkeling.jpg',
    'images/others/swimming-beach.jpg',
    'images/others/tide-pooling.jpg',
    'images/others/beach-activity.jpg'
];

// 获取指定天数的所有图片
function getDayImages(dayKey) {
    const dayData = attractionImages[dayKey];
    if (!dayData) return [];

    let allImages = [];
    Object.values(dayData).forEach(images => {
        allImages = allImages.concat(images);
    });
    return allImages;
}

// 获取指定天数的指定景点图片
function getAttractionImages(dayKey, attractionName) {
    const dayData = attractionImages[dayKey];
    if (!dayData || !dayData[attractionName]) return [];
    return dayData[attractionName];
}

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        attractionImages,
        heroPhotoWallImages,
        getDayImages,
        getAttractionImages
    };
}