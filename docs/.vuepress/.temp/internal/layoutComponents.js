import { defineAsyncComponent } from 'vue'

export const layoutComponents = {
  "404": defineAsyncComponent(() => import("D:/Users/Gavin/Documents/javacode/gavin/Small-market.github.io/node_modules/vuepress-theme-hope/lib/client/layouts/404.js")),
  "Layout": defineAsyncComponent(() => import("D:/Users/Gavin/Documents/javacode/gavin/Small-market.github.io/node_modules/vuepress-theme-hope/lib/client/layouts/Layout.js")),
  "Slide": defineAsyncComponent(() => import("D:/Users/Gavin/Documents/javacode/gavin/Small-market.github.io/node_modules/vuepress-theme-hope/lib/client/layouts/Slide.js")),
  "Blog": defineAsyncComponent(() => import("D:/Users/Gavin/Documents/javacode/gavin/Small-market.github.io/node_modules/vuepress-theme-hope/lib/client/module/blog/layouts/Blog.js")),
}
