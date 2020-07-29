<template>
  <div class="fly-input">
    <ElInput @input="inputEvent" v-bind="$attrs" />
    <div
      v-if="isShowLimit"
      class="fly-input_hint"
      :class="{'fly-input_hint--warning': $attrs.value.length == $attrs.maxlength}"
    >{{`${$attrs.value.length} / ${$attrs.maxlength}`}}</div>
  </div>
</template>

<script>
import { Input } from "element-ui"
export default {
  name: "fly-input",
  components: {
    ElInput: Input
  },
  data() {
    return {
      value: this.$attrs.value
    }
  },
  prop: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    inputEvent(e) {
      this.$emit("input", e)
    }
  },
  computed: {
    isShowLimit() {
      return "maxlength" in this.$attrs && !this.$attrs.disabled
    }
  }
}
</script>

<style lang="less">
.fly-input {
  position: relative;
  &_hint {
    position: absolute;
    bottom: 5px;
    right: 8px;
    font-size: 12px;
    line-height: 12px;
    &--warning {
      color: red;
    }
  }
}
</style>
