<template>
  <div class="my-image" :class="{'my-image-error': isError, 'my-image-heade': type == 'heade'}" :style="{width: width, height: height}">
    <van-image
      lazy-load
      :fit="fit"
      :src="src"
      @error="onError"
      :radius="radius"
    >
      <img v-if="errorSrc" slot="error" :height="errorHeight || height" :width="errorWidth || width" :src="errorSrc" alt="">
      <van-loading slot="loading" type="spinner" size="20"/>
    </van-image>
    <slot></slot>
  </div>
</template>

<script>
import { Image, Loading } from 'vant'
export default {
  name: 'ScpImageBox',
  components: { vanImage: Image, vanLoading: Loading },
  props: {
    src: {
      type: String,
      default: ''
    },
    radius: {},
    fit: {
      type: String,
      default: 'fill'
    },
    type: {
      type: String,
      default: '' // heade
    },
    errorSrc: { // 加载错误显示的图片
      type: String,
      default: ''
    },
    errorWidth: {
      type: String,
      default: '30px'
    },
    errorHeight: {
      type: String,
      default: '30px'
    },
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isError: false
    }
  },
  methods: {
    onError() {
      this.isError = true
    }
  }
}
</script>

<style scoped lang="scss">
  .my-image {
    display: inline-block;
    text-align: center;
    width: 100%;
    position: relative;

    &.my-image-heade {
      border-radius: 50%;
      overflow: hidden;

      /deep/ .van-image__img {
        border-radius: 50%;
      }

      /deep/ .van-image__error img {
        width: 100%;
        height: 100%;
      }
    }

    .van-image {
      width: 100%;
      height: 100%;
      text-align: center;
    }

    /deep/ .van-image__error {
      background: #F8F8F7;
    }

    /deep/ .van-image__loading {
      background: transparent;
    }
  }
</style>
