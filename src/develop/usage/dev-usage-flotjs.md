---
date: 2019-05-03
category:
  - 开发
tag:
  - 随手记
---
# FlotJS 画图

> Flot 是一个基于 jQuery 的纯 JavaScript 绘图库，主打浏览器兼容好、体积小。在一个需要老旧浏览器兼容的项目里用过它，这里把使用方式与踩过的坑记下来。

## 1. 为什么用它

Flot 的特点是**依赖 jQuery、面向 `<canvas>` 绘图**，在 IE 时代兼容性出色，且 API 简单。它的官网早已停止维护，因此适合维护存量项目，新项目更建议用 ECharts、Chart.js 等现代库。

选型时可以先看差异：

| 维度 | Flot | ECharts | Chart.js |
| --- | --- | --- | --- |
| 依赖 | 需 jQuery | 无 | 无 |
| 交互/动画 | 基础 | 丰富 | 较好 |
| 大数据量 | 一般 | 强 | 一般 |
| 维护状态 | 停止维护 | 活跃 | 活跃 |

## 2. 引入依赖

先引入 jQuery，再引入 Flot 主文件；若要饼图、时间轴等，再引入对应插件。

```html
<script src="jquery.min.js"></script>
<script src="jquery.flot.js"></script>
<!-- 需要饼图时 -->
<script src="jquery.flot.pie.js"></script>
<!-- 需要时间轴时 -->
<script src="jquery.flot.time.js"></script>
```

## 3. 基础用法

核心 API 是 `$.plot(placeholder, data, options)`，`placeholder` 是容器元素，`data` 是数据系列，`options` 是配置对象。

```html
<div id="chart" style="width:600px;height:300px;"></div>
<script>
  var data = [
    { label: "访问量", data: [[0, 120], [1, 200], [2, 150], [3, 300]] },
    { label: "下单量", data: [[0, 30],  [1, 60],  [2, 45],  [3, 90]] }
  ];

  var options = {
    series: { lines: { show: true }, points: { show: true } },
    legend: { position: "ne" },          // 图例放右上角
    xaxis:  { tickDecimals: 0 },         // x 轴刻度不显示小数
    grid:   { hoverable: true, borderWidth: 1 }
  };

  $.plot($("#chart"), data, options);
</script>
```

数据结构约定：

- 每个系列是 `{ label, data }`，`label` 显示在图例中；
- `data` 是 `[x, y]` 点数组，x 轴默认按数值处理；
- 若要绘制柱状图，把系列配置改为 `bars: { show: true, align: "center" }`。

## 4. 配置项速查

| 配置 | 作用 |
| --- | --- |
| `series.lines.show` | 显示折线 |
| `series.points.show` | 显示数据点 |
| `series.bars.show` | 显示柱状 |
| `legend.position` | 图例位置（ne/nw/se/sw） |
| `xaxis.ticks` | 刻度数量或自定义刻度数组 |
| `xaxis.tickDecimals` | 刻度小数位数 |
| `grid.hoverable` | 开启鼠标悬停事件（配合 tooltip） |
| `colors` | 自定义配色数组 |

坐标轴还可以用 `min`、`max` 固定范围，用 `mode: "time"`（配合 time 插件）按时间显示，或传入数组实现自定义刻度标签，例如把数字刻度映射成月份名。

## 5. 数据来源与动态刷新

静态数据直接写在 `data` 里即可；真实项目里数据多来自后端。典型做法是**定时拉取 + 重绘**：

```javascript
function render() {
  $.ajax({
    url: "/api/stats",
    dataType: "json",
    success: function (res) {
      var series = [
        { label: "访问量", data: res.visits },
        { label: "下单量", data: res.orders }
      ];
      $.plot($("#chart"), series, options);   // 重新调用即为重绘
    }
  });
}

setInterval(render, 5000);   // 每 5 秒刷新
render();
```

要点：`$.plot` 对同一容器重复调用就是重绘，无需手动清空；但数据量大或刷新频繁时要注意性能。

## 6. 常见坑

### 6.1 x 轴刻度文字过长、重叠

当 x 轴的分类名或日期较长时，刻度会挤在一起。思路是**把刻度标签旋转一定角度**，通常在绘制完成后对刻度 DOM 做样式调整：

```javascript
function rotateTicks(plot) {
  // 通过 CSS transform 旋转刻度文本
  $(".flot-x-axis .flot-tick-label").css({
    "transform": "rotate(-45deg)",
    "transform-origin": "top left"
  });
}
```

实际做法多为覆写 `xaxis.tickFormatter` 控制标签文本，或用 `ticks` 指定自定义刻度数组后在渲染完成后旋转对应 `<div>`。旋转后要留足容器高度，否则标签会被裁掉。

### 6.2 悬停提示（tooltip）

开启 `grid.hoverable` 后监听 `plothover` 事件，自行绘制提示框：

```javascript
$("#chart").bind("plothover", function (event, pos, item) {
  if (item) {
    // item.series.label、item.datapoint[1] 即为当前点的系列名与数值
    console.log(item.series.label + " = " + item.datapoint[1]);
  }
});
```

真实项目中常在页面里放一个绝对定位的浮层，跟随 `pos.pageX / pos.pageY` 移动，避免频繁创建 DOM。

### 6.3 容器尺寸

容器必须有明确的宽高（通过 CSS 或行内样式），否则画布尺寸为 0、图表空白。窗口缩放或容器尺寸变化后，需要重新调用 `$.plot` 或调用 `plot.resize()` 并 `plot.setupGrid()` 才能自适应。

### 6.4 中文字体与数值精度

Flot 用 canvas 绘制，中文字体依赖浏览器环境，无需额外加载字体；但数值较小时默认刻度可能是小数，用 `tickDecimals: 0` 或自定义 `tickFormatter` 处理。浮点坐标（如 0.30000000000000004）也应在传入前做四舍五入。

### 6.5 饼图与时间轴

饼图需要引入 `jquery.flot.pie.js`，数据用 `{ label, data: [[1, value]] }` 的形式；时间轴需要 `jquery.flot.time.js` 并把 `xaxis.mode` 设为 `"time"`，同时注意时间戳单位（毫秒还是秒）。

## 7. 性能与数据量

Flot 直接在 canvas 上绘制，点线数量较少时很流畅，但数据量增大后需要注意：

- 上万点时会明显卡顿，应先在**后端聚合**再传给前端，而不是把原始流水全量渲染；
- 避免用 `setInterval` 过高的频率刷新，无变化时可不重绘；
- 多个图表同屏时，减少不必要的重绘与 DOM 操作。

## 8. 与后端的数据格式约定

前后端应约定统一的返回结构，推荐形如 `{ "visits": [[ts, n], ...], "orders": [[ts, n], ...] }`，前端拿到后直接拼成 `{ label, data }` 系列。**时间戳单位要统一**（毫秒或秒），否则时间轴会错位；坐标点也要保证是数值类型，字符串会导致绘制异常。

## 9. 小结

- Flot 基于 jQuery + canvas，兼容老旧浏览器，适合存量项目维护。
- 核心 API 是 `$.plot(placeholder, data, options)`，数据为 `{label, data:[[x,y]]}`。
- 通过 `options` 控制折线/柱状/图例/刻度等外观，重复调用 `$.plot` 即重绘。
- 主要坑点集中在 x 轴刻度旋转、悬停提示、容器尺寸三处。
- 官网已停维，新项目优先选用 ECharts 等仍在维护的库。
