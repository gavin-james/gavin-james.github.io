import { navbar } from 'vuepress-theme-hope'

export const zhNavbar = navbar([
	{
		text: '首页',
		icon: 'homepage',
		link: '/'
	},
	{
		text: '导航',
		icon: 'manage_fill',
		link: '/resource/'
	},
	{
		text: 'Java',
		icon: 'java',
		prefix: '/java/',
		children: [
			{
				text: 'Java',
				icon: 'language-java',
				children: [
					{ text: 'java-基础', icon: 'edit', link: 'basic/java-basic-oop.md' },
					{
						text: 'java-集合',
						icon: 'edit',
						link: 'collection/java-collection-all.md'
					},
					{
						text: 'java-并发',
						icon: 'edit',
						link: 'thread/java-thread-x-overview.md'
					},
					{ text: 'java-IO', icon: 'IO', link: 'io/java-io-overview.md' },
					{
						text: 'java-新特性',
						icon: 'edit',
						link: 'javaup/java-8-up-overview.md'
					},
					{
						text: 'java-JVM',
						icon: 'edit',
						link: 'jvm/java-jvm-x-overview.md'
					},
					{ text: 'java-其他', icon: 'edit', link: 'others/awesome-java.md' }
				]
			}
		]
	},
	{
		text: '数据库',
		icon: 'db',
		prefix: '/db/',
		children: [
			{
				text: '数据库基础和原理',
				children: [
					{ text: '数据库原理', link: 'sql/sql-db.md' },
					{ text: 'SQL语言', link: 'sql-lan/sql-lan.md' }
				]
			},
			{
				text: 'SQL数据库',
				children: [
					{
						text: 'MySQL',
						icon: 'mysql',
						link: 'sql-mysql/sql-mysql-overview.md'
					},
					{
						text: 'Oracle',
						icon: 'oracle',
						link: 'sql-oracle/sql-oracle-overview.md'
					}
				]
			},
			{
				text: 'NOSQL数据库',
				children: [
					{
						text: 'Redis',
						icon: 'redis',
						link: 'nosql-redis/db-redis-overview.md'
					},
					{ text: 'MongoDB', icon: 'mongodb', link: 'nosql-mongo/mongo.md' },
					{
						text: 'ElasticSearch',
						icon: 'elasticsearch',
						link: 'nosql-es/elasticsearch.md'
					}
				]
			}
		]
	},
	{
		text: '开发',
		icon: 'shebeikaifa',
		prefix: '/develop/',
		children: [
			{
				text: '开发理论与基础',
				children: [
					{ text: '开发原则(SOLID)', link: 'spec/dev-th-solid.md' },
					{ text: '分布式理论(CAP)', link: 'spec/dev-th-cap.md' },
					{ text: '分布式理论(BASE)', link: 'spec/dev-th-base.md' },
					{ text: '事务理论(ACID)', link: 'spec/dev-th-acid.md' },
					{
						text: '微服务基础(康威定律)',
						link: 'spec/dev-microservice-kangwei.md'
					},
					{ text: '常用类详解', link: 'package/dev-package-x-overview.md' },
					{ text: '正则表达式', link: 'regex/dev-regex-all.md' },
					{ text: 'CRON表达式', link: 'cron/dev-cron-x-usage.md' },
					{ text: '网络协议和工具', link: 'protocol/dev-protocol-overview.md' },
					{ text: '安全相关', link: 'security/dev-security-overview.md' }
				]
			},
			{
				text: '开发流程',
				prefix: 'dev-agile/',
				children: [
					{ text: '软件生命周期与传统模式', link: 'dev-th-waterfall-model.md' },
					{ text: '结合测试演化的过程模型', link: 'dev-th-waterfall-vwxh.md' },
					{ text: '敏捷开发项目管理理论', link: 'dev-th-agile.md' },
					{ text: '敏捷之极限编程(XP)', link: 'dev-th-agile-xp.md' },
					{ text: '敏捷之Scrum & Kanban', link: 'dev-th-agile-scrum.md' },
					{ text: '敏捷实践之测试驱动开发', link: 'dev-pratice-tdd.md' }
				]
			},
			{
				text: '质量保障',
				prefix: 'quality-assurance/',
				children: [
					{ text: '单元测试', link: 'unit-test.md' },
					{ text: '统一风格', link: 'code-style.md' },
					{ text: '质量管理', link: 'quality-control-sonarlint.md' },
					{ text: '阿里巴巴 Java 开发手册', link: 'code-style-alibaba.md' },
					{ text: 'Google Java 编程风格指南', link: 'code-style-google.md' }
				]
			},
			{
				text: '代码重构',
				prefix: 'refactor/',
				children: [{ text: '重构技巧相关', link: 'dev-refactor-if-else.md' }]
			},
			{
				text: '设计模式',
				prefix: 'design/',
				children: [{ text: '设计模式详解', link: 'thought.md' }]
			},
			{
				text: '算法和数据结构',
				prefix: 'algorithms-structures/',
				children: [
					{ text: '数据结构', link: 'alg-basic-overview.md' },
					{ text: '常见排序算法', link: 'alg-sort-overview.md' },
					{ text: '算法思想', link: 'alg-core-overview.md' },
					{ text: '领域算法', link: 'alg-domain-overview.md' },
					{ text: '其他相关', link: 'alg-other-mind.md' }
				]
			},
			{
				text: '开源协议',
				prefix: 'opensource/',
				children: [
					{ text: '常见软件开源协议详解', link: 'dev-opensource.md' },
					{ text: '知识共享许可协议', link: 'dev-knowledge.md' },
					{ text: '国产开源木兰协议', link: 'dev-mulan.md' }
				]
			},
			{
				text: '系统认证',
				prefix: 'certificate/',
				children: [
					{ text: 'CMMI 认证', link: 'cert-cmm.md' },
					{ text: '等级保护认证', link: 'cert-dengbao.md' },
					{ text: 'ISO27001认证', link: 'cert-iso27001.md' }
				]
			}
		]
	},
	{
		text: '框架',
		icon: 'manage',
		prefix: '/framework/',
		children: [
			{
				text: 'Spring生态',
				icon: 'spring',
				children: [
					{
						text: 'Spring-Framework',
						icon: 'bxl-spring-boot',
						link: 'spring/01.md'
					},
					{ text: 'SpringBoot', icon: 'bxl-spring-boot', link: 'spring/01' },
					{ text: 'SpringCloud', icon: 'bxl-spring-boot', link: 'spring/01' }
				]
			},
			{
				text: '管理',
				children: [
					{ text: 'Git', icon: 'edit', link: 'base/01.md' },
					{ text: 'Maven', icon: 'edit', link: 'base/01.md' },
					{ text: 'Gradle', icon: 'edit', link: 'base/01.md' }
				]
			},
			{
				text: '部署',
				children: [
					{ text: 'Linux', icon: '', link: 'spring/01.md' },
					{ text: 'Docker', icon: '', link: 'docker/01.md' },
					{ text: 'Jenkins', icon: '', link: 'spring/01.md' }
				]
			}
		]
	},
	{
		text: '架构',
		icon: 'jiagousheji',
		prefix: '/framework/',
		children: [
			{
				text: '管理',
				children: [
					{ text: 'Git', icon: 'edit', link: 'base/01.md' },
					{ text: 'Maven', icon: 'edit', link: 'base/01.md' },
					{ text: 'Gradle', icon: 'edit', link: 'base/01.md' }
				]
			},
			{
				text: '部署',
				children: [
					{ text: 'Linux', icon: '', link: 'spring/01.md' },
					{ text: 'Docker', icon: '', link: 'docker/01.md' },
					{ text: 'Jenkins', icon: '', link: 'spring/01.md' }
				]
			}
		]
	},
	{
		text: '工具',
		icon: 'tools',
		prefix: '/tool/',
		children: [
			{
				text: '管理',
				children: [
					{ text: 'Git', icon: 'edit', link: 'git/overview.md' },
					{ text: 'Maven', icon: 'edit', link: 'base/01.md' },
					{ text: 'Gradle', icon: 'edit', link: 'gradle/01.md' }
				]
			},
			{
				text: '部署',
				children: [
					{ text: 'Linux', icon: '', link: 'spring/01.md' },
					{ text: 'Docker', icon: '', link: 'docker/01.md' },
					{ text: 'Jenkins', icon: '', link: 'spring/01.md' }
				]
			}
		]
	},
	{
		text: '前端',
		icon: 'web3',
		prefix: '/front/',
		children: [
			{
				text: 'Html',
				children: [
					{ text: 'Git', icon: 'edit', link: 'base/01.md' },
					{ text: 'Maven', icon: 'edit', link: 'base/01.md' },
					{ text: 'Gradle', icon: 'edit', link: 'base/01.md' }
				]
			},
			{
				text: 'JavaScript',
				children: [
					{ text: 'Linux', icon: '', link: 'spring/01.md' },
					{ text: 'Docker', icon: '', link: 'docker/01.md' },
					{ text: 'Jenkins', icon: '', link: 'spring/01.md' }
				]
			},
			{
				text: 'CSS',
				children: [
					{ text: 'Linux', icon: '', link: 'spring/01.md' },
					{ text: 'Docker', icon: '', link: 'docker/01.md' },
					{ text: 'Jenkins', icon: '', link: 'spring/01.md' }
				]
			},
			{
				text: 'React',
				children: [
					{ text: 'Linux', icon: '', link: 'spring/01.md' },
					{ text: 'Docker', icon: '', link: 'docker/01.md' },
					{ text: 'Jenkins', icon: '', link: 'spring/01.md' }
				]
			},
			{
				text: 'Vue',
				children: [
					{ text: 'Linux', icon: '', link: 'spring/01.md' },
					{ text: 'Docker', icon: '', link: 'docker/01.md' },
					{ text: 'Jenkins', icon: '', link: 'spring/01.md' }
				]
			},
			{
				text: 'UniApp',
				children: [
					{ text: 'Linux', icon: '', link: 'spring/01.md' },
					{ text: 'Docker', icon: '', link: 'docker/01.md' },
					{ text: 'Jenkins', icon: '', link: 'spring/01.md' }
				]
			}
		]
	},
	{
		text: '更多',
		icon: 'more',
		prefix: '/more/',
		children: [
			{
				text: '管理',
				children: [
					{ text: 'Git', icon: 'edit', link: 'base/01.md' },
					{ text: 'Maven', icon: 'edit', link: 'base/01.md' },
					{ text: 'Gradle', icon: 'edit', link: 'base/01.md' }
				]
			},
			{
				text: '部署',
				children: [
					{ text: 'Linux', icon: '', link: 'spring/01.md' },
					{ text: 'Docker', icon: '', link: 'docker/01.md' },
					{ text: 'Jenkins', icon: '', link: 'spring/01.md' }
				]
			}
		]
	},
	{
		text: '关于',
		icon: 'people',
		prefix: '/about/',
		children: [
			{
				text: '管理',
				children: [
					{ text: 'Git', icon: 'edit', link: 'base/01.md' },
					{ text: 'Maven', icon: 'edit', link: 'base/01.md' },
					{ text: 'Gradle', icon: 'edit', link: 'base/01.md' }
				]
			},
			{
				text: '部署',
				children: [
					{ text: 'Linux', icon: '', link: 'spring/01.md' },
					{ text: 'Docker', icon: '', link: 'docker/01.md' },
					{ text: 'Jenkins', icon: '', link: 'spring/01.md' }
				]
			}
		]
	}
])
