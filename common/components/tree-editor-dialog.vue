<template>
  <Dialog
    class="tree-editor-dialog"
    :visible="isDialogVisible"
    :title="title"
    width="450px"
    :before-close="() => cancel()"
    :close-on-click-modal="false"
  >
    <Form ref="form" label-width="80px" size="small" :model="formModel" :rules="formRules">
      <FormItem label="分类代码" prop="code">
        <Input :disabled="true" v-model="formModel.code" :maxlength="200" />
      </FormItem>
      <FormItem label="分类名称" prop="name" required>
        <Input v-model="formModel.name" :maxlength="200" placeholder="请输入" />
      </FormItem>
      <FormItem label="父类" prop="parentName" required>
        <Popover width="350" v-model="isPopoverVisible" placement="bottom-start">
          <div class="tree-popper">
            <Tree :key="key_" ref="tree" @node-click="parentNodeChoose" v-bind="tree" />
          </div>
          <Input
            slot="reference"
            v-model="formModel.parentName"
            :maxlength="200"
            placeholder="请选择"
          />
        </Popover>
      </FormItem>
      <FormItem label="描述" prop="describes">
        <Input v-model="formModel.describes" :maxlength="500" show-word-limit placeholder="请输入" />
      </FormItem>
    </Form>
    <div :style="{'text-align': 'center'}">
      <Button type="primary" @click="confirm">确定</Button>
      <Button @click="cancel()">取消</Button>
    </div>
  </Dialog>
</template>

<script>
import { Dialog, Form, FormItem, Button, Input, Popover } from "element-ui"
import qs from "qs"
import fetch from "../../lib/fetch"
import Tree from "./tree"
import TreeInput from "./tree-input"
import _get from "../util/_get"

const defaultTypeCodeFetcher = async function(url, parentNodeId) {
  this.$loading(true)
  try {
    const payload = this.beforeFetch(parentNodeId)
    let response = await fetch(url, qs.stringify(payload))
    return this.afterFetch(response)
  } catch (e) {
    throw e
  } finally {
    this.$loading(false)
  }
}

export default {
  name: "tree-editor-dialog",
  components: {
    Dialog,
    Form,
    FormItem,
    Button,
    Input,
    Popover,
    Tree,
    TreeInput
  },
  props: {
    tree: Object,
    "before-fetch": {
      type: Function,
      default: parentId => ({ parentId })
    },
    url: String,
    "after-fetch": {
      type: Function,
      default: response => _get(response, "data")
    }
  },
  data() {
    return {
      key_: "",
      action: "",
      isDialogVisible: false,
      isPopoverVisible: false,
      formModel: {
        code: "",
        code_: "",
        name: "",
        parentId: "",
        parentId_: "",
        parentName: "",
        parentCode: "",
        describes: ""
      },
      formRules: {
        name: [
          {
            required: true,
            message: "请输入分类名称",
            trigger: ["blur", "change"]
          }
        ],
        parentName: [
          {
            required: true,
            message: "请选择父类",
            validator: (rule, value, callback) => {
              if (!this.formModel.parentId) {
                callback(new Error(rule.message))
              }
              callback()
            },
            trigger: ["blur", "change"]
          }
        ]
      }
    }
  },
  methods: {
    _showDialog(is) {
      this.isDialogVisible = is
    },
    open(action, formData = {}) {
      this.key_ = +new Date()
      this.action = action
      for (const key in this.formModel) {
        this.formModel[key] = formData[key]
      }
      this._showDialog(true)
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
      return new Promise(resolve => {
        this.resolve = resolve
      })
    },
    _clear() {
      for (const key in this.formModel) {
        this.formModel[key] = ""
      }
    },
    confirm() {
      const form = this.$refs.form
      form.validate(isValid => {
        if (!isValid) return
        this.$emit("change", this.formModel)
        this.resolve && this.resolve(JSON.parse(JSON.stringify(this.formModel)))
        this._showDialog(false)
        this._clear()
      })
    },
    cancel() {
      this._showDialog(false)
      this._clear()
      this.resolve && this.resolve(false)
    },
    async parentNodeChoose(nodeData, node, nodeInstance) {
      this.isPopoverVisible = false
      this.formModel.parentName = nodeData.name
      this.formModel.parentId = nodeData.id
      this.formModel.parentCode = nodeData.code
      // 节点编码
    },
    async fetchTypeCode() {
      this.formModel.code = await defaultTypeCodeFetcher.bind(this)(
        this.url,
        this.formModel.parentId
      )
    }
  },
  watch: {
    isPopoverVisible(is) {
      // if (is) this.$refs.tree.clear()
    },
    "formModel.parentId": async function(value) {
      if (!this.isDialogVisible) return
      this.$nextTick(() => {
        if (this.action === "new") return this.fetchTypeCode()
        if (
          this.action === "edit" &&
          this.formModel.parentId_ &&
          value === this.formModel.parentId_
        ) {
          return (this.formModel.code = this.formModel.code_)
        } else {
          return this.fetchTypeCode()
        }
      })
    }
  },
  computed: {
    title() {
      return (
        (this.action === "new" && "新增") ||
        (this.action === "edit" && "编辑") ||
        ""
      )
    }
  }
}
</script>

<style lang="less" scoped>
.tree-popper {
  max-height: 200px;
  overflow-y: auto;
}
</style>
