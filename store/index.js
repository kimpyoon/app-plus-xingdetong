import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let lifeData = {};

try {
	// 尝试获取本地是否存在lifeData变量，第一次启动APP时是不存在的
	lifeData = uni.getStorageSync('lifeData');
} catch(e) {

}

// 需要永久存储，且下次APP启动需要取出的，在state中的变量名
let saveStateKeys = [
	'vuex_user',
	'vuex_token',
	'vuex_menus'
];

// 保存变量到本地存储中
const saveLifeData = function(key, value){
	// 判断变量名是否在需要存储的数组中
	if(saveStateKeys.indexOf(key) !== -1) {
		// 获取本地存储的lifeData对象，将变量添加到对象中
		let tmp = uni.getStorageSync('lifeData');
		// 第一次打开APP，不存在lifeData变量，故放一个{}空对象
		tmp = tmp ? tmp : {};
		tmp[key] = value;
		// 执行这一步后，所有需要存储的变量，都挂载在本地的lifeData对象中
		uni.setStorageSync('lifeData', tmp);
	}
}
const store = new Vuex.Store({
	state: {
		// 如果上面从本地获取的lifeData对象下有对应的属性，就赋值给state中对应的变量
		// 加上vuex_前缀，防止变量名冲突
		vuex_user: lifeData.vuex_user ? lifeData.vuex_user : {},
		vuex_token: lifeData.vuex_token ? lifeData.vuex_token : '',
		vuex_menus: lifeData.vuex_menus ? lifeData.vuex_menus : [
			{
				url: '../../static/img/menu_9.png',
				text: '兴安健康'
			},
			{
				url: '../../static/img/menu_7.png',
				text: '兴安缴费'
			},
			// {
			// 	url: '../../static/img/menu_2.png',
			// 	text: '兴安家政'
			// },
			{
				url: '../../static/img/menu_4.png',
				text: '蒙速办',
				path: 'http://zwfw.nmg.gov.cn/special_zone/sbzq?regionCode=150822000000&record=istrue'
			},
			{
				url: '../../static/img/menu_15.png',
				text: '警局',
				path: 'https://app.xinganmeng.24xsjj.com/'
			},
			// {
			// 	url: '../../static/img/menu_8.png',
			// 	text: '爱兴安'
			// },
			{
				url: '../../static/img/menu_6.png',
				text: '快递查询',
				path: '/pages/logistics/search'
			},
			{
				url: '../../static/img/menu_10.png',
				text: '社保查询'
			},
			{
				url: '../../static/img/menu_3.png',
				text: '交通违章'
			},
			{
				url: '../../static/img/menu_11.png',
				text: '天气预报',
				path: '/pages/weather/index'
			},
			{
				url: '../../static/img/menu_14.png',
				text: '智游兴安',
				path: '/pages/travel/smart'
			},
			// {
			// 	url: '../../static/img/menu_1.png',
			// 	text: '旅游文化',
			// 	path: '/pages/travel/culture'
			// },
			{
				url: '../../static/img/menu_12.png',
				text: '服务信息',
				path: ''
			},
			// {
			// 	url: '../../static/img/menu_5.png',
			// 	text: '票务查询',
			// 	path: ''
			// },
			// {
			// 	url: '../../static/img/menu_13.png',
			// 	text: '一码通',
			// 	path: ''
			// }
		]
	},
	mutations: {
		$initStore (state, payload) {
			// 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
			let nameArr = payload.name.split('.');
			let saveKey = '';
			let len = nameArr.length;
			if (nameArr.length >= 2) {
				let obj = state[nameArr[0]];
				for(let i = 1; i < len - 1; i++) {
					obj = obj[nameArr[i]];
				}
				obj[nameArr[len - 1]] = payload.value;
				saveKey = nameArr[0];
			} else {
				// 单层级变量，在state就是一个普通变量的情况
				state[payload.name] = payload.value;
				saveKey = payload.name;
			}
			// 保存变量到本地，见顶部函数定义
			saveLifeData(saveKey, state[saveKey])
		}
	}
})

export default store
