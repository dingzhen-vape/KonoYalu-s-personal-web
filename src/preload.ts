// ============================================================
// preload.ts — 图片预加载
// 功能：用隐藏 Image 对象提前下载图片，浏览器缓存后
//       页面显示时无需等待下载/解码，滚动动画更流畅
// ============================================================

/**
 * 预加载一组图片 URL
 * @param urls 图片地址列表（Vite import 的资源直接传 URL）
 */
export function preloadImages(urls: string[]) {
  urls.forEach((url) => {
    const img = new Image()
    img.src = url
  })
}
