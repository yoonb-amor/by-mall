<template>
  <div class="test-basic">
    <Headline title="测试项目" description="测试内容如下" background>
      <Button size="mini" plain type="primary">测试按钮</Button>
    </Headline>
    <Button @click="test1" size="mini">确认框与消息提示</Button>
    <br />
    <br />
    <Button @click="test2" size="mini">全局loading</Button>
    <br />
    <br />
    <Button @click="test3" size="mini">URL参数</Button>
    <br />
    <br />
    <Button @click="test4" size="mini">调用服务</Button>
    <br />
    <br />
    <Dialog ref="dialog" />
    <Button @click="test5" size="mini">弹窗传值的推荐写法</Button>
    <br />
    <br />
    <ButtonGroup :threshold="2">
      <Button size="mini">按钮1</Button>
      <Button size="mini">按钮2</Button>
      <Button size="mini">按钮3</Button>
      <Button size="mini">按钮4</Button>
    </ButtonGroup>
    <br />
    <Readonly :enabled="true">
      <Select value="1">
        <Option label="输入控件转换为普通文本" value="1"></Option>
        <Option label="编辑模式转换为查看模式" value="2"></Option>
      </Select>
    </Readonly>
  </div>
</template>

<script>
import delay from "../../../../common/util/delay"
import { Button, Select, Option } from "element-ui"
import Headline from "../../../../common/components/headline"
import ButtonGroup from "../../../../common/components/button-group"
import Readonly from "../../../../common/components/readonly"
import Dialog from "./dialog"
export default {
  name: "test-basic",
  components: {
    Headline,
    Button,
    ButtonGroup,
    Readonly,
    Select,
    Option,
    Dialog
  },
  methods: {
    async test1() {
      const isConfirmed = await this.$confirm("你好，世界！")
      if (!isConfirmed) return this.$message.warning("点击了取消")
      this.$message.success("点击了确定")
    },
    async test2() {
      this.$loading(true)
      await delay(1000)
      this.$loading(false)
    },
    async test3() {
      this.$alert(`当前URL的查询参数为: ${JSON.stringify(this.$query)}`)
    },
    async test4() {
      this.$loading(true)
      try {
        const { status, data } = await this.$service.xService()
      } catch (e) {
        this.$message.error(`${e.message}`)
      } finally {
        this.$loading(false)
      }
    },
    async test5() {
      const value = await this.$refs.dialog.open(
        "传入的值，随意编辑后请点击确定"
      )
      if (value === false) return this.$message.error("点击了取消")
      this.$message.success(value)
    }
  }
}
</script>

<style lang="less" scoped>
</style>