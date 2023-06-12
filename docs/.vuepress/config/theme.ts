import { hopeTheme } from 'vuepress-theme-hope'
import { enNavbar, zhNavbar } from '../navbar'
import { enSidebar, zhSidebar } from '../sidebar'

export default hopeTheme({
  hostname: 'http://www.gavin-james.com',

  author: {
    name: 'gavin-james',
    url: 'http://www.gavin-james.xyz'
  },

  iconAssets: '//at.alicdn.com/t/c/font_3921653_dm12jkxmd1c.css',

  logo: '/logo.svg',

  repo: 'gavin-james/gavin-james.github.io',

  docsDir: 'docs',

  fullscreen: true,

  pageInfo: ['Author', 'Original', 'Date', 'Category', 'Tag', 'ReadingTime'],

  encrypt: {
    config: {
      '/guide/encrypt.html': ['1234']
    }
  },

  blog: {
    medias: {
      BiliBili: "https://space.bilibili.com/442466482",
      Gitee: "https://gitee.com/gavin-james",
      GitHub: "https://github.com/gavin-james",
      Gitlab: "https://gitlab.com/gavin-james",
      QQ: "http://wpa.qq.com/msgrd?v=3&uin=2495539878&site=qq&menu=yes",
    },
  },

  locales: {
    '/': {
      // navbar
      navbar: zhNavbar,

      // sidebar
      sidebar: zhSidebar,

      footer: '默认页脚',

      displayFooter: true,

      blog: {
        description:
          '编程之八字真言：1、专2、静3、谦4、筹5、悟6、慎7、透8、恒。',
        intro: '/intro.html',
      },

      metaLocales: {
        editLink: '在 GitHub 上编辑此页'
      }
    },

    /**
     * Chinese locale config
     */
    '/en/': {
      // navbar
      navbar: enNavbar,

      // sidebar
      sidebar: enSidebar,

      footer: 'Default footer',

      displayFooter: true,

      blog: {
        description:
          '编程之八字真言：1、专2、静3、谦4、筹5、悟6、慎7、透8、恒。',
        intro: '/intro.html',
      },

      // page meta
      metaLocales: {
        editLink: 'Edit this page on GitHub'
      }
    }
  },

  // 插件配置
  plugins: {
    blog: true,

    // 如果你不需要评论，可以直接删除 comment 配置，
    // 以下配置仅供体验，如果你需要评论，请自行配置并使用自己的环境，详见文档。
    // 为了避免打扰主题开发者以及消耗他的资源，请不要在你的正式环境中直接使用下列配置!!!!!
    comment: {
      /**
       * Using Giscus
       */
      // provider: "Giscus",
      // repo: "vuepress-theme-hope/giscus-discussions",
      // repoId: "R_kgDOG_Pt2A",
      // category: "Announcements",
      // categoryId: "DIC_kwDOG_Pt2M4COD69",

      /**
       * Using Twikoo 
       * 
       * 
       */
      provider: 'Twikoo',
      envId: 'https://gavin-james-blog-comments.vercel.app'

      /**
       * Using Waline
       */
      // provider: "Waline",
      // serverURL: "https://vuepress-theme-hope-comment.vercel.app",
    },
    //版权信息插件配置
    copyright: {
      author: 'gavin-james',
      triggerWords: 10,
      global: true,
      license: 'https://github.com/gavin-james/gavin-james.github.io/LICENSE'
    },
    mdEnhance: {
      align: true,
      attrs: true,
      card: true,
      chart: true,
      codetabs: true,
      demo: true,
      echarts: true,
      figure: true,
      flowchart: true,
      gfm: true,
      imgLazyload: true,
      imgMark: true,
      imgSize: true,
      include: true,
      mathjax: true,
      mark: true,
      mermaid: true,
      playground: {
        presets: ["ts", "vue"],
      },
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true,
    },
  }
})
