<template>
  <div class="main">
    <Layout :m="300" :n="0">
      <div slot="left">
        <Area :style="{height: '100%'}">
          <Test />
        </Area>
      </div>
      <div slot="center">
        <Area class="form">
          <Form :model="formModel" :rules="formRules" label-width="100px" size="small">
            <Row>
              <Col :span="9">
                <FormItem label="名称" prop="name">
                  <Input v-model="formModel.name" />
                </FormItem>
              </Col>
              <Col :span="9">
                <FormItem label="类型" prop="type">
                  <Select v-model="formModel.type" clearable>
                    <Option label="苹果" value="apple"></Option>
                    <Option label="香蕉" value="banana"></Option>
                  </Select>
                </FormItem>
              </Col>
              <Col :span="6">
                <FormItem label>
                  <Button type="primary">查询</Button>&nbsp;
                  <Button type="text">重置</Button>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Area>
        <Area>
          <Headline :space="false" title="主要标题" description="标题描述">
            <Button type="primary" plain size="small">新增</Button>
            <Button type="primary" plain size="small">删除</Button>
          </Headline>
          <Area :shadow="false">
            <div class="table">
              <SmartTable ref="table" url>
                <TableColumn label="序号" align="center" width="60">
                  <template slot-scope="scope">
                    <span>{{scope.$index + 1}}</span>
                  </template>
                </TableColumn>
                <TableColumn label="年龄" align="center" prop="objName"></TableColumn>
                <TableColumn label="姓名" align="center" prop="typeName"></TableColumn>
                <TableColumn label="班级" align="center" prop="objName"></TableColumn>
                <TableColumn label="操作" align="center" width="200">
                  <template slot-scope="scope">
                    <Button size="mini">编辑</Button>
                  </template>
                </TableColumn>
              </SmartTable>
            </div>
          </Area>
        </Area>
      </div>
    </Layout>
  </div>
</template>

<script>
import { mapActions } from "vuex"
import {
  TableColumn,
  Button,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Row,
  Col
} from "element-ui"
import Area from "../../../common/components/area"
import Layout from "../../../common/components/layout-mxn"
import Test from "./test/index.vue"
import Headline from "../../../common/components/headline"
import SmartTable from "../../../common/components/smart-table"

export default {
  name: "Main",
  components: {
    Layout,
    Area,
    Row,
    Col,
    Headline,
    Test,
    SmartTable,
    TableColumn,
    Button,
    Form,
    FormItem,
    Input,
    Select,
    Option
  },
  methods: {
    ...mapActions(["init"])
  },
  data() {
    return {
      formModel: { name: "奥德赛", type: "" },
      formRules: {
        name: [
          { required: true, message: "请输入名称", trigger: ["blur", "change"] }
        ],
        type: [
          { required: true, message: "请选择类型", trigger: ["blur", "change"] }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  mounted() {}
}
</script>

<style lang="less" scoped>
@space: 10px;
.main {
  position: relative;
  width: 100%;
  padding: 0 @space @space @space;
  .form {
    padding-top: @space * 2;
    margin-bottom: @space;
  }
  .table {
    min-height: 400px;
  }
}
</style>
