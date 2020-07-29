<template>
  <div class="fly-layout-mxn" :class="{border: border}" :style="{'border-color': borderColor}">
    <div
      v-if="!!m"
      class="fly-layout-mxn-left fly-layout-mxn-block"
      :style="{width: `${m - margin}px`, 'border-color': borderColor}"
    >
      <slot name="left" />
    </div>
    <div
      class="fly-layout-mxn-center fly-layout-mxn-block"
      :style="{'margin-left': `${m}px`, 'margin-right': `${n}px`, 'border-color': borderColor}"
    >
      <slot name="center" />
    </div>
    <div
      v-if="!!n"
      class="fly-layout-mxn-right fly-layout-mxn-block"
      :style="{width: `${n - margin}px`, 'border-color': borderColor}"
    >
      <slot name="right" />
    </div>
  </div>
</template>

<script>
/**
 * 横向M:X:N布局
 */
export default {
  name: "fly-layout-mxn",
  props: {
    m: { type: Number, default: 300 },
    n: { type: Number, default: 300 },
    space: { type: [Number, Boolean], default: true },
    border: { type: [Boolean, String], default: false }
  },
  computed: {
    margin() {
      if (this.space === false) return 0
      if (this.space === true) return 10
      return this.space
    },
    borderColor() {
      if (this.border === false) return ""
      if (this.border === true) return "#e5e5e5"
      return this.border
    }
  }
}
</script>

<style lang="less" scoped>
.fly-layout-mxn {
  width: 100%;
  position: relative;
  @border: 1px solid #e5e5e5;
  &.border {
    border: @border;
    .fly-layout-mxn-block {
      border-right: @border;
      &:last-child {
        border-right: none;
      }
    }
  }
  &-left {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    & > div {
      height: 100%;
    }
  }
  &-center {
    z-index: 2;
    position: relative;
    width: auto;
  }
  &-right {
    z-index: 3;
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    & > div {
      height: 100%;
    }
  }
}
</style>