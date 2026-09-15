import { hopeTheme } from 'vuepress-theme-hope'
import { enNavbar, zhNavbar } from './navbar'
import { enSidebar, zhSidebar } from './sidebar'

export default hopeTheme({
	hostname: 'http://www.gavin-james.com',

	author: {
		name: 'gavin-james',
		url: 'http://www.gavin-james.xyz',
	},

	logo: '/logo.svg',

	repo: 'gavin-james/gavin-james.github.io',

	docsDir: 'src',

	fullscreen: true,

	pageInfo: ['Author', 'Original', 'Date', 'Category', 'Tag', 'ReadingTime'],

	encrypt: {
		config: {
			'/guide/encrypt.html': ['1234'],
		},
	},

	blog: {
		medias: {
			BiliBili: 'https://space.bilibili.com/442466482',
			Gitee: 'https://gitee.com/gavin-james',
			GitHub: 'https://github.com/gavin-james',
			Gitlab: 'https://gitlab.com/gavin-james',
			QQ: 'http://wpa.qq.com/msgrd?v=3&uin=2495539878&site=qq&menu=yes',
		},
	},

	locales: {
		'/': {
			// navbar
			navbar: zhNavbar,

			// sidebar
			sidebar: zhSidebar,

			footer: '本文章大部分来自pdai:地址https://www.pdai.tech',

			displayFooter: true,

			blog: {
				description: '编程之八字真言：1、专2、静3、谦4、筹5、悟6、慎7、透8、恒。',
				intro: '/intro.html',
			},

			metaLocales: {
				editLink: '在 GitHub 上编辑此页',
			},
		},

		/**
		 * Chinese locale config
		 */
		'/en/': {
			// navbar
			navbar: enNavbar,

			// sidebar
			sidebar: enSidebar,

			footer: '本文章大部分来自pdai:地址https://www.pdai.tech',

			displayFooter: true,

			blog: {
				description: '编程之八字真言：1、专2、静3、谦4、筹5、悟6、慎7、透8、恒。',
				intro: '/intro.html',
			},

			// page meta
			metaLocales: {
				editLink: 'Edit this page on GitHub',
			},
		},
	},

	// Markdown 配置已从 plugins.mdEnhance 等插件项迁移到 markdown
	markdown: {
		tasklist: true,
		footnote: true,
		spoiler: true,
		plantuml: true,
		markmap: true,
		align: true,
		attrs: true,
		chartjs: true,
		demo: true,
		echarts: true,
		flowchart: true,
		gfm: true,
		include: true,
		mark: true,
		mermaid: true,
		playground: {
			presets: ['ts', 'vue'],
		},
		stylize: [
			{
				matcher: 'Recommended',
				replacer: ({ tag }) => {
					if (tag === 'em')
						return {
							tag: 'Badge',
							attrs: { type: 'tip' },
							content: 'Recommended',
						}
				},
			},
		],
		sub: true,
		sup: true,
		vPre: true,
		vuePlayground: true,
		component: true,
		codeTabs: true,
		tabs: true,
		figure: true,
		imgLazyload: true,
		imgMark: true,
		imgSize: true,
		math: {
			type: 'katex',
		},
		alert: true,
		hint: true,
		revealjs: {
			plugins: ['highlight', 'math', 'search', 'notes', 'zoom'],
		},
	},

	// 插件配置
	plugins: {
		blog: true,
		icon: {
			// 继续使用项目自定义 iconfont 资源
			assets: '//at.alicdn.com/t/c/font_3921653_dm12jkxmd1c.css',
			prefix: 'iconfont icon-',
		},
		components: {
			components: ['Badge', 'VPCard'],
		},
		// 如果你不需要评论，可以直接删除 comment 配置，
		// 以下配置仅供体验，如果你需要评论，请自行配置并使用自己的环境，详见文档。
		// 为了避免打扰主题开发者以及消耗他的资源，请不要在你的正式环境中直接使用下列配置!!!!!
		comment: {
			provider: 'Twikoo',
			envId: 'https://gavin-james-blog-comments.vercel.app',
		},
		//版权信息插件配置
		copyright: {
			author: 'gavin-james',
			triggerLength: 10,
			global: true,
			license: 'https://github.com/gavin-james/gavin-james.github.io/LICENSE',
		},
		// search-pro 已停止维护，改用官方 slimsearch
		slimsearch: true,
	},
})
