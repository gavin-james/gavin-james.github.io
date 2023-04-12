export const siteData = JSON.parse("{\"base\":\"/\",\"lang\":\"en-US\",\"title\":\"Gavin blog\",\"description\":\"Gavin个人博客, VuePress搭建, 使用了 Vdoing 主题, 学习Java, Web, 框架, 微服务, 工具, 前端等相关知识, 记录生活和技术路程, 同时分享编程技巧。\",\"head\":[[\"meta\",{\"name\":\"baidu-site-verification\",\"content\":\"code-fLaULewlcT\"}],[\"meta\",{\"name\":\"keywords\",\"content\":\"Gavin个人博客, VuePress搭建, 学习Java、Web、框架、微服务、工具、前端等相关知识, 记录生活和技术路程。\"}]],\"locales\":{\"/\":{\"lang\":\"zh-CN\"},\"/en/\":{\"lang\":\"en-US\"}}}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSiteData) {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ siteData }) => {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  })
}
