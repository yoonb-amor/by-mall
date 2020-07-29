<template>
  <div class="iframer">
    <Dialog :visible="localVisible" :title="title" top="7vh" v-bind="attrs">
      <iframe v-if="persist || localVisible" :src="src" frameborder="0"></iframe>
    </Dialog>
  </div>
</template>

<script>
import { Dialog } from "element-ui"
export default {
  name: "iframer",
  components: {
    Dialog
  },
  props: {
    visible: {
      type: Boolean
    },
    persist: {
      type: Boolean,
      default: true
    },
    src: {
      type: String
    },
    prepare: {
      type: Function
    },
    title: {
      type: String
    }
  },
  computed: {
    localVisible() {
      return this.$props.visible
    },
    attrs() {
      const { visible, src, title, ...attrs } = this.$attrs
      return attrs
    }
  },
  watch: {
    localVisible(visible) {
      if (visible) {
        this.prepare && this.prepare()
      }
    }
  },
  mounted() {
    if (this.localVisible) {
      this.prepare && this.prepare()
    }
  }
}
</script>

<style lang="less" scoped>
.iframer {
  /deep/ iframe {
    width: 100%;
    height: 100%;
    min-height: 400px;
    border: none;
  }
  /deep/ .el-dialog__body {
    // background: #f9fbfd;
  }
}
</style>
