import { defineClientConfig } from "@vuepress/client";
import VPCard from "/Users/mac/Documents/front/gavin-james.github.io/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.203_vuepress@2.0.0-beta.61/node_modules/vuepress-plugin-md-enhance/lib/client/components/VPCard.js";
import ChartJS from "/Users/mac/Documents/front/gavin-james.github.io/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.203_vuepress@2.0.0-beta.61/node_modules/vuepress-plugin-md-enhance/lib/client/components/ChartJS.js";
import CodeTabs from "/Users/mac/Documents/front/gavin-james.github.io/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.203_vuepress@2.0.0-beta.61/node_modules/vuepress-plugin-md-enhance/lib/client/components/CodeTabs.js";
import { hasGlobalComponent } from "/Users/mac/Documents/front/gavin-james.github.io/node_modules/.pnpm/vuepress-shared@2.0.0-beta.203_vuepress@2.0.0-beta.61/node_modules/vuepress-shared/lib/client/index.js";
import { CodeGroup, CodeGroupItem } from "/Users/mac/Documents/front/gavin-james.github.io/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.203_vuepress@2.0.0-beta.61/node_modules/vuepress-plugin-md-enhance/lib/client/compact/index.js";
import "/Users/mac/Documents/front/gavin-james.github.io/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.203_vuepress@2.0.0-beta.61/node_modules/vuepress-plugin-md-enhance/lib/client/styles/container/index.scss";
import CodeDemo from "/Users/mac/Documents/front/gavin-james.github.io/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.203_vuepress@2.0.0-beta.61/node_modules/vuepress-plugin-md-enhance/lib/client/components/CodeDemo.js";
import ECharts from "/Users/mac/Documents/front/gavin-james.github.io/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.203_vuepress@2.0.0-beta.61/node_modules/vuepress-plugin-md-enhance/lib/client/components/ECharts.js";
import "/Users/mac/Documents/front/gavin-james.github.io/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.203_vuepress@2.0.0-beta.61/node_modules/vuepress-plugin-md-enhance/lib/client/styles/figure.scss";
import FlowChart from "/Users/mac/Documents/front/gavin-james.github.io/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.203_vuepress@2.0.0-beta.61/node_modules/vuepress-plugin-md-enhance/lib/client/components/FlowChart.js";
import "/Users/mac/Documents/front/gavin-james.github.io/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.203_vuepress@2.0.0-beta.61/node_modules/vuepress-plugin-md-enhance/lib/client/styles/footnote.scss";
import "/Users/mac/Documents/front/gavin-james.github.io/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.203_vuepress@2.0.0-beta.61/node_modules/vuepress-plugin-md-enhance/lib/client/styles/image-mark.scss"
import Mermaid from "/Users/mac/Documents/front/gavin-james.github.io/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.203_vuepress@2.0.0-beta.61/node_modules/vuepress-plugin-md-enhance/lib/client/components/Mermaid.js";
import Presentation from "/Users/mac/Documents/front/gavin-james.github.io/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.203_vuepress@2.0.0-beta.61/node_modules/vuepress-plugin-md-enhance/lib/client/components/Presentation.js";
import Playground from "/Users/mac/Documents/front/gavin-james.github.io/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.203_vuepress@2.0.0-beta.61/node_modules/vuepress-plugin-md-enhance/lib/client/components/Playground.js";
import Tabs from "/Users/mac/Documents/front/gavin-james.github.io/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.203_vuepress@2.0.0-beta.61/node_modules/vuepress-plugin-md-enhance/lib/client/components/Tabs.js";
import "/Users/mac/Documents/front/gavin-james.github.io/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.203_vuepress@2.0.0-beta.61/node_modules/vuepress-plugin-md-enhance/lib/client/styles/tasklist.scss";
import { defineAsyncComponent } from "vue";
import "./mathjax.css";

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("VPCard", VPCard)
    app.component("ChartJS", ChartJS)
    app.component("CodeTabs", CodeTabs);
    if(!hasGlobalComponent("CodeGroup", app)) app.component("CodeGroup", CodeGroup);
    if(!hasGlobalComponent("CodeGroupItem", app)) app.component("CodeGroupItem", CodeGroupItem);
    app.component("CodeDemo", CodeDemo);
    app.component("ECharts", ECharts);
    app.component("FlowChart", FlowChart);
    app.component("Mermaid", Mermaid);
    app.component("Presentation", Presentation);
    app.component("Playground", Playground);
    app.component("Tabs", Tabs);
    app.component("VuePlayground", defineAsyncComponent(() => import("/Users/mac/Documents/front/gavin-james.github.io/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.203_vuepress@2.0.0-beta.61/node_modules/vuepress-plugin-md-enhance/lib/client/components/VuePlayground.js")));
    
  },
});
