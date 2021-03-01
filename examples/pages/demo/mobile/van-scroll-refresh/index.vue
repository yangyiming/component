<template>
  <zt-van-scroll-refresh
      :getList="getList"
      listKey="body.data"
      diffHeight="0"
      :size="size"
      :refreshDisabled="false"
      emptyText="暂时还没有记录哦~"
    >
      <div slot-scope="{ item, index }">
        <van-cell :title="item.name">{{index}}</van-cell>
      </div>
    </zt-van-scroll-refresh>
</template>
<script>
import {Cell} from 'vant'
import 'vant/lib/cell/style';
export default {
  components: {
    [Cell.name]: Cell
  },
  data() {
    return {
      count: 0,
      size: 10
    }
  },
  methods: {
    getList() {
      /* eslint-disable */
      return new Promise((resolve, reject)=>{
        this.count++
        let data = [
          {name: '数据'},
          {name: '数据'},
          {name: '数据'},
          {name: '数据'},
          {name: '数据'},
          {name: '数据'},
          {name: '数据'},
          {name: '数据'},
          {name: '数据'},
          {name: '数据'}
        ]
        if(this.count == 4){
          data = [
            {name: '数据'},
            {name: '数据'},
            {name: '数据'}
          ]
        }
        let second = 2000
        if(this.count == 1) {
          second = 1000
        }
        setTimeout(()=>{
          resolve({
            code: 10000,
            body: {
              data: data
            }
          })
        },second)
      })
    }
  }
}
</script>