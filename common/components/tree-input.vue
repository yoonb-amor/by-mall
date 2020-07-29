<template>
  <div ref="self" class="tree-input">
    <Popover :width="inputWidth" v-model="visible" placement="bottom-start" :popper-options="{}">
      <div class="tree-input-popper" :key="key">
        <div class="tree-input-popper-search">
          <Input
            size="mini"
            v-model="keywords"
            :style="{width: '60%'}"
            prefix-icon="el-icon-search"
            placeholder="输入关键字搜索"
          />
        </div>
        <Tree ref="tree" @node-click="nodeClick" v-bind="$attrs" :keywords="keywords" />
      </div>
      <Input
        ref="reference"
        slot="reference"
        @focus="keywords = ''"
        :value="value.label"
        :maxlength="200"
        suffix-icon="el-icon-arrow-down"
      />
    </Popover>
  </div>
</template>

<script>
// import {
//   addResizeListener,
//   removeResizeListener
// } from "element-ui/src/utils/resize-event"
import Tree from "./tree"
import _get from "../util/_get"
import { Popover, Input } from "element-ui"
export default {
  name: "tree-input",
  components: { Popover, Tree, Input },
  data() {
    return {
      key: "",
      visible: false,
      inputWidth: 0,
      keywords: ""
    }
  },
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    value: {
      type: Object,
      default: () => ({ label: "", value: "" })
    },
    "after-click": {
      type: Function,
      default: node => ({
        value: _get(node.data, "id"),
        label: _get(node.data, "name")
      })
    }
  },
  methods: {
    nodeClick(nodeData, node) {
      this.$emit("change", this.afterClick(node))
      this.visible = false
    },
    resetInputWidth() {
      this.inputWidth = this.$refs.reference.$el.getBoundingClientRect().width
    }
  },
  mounted() {
    this.resetInputWidth()
    // addResizeListener(this.$el, this.resetInputWidth)
  },
  beforeDestroy() {
    // if (this.$el && this.handleResize)
    //   removeResizeListener(this.$el, this.handleResize)
  }
}
</script>

<style lang="less">
@space: 10px;
.tree-input {
  position: relative;
  display: inline-block;
  width: 100%;
  &-popper {
    max-height: 200px;
    overflow-y: auto;
    &-search {
      text-align: center;
      padding: @space 0;
    }
  }
}
</style>