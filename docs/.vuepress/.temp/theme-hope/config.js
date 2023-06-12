import { defineClientConfig } from "@vuepress/client";

import { Layout, NotFound, useScrollPromise, injectDarkmode, setupDarkmode, setupSidebarItems } from "/Users/mac/Documents/front/gavin-james.github.io/node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.219_vuepress@2.0.0-beta.62/node_modules/vuepress-theme-hope/lib/bundle/export.js";

import { HopeIcon } from "/Users/mac/Documents/front/gavin-james.github.io/node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.219_vuepress@2.0.0-beta.62/node_modules/vuepress-theme-hope/lib/bundle/export.js";
import { defineAutoCatalogIconComponent } from "/Users/mac/Documents/front/gavin-james.github.io/node_modules/.pnpm/vuepress-plugin-auto-catalog@2.0.0-beta.219_vuepress@2.0.0-beta.62/node_modules/vuepress-plugin-auto-catalog/lib/client/index.js"
import { BlogCategory, BlogHome, BlogType, BloggerInfo, Timeline, setupBlog } from "/Users/mac/Documents/front/gavin-james.github.io/node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.219_vuepress@2.0.0-beta.62/node_modules/vuepress-theme-hope/lib/bundle/modules/blog/export.js";
import "/Users/mac/Documents/front/gavin-james.github.io/node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.219_vuepress@2.0.0-beta.62/node_modules/vuepress-theme-hope/lib/bundle/modules/blog/styles/all.scss";
import { GlobalEncrypt, LocalEncrypt } from "/Users/mac/Documents/front/gavin-james.github.io/node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.219_vuepress@2.0.0-beta.62/node_modules/vuepress-theme-hope/lib/bundle/modules/encrypt/export.js";
import "/Users/mac/Documents/front/gavin-james.github.io/node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.219_vuepress@2.0.0-beta.62/node_modules/vuepress-theme-hope/lib/bundle/modules/encrypt/styles/all.scss"
import Slide from "/Users/mac/Documents/front/gavin-james.github.io/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.219_vuepress@2.0.0-beta.62/node_modules/vuepress-plugin-md-enhance/lib/client/SlidePage.js";

import "/Users/mac/Documents/front/gavin-james.github.io/node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.219_vuepress@2.0.0-beta.62/node_modules/vuepress-theme-hope/lib/bundle/styles/all.scss";

defineAutoCatalogIconComponent(HopeIcon);

export default defineClientConfig({
  enhance: ({ app, router }) => {
    const { scrollBehavior } = router.options;

    router.options.scrollBehavior = async (...args) => {
      await useScrollPromise().wait();

      return scrollBehavior(...args);
    };

    // inject global properties
    injectDarkmode(app);

    app.component("BloggerInfo", BloggerInfo);
    app.component("GlobalEncrypt", GlobalEncrypt);
    app.component("LocalEncrypt", LocalEncrypt);
  },
  setup: () => {
    setupDarkmode();
    setupSidebarItems();
    setupBlog();
  },
  layouts: {
    Layout,
    NotFound,
    BlogCategory,
    BlogHome,
    BlogType,
    Timeline,
    Slide,
  }
});