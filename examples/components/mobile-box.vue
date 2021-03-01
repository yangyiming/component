<template>
    <div class="mobile-box">
        <qrcode-vue :value="src" class="qrcode"></qrcode-vue>
        <iframe :src="src" frameborder="0" class="iframe"></iframe>
    </div>
</template>
<style land="scss" scoped>
.mobile-box {
    width: 350px;
    height: 500px;
    margin: auto;
    background: #fafafa;
    border-radius: 12px;
    box-shadow: #ebedf0 0 4px 12px;
    position: relative;
}
.iframe{
    width: 100%;
    height: 100%;
}
.qrcode {
  position: absolute;
  left: -200px;
}
</style>
<script>
import QrcodeVue from 'qrcode.vue'
export default {
  components: {
    QrcodeVue
  },
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  data() {
    const src = `${window.location.origin}/#/${this.url}`
    return {
      src
    }
  },
  created() {

  },
  methods: {

  }
}
</script>