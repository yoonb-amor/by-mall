<template>
  <Dialog
    :visible="isVisible"
    width="400px"
    title="这是一个弹框"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <Input size="mini" v-model="inputValue" />
    <div slot="footer">
      <Button size="small" type="primary" @click="_confirm">确定</Button>
      <Button size="small" @click="_cancel">取消</Button>
    </div>
  </Dialog>
</template>

<script>
import { Dialog, Input, Button } from "element-ui"
export default {
  name: "test-dialog",
  components: {
    Dialog,
    Input,
    Button
  },
  data() {
    return {
      isVisible: false,
      resolver: null,
      inputValue: ""
    }
  },
  methods: {
    open(value) {
      return new Promise(resolve => {
        this._visible(true)
        this.resolver = resolve
        this.inputValue = value
      })
    },
    _visible(is) {
      this.isVisible = is
    },
    _confirm() {
      this._visible(false)
      this.resolver(this.inputValue)
    },
    _cancel() {
      this._visible(false)
      this.resolver(false)
    }
  }
}
</script>

<style lang="less" scoped>
</style>