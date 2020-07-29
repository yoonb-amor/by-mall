### 功能

将非空输入控件转换成只读文本

### 预览

暂无

### 示例

```javascript
<Readonly :enabled="true" default-text="-" :ellipsis="true" :formatter="formatter">
  <Select value="apple">
    <Option label="苹果" value="apple"></Option>
		<Option label="梨子" value="pear"></Option>
  </Select>
</Readonly>
...
const formatter = value => value + '...'
```

### 说明

* 适用情景：编辑转查看页面；
* `enabled`是否开启；
* `default-text`无值时默认展示字符；
* `ellipsis`是否单行展示并且在超出长度时展示省略号；
* `formatter`根据控件value值自定义输出；