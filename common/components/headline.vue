<template>
  <div class="fly-headline" :class="{space: space, background: background}">
    <div class="fly-headline-title">
      <span>{{title}}</span>
      <span class="fly-headline-title-description">{{description}}</span>
    </div>
    <div class="fly-headline-title-actions">
      <div class="fly-headline-title-actions-inner">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "fly-headline",
  props: {
    space: {
      type: Boolean,
      default: true
    },
    background: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    description: {
      type: String
    }
  }
}
</script>

<style lang="less" scoped>
@space: 10px;
.fly-headline {
  position: relative;
  &:before {
    content: "";
    position: absolute;
    width: 7px;
    height: 40%;
    background: #2963ff;
    left: 10px;
    top: 30%;
    border-radius: 5px;
  }
  &.space {
    margin-bottom: @space;
  }
  &.background {
    background: #eaf2ff;
  }
  &-title {
    padding-left: 25px;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    font-weight: bold;
    text-align: left;
    &-description {
      color: #87898c;
      font-size: 12px;
      padding-left: 12px;
    }
    &-actions {
      position: absolute;
      right: 10px;
      top: 0;
      line-height: 40px;
      height: 100%;
      font-size: 12px;
      color: #7b7c7f;
      &-inner {
        display: inline-block;
        vertical-align: middle;
      }
      &:after {
        content: "";
        display: inline-block;
        width: 0;
        height: 100%;
        vertical-align: middle;
      }
    }
  }
}
</style>