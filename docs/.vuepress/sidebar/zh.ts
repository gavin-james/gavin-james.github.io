import { sidebar } from 'vuepress-theme-hope'

export const zhSidebar = sidebar({
  '/java/':[{
    text: 'Java基础',
    prefix: 'basic/',
    collapsible: true,
    children: [
      'oop',
      'lan-basic',
      'lan-sum',
      'generic',
      'annotation',
      'exception',
      'reflection',
      'spi',
    ]
  },{
    text: 'Java集合',
    prefix: 'basic/',
    collapsible: true,
    children: [
      'oop',
      'lan-basic',
      'lan-sum',
      'generic',
      'annotation',
      'exception',
      'reflection',
      'spi',
    ]
  },{
    text: 'Java多线程与并发',
    prefix: 'basic/',
    collapsible: true,
    children: [
      'oop',
      'lan-basic',
      'lan-sum',
      'generic',
      'annotation',
      'exception',
      'reflection',
      'spi',
    ]
  },{
    text: 'Java IO/NIO/AIO',
    prefix: 'basic/',
    collapsible: true,
    children: [
      'oop',
      'lan-basic',
      'lan-sum',
      'generic',
      'annotation',
      'exception',
      'reflection',
      'spi',
    ]
  },{
    text: 'Java 新特性',
    prefix: 'basic/',
    collapsible: true,
    children: [
      'oop',
      'lan-basic',
      'lan-sum',
      'generic',
      'annotation',
      'exception',
      'reflection',
      'spi',
    ]
  },{
    text: 'Java JVM',
    prefix: 'basic/',
    collapsible: true,
    children: [
      'oop',
      'lan-basic',
      'lan-sum',
      'generic',
      'annotation',
      'exception',
      'reflection',
      'spi',
    ]
  },{
    text: 'Java 其他',
    prefix: 'others/',
    collapsible: true,
    children: [
      'awesome-java',
      'better-java',
    ]
  }],
  '/develop/': [{
    text: '质量保障',
    prefix: 'quality-assurance/',
    collapsible: true,
    children: [
      {
        text: "单元测试",
        collapsible: true,
        children: [
          'unit-test',
          'unit-test-junit',
          'unit-test-junit5',
          'unit-test-mockito',
          'unit-test-junit-idea',
          'unit-test-springboot2',
        ],
      },
      {
        text: "统一风格",
        collapsible: true,
        children: [
          'code-style',
          'code-style-name',
          'code-style-static',
        ],
      }, {
        text: "代码质量",
        collapsible: true,
        children: [
          'quality-control-sonarlint',
        ],
      }, {
        text: "企业级规范",
        collapsible: true,
        children: [
          'code-style-alibaba',
          'code-style-google'
        ],
      },
    ]
  },
  {
    text: '设计模式',
    prefix: 'design/',
    collapsible: true,
    children: [
      'thought',
      'seven-principles',
      'uml-class-diagram',
      'summary',
      {
        text: "创建型模式",
        collapsible: true,
        children: [
          'single',
          'factory',
          'prototype',
          'builder'
        ],
      }, {
        text: "结构型模式",
        collapsible: true,
        children: [
          'adapter',
          'bridge',
          'decorator',
          'composite',
          'facade',
          'flyweight',
          'proxy',
        ],
      }, {
        text: "行为型模式",
        collapsible: true,
        children: [
          'template-method',
          'command',
          'visitor',
          'iterator',
          'observer',
          'mediator',
          'memento',
          'interpreter',
          'state',
          'strategy',
          'responsibility',
        ],
      },
      'end'
    ]
  },
  {
    text: '算法和数据结构',
    collapsible: true,
    prefix: 'algorithms-structures/',
    children: ['structures', 'algorithms']
  }
  ]
})

// export default sidebar([
//   "/",
//   "/home",
//   "/slide",
//   {
//     text: "如何使用",
//     icon: "creative",
//     prefix: "/guide/",
//     link: "/guide/",
//     children: "structure",
//   },
//   {
//     text: "文章",
//     icon: "note",
//     prefix: "/posts/",
//     children: [
//       {
//         text: "文章 1-4",
//         icon: "note",
//         collapsible: true,
//         prefix: "article/",
//         children: ["article1", "article2", "article3", "article4"],
//       },
//       {
//         text: "文章 5-12",
//         icon: "note",
//         children: [
//           {
//             text: "文章 5-8",
//             icon: "note",
//             collapsible: true,
//             prefix: "article/",
//             children: ["article5", "article6", "article7", "article8"],
//           },
//           {
//             text: "文章 9-12",
//             icon: "note",
//             children: ["article9", "article10", "article11", "article12"],
//           },
//         ],
//       },
//     ],
//   },
// ]);
