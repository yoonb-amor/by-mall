### 功能

内置分页的智能表格组件，透明代理element-ui.table

### 预览

暂无

### 示例

```javascript
<SmartTable :fetcher="fetcher" url="path/to/json" :formatters="formatters">
  <TableColumn label="姓名" prop="name"></TableColumn>
</SmartTable>
...
const fetcher = async () => {return response}
const formatters = {
  pagination: (response, pageSize, pageNo) => ({pageSize, pageNo, total}),
  pager: (pageSize, pageNo) => ({pageSize, pageNo}),
  data: (response, pageSize, pageNo) => response.data
}
```

### 说明

* 智能表格，内置自动分页组件；
* 最简只需配置表格的数据接口url，内置默认分页接口格式转换器；
* 渐进支持以下配置：`fetcher`完全自定义获取表格数据的方法；`formatters.pagination`自定义从响应中取分页数据；`formatters.pager`自定义接口请求携带的分页数据；`formatters.data`自定义表格数据格式化；
* 完全透明代理element-ui.table的所有原生属性和方法；
* 也对表格默认样式进行了适配；