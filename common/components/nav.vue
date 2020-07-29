<template>
  <div class="fly-nav">
    <div class="prefix">
      <i class="icon iconfont icon-location el-icon-location"></i>
      <span>{{leading}}</span>
    </div>
    <Breadcrumb separator-class="el-icon-arrow-right" class="main">
      <BreadcrumbItem
        v-for="(item, index) in data"
        :key="index"
        v-bind="item.link ? {to: {path: item.link}}: {}"
      >{{item.label}}</BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>

<script>
import { Breadcrumb, BreadcrumbItem } from "element-ui"
export default {
  props: {
    leading: { type: String, default: "当前位置：" },
    data: { type: Array }
  },
  components: {
    Breadcrumb,
    BreadcrumbItem
  }
}
</script>

<style lang="less" scoped>
@space: 10px;
.fly-nav {
  .prefix {
    display: inline-block;
    color: #606266;
    font-size: 14px;
    vertical-align: middle;
    .icon-location {
      font-size: 14px;
      position: relative;
      transform: scale(1.2);
      color: #dddee1;
      padding-right: @space / 2;
    }
  }
  .main {
    display: inline-block;
    vertical-align: middle;
    line-height: 1.15;
  }
  & /deep/ .el-breadcrumb__item {
    font-size: 14px;
  }
}
</style>
