<template>
  <div id="app" ref="myref" style="overflow-y:auto">
    <tabbar v-if="$store.state.showTabbar"></tabbar>
    <router-view></router-view>
  </div>
</template>

<script>
import tabbar from "@/components/Tabbar";
export default {
  mounted() {
    console.log(this.$refs.myref.style.height);
    this.$refs.myref.style.height =
      document.documentElement.clientHeight - 50 + "px";
  },
  data() {
    return {};
  },
  components: {
    tabbar: tabbar
  }
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
html {
  height: 100%;
}
li {
  list-style: none;
}
</style>
