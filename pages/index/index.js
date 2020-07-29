import 'babel-polyfill';
import qs from 'qs';
import Vue from 'vue';
import App from './app.vue';
import store from './store';
import * as service from './service'
import { confirm, alert } from '../../common/components/modal'
import { Message } from 'element-ui'
import '../../common/style/index.scss';
import 'normalize.css';

Vue.prototype.$query = qs.parse(window.location.search, { ignoreQueryPrefix: true });
Vue.prototype.$service = service;
Vue.prototype.$loading = function (is) { this.$store.dispatch('setLoading', is) };
Vue.prototype.$message = Message;
Vue.prototype.$confirm = confirm;
Vue.prototype.$alert = alert;

new Vue({
	store,
	render: h => h(App),
}).$mount('#app')
