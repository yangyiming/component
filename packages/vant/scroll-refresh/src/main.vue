<!--滚动列表  下拉刷新、上拉加载、瀑布流布局-->
<template>
  <div class="scroll-list"
       :class="{'scroll-list-error': isError, 'scroll-list-empty': isEmpty, 'scroll-list-content': isContent}"
       @click="reloadList">
    <van-pull-refresh :style="{ minHeight: handlHeight }" v-model="refreshing" @refresh="onRefresh" :success-text="successText" :disabled="refreshDisabled">
      <van-list
        :style="{ height: (isError || isEmpty) && handlHeight }"
        :class="{'van-list-empty': (isError || isEmpty) }"
        v-model="loading"
        :finished="finished"
        :finished-text="isEmpty?'':'没有更多了'"
        @load="loadMore"
        :offset="60"
        :immediate-check="false"
      >
        <slot v-if="isError" name="error">
          <van-empty
            class="custom-image"
            :image="emptyImgSrc"
          >
            <div class="empty">
              <div class="description">
                <p>唔，网络好像有问题...</p>
                <p>点击页面重新加载</p>
              </div>
              <!--          <div class="tips">快记录下有趣的小日常吧</div>-->
            </div>
          </van-empty>
        </slot>
        <div v-else-if="!isEmpty" class="list-all-box">
          <slot name="top"></slot>
          <template v-if="type === 'waterfall'">
            <div class="list-box">
              <div v-for="(item, index) in listDataLeft" :key="item[keyName] || index * 2">
                <slot :item="item" :index="index * 2"></slot>
              </div>
            </div>
            <div class="list-box">
              <div v-for="(item, index) in listDataRight" :key="item[keyName] || index * 2 + 1">
                <slot :item="item" :index="index * 2 + 1"></slot>
              </div>
            </div>
          </template>
          <template v-else>
            <div v-for="(item, index) in listData" :key="item[keyName] || `list-${index}`">
              <slot :item="item" :index="index"></slot>
            </div>
          </template>
          <slot name="bottom"></slot>
        </div>
        <slot v-else name="empty">
          <div>
            <img :src="emptyImgSrc" alt="">
            <span>{{emptyText}}</span>
          </div>
        </slot>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
