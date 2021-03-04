## 基于vant 的下拉刷新组件

可定制渲染组件和使用瀑布流布局（下拉刷新请扫描二维码测试）

### 基本用法
通过配置接口获取数组渲染，可上拉加载更多和下拉刷新
:::demo ZtScrollRefresh 组件由`getList`属性指定异步调用接口，根据返回的数据格式配置`listKey`，即可渲染出滚动列表，`size`用来设置每页数据长度, `slot` 可以定制渲染模版
```html
<template>
    <mobile-box url="mobile/zt-scroll-refresh/index"></mobile-box>
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
    <mobile-box url="mobile/zt-scroll-refresh/waterfall"></mobile-box>
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

## 加载网络错误
数据接口返回错误的数据，可以自定义模版
:::demo 修改`emptyImgSrc`属性指定错误图片
```html
<template>
    <mobile-box url="mobile/zt-scroll-refresh/error"></mobile-box>
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

## 空数据展示模版
可自定义数据为空的展示模版
:::demo 配置空模版有两种方式一种是指定属性`emptyText`空文字，`emptyImgSrc`空状态图，另一种是直接使用`slot`定制模版
```html
<template>
    <mobile-box url="mobile/zt-scroll-refresh/empty"></mobile-box>
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

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| type | 列表布局 | string | waterfall/normal | normal |
| getList     | 获取列表数据接口           | Function | — | — |
| listKey | 取数据的key链路 | string | - | body |
| size | 分页大小 | Number/String | — | 20 |
| refreshDisabled | 是否禁用下拉刷新 | boolean | — | false |
| autoFirst | 初始化后 - 默认执行一次 | boolean | — | true |
| isContent | 是否页面展示 | boolean | — | false |
| keyName | key的字段 | string | — | id |
| diffHeight | 容器高度，与屏幕高度的差值(只支持0 跟 含+ -的值) | string | - | 0 |
| emptyText | 空状态提示文字 | string | — | 暂无数据 |
| emptyImgSrc | 空状态图片 | string | — | http://web.szy.cn/ztjy-trial-center-web/img/icon-is-null-page.bcba1d3d.png |

