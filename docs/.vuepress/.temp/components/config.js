import { defineClientConfig } from "@vuepress/client";
import { hasGlobalComponent } from "/Users/mac/Documents/front/gavin-james.github.io/node_modules/.pnpm/vuepress-plugin-components@2.0.0-beta.203_vuepress@2.0.0-beta.61/node_modules/vuepress-plugin-components/lib/client/shared.js";
import { h } from "vue";

import { useStyleTag } from "/Users/mac/Documents/front/gavin-james.github.io/node_modules/.pnpm/vuepress-plugin-components@2.0.0-beta.203_vuepress@2.0.0-beta.61/node_modules/vuepress-plugin-components/lib/client/vueuse.js";
import Badge from "/Users/mac/Documents/front/gavin-james.github.io/node_modules/.pnpm/vuepress-plugin-components@2.0.0-beta.203_vuepress@2.0.0-beta.61/node_modules/vuepress-plugin-components/lib/client/components/Badge.js";
import FontIcon from "/Users/mac/Documents/front/gavin-james.github.io/node_modules/.pnpm/vuepress-plugin-components@2.0.0-beta.203_vuepress@2.0.0-beta.61/node_modules/vuepress-plugin-components/lib/client/components/FontIcon.js";
import BackToTop from "/Users/mac/Documents/front/gavin-james.github.io/node_modules/.pnpm/vuepress-plugin-components@2.0.0-beta.203_vuepress@2.0.0-beta.61/node_modules/vuepress-plugin-components/lib/client/components/BackToTop.js";

import "/Users/mac/Documents/front/gavin-james.github.io/node_modules/.pnpm/vuepress-plugin-components@2.0.0-beta.203_vuepress@2.0.0-beta.61/node_modules/vuepress-plugin-components/lib/client/styles/sr-only.scss";

export default defineClientConfig({
  enhance: ({ app }) => {
    if(!hasGlobalComponent("Badge")) app.component("Badge", Badge);
    if(!hasGlobalComponent("FontIcon")) app.component("FontIcon", FontIcon);
    
  },
  setup: () => {
    useStyleTag(`\
@import url("//at.alicdn.com/t/c/font_3921653_dm12jkxmd1c.css");
`);
  },
  rootComponents: [
    () => h(BackToTop, { threshold: 300 }),
  ],
});
