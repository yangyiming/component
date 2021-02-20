## vant image 图片容器组件封装

手机版本的图片展示容器

### 基本用法
配置图片链接即可展示
:::demo CoVanImage 组件由`src`属性指定，默认值为`空`，而且图片覆盖模式`fit`为`cover`覆盖模式，如果需要修改可以改变`fit`,如果需要改写圆角样式，设置宽高，可以通过样式重写，当然组件也实现了`width``height`的功能
```html

<template>
  <co-van-image src="/examples/assets/images/vant-image.jpeg" ></co-van-image>
</template>
<script>

</script>
```
:::

### 显示默认图片

CoVanImage 组件会显示默认展示图

:::demo 通过设置`defaultUrl`属性来重写默认展示图,等图片加载完成就会覆盖默认图
```html
<template>
  <el-row>
     <el-col :span="12">
      <co-van-image ></co-van-image>
     </el-col>
     <el-col :span="12">
      <co-van-image defaultUrl="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3626475345,3078425090&fm=26&gp=0.jpg"></co-van-image>
     </el-col>
  </el-row>
</template>
```
:::



### 现实图片loading效果

在图片没有完全加载出来的情况下，实现loading效果，还可以自定义loading效果

:::demo `showLoading`
```html
<template>
  <el-row>
     <el-col :span="12">
        <co-van-image src="https://img01.yzcdn.cn/vant/cat.jpeg" ></co-van-image>
     </el-col>
     <el-col :span="12">
        <co-van-image src="https://img01.yzcdn.cn/vant/cat.jpe" >
        <template slot="loading">
          加载中
        </template>
        </co-van-image>
     </el-col>
  </el-row>
</template>
```
:::

### 带有 icon

表示某种状态时提升可读性。

:::demo 通过设置`show-icon`属性来显示 Alert 的 icon，这能更有效地向用户展示你的显示意图。
```html
<template>
  <el-alert
    title="成功提示的文案"
    type="success"
    show-icon>
  </el-alert>
  <el-alert
    title="消息提示的文案"
    type="info"
    show-icon>
  </el-alert>
  <el-alert
    title="警告提示的文案"
    type="warning"
    show-icon>
  </el-alert>
  <el-alert
    title="错误提示的文案"
    type="error"
    show-icon>
  </el-alert>
</template>
```
:::

### 文字居中

使用 `center` 属性让文字水平居中。

:::demo
```html
<template>
  <el-alert
    title="成功提示的文案"
    type="success"
    center
    show-icon>
  </el-alert>
  <el-alert
    title="消息提示的文案"
    type="info"
    center
    show-icon>
  </el-alert>
  <el-alert
    title="警告提示的文案"
    type="warning"
    center
    show-icon>
  </el-alert>
  <el-alert
    title="错误提示的文案"
    type="error"
    center
    show-icon>
  </el-alert>
</template>
```
:::

### 带有辅助性文字介绍

包含标题和内容，解释更详细的警告。

:::demo 除了必填的`title`属性外，你可以设置`description`属性来帮助你更好地介绍，我们称之为辅助性文字。辅助性文字只能存放单行文本，会自动换行显示。
```html
<template>
  <el-alert
    title="带辅助性文字介绍"
    type="success"
    description="这是一句绕口令：黑灰化肥会挥发发灰黑化肥挥发；灰黑化肥会挥发发黑灰化肥发挥。 黑灰化肥会挥发发灰黑化肥黑灰挥发化为灰……">
  </el-alert>
</template>
```
:::

### 带有 icon 和辅助性文字介绍

:::demo 最后，这是一个同时具有 icon 和辅助性文字的样例。
```html
<template>
  <el-alert
    title="成功提示的文案"
    type="success"
    description="文字说明文字说明文字说明文字说明文字说明文字说明"
    show-icon>
  </el-alert>
  <el-alert
    title="消息提示的文案"
    type="info"
    description="文字说明文字说明文字说明文字说明文字说明文字说明"
    show-icon>
  </el-alert>
  <el-alert
    title="警告提示的文案"
    type="warning"
    description="文字说明文字说明文字说明文字说明文字说明文字说明"
    show-icon>
  </el-alert>
  <el-alert
    title="错误提示的文案"
    type="error"
    description="文字说明文字说明文字说明文字说明文字说明文字说明"
    show-icon>
  </el-alert>
</template>
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| title     | 标题           | string | — | — |
| type | 主题 | string | success/warning/info/error | info |
| description | 辅助性文字。也可通过默认 slot 传入 | string | — | — |
| closable | 是否可关闭 | boolean | — | true |
| center | 文字是否居中 | boolean | — | true |
| close-text | 关闭按钮自定义文本 | string | — | — |
| show-icon | 是否显示图标 | boolean | — | false |
| effect | 选择提供的主题 | string | light/dark | light |

### Slot

| Name | Description |
|------|--------|
| — | 描述 |
| title | 标题的内容 |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| close | 关闭alert时触发的事件 | — |