const namespace = 'Zt'
import { List, PullRefresh, Empty } from 'vant'
import 'vant/lib/list/style';
import 'vant/lib/pull-refresh/style';
import 'vant/lib/empty/style';
export default {
  name: namespace + 'VanScrollRefresh',
  components: { vanList: List, vanPullRefresh: PullRefresh, vanEmpty: Empty },
  data() {
    return {
      listData: [],
      loading: false, // 上拉刷新状态
      finished: false, // 是否所有数据加载完成
      refreshing: false, // 下拉刷新状态
      isFirst: true, // 是否第一次刷新
      isError: '', // 是否请求错误
      successText: '刷新成功',
      page: 0 // 加载的分页
    }
  },
  props: {
    size: { // 分页大小
      type: Number || String,
      default: 20
    },
    getList: { // 获取数据的接口
      type: Function,
      default: null,
      required: true
    },
    listKey: { // 取数据的key链路
      type: String,
      default: 'body'
    },
    refreshDisabled: { // 是否禁用下拉刷新
      type: Boolean,
      default: false
    },
    autoFirst: { // 初始化后 - 默认执行一次
      type: Boolean,
      default: true
    },
    type: { // waterfall： 瀑布流，normal：正常流
      type: String,
      default: 'normal'
    },
    isContent: { // false 整个页面形式，true 在内容中展示
      type: Boolean,
      default: false
    },
    keyName: { // vue key的字段
      type: String,
      default: 'id'
    },
    diffHeight: { // 容器高度，与屏幕高度的差值
      type: String,
      default: '- 1.066667rem',
      validator: function(val) { // 只支持0 跟 含+ -的值
        if (val === '0') {
          return true
        } else {
          return /[+-]/.test(val)
        }
      }
    },
    emptyText: { // 空状态提示文字
      type: String,
      default: '暂无数据'
    },
    emptyImgSrc: { // 空状态图片
      type: String,
      default: 'http://web.szy.cn/ztjy-trial-center-web/img/icon-is-null-page.bcba1d3d.png'
    }
  },
  created() {
    this.autoFirst && this.onRefresh()
  },
  computed: {
    // 瀑布流数据 - 左
    listDataLeft() {
      return this.listData.filter((item, index) => index % 2 === 0)
    },
    // 瀑布流数据 - 右
    listDataRight() {
      return this.listData.filter((item, index) => index % 2 !== 0)
    },
    // 是否无数据
    isEmpty() {
      return this.listData && this.listData.length === 0 && (!this.refreshing && !this.loading) // 加载中 不提示无数据
    },
    handlHeight() {
      console.log(this.diffHeight)
      if (this.diffHeight === '0') {
        return '100vh'
      } else {
        let height = this.diffHeight.replace(/ /g, '') // 删除所有空格
        height = this.insertStr(height, 1, ' ') // 在第二位插入一个空格
        return `calc(100vh ${height})`
      }
    }
  },
  methods: {
    // 下拉刷新
    onRefresh() {
      // if (this.refreshing || this.loading) { // 加载中不执行
      //   return
      // }
      this.isFirst && !this.isContent && this.$toast.loading({ // 首次执行才显示提示
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0,
        message: '数据加载中'
      })
      this.loading = true
      this.finished = false
      this.refreshing = true // 将 refreshing 设置为 true，表示处于加载状态
      this.isFirst = false // 是否第一次刷新
      this.isError = false
      this.loadListData('refresh')
        .then((res) => {
          if (res.code === 10000) {
            this.successText = '刷新成功'
          } else {
            this.successText = '刷新失败'
          }
          return res
        })
        .catch((res) => {
          this.successText = '刷新失败'
          return res
        })
        .finally(() => {
          this.refreshing = false
          this.loading = false
          this.$toast.clear()
        })
    },
    // 上拉加载更多
    loadMore() {
      // if (this.refreshing) { // 加载中不执行
      //   return
      // }
      this.finished = false
      this.loading = true

      this.loadListData('more')
        .finally(() => {
          this.loading = false
        })
    },
    // 加载列表数据
    loadListData(type = 'more') { // refresh：刷新 more：加载更多
      console.log('type', type)
      if (type === 'refresh') {
        this.page = 1
      } else if (type === 'more') {
        this.page++
        if (this.isError) { // 请求错误之后不在请求上拉加载
          this.loading = false
          this.refreshing = false
        }
      }
      // 执行父级组件的方法
      return this.getList({ page: this.page, size: this.size, listData: this.listData }) // page 当前请求的页码  size 请求分页的大小 listData 当前列表的数据
        .then(res => {
          console.log('获取列表数据', res)
          res.body = res.body || {}
          if (res.code !== 10000) {
            this.isError = true
          }
          let curList
          try {
            // eslint-disable-next-line no-eval
            curList = eval('res.' + this.listKey) || []
          } catch (e) {
            curList = []
          }
          if (!Array.isArray(curList)) {
            console.error('listKey 错误')
            return res
          }

          if (type === 'refresh') { // 刷新
            this.listData = curList
          } else if (type === 'more') { // 加载更多
            this.listData = this.listData.concat(curList)
          }
          if (curList.length < this.size) {
            this.finished = true
          }
          return res
        })
        .catch((res) => {
          this.isError = true
          return res
        })
    },
    // 重新刷新请求
    reloadList() {
      if (this.isError) {
        this.onRefresh()
      }
    },
    // 字符串固定位置插入字符
    insertStr(soure, start, newStr) {
      return soure.slice(0, start) + newStr + soure.slice(start)
    }
  }
}
</script>

<style scoped lang="scss">
  .van-list-empty {
    /*height: calc(100vh);*/
    /*background: #FCFCFC;*/
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .scroll-list-content {
    /deep/ .van-pull-refresh {
      min-height: inherit !important;
    }

    .van-list {
      height: inherit !important;
    }
  }

  .list-all-box {
    display: inline-block;
    width: 100%;
    height: 100%;
    overflow: auto;

    .list-box {
      display: inline-block;
      float: left;
      width: 50%;
    }
  }

  /deep/ .van-empty__bottom {
    margin-top: 25px;
  }

  .empty {
    .description {
      font-size: 32px;
      color: #1C1C1C;
      opacity: 0.94;
      letter-spacing: 0;
      text-align: center;
      line-height: 44px;
      margin-bottom: 16px;
      margin-top: 20px;

      p {
        margin-bottom: 0;
      }
    }

    .tips {
      opacity: 0.5;
      font-size: 28px;
      color: #1F1F1F;
      letter-spacing: 0;
      text-align: center;
      line-height: 44px;
    }
  }

  /deep/ .custom-image {
    padding-bottom: 120px;

    .van-empty__image {
      height: auto;
      width: 400px;
    }
  }
</style>
