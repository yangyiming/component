<template>
  <div id="app">
    <div class="main">
      <div class="demo-nav">
        <div class="demo-nav__title">{{title}}</div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  /deep/.page-mobile {
    flex: 1;
  }
}
.demo-nav {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    height: 56px;
    background-color: #fff;
}
.demo-nav__title {
    font-weight: 600;
    font-size: 17px;
    text-transform: capitalize;
}
</style>
<script>
  export default {
    name: 'app',
    data() {
      return {
  
      }
    },
    computed: {
      title() {
        return this.$route.name || ''
      }
    },
    watch: {
    },
    created() {
    },
    mounted() {

    },
    methods: {
  
    }

  };
</script>
