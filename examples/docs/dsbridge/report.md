## 埋点上报

支持APP端和web端上报埋点

### 事件埋点

:::demo 直接调用`ev`方法，并提供事件参数`event_id`事件id,`obj_type`事件对象类型, `obj_id`事件对象id,,`parm`自定义参数
```html
<template>
  <div>
    <span @click="reportEvent">点击上报事件埋点</span>
  </div>
</template>
<script>
export default {
  name: '',
  created(){
    // 上报页面埋点
  },
  methods: {
    reportEvent(){
      this.ev({
        event_id: 'test_event',
        obj_type: '',
        obj_id: '',
        parm: {
          test:1
        }
      })
    }
  }
}
</script>  
```
:::

### 页面埋点

:::demo 直接调用`pv`方法，并提供参数`page_category`页面大类,`page`页面,`page_id`页面id,`parm`自定义参数，`f_page_location`也埋呢位置
```html
<template>
  <span @click="reportEvent">点击上报事件埋点</span>
</template>
<script>
export default {
  created(){
    
  },
  methods: {
    reportEvent(){
      // 上报页面埋点
      this.pv({
        page_category: 2,
        page: '',
        page_id: '',
        parm: {
          test: 1
        }
      })
    }
  }
}
</script>  
```
:::
