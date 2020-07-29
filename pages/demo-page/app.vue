<template>
  <div id="app">
    <Loading :visible="$store.state.isLoading" />
    <div class="nav">
      <Nav :data="NAV_DATA" />
    </div>
    <Main />
  </div>
</template>

<script>
import Vue from "vue"
import Loading from "../../common/components/loading"
import Nav from "../../common/components/nav"
import Main from "./components/main"
import { NAV_DATA } from "./constants"

export default {
  name: "app",
  components: {
    Loading,
    Nav,
    Main
  },
  data() {
    return {
      NAV_DATA
    }
  }
}
</script>

<style lang="less" scoped>
@space: 10px;
#app {
  width: 100%;
  min-height: 100%;
  background: #f7f9fd;
  .nav {
    padding: @space;
  }
}
</style>
