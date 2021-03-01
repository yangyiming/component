## vant image 图片容器组件封装

手机版本的图片展示容器

### 基本用法
配置图片链接即可展示
:::demo ZtVanImage 组件由`src`属性指定，默认值为`空`，而且图片覆盖模式`fit`为`cover`覆盖模式，如果需要修改可以改变`fit`,如果需要改写圆角样式，设置宽高，可以通过样式重写，当然组件也实现了`width``height`的功能
```html

<template>
   <el-row>
     <el-col :span="12">
        <zt-van-image src="https://img01.yzcdn.cn/vant/cat.jpeg" ></zt-van-image>
     </el-col>
  </el-row>
</template>
<script>

</script>
```
:::

### 图片圆角
配置图片链接即可展示
:::demo 配置`round`等于true, 配置图片圆角为圆形，也可以通过重写样式来改变圆角
```html

<template>
  <el-row>
     <el-col :span="12">
        <zt-van-image src="https://img01.yzcdn.cn/vant/cat.jpeg" class="round"></zt-van-image>
     </el-col>
     <el-col :span="12">
        <zt-van-image src="https://img01.yzcdn.cn/vant/cat.jpeg" :round="true"></zt-van-image>
     </el-col>
  </el-row>
</template>
<script>

</script>

<style>
.round {
  /deep/&.zt-van-image {
    .van-image {
      border-radius: 20px;
      overflow: hidden;
    }
  }
}
</style>
```
:::

### 显示默认图片

CoVanImage 组件会显示默认展示图

:::demo 通过设置`defaultUrl`属性来重写默认展示图,等图片加载完成就会覆盖默认图
```html
<template>
  <el-row>
     <el-col :span="12">
      <zt-van-image src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3626475345,3078425090&fm=26&gp=0.jpg" defaultUrl="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3626475345,3078425090&fm=26&gp=0.jpg"></zt-van-image>
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
        <zt-van-image src="http://paizhe.com/pai/data/attachment/album/201403/04/010507aeysgicteggvbi5c.jpg" :showLoading="true">
        <template slot="loading">
          加载中
        </template>
        </zt-van-image>
     </el-col>
  </el-row>
</template>
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| src     | 图片url           | string | — | — |
| fit | 图片自适应策略 | string | cover/contain/fill/none/scale-down | cover |
| width | 图片宽度 | string | — | — |
| height | 图片高度 | boolean | — | true |
| showLoading | 是否显示图片加载效果 | boolean | — | false |
| showDefault | 是否显示默认图片 | boolean | — | true |
| defaultUrl | 默认图片地址 | string | — | 默认图片 |
| errorUrl | 图片加载错误默认图 | string | - | 默认错误图 |

### Slot

| Name | Description |
|------|--------|
| — | 描述 |
| loading | loading效果 |
| default | 默认图片效果 |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| close | 关闭alert时触发的事件 | — |
