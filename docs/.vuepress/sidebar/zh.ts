import { sidebar } from 'vuepress-theme-hope'

export const zhSidebar = sidebar({
  '/java/': [{
    text: 'Java基础',
    prefix: 'basic/',
    collapsible: true,
    children: [
      'java-basic-oop',
      'java-basic-lan-basic',
      'java-basic-lan-sum',
      'java-basic-x-generic',
      'java-basic-x-annotation',
      'java-basic-x-exception',
      'java-basic-x-reflection',
      'java-advanced-spi',
    ]
  }, {
    text: 'Java集合',
    prefix: 'collection/',
    collapsible: true,
    children: [
      'java-collection-all',
      'java-collection-ArrayList',
      'java-collection-LinkedList',
      'java-collection-Queue&Stack',
      'java-collection-PriorityQueue',
      'java-map-HashMap&HashSet',
      'java-map-LinkedHashMap&LinkedHashSet',
      'java-map-TreeMap&TreeSet',
      'java-map-WeakHashMap',
    ]
  }, {
    text: 'Java多线程与并发',
    prefix: 'thread/',
    collapsible: true,
    children: [
      'java-thread-x-overview',
      'java-thread-x-theorty',
      'java-thread-x-thread-basic',
      'java-thread-x-lock-all',
      'java-thread-x-key-synchronized',
      'java-thread-x-key-volatile',
      'java-thread-x-key-final',
      'java-thread-x-juc-overview',
      'java-thread-x-juc-AtomicInteger',
      'java-thread-x-lock-LockSupport',
      'java-thread-x-lock-AbstractQueuedSynchronizer',
      'java-thread-x-lock-ReentrantLock',
      'java-thread-x-lock-ReentrantReadWriteLock',
      'java-thread-x-juc-collection-ConcurrentHashMap',
      'java-thread-x-juc-collection-CopyOnWriteArrayList',
      'java-thread-x-juc-collection-ConcurrentLinkedQueue',
      'java-thread-x-juc-collection-BlockingQueue',
      'java-thread-x-juc-executor-FutureTask',
      'java-thread-x-juc-executor-ThreadPoolExecutor',
      'java-thread-x-juc-executor-ScheduledThreadPoolExecutor',
      'java-thread-x-juc-executor-ForkJoinPool',
      'java-thread-x-juc-tool-countdownlatch',
      'java-thread-x-juc-tool-cyclicbarrier',
      'java-thread-x-juc-tool-semaphore',
      'java-thread-x-juc-tool-phaser',
      'java-thread-x-juc-tool-exchanger',
      'java-thread-x-threadlocal',
    ]
  }, {
    text: 'Java IO/NIO/AIO',
    prefix: 'io/',
    collapsible: true,
    children: [
      'java-io-overview',
      'java-io-basic-category',
      'java-io-basic-design-pattern',
      'java-io-basic-code-inputstream',
      'java-io-basic-code-outputstream',
      'java-io-basic-usage',
      'java-io-model',
      'java-io-bio',
      'java-io-nio',
      'java-io-nio-select-epoll',
      'java-io-aio',
      'java-io-nio-netty',
      'java-io-nio-zerocopy',
    ]
  }, {
    text: 'Java 新特性',
    prefix: 'javaup/',
    collapsible: true,
    children: [
      'java8',
      'java8-stream',
      'java8-optional',
      'java8-default',
      'java8-type-anno',
      'java8-anno-repeat',
      'java8-type',
      'java8-jre',
      'java8-permgen',
      'java8-stampedlock',
      'java8-localdatetime',
      'java8-javafx',
      'java8-others',
      'java-8-up-overview',
      'java9-11',
      'java12-17',
      'java9',
      'java10',
      'java11',
      'java12',
      'java13',
      'java14',
      'java15',
      'java16',
      'java17',
    ]
  }, {
    text: 'Java JVM',
    prefix: 'jvm/',
    collapsible: true,
    children: [
      'java-jvm-x-overview',
      'java-jvm-class',
      'java-jvm-class-enhancer',
      'java-jvm-classload',
      'java-jvm-struct',
      'java-jvm-x-introduce',
      'java-jvm-jmm',
      'java-jvm-gc',
      'java-jvm-gc-g1',
      'java-jvm-gc-zgc',
      'java-jvm-cms-gc',
      'java-jvm-param',
      'java-jvm-oom',
      'java-jvm-oom-offheap',
      'java-jvm-thread-dump',
      'java-jvm-debug-tools-linux',
      'java-jvm-debug-tools-list',
      'java-jvm-oom-tool',
      'java-jvm-agent-arthas',
      'java-jvm-debug-idea',
      'java-jvm-agent-usage',
    ]
  }, {
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
        text: '单元测试',
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
        text: '统一风格',
        collapsible: true,
        children: [
          'code-style',
          'code-style-name',
          'code-style-static',
        ],
      }, {
        text: '代码质量',
        collapsible: true,
        children: [
          'quality-control-sonarlint',
        ],
      }, {
        text: '企业级规范',
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
        text: '创建型模式',
        collapsible: true,
        children: [
          'single',
          'factory',
          'prototype',
          'builder'
        ],
      }, {
        text: '结构型模式',
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
        text: '行为型模式',
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
//   '/',
//   '/home',
//   '/slide',
//   {
//     text: '如何使用',
//     icon: 'creative',
//     prefix: '/guide/',
//     link: '/guide/',
//     children: 'structure',
//   },
//   {
//     text: '文章',
//     icon: 'note',
//     prefix: '/posts/',
//     children: [
//       {
//         text: '文章 1-4',
//         icon: 'note',
//         collapsible: true,
//         prefix: 'article/',
//         children: ['article1', 'article2', 'article3', 'article4'],
//       },
//       {
//         text: '文章 5-12',
//         icon: 'note',
//         children: [
//           {
//             text: '文章 5-8',
//             icon: 'note',
//             collapsible: true,
//             prefix: 'article/',
//             children: ['article5', 'article6', 'article7', 'article8'],
//           },
//           {
//             text: '文章 9-12',
//             icon: 'note',
//             children: ['article9', 'article10', 'article11', 'article12'],
//           },
//         ],
//       },
//     ],
//   },
// ]);
