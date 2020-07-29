<template>
  <div class="fly-layout-myn">
    <div class="fly-layout-myn-top" :style="{height: `${m - space}px`}">
      <slot name="top"></slot>
    </div>
    <div class="fly-layout-myn-middle" :style="{top: `${m}px`, bottom: `${n}px`}">
      <slot name="middle"></slot>
    </div>
    <div class="fly-layout-myn-bottom" :style="{height: `${n - space}px`}">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script>
/**
 * 纵向M:Y:N布局
 */
export default {
  name: "fly-layout-myn",
  props: {
    m: { type: Number, default: 100 },
    n: { type: Number, default: 100 },
    space: { type: Number, default: 10 }
  }
}
</script>

<style lang="less" scoped>
.fly-layout-myn {
  position: relative;
  width: 100%;
  height: 100%;
  &-top {
    position: absolute;
    width: 100%;
    top: 0;
  }
  &-middle {
    position: absolute;
    width: 100%;
  }
  &-bottom {
    position: absolute;
    width: 100%;
    bottom: 0;
  }
}
</style>