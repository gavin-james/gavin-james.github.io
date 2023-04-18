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
        text: 'java基础',
        icon: 'language-java',
        children: [
          { text: 'java-基础', icon: 'edit', link: 'base/01.md' },
          { text: 'java-集合', icon: 'edit', link: 'base/01.md' },
          { text: 'java-并发', icon: 'edit', link: 'base/01.md' },
          { text: 'java-IO', icon: 'IO', link: 'base/01.md' },
          { text: 'java-新特性', icon: 'edit', link: 'base/01.md' },
          { text: 'java-JVM', icon: 'edit', link: 'base/01.md' }
        ]
      },
    ]
  },
  {
    text: '数据库',
    icon: 'database',
    prefix: '/database/',
    children: [
      {
        text: '数据库基础和原理',
        prefix: 'design/thought',
        children: [
          { text: '数据库原理', link: 'structures.md' },
          { text: 'SQL语言', link: 'algorithms.md' }
          // { text: 'SpringBoot', icon: 'edit', link: 'base/01' },
          // { text: 'SpringCloud', icon: 'edit', link: 'base/01' }
        ]
      },
      {
        text: 'SQL数据库',
        prefix: 'algorithms-structures/',
        children: [
          { text: 'MySQL', icon: 'mysql', link: 'structures.md' },
          { text: 'Oracle', icon: 'oracle', link: 'algorithms.md' }
          // { text: 'SpringBoot', icon: 'edit', link: 'base/01' },
          // { text: 'SpringCloud', icon: 'edit', link: 'base/01' }
        ]
      }, {
        text: 'NOSQL数据库',
        prefix: 'algorithms-structures/',
        children: [
          { text: 'Redis', icon: 'redis', link: 'structures.md' },
          { text: 'MongoDB', icon: 'mongodb', link: 'algorithms.md' },
          { text: 'ElasticSearch', icon: 'elasticsearch', link: 'algorithms.md' }
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
        text: '常用开发基础',
        link: 'design/thought',
        children: [
          { text: '开发原则(SOLID)', link: 'structures.md' },
          { text: '分布式理论(CAP)', link: 'structures.md' },
          { text: '分布式理论(BASE)', link: 'structures.md' },
          { text: '事务理论(ACID)', link: 'structures.md' },
          { text: '微服务基础(康威定律)', link: 'structures.md' },
          { text: '常用类详解', link: 'structures.md' },
          { text: '正则表达式', link: 'structures.md' },
          { text: 'CRON表达式', link: 'structures.md' },
          { text: '网络协议和工具', link: 'structures.md' },
          { text: '安全相关', link: 'structures.md' },
        ]
      },
      {
        text: '开发流程',
        link: 'design/thought',
        children: [
          { text: '软件生命周期与传统模式', link: 'structures.md' },
          { text: '结合测试演化的过程模型', link: 'structures.md' },
          { text: '敏捷开发项目管理理论', link: 'structures.md' },
          { text: '敏捷之极限编程(XP)', link: 'structures.md' },
          { text: '敏捷之Scrum & Kanban', link: 'structures.md' },
          { text: '敏捷实践之测试驱动开发', link: 'structures.md' },
        ]
      },
      {
        text: '质量保障',
        prefix: "quality-assurance/",
        children: [
          { text: '单元测试', link: 'unit-test.md' },
          { text: '统一风格', link: 'code-style.md' },
          { text: '质量管理', link: 'quality-control-sonarlint.md' },
          { text: '阿里巴巴 Java 开发手册', link: 'code-style-alibaba.md' },
          { text: 'Google Java 编程风格指南', link: 'structures.md' },
          { text: 'Twitter Java Style Guide', link: 'structures.md' },
          // { text: 'SpringBoot', icon: 'edit', link: 'base/01' },
          // { text: 'SpringCloud', icon: 'edit', link: 'base/01' }
        ]
      },
      {
        text: '代码重构',
        link: 'design/thought',
        children: [
          { text: '重构技巧相关', link: 'structures.md' },
        ]
      },
      {
        text: '设计模式',
        link: 'design/thought',
        children: [
          { text: '设计模式详解', link: 'structures.md' },
        ]
      },
      {
        text: '算法和数据结构',
        prefix: 'algorithms-structures/',
        children: [
          { text: '数据结构', link: 'structures.md' },
          { text: '算法', link: 'algorithms.md' }
        ]
      }, {
        text: '开源协议',
        prefix: 'algorithms-structures/',
        children: [
          { text: '常见软件开源协议详解', link: 'structures.md' },
          { text: '知识共享许可协议', link: 'structures.md' },
          { text: '国产开源木兰协议', link: 'structures.md' },
        ]
      }, {
        text: '系统认证',
        prefix: 'algorithms-structures/',
        children: [
          { text: 'CMMI 认证', link: 'structures.md' },
          { text: '等级保护认证', link: 'structures.md' },
          { text: 'ISO27001认证', link: 'structures.md' },
        ]
      },
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
          { text: 'Spring-Framework', icon: 'bxl-spring-boot', link: 'spring/01.md' },
          { text: 'SpringBoot', icon: 'bxl-spring-boot', link: 'spring/01' },
          { text: 'SpringCloud', icon: 'bxl-spring-boot', link: 'spring/01' }
        ]
      },
      {
        text: '管理',
        children: [
          { text: 'Git', icon: 'edit', link: 'base/01.md' },
          { text: 'Maven', icon: 'edit', link: 'base/01.md' },
          { text: 'Gradle', icon: 'edit', link: 'base/01.md' },
        ]
      },
      {
        text: '部署',
        children: [
          { text: 'Linux', icon: '', link: 'spring/01.md' },
          { text: 'Docker', icon: '', link: 'docker/01.md' },
          { text: 'Jenkins', icon: '', link: 'spring/01.md' },
        ]
      }
    ]
  }, {
    text: '架构',
    icon: 'jiagousheji',
    prefix: '/framework/',
    children: [
      {
        text: '管理',
        children: [
          { text: 'Git', icon: 'edit', link: 'base/01.md' },
          { text: 'Maven', icon: 'edit', link: 'base/01.md' },
          { text: 'Gradle', icon: 'edit', link: 'base/01.md' },
        ]
      },
      {
        text: '部署',
        children: [
          { text: 'Linux', icon: '', link: 'spring/01.md' },
          { text: 'Docker', icon: '', link: 'docker/01.md' },
          { text: 'Jenkins', icon: '', link: 'spring/01.md' },
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
          { text: 'Git', icon: 'edit', link: 'base/01.md' },
          { text: 'Maven', icon: 'edit', link: 'base/01.md' },
          { text: 'Gradle', icon: 'edit', link: 'base/01.md' },
        ]
      },
      {
        text: '部署',
        children: [
          { text: 'Linux', icon: '', link: 'spring/01.md' },
          { text: 'Docker', icon: '', link: 'docker/01.md' },
          { text: 'Jenkins', icon: '', link: 'spring/01.md' },
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
          { text: 'Gradle', icon: 'edit', link: 'base/01.md' },
        ]
      },
      {
        text: 'JavaScript',
        children: [
          { text: 'Linux', icon: '', link: 'spring/01.md' },
          { text: 'Docker', icon: '', link: 'docker/01.md' },
          { text: 'Jenkins', icon: '', link: 'spring/01.md' },
        ]
      },
      {
        text: 'CSS',
        children: [
          { text: 'Linux', icon: '', link: 'spring/01.md' },
          { text: 'Docker', icon: '', link: 'docker/01.md' },
          { text: 'Jenkins', icon: '', link: 'spring/01.md' },
        ]
      },
      {
        text: 'React',
        children: [
          { text: 'Linux', icon: '', link: 'spring/01.md' },
          { text: 'Docker', icon: '', link: 'docker/01.md' },
          { text: 'Jenkins', icon: '', link: 'spring/01.md' },
        ]
      },
      {
        text: 'Vue',
        children: [
          { text: 'Linux', icon: '', link: 'spring/01.md' },
          { text: 'Docker', icon: '', link: 'docker/01.md' },
          { text: 'Jenkins', icon: '', link: 'spring/01.md' },
        ]
      },
      {
        text: 'UniApp',
        children: [
          { text: 'Linux', icon: '', link: 'spring/01.md' },
          { text: 'Docker', icon: '', link: 'docker/01.md' },
          { text: 'Jenkins', icon: '', link: 'spring/01.md' },
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
          { text: 'Gradle', icon: 'edit', link: 'base/01.md' },
        ]
      },
      {
        text: '部署',
        children: [
          { text: 'Linux', icon: '', link: 'spring/01.md' },
          { text: 'Docker', icon: '', link: 'docker/01.md' },
          { text: 'Jenkins', icon: '', link: 'spring/01.md' },
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
          { text: 'Gradle', icon: 'edit', link: 'base/01.md' },
        ]
      },
      {
        text: '部署',
        children: [
          { text: 'Linux', icon: '', link: 'spring/01.md' },
          { text: 'Docker', icon: '', link: 'docker/01.md' },
          { text: 'Jenkins', icon: '', link: 'spring/01.md' },
        ]
      }
    ]
  }
])
