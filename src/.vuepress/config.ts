// import path from 'path'
import { searchProPlugin } from 'vuepress-plugin-search-pro'
import { defineUserConfig } from 'vuepress'
import head from './config/head'
import theme from './config/theme'

export default defineUserConfig({
	// 多语言配置
	locales: {
		'/': {
			// 设置正在使用的语言
			lang: 'zh-CN'
		},
		'/en/': {
			// 设置正在使用的语言
			lang: 'en-US'
		}
	},
	// 插件
	plugins: [
		// 搜索插件
		searchProPlugin({
			// 索引全部内容
			indexContent: true,
			hotReload: true,
			// 你的选项
			locales: {
				'/': {
					placeholder: '搜索'
				},
				'/en/': {
					placeholder: 'Search'
				}
			}
		})
	],
	title: 'Gavin James',
	description:
		'Gavin James个人博客, VuePress搭建, 使用了 Vdoing 主题, 学习Java, Web, 框架, 微服务, 工具, 前端等相关知识, 记录生活和技术路程, 同时分享编程技巧。',
	base: '/',
	head,
	theme
})
