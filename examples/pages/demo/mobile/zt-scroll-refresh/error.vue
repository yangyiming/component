<template>
  <zt-scroll-refresh
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
    </zt-scroll-refresh>
</template>
<script>
import {Cell, Empty} from 'vant'
import 'vant/lib/cell/style';
import 'vant/lib/empty/style';
export default {
  components: {
    [Cell.name]: Cell,
    [Empty.name]: Empty
  },
  data() {
    return {
      count: 0,
      size: 10,
      emptyImgSrc: 'http://web.szy.cn/ztjy-trial-center-web/img/icon-is-null-page.bcba1d3d.png'
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
            code: 10001,
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