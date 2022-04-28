import Vue from 'vue'
import App from './App'
import httpRequest from './utils/request.js'
import store from '@/store'
import { toast } from './utils/index.js'
import test from './utils/test.js'
import timeFormat from './utils/timeFormat.js'
import throttle from './utils/throttle.js'
import debounce from './utils/debounce.js'
import queryParams from './utils/queryParams.js'

uni.$g = {
	test,
	timeFormat,
	throttle,
	debounce,
	queryParams
} // 用于储存uni级别的全局方法

Vue.prototype.$toast = toast;
Vue.prototype.$timeFormat = timeFormat;
Vue.prototype.$navBack = function (delta = 1) {
	uni.navigateBack({
		delta
	})
};

Vue.config.productionTip = false
App.mpType = 'app'

const vuexStore = require("@/store/$s.mixin.js")
Vue.mixin(vuexStore)

const app = new Vue({
	store,
	...App
})
Vue.use(httpRequest, app)
app.$mount()