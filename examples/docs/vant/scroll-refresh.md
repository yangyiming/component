## 基于vant 的下拉刷新组件

可定制渲染组件和使用瀑布流布局（下拉刷新请扫描二维码测试）

### 基本用法
通过配置接口获取数组渲染，可上拉加载更多和下拉刷新
:::demo ZtScrollRefresh 组件由`getList`属性指定异步调用接口，根据返回的数据格式配置`listKey`，即可渲染出滚动列表，`size`用来设置每页数据长度, `slot` 可以定制渲染模版
```html
<template>
    <mobile-box url="mobile/van-scroll-refresh/index"></mobile-box>
</template>
<script>
export default {
    data(){
        return {
            
        }
    },
    methods: {
        
    }
}
</script>
```
:::

## 瀑布流
可以通过指定类型来渲染瀑布流布局
:::demo 修改`type`属性`waterfall`设置成瀑布流布局
```html
<template>
    <mobile-box url="mobile/van-scroll-refresh/waterfall"></mobile-box>
</template>
<script>
export default {
    data(){
        return {
            
        }
    },
    methods: {
        
    }
}
</script>
```
:::

