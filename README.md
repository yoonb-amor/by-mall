# 智慧城市大数据平台VUE前端项目母板

> 基于vue-cli的前端多页应用项目母板 *vue-cli based multi-page-application boilerplate*。
> 建议使用cnpm代替npm，参考[cnpm](http://npm.taobao.org/)。

## 安装
```
npm run iflyinstall
```
## 开发
```
npm run dev
```
如遇内存不足可使用
```
npm run dev+
```
或进行单页面开发调试
```
npm run dev pages/my-page
```
## 打包
```
npm run build
```
## 部署
> 需要配置`deploy.config.js`，将前端产物一键“搬运”至目标文件夹（大数据平台业务场景下，通常为后端应用的静态资源目录）。
```
npm run deploy
```
## 其他
* 相关技能要点：[VUE](https://cn.vuejs.org/)、[ECMAScript6](http://es6.ruanyifeng.com/)、[@sc_bdp/element-ui](https://element.eleme.io)
* 如遇问题请咨询 @CBB前端团队 @于海涛(htyu4) @宋飞(feisong3)