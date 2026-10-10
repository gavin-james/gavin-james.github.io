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
				'Gavin James 的个人技术知识库：以 Java 后端为主线，系统整理数据库、框架、架构、前端与研发工具的知识与实践笔记。',
		},
	},
	head: [
		['meta', { name: 'baidu-site-verification', content: 'code-fLaULewlcT' }], // 百度统计的code
		[
			'meta',
			{
				name: 'keywords',
				content:
					'Gavin James,Java,Spring Boot,数据库,MySQL,Redis,微服务,分布式,设计模式,算法,前端,研发工具,技术知识库',
			},
		],
	],
	theme,
})
