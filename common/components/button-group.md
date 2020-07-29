### 功能

用于减少多按钮占用空间的可展开/收起按钮组组件

### 预览

![QQ20190906-153150@2x.jpg](http://ww1.sinaimg.cn/large/6e3ecad5gy1g6pu1d2xjjj20ao0840t2.jpg)

### 示例

```javascript
<ButtonGroup :threshold="2">
  <Button size="mini">增加</Button>
  <Button size="mini">减少</Button>
  <Button size="mini">编辑</Button>
  <Button size="mini">删除</Button>
</ButtonGroup>
```

### 说明

* `threshold`默认值为`3`；