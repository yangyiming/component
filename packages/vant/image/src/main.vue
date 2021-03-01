<template>
    <div class="zt-van-image">       
      <van-image :src="src" :fit="fit" :round="round" :error-icon="errorUrl" :show-loading="showLoading" :show-error="showError" :width="width" :height="height" @load="loadImg" @error="loadError">
        <template slot="loading">
            <van-loading size="20" />
        </template>
        <template slot="default" v-if="showDefault && !showLoading && loadding">
          <div class="van-image__error">
            <img :src="defaultUrl" alt="" class="default-img">
          </div>
        </template>
      </van-image>
    </div>
</template>
<script>
const namespace = 'Zt'
import { Image, Loading } from 'vant';
import 'vant/lib/image/style';
import 'vant/lib/loading/style';
export default ({
  name: namespace + 'VanImage',
  components: {
    [Image.name]: Image,
    [Loading.name]: Loading
  },
  props: {
    src: {
      type: String,
      default: ''
    },
    fit: {
      type: String,
      default: 'cover'
    },
    round: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 100
    },
    showLoading: {
      type: Boolean,
      default: false
    },
    showError: {
      type: Boolean,
      default: true
    },
    showDefault: {
      type: Boolean,
      default: true
    },
    defaultUrl: {
      type: String,
      default: 'data:image/png;base64,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'
    },
    errorUrl: {
      type: String,
      default: 'data:image/png;base64,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'
    }
  },
  computed: {},
  watch: {},
  data() {
    return {
      loadding: true,
      error: false
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    loadImg() {
      this.$emit('load')
      this.loadding = false
    },
    loadError() {
      this.$emit('error')
      // this.loadding = false
      this.loadding = false
      // this.showLoading = false
      this.error = true
    }
  }
})
</script>
<style lang="scss" scoped>
.zt-van-image {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .van-image {
    border-radius: 12px;
    overflow: hidden;
    &.van-image--round {
      overflow: hidden;
      border-radius: 50%;
    }
  }
  .default-img {
    height: 100%;
  }
}
</style>
