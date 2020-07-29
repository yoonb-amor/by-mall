<template>
  <div class="fly-smart-table">
    <div v-if="custom" class="fly-smart-table-main">
      <slot :$data="data" />
    </div>
    <div v-else class="fly-smart-table-main">
      <Table
        :class="{'show-empty-tip': showEmptyTip}"
        ref="table"
        :data="data"
        :stripe="true"
        size="small"
        border
        v-bind="$attrs"
      >
        <slot></slot>
      </Table>
    </div>
    <br />
    <div class="fly-smart-table-pagination">
      <Pagination
        background
        prev-text="上一页"
        next-text="下一页"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        :current-page.sync="pageNo"
        @current-change="pageNoChange"
        @size-change="pageSizeChange"
        v-bind="pagination"
      />
    </div>
  </div>
</template>

<script>
// 默认分页组
const defaultPageSizes = [10, 30, 50, 100]
// 默认fetch
const defaultFetch = async function(url, payload) {
  this.$loading(true)
  try {
    return await fetch(url, qs.stringify(payload))
  } catch (e) {
    throw e
  } finally {
    this.$loading(false)
  }
}

import { Table, Pagination } from "element-ui"
import _get from "../util/_get"
import fetch from "../../lib/fetch"
import qs from "qs"

export default {
  name: "smart-table",
  props: {
    auto: { type: Boolean, default: true },
    initialPageNo: { type: Number, default: 1 },
    pageSizes: { type: Array, default: () => defaultPageSizes },
    url: { type: String },
    pagination: Object,
    "before-fetch": {
      // beforeFetch方法用于在发送请求前进行最后的准备工作
      // 默认实现如下，可以覆盖此方法
      // 自定义实现pageSize与pageNo转换
      // 也可以增加额外参数
      type: Function,
      default: (pageSize, pageNo) => ({
        pageSize,
        currentPageNo: pageNo
      })
    },
    fetch: {
      // async fetch方法用于完全自定义如何取数据，优先级高于url
      type: Function
    },
    "after-fetch": {
      // afterFetch方法用于在请求完成时进行数据转换
      // 默认实现如下，可以覆盖此方法
      // 它关注的是取到的数据如何使用，比如从哪里取total和data
      type: Function,
      default: (response, intendedPageSize, intendedPageNo) => ({
        data: _get(response, "data.result", []),
        total: _get(response, "data.total", 0),
        pageSize: intendedPageSize,
        pageNo: intendedPageNo
      })
    },
    custom: {
      // 完全自定义展示的开关，嵌套组件要使用作用域插槽 <template slot-scope="scope"><div>{{scope.data}}</div></template>
      type: Boolean,
      default: false
    },
    "show-empty-tip": {
      type: Boolean,
      default: true
    }
  },
  components: { Table, Pagination },
  data() {
    return {
      data: [],
      total: 0,
      pageSize: this.pageSizes[0],
      pageNo: this.initialPageNo
    }
  },
  computed: {},
  methods: {
    async reload(pageNo) {
      if (pageNo !== undefined) {
        await this.pageNoChange(pageNo)
      } else {
        await this.pageNoChange(this.pageNo)
      }
    },
    async pageNoChange(pageNo) {
      await this._fetch(this.pageSize, pageNo)
    },
    async pageSizeChange(pageSize) {
      this.pageSize = pageSize
      this.pageNo = this.initialPageNo
      await this._fetch(this.pageSize, this.pageNo)
    },
    async _fetch(intendedPageSize, intendedPageNo) {
      const fetch = this.fetch || defaultFetch.bind(this)
      const payload = await this.beforeFetch(intendedPageSize, intendedPageNo)
      if (payload === false) return
      const response = await fetch(this.url, payload)
      const { data, total, pageSize, pageNo } = this.afterFetch(
        response,
        intendedPageSize,
        intendedPageNo
      )
      this.data = data
      this.pageSize = pageSize
      this.pageNo = pageNo
      this.total = total
    },
    proxyTableListeners() {
      // 代理table原生事件
      const excludeListeners = [""]
      for (const key in this.$listeners) {
        if (excludeListeners.includes(key)) continue
        this.$refs.table.$on(key, (...args) => {
          this.$emit(key, ...args)
        })
      }
    },
    preCheck() {
      if (!(this.url || this.fetch)) {
        throw new Error("必须指定fetch或url")
      }
      if (this.custom && !this.$scopedSlots.default) {
        throw new Error("自定义列表模板必须指定 scoped slots")
      }
    }
  },
  mounted() {
    this.preCheck()
    this.proxyTableListeners()
    this.$nextTick(() => {
      this.auto && this._fetch(this.pageSize, this.pageNo)
    })
  }
}
</script>

<style lang="less" scoped>
.fly-smart-table {
  &-main {
  }
  &-pagination {
    text-align: right;
  }
}
</style>