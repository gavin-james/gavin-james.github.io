import { defineClientConfig } from "@vuepress/client";

import { HopeIcon, Layout, NotFound, useScrollPromise, injectDarkmode, setupDarkmode, setupSidebarItems } from "/Users/mac/Documents/front/gavin-james.github.io/node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.203_vuepress@2.0.0-beta.61/node_modules/vuepress-theme-hope/lib/bundle/export.js";

import { BlogCategory, BlogHome, BlogType, BloggerInfo, Timeline, setupBlog } from "/Users/mac/Documents/front/gavin-james.github.io/node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.203_vuepress@2.0.0-beta.61/node_modules/vuepress-theme-hope/lib/bundle/modules/blog/export.js";
import "/Users/mac/Documents/front/gavin-james.github.io/node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.203_vuepress@2.0.0-beta.61/node_modules/vuepress-theme-hope/lib/bundle/modules/blog/styles/all.scss";
import { GlobalEncrypt, LocalEncrypt } from "/Users/mac/Documents/front/gavin-james.github.io/node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.203_vuepress@2.0.0-beta.61/node_modules/vuepress-theme-hope/lib/bundle/modules/encrypt/export.js";
import "/Users/mac/Documents/front/gavin-james.github.io/node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.203_vuepress@2.0.0-beta.61/node_modules/vuepress-theme-hope/lib/bundle/modules/encrypt/styles/all.scss"
import Slide from "/Users/mac/Documents/front/gavin-james.github.io/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.203_vuepress@2.0.0-beta.61/node_modules/vuepress-plugin-md-enhance/lib/client/SlidePage.js";

import "/Users/mac/Documents/front/gavin-james.github.io/node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.203_vuepress@2.0.0-beta.61/node_modules/vuepress-theme-hope/lib/bundle/styles/all.scss";

export default defineClientConfig({
  enhance: ({ app, router }) => {
    const { scrollBehavior } = router.options;

    router.options.scrollBehavior = async (...args) => {
      await useScrollPromise().wait();

      return scrollBehavior(...args);
    };

    // inject global properties
    injectDarkmode(app);

    // render icon for auto-catalog
    app.component("HopeIcon", HopeIcon);

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