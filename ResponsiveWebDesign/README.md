# Responsive Web Design

> 参考：http://wf.uisdc.com/cn/getting-started/your-first-multi-screen-site/
>

## 1. 首先确定你需要的内容。
## 2. 为宽和窄的视区勾画出信息架构 (注：Information Architecture, IA)。
## 3. 使用内容创建页面的框架，但不添加样式。
## 4. [响应式设计](http://wf.uisdc.com/cn/getting-started/your-first-multi-screen-site/responsive.html)
### 要点
* 始终使用一个视窗。
* 始终从一个窄的视窗开始，然后扩展。
* 当你需要调整内容时请基于你的断点。
* 利用主要断点创建一个高级的布局视图。

### 添加一个视窗
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### 用 [CSS media queries （设备查询）](http://wf.uisdc.com/cn/layouts/rwd-fundamentals/#css-media-queries-) 来实现响应式
> 参考：
> [CSS媒体查询](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Media_queries)

#### 语法：
```html
<!-- link元素中的CSS媒体查询 -->
<link rel="stylesheet" media="(max-width: 800px)" href="example.css" />

<!-- 样式表中的CSS媒体查询 -->
<style>
@media (max-width: 600px) {
  .facet_sidebar {
    display: none;
  }
}
</style>
```



