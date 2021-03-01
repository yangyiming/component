<template>
  <div id="app" :class="{ 'is-component': isComponent }">
    <main-header ></main-header>
    <div class="main-cnt">
      <router-view></router-view>
    </div>
    <main-footer v-if="!isComponent"></main-footer>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
  
      }
    },
    computed: {
      isComponent() {
        return /^component-/.test(this.$route.name || '');
      }
    },
    watch: {
    },

    methods: {
  
    },

    mounted() {
    }
  };
</script>
