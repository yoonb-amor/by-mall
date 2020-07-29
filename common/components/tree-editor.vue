<template>
  <div class="tree-editor">
    <slot />
    <div class="action-group" v-if="!readonly">
      <i class="action-group__button left el-icon-plus" @click="nodeAdd" />
      <i class="action-group__button left el-icon-edit" @click="nodeEdit" />
      <i class="action-group__button left warning el-icon-delete" @click="nodeDelete" />
      <i
        v-show="!keywords"
        class="action-group__button el-icon-top"
        @click="nodeSwap('previousSibling')"
      />
      <i
        v-show="!keywords"
        class="action-group__button el-icon-bottom"
        @click="nodeSwap('nextSibling')"
      />
    </div>
    <div class="main" :style="{top: !readonly && 36 || 0}">
      <div class="search">
        <Input
          placeholder="请输入关键字查询"
          size="small"
          v-model="keywords"
          prefix-icon="el-icon-search"
          clearable
        />
      </div>
      <div class="inner">
        <Tree
          ref="tree"
          v-bind="tree"
          :keywords="keywords"
          @node-click="nodeClick"
          :current-node-key="defaultRootNode.value"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"
import { Button, Message, Input } from "element-ui"
import Tree from "./tree"
import _debounce from "lodash.debounce"
import _get from "../util/_get"
import delay from "../util/delay"
import fetch from "../../lib/fetch"
import qs from "qs"

const defaultNodeAddFetcher = async function(payload) {
  try {
    this.$loading(true)
    const { status } = await fetch(this.nodeAddUrl, qs.stringify(payload))
    return status
  } catch (e) {
    throw e
  } finally {
    this.$loading(false)
  }
}

const defaultNodeEditFetcher = async function(payload) {
  try {
    this.$loading(true)
    const { status } = await fetch(this.nodeEditUrl, qs.stringify(payload))
    return status
  } catch (e) {
    throw e
  } finally {
    this.$loading(false)
  }
}

const defaultNodeDeleteFetcher = async function(payload) {
  try {
    this.$loading(true)
    const { status } = await fetch(this.nodeDeleteUrl, qs.stringify(payload))
    return status
  } catch (e) {
    throw e
  } finally {
    this.$loading(false)
  }
}

const defaultNodeSwapFetcher = async function(payload) {
  try {
    this.$loading(true)
    const { status } = await fetch(this.nodeSwapUrl, qs.stringify(payload))
    return status
  } catch (e) {
    throw e
  } finally {
    this.$loading(false)
  }
}

