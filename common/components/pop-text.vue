<template>
  <div class="fly-pop-text-wrapper">
    <div class="fly-pop-text" @mouseover="onMouseOver" @mouseleave="onMouseLeave">
      <div class="inner" :class="{visible: !isMouseOver}">
        <slot name="prepend"></slot>
        <span v-if="html" v-html="html"></span>
        <slot v-else></slot>
        <slot name="append"></slot>
      </div>
      <div class="inner-layer" :class="{visible: isMouseOver}">
        <span class="text">
          <slot name="prepend"></slot>
          <span v-if="html" v-html="html"></span>
          <slot v-else></slot>
          <slot name="append"></slot>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMouseOver: false
    }
  },
  methods: {
    onMouseOver() {
      this.isMouseOver = true
    },
    onMouseLeave() {
      this.isMouseOver = false
    }
  },
  computed: {
    html() {
      return this.$attrs.html
    }
  }
}
</script>

<style lang="less" scoped>
@import "../style/variables.less";
.fly-pop-text-wrapper {
  position: relative;
  width: 100%;
  .fly-pop-text {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    width: 100%;
    > .inner {
      transition: all 0.3s ease;
      width: 100%;
      visibility: hidden;
      opacity: 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      &.visible {
        opacity: 1;
        visibility: visible;
      }
    }
    > .inner-layer {
      padding-right: 2px;
      border-radius: 2px;
      transition: all 0.3s ease;
      position: absolute;
      left: 0;
      top: 0;
      overflow: visible;
      z-index: 999999;
      visibility: hidden;
      white-space: nowrap;
      opacity: 0;
      &.visible {
        opacity: 1;
        visibility: visible;
      }
    }
    .text {
      &:extend(.box-shadow);
      background: white;
    }
  }
}
</style>
