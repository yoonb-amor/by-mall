<template>
  <div class="fly-tree">
    <Tree
      v-show="isSync"
      default-expand-all
      highlight-current
      :node-key="nodeKey"
      ref="sync-tree"
      :data="syncTreeData"
      :props="props"
      v-bind="attrs"
      :render-content="renderContent"
      :current-node-key="currentNodeKey"
    />
    <Tree
      v-show="!isSync"
      ref="async-tree"
      :node-key="nodeKey"
      :default-expanded-keys="defaultExpandedKeys"
      highlight-current
      :props="props"
      :load="fetchAsyncTreeNodes"
      :render-content="renderContent"
      :current-node-key="currentNodeKey"
      lazy
      v-bind="attrs"
    />
  </div>
</template>

<script>
import { Tree } from "element-ui"
import _debounce from "lodash.debounce"
import delay from "../util/delay"
import _get from "../util/_get"
import fetch from "../../lib/fetch"
import qs from "qs"

const defaultFetcher = async function(node, keywords) {
  this.$loading(true)
  const nodeId = _get(node, "data.id", "")
  const nodeData = _get(node, "data", undefined)
  try {
    const payload = await this.beforeFetch(
      {
        parentId: nodeId,
        keywords
      },
      nodeData,
      node
    )
    const { status, data } = await fetch(this.url, qs.stringify(payload))
    if (status) return data
  } catch (e) {
    throw e
  } finally {
    this.$loading(false)
  }
}

export default {
  name: "tree",
  components: {
    Tree
  },
  props: {
    "render-content": {
      type: Function,
      default: (h, { node, data, store }) => (
        <span id={"tree-node-" + node.key} title={node.label}>
          {node.label}
        </span>
      )
    },
    "node-key": {
      type: String,
      default: "id"
    },
    "default-expanded-keys": {
      type: Array,
      default: () => ["00"]
    },
    "current-node-key": String,
    props: {
      // 关键节点数据项
      type: Object,
      default: () => ({
        label: "name",
        children: "childrens",
        isLeaf: (data, node) => !data.hasChild
      })
    },
    keywords: {
      // 搜索关键词
      type: String,
      default: ""
    },
    fetcher: {
      // 自定义取数据方法
      type: Function
    },
    url: {
      // 取数据url，优先级低于fetcher
      type: String
    },
    "before-fetch": {
      // 自定义url取数据前的钩子方法
      type: Function,
      default: (payload, data, node) => payload
    }
  },
  data() {
    return {
      syncTreeData: [],
      debouncedSearch: _debounce(this.fetchSyncTreeNodes, 500)
    }
  },
  methods: {
    _fetch() {
      return this.fetcher || (this.url && defaultFetcher.bind(this))
    },
    async fetchAsyncTreeNodes(node, resolve) {
      const data = await this._fetch()(node, this.keywords)
      await resolve(data)
    },
    async fetchSyncTreeNodes(node = undefined) {
      const data = await this._fetch()(node, this.keywords)
      this.syncTreeData = data
    },
    _resetNode(node) {
      node.isLeaf = false
      node.expanded = false
      node.loaded = false
    },
    async _refreshNode(nodeInstance) {
      const node = nodeInstance.node
      this._resetNode(node)
      await delay(300) // TODO: not reliable!
      nodeInstance.handleClick()
    },
    refresh(nodeInstance) {
      if (this.isSync) {
        this.fetchSyncTreeNodes()
      } else {
        const topNodeInstance = this.tree.$children[0]
        this._refreshNode(nodeInstance || topNodeInstance)
      }
    },
    clear() {
      const topNodeInstance = this.tree.$children[0]
      if (topNodeInstance) this._resetNode(topNodeInstance.node)
    },
    proxyTableListeners() {
      // 代理table原生事件
      const excludeListeners = []
      for (const key in this.$listeners) {
        if (excludeListeners.includes(key)) continue
        this.$refs["sync-tree"].$on(key, (...args) => {
          this.$emit(key, ...args)
        })
        this.$refs["async-tree"].$on(key, (...args) => {
          this.$emit(key, ...args)
        })
      }
    }
  },
  computed: {
    isSync() {
      return !!this.keywords
    },
    attrs() {
      const { fetcher, url, ...attrs } = this.$attrs
      return attrs
    },
    tree() {
      if (this.isSync) {
        return this.$refs["sync-tree"]
      } else {
        return this.$refs["async-tree"]
      }
    }
  },
  watch: {
    keywords(value) {
      this.debouncedSearch()
    }
  },
  mounted() {
    this.proxyTableListeners()
  }
}
</script>

<style lang="less" scoped>
.fly-tree {
  /deep/ .el-tree {
    font-size: 14px;
    display: inline-block;
    min-width: 100%;
  }
}
</style>
