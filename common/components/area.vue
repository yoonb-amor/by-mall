<template>
  <div class="fly-area" :class="{space: space, shadow: shadow, center: center}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "fly-area",
  props: {
    center: { type: Boolean, default: false },
    space: { type: Boolean, default: true },
    shadow: { type: Boolean, default: true }
  }
}
</script>

<style lang="less" scoped>
@space: 10px;
.fly-area {
  background: white;
  &.center {
    text-align: center;
  }
  &.space {
    padding: @space;
  }
  &.shadow {
    box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>
