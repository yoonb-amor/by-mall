<template>
  <div class="fly-foldable">
    <Collapse v-model="activeNames">
      <CollapseItem name="default">
        <template slot="title">
          <slot name="title"></slot>
        </template>
        <slot></slot>
      </CollapseItem>
    </Collapse>
  </div>
</template>

<script>
import { Collapse, CollapseItem } from "element-ui"
export default {
  name: "fly-foldable",
  components: {
    Collapse,
    CollapseItem
  },
  data() {
    return {
      activeNames: ["default"]
    }
  }
}
</script>

<style lang="less" scoped>
@space: 10px;
.fly-foldable {
  /deep/ .el-collapse {
    border-top: none;
    border-bottom: none;
    .el-collapse-item__header {
      border-bottom: none;
      padding: @space / 2 @space;
      &:after {
        content: "展开";
        font-weight: normal;
        color: #666666;
      }
      &.is-active:after {
        content: "收起";
        font-weight: normal;
        color: #666666;
      }
    }
    .el-collapse-item__wrap {
      border-top: 1px solid #e5e5e5;
      border-bottom: none;
      padding: @space;
      overflow: inherit;
    }
    .el-collapse-item__content {
      padding: 0;
    }
  }
}
</style>