export default {
  name: "tree-editor",
  components: { Button, Tree, Input },
  props: {
    tree: Object,
    "default-root-node": {
      type: Object,
      default: () => ({ label: "全部", value: "00" })
    },
    readonly: {
      type: Boolean,
      default: false
    },
    "before-node-add-fetch": {
      type: Function,
      default: async function(node) {
        const dialog = _get(this.$slots, "default[0].componentInstance", null)
        if (!dialog) throw new Error("请配置tree-editor-dialog")
        return await dialog.open("new", {
          parentName: _get(node, "data.name", this.defaultRootNode.label),
          parentId: _get(node, "data.id", this.defaultRootNode.value),
          code: _get(node, "data.code", "")
        })
      }
    },
    "node-add-fetcher": Function,
    "node-add-url": String,
    "before-node-edit-fetch": {
      type: Function,
      default: async function(node) {
        const dialog = _get(this.$slots, "default[0].componentInstance", null)
        if (!dialog) throw new Error("请配置tree-editor-dialog")
        const data = await dialog.open("edit", {
          parentName: _get(node, "data.parentName", ""),
          parentId: _get(node, "data.parentId", ""),
          parentId_: _get(node, "data.parentId", ""),
          name: _get(node, "data.name", ""),
          code: _get(node, "data.code", ""),
          code_: _get(node, "data.code", ""),
          describes: _get(node, "data.describes")
        })
        if (data === false) return false
        return Object.assign({ id: _get(node, "data.id", "") }, data)
      }
    },
    "node-edit-fetcher": Function,
    "node-edit-url": String,
    "before-node-delete-fetch": {
      type: Function,
      default: node => {
        const nodeId = _get(node, "data.id", "")
        return { ids: [nodeId].join("") }
      }
    },
    "node-delete-fetcher": Function,
    "node-delete-url": String,
    "before-node-swap-fetch": {
      type: Function,
      default: (sourceNode, targetNode) => {
        const [sourceId, destId] = [
          _get(sourceNode, "data.id"),
          _get(targetNode, "data.id")
        ]
        return { sourceId, destId }
      }
    },
    "node-swap-fetcher": Function,
    "node-swap-url": String
  },
  data() {
    return {
      keywords: "",
      currentNodeInstance: null
    }
  },
  methods: {
    currentNodePrecheck() {
      if (!this.currentNodeInstance) {
        Message.warning("请选择要操作的节点")
        return false
      }
      return true
    },
    nodeClick(nodeData, node, nodeInstance) {
      this.currentNodeInstance = nodeInstance
      this.$emit("node-click", nodeData, node, nodeInstance)
    },
    async nodeAdd() {
      const currentNode = _get(this.currentNodeInstance, "node", undefined)
      const payload = await this.beforeNodeAddFetch(currentNode)
      if (payload === false) return
      const isSuccess = await ((this.nodeAddFetcher && this.nodeAddFetcher) ||
        defaultNodeAddFetcher.bind(this))(payload)
      if (!isSuccess) return
      this.$message.success("操作成功")
      this.$refs.tree.refresh() // 删除成功更新根节点
    },
    async nodeEdit(node) {
      if (
        !this.currentNodeInstance ||
        _get(this.currentNodeInstance, "node.data.id", "") ===
          this.defaultRootNode.value
      )
        return this.$message.error("无法编辑根节点")
      if (!this.currentNodePrecheck()) return
      const currentNode = this.currentNodeInstance.node
      const payload = await this.beforeNodeEditFetch(currentNode)
      if (payload === false) return
      const isSuccess = await ((this.nodeEditFetcher && this.nodeEditFetcher) ||
        defaultNodeEditFetcher.bind(this))(payload)
      if (!isSuccess) return
      this.$message.success("操作成功")
      this.$refs.tree.refresh() // 编辑成功更新根节点
    },
    async nodeDelete() {
      if (
        !this.currentNodeInstance ||
        _get(this.currentNodeInstance, "node.data.id", "") ===
          this.defaultRootNode.value
      )
        return this.$message.error("无法删除根节点")
      if (!this.currentNodePrecheck()) return
      if (!(await this.$confirm("是否删除所选节点？"))) return
      const currentNode = this.currentNodeInstance.node
      this.$loading(true)
      const payload = await this.beforeNodeDeleteFetch(currentNode)
      const isSuccess = await ((this.nodeDeleteFetcher &&
        this.nodeDeleteFetcher(currentNode)) ||
        defaultNodeDeleteFetcher.bind(this)(payload))
      this.$loading(false)
      if (!isSuccess) return
      this.$message.success("操作成功")
      this.$refs.tree.refresh(this.currentNodeInstance.$parent) // 删除成功更新父节点
    },
    async nodeSwap(siblingKey) {
      if (!this.currentNodePrecheck()) return
      const currentNode = this.currentNodeInstance.node
      const targetNode = currentNode[siblingKey]
      if (!targetNode) return Message.error("无法移动节点")
      this.$loading(true)
      const payload = await this.beforeNodeSwapFetch(currentNode, targetNode)
      const isSuccess = await ((this.nodeSwapFetcher &&
        this.nodeSwapFetcher(currentNode, targetNode)) ||
        defaultNodeSwapFetcher.bind(this)(payload))
      this.$loading(false)
      if (isSuccess) Message.success("操作成功")
      this.$refs.tree.refresh(this.currentNodeInstance.$parent) // 对调成功更新父节点
    }
  }
}
</script>

<style lang="less" scoped>
@space: 10px;
.tree-editor {
  height: 100%;
  position: relative;
  .action-group {
    background: #f7f8f9;
    padding: @space / 1.5;
    border-bottom: 1px solid #dcdcdc;
    text-align: right;
    &:after {
      clear: both;
      content: "";
      display: block;
      width: 0;
      height: 0;
      visibility: hidden;
    }
    &__button {
      transition: all 0.2s ease;
      cursor: pointer;
      font-size: 13px;
      font-weight: bold;
      background: #ebf2fe;
      color: #4071f6;
      border: 1px solid #4675e9;
      border-radius: 4px;
      padding: @space / 3;
      opacity: 0.7;
      margin-right: @space / 1.5;
      &:last-child {
        margin-right: 0;
      }
      &.warning {
        color: #df6661;
        border-color: #df6661;
        background-color: #f6e8e7;
      }
      &.left {
        float: left;
      }
      &:hover {
        opacity: 1;
      }
    }
  }
  .main {
    position: absolute;
    top: 36px;
    right: 0;
    bottom: 0;
    left: 0;
    .search {
      padding: @space;
    }
    .inner {
      overflow: auto;
      position: absolute;
      top: 52px;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
}
</style>
