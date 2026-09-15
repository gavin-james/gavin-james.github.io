import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import theme from './theme'

export default defineUserConfig({
	base: '/',
	bundler: viteBundler(),
	// 多语言配置
	locales: {
		'/': {
			// 设置正在使用的语言
			lang: 'zh-CN',
			title: 'Gavin James',
			description:
				'Gavin James个人博客, VuePress搭建, 使用了 Vdoing 主题, 学习Java, Web, 框架, 微服务, 工具, 前端等相关知识, 记录生活和技术路程, 同时分享编程技巧。',
		},
		'/en/': {
			// 设置正在使用的语言
			lang: 'en-US',
			title: 'Gavin James',
			description:
				"Gavin James' personal blog, built by VuePress, uses the Vdoing theme to learn Java, Web, frameworks, microservices, tools, front-end and other related knowledge, record life and technology journey, while sharing programming skills.",
		},
	},
	head: [
		['meta', { name: 'baidu-site-verification', content: 'code-fLaULewlcT' }], // 百度统计的code
		[
			'meta',
			{
				name: 'keywords',
				content:
					'Gavin个人博客, VuePress搭建, 学习Java、Web、框架、微服务、工具、前端等相关知识, 记录生活和技术路程。',
			},
		],
	],
	theme,
})
