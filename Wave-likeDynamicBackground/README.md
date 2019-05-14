<meta charset="utf-8">

# canvas制作波浪状动态背景

### 作品来源
作品原创自[cyclegtx](https://github.com/cyclegtx/wave_background)  
详细教程见作者的github  
本人在原作基础上进行修改整合。

### 使用说明

#### 为整个 `html` 页面加背景

[页面预览](https://jaceykan.github.io/MaterialLibrary/Wave-likeDynamicBackground/Wave-likeDynamicBackground-html.html)

1. 下载 [`Wave-likeDynamicBackground.js`](https://github.com/JaceyKan/MaterialLibrary/blob/master/Wave-likeDynamicBackground/Wave-likeDynamicBackground.js) 文件
2. 在要添加波浪状动态背景的 `html文件`中加入
```html
<canvas id="wdbg" style="position: absolute; top: 0; left: 0; z-index: -100; height: 100%; width: 100%"></canvas> <!--背景-->
```
3. 在 `<body>`底部加入 `Wave-likeDynamicBackground.js` 文件
```html
<script type="text/javascript" src="Wave-likeDynamicBackground.js"></script>
```

---

#### 为某个元素加背景

[页面预览](https://jaceykan.github.io/MaterialLibrary/Wave-likeDynamicBackground/Wave-likeDynamicBackground-div.html)

如某个`<div>`元素
1. 下载 [`Wave-likeDynamicBackground.js`](https://github.com/JaceyKan/MaterialLibrary/blob/master/Wave-likeDynamicBackground/Wave-likeDynamicBackground.js) 文件
2. 为这个`<div>`设置`style`样式
```html
<div style="position: relative; width: 500px; height: 500px">
</div>
```
3. 为`<div>`添加`<canvas>`
```html
<div style="position: relative; width: 500px; height: 500px; border: 1px solid #aaa;">
	<canvas id="wdbg" style="position: absolute; top: 0; left: 0; z-index: -100; height: 100%; width: 100%"></canvas> <!--背景-->
</div>
```
4. 在 `<body>`底部加入 `Wave-likeDynamicBackground.js` 文件
```html
<script type="text/javascript" src="Wave-likeDynamicBackground.js"></script>
```


