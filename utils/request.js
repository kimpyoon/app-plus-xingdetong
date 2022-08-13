import config from '@/config'
import { platform } from './index.js'
import api from '@/api'
const install = (Vue, vm) => {
	uni.$request = (data) => {
		return new Promise((resolve, reject) => {
			// 是否显示加载 
			if(data.loading) {
				uni.showLoading({
					title: typeof data.loading === 'string' ? data.loading : "数据加载中...",
					mask: true
				})
			}
			let headers = data.header || {}
			console.log(config.baseUrl + data.url)
			console.log('-----platform----', platform)
			uni.request({
				url: config.baseUrl + data.url, 
				data: data.params || '',
				method: data.methods || 'POST',
				dataType: 'json',
				header: {
					'Content-type': 'application/json',
					'authorization': 'Bearer ' + vm.vuex_token,
					'platform':platform,
					...headers
				},
				success:async (res) => {
					console.log(res)
					if (res.statusCode === 200) {
						if (res.data.code == 100) {
							resolve(res.data.data)
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
						}
					} else if(res.statusCode === 401) {
						uni.$g.vuex('vuex_token', '')
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
						let pages = getCurrentPages()
						if(pages && pages.length>0) {
							let router = pages[pages.length - 1]
							// 页面路径
							let goPage = "/" + router.route
							// 页面参数
							let query = []
							for (var i in router.options) {
								query.push(i + "=" + router.options[i])
							}
							if (query.length > 0) {
								goPage = goPage + "?" + query.join("&")
							}
							if(!uni.getStorageSync("goPage")){
								// 保存想进入的页面
								uni.setStorageSync("goPage", goPage)
							}
						}
						setTimeout(() => {
							uni.navigateTo({
								url:'/pages/public/login',
								fail(e) {
									console.log(e)
								}
							})
						}, 300)
					}else {
						uni.showToast({
							title:res.data.msg||'网络错误',
							icon:'none'
						})
						reject(res);
					}
				},
				fail: (err) => {
					console.error(err)
					reject(err);
				},
				complete: () => {
					if (data.loading) {
						uni.hideLoading();
					}
				}
			})
		})
	}
	// 挂载所有接口便于页面调用 this.$api
	Vue.prototype.$api = api;
}
export default {
	install
}