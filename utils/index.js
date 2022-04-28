export const tabbars = [
	{
		"iconPath": require('@/static/img/tabbar/home_normal.png'),
		"selectIconPath": require('@/static/img/tabbar/home_active.png'),
		"color": "#8A8E99",
		"selectColor": "#000000",
		"fontSize": "22rpx",
		"text": "首页",
		"path": "pages/tabbar/home",
		"showDot": false,
		"dot": 0,
		"showTag": false,
		"tag": "",
		"middle": false
	},
	{
		"iconPath": require('@/static/img/tabbar/work_normal.png'),
		"selectIconPath": require('@/static/img/tabbar/work_active.png'),
		"color": "#8A8E99",
		"selectColor": "#000000",
		"fontSize": "22rpx",
		"text": "线上办事",
		"path": "pages/tabbar/work",
		"showDot": false,
		"dot": 0,
		"showTag": false,
		"tag": "",
		"middle": false
	},
	{
		"iconPath": require('@/static/img/tabbar/news_normal.png'),
		"selectIconPath": require('@/static/img/tabbar/news_active.png'),
		"color": "#8A8E99",
		"selectColor": "#000000",
		"fontSize": "22rpx",
		"text": "兴安资讯",
		"path": "pages/tabbar/news",
		"showDot": false,
		"dot": 0,
		"showTag": false,
		"tag": "",
		"middle": false
	},
	{
		"iconPath": require('@/static/img/tabbar/mine_normal.png'),
		"selectIconPath": require('@/static/img/tabbar/mine_active.png'),
		"color": "#8A8E99",
		"selectColor": "#000000",
		"fontSize": "22rpx",
		"text": "我的",
		"path": "pages/tabbar/mine",
		"showDot": false,
		"dot": 0,
		"showTag": false,
		"tag": "",
		"middle": false
	}
]
// 轻提示
export function toast(title, duration = 1500, icon = 'none', mask = true) {
	uni.showToast({
		title,
		duration,
		icon,
		mask
	})
}
// 跳转路径解析
export function parseUrl(params) {
	let reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+).)+([A-Za-z0-9-~\/])+$/
	if (typeof params === 'string') {
		if (reg.test(params)) {
			// http链接
			return {
				url: params,
				query: {},
				isWeb: true
			}
		} else {
			// 非http链接
			if (params.indexOf('?') === -1) {
				// 不带参
				return {
					url: params,
					query: {},
					isWeb: false
				}
			} else {
				// 带参
				let url = params.split('?')[0]
				let query = {}
				let queryString = params.split('?')[1]
				if (queryString.indexOf('&')) {
					// 多参数
					let queryItem = queryString.split('&')
					queryItem.forEach(item => {
						query[item.split('=')[0]] = item.split('=')[1]
					})
				} else {
					// 单参数
					query[queryString.split('=')[0]] = queryString.split('=')[1]
				}
				return {
					url: url,
					query: query,
					isWeb: false
				}
			}
		}
	} else if (typeof params === 'object') {
		let url = params.url
		let query = params.query || {}
		if (url) {
			if (reg.test(url)) {
				// http链接
				return {
					url: url,
					query: {},
					isWeb: true
				}
			} else {
				// 非http链接
				if (url.indexOf('?') === -1) {
					// 不带参
					return {
						url: url,
						query: query,
						isWeb: false
					}
				} else {
					// 带参
					let urls = url.split('?')[0]
					let queryString = url.split('?')[1]
					if (queryString.indexOf('&')) {
						// 多参数
						let queryItem = queryString.split('&')
						queryItem.forEach(item => {
							query[item.split('=')[0]] = item.split('=')[1]
						})
					} else {
						// 单参数
						query[queryString.split('=')[0]] = queryString.split('=')[1]
					}
					return {
						url: urls,
						query: query,
						isWeb: false
					}
				}
			}
		} else {
			return null
		}
	} else {
		return null
	}
}

//获取路由信息，
//返回protocol：协议头；host：域名；query：路由携带的参数;
export function getUrlInfo(params) {

	let url = decodeURI(params);
	if (!url) return {
		protocol: null,
		host: null,
		query: {}
	}
	let protocol = ''
	let host = ''
	let query = {}
	if (params.indexOf("://") === -1) {
		protocol = null
		host = null
	} else {
		protocol = url.split("://")[0];
		host = url.split("://")[1].split("/")[0];
	}
	let urls1 = url.split('/');
	urls1 = urls1.slice(urls1.indexOf(host) + 4, urls1.length);

	let urls2 = url.split("?")[1];

	if (urls2) {
		urls2 = urls2.split("&");
	}
	if (urls1.length > 1 && urls1.length % 2 == 0) {
		for (let i = 0; i < urls1.length; i += 2) {
			query[urls1[i]] = urls1[i + 1].split(".")[0];
		}
	}
	if (urls2 && urls2.length > 0) {
		for (let i = 0; i < urls2.length; i++) {
			let params = urls2[i].split('=');
			query[params[0]] = params[1];
		}
	}
	return {
		protocol,
		host,
		query
	}
}
// 保存图片
export function saveImages(images) {
	return new Promise((resolve, reject) => {
		if (images.length == 0) {
			uni.hideLoading();
			uni.showToast({
				title: '请选择要保存的图片',
				icon: 'none'
			})
			reject()
		}
		let success_num = 0
		let error_num = 0
		images.forEach((item) => {
			uni.getImageInfo({
				src: item,
				success: (res) => {
					uni.saveImageToPhotosAlbum({
						filePath: res.path,
						success: () => {
							success_num++
						},
						fail: (err) => {
							error_num++
						},
						complete: () => {
							if (success_num == images.length) {
								uni.hideLoading();
								resolve({
									success: success_num
								})
							} else if ((success_num + error_num == images
									.length) && (error_num != images.length)) {
								uni.hideLoading();
								resolve({
									success: success_num
								})
							} else if (error_num == images.length) {
								uni.hideLoading();
								reject()
							}
						}
					});
				},
				fail: (err) => {
					error_num++
				}
			})
		})
	})
}

// 客户端类型
// #ifdef APP-PLUS
const res = uni.getSystemInfoSync();
export const platform = res.platform
export const isIos = uni.getSystemInfoSync().platform == 'ios'
export const jumpMiniApp = (param) => {
	plus.share.getServices(function(s){
		const shares = {};
		for (let i = 0; i < s.length; i++) {
			const t = s[i];
			shares[t.id] = t;
		}
		const sweixin = shares['weixin'];
		const msg = {
			id: param.appId,
			type: 0
		}
		if (param.path) {
			msg.path = param.path
		}
		sweixin ? sweixin.launchMiniProgram(msg) : plus.nativeUI.alert('当前环境不支持微信操作!');
	}, function(e){
		console.log("获取分享服务列表失败："+e.message); 
	});
}
// #endif
// #ifdef H5
// 客户端类型
export const platform = 'h5'

//判断是否在微信客户端打开
let ua = window.navigator.userAgent.toLowerCase()
export const inWechat = (ua.match(/MicroMessenger/i) == 'micromessenger')
//判断是否在QQ打开
export const inQQ = (ua.match(/QQ/i) == 'qq')
// h5判断是否ios系统
let u = navigator.userAgent
export const isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
// #endif
// #ifdef MP-WEIXIN
export const platform = 'xcx_wx';
export const isIos = uni.getSystemInfoSync().platform == 'ios';
// #endif
export const navHandler = (link, title) => {
	if (link) {
		if (uni.$g.test.object(link)) {
			// #ifndef APP-PLUS
			uni.navigateToMiniProgram({
				appId: link.appId,
				path: link.path,
				extraData: link.extraData
			})
			// #endif
			// #ifdef APP-PLUS
			jumpMiniApp(link)
			// #endif
			return
		} else if (link.indexOf('http') > -1) {
			uni.navigateTo({
				url: `/pages/h5/web?url=${encodeURIComponent(link)}`
			})
		} else {
			const tabbarIndex = tabbars.findIndex(n => link.indexOf(n.path) > -1)
			if (tabbarIndex > -1) {
				uni.switchTab({
					url: tabbars[tabbarIndex].path
				})
			} else {
				uni.navigateTo({
					url: link
				})
			}
		}
	}
}

export const tranNumber = (num, point = 2) => {
	if (num) {
		let numStr = num.toString()
		const pointLength = (n) => {
			return numStr.indexOf('.') > -1 ? n + point : n
		}
		const isPoint = () => {
			return numStr.indexOf('.') > -1
		}
		// 十万以内直接返回
		if (numStr.length < pointLength(6)) {
			return numStr
		} else if (numStr.length > pointLength(8)) {
			// 大于8位数是亿
			numStr = isPoint() ? numStr.split('.')[0] : numStr
			let decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + point)
			return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿'
		} else if (numStr.length > pointLength(4)) {
			// 大于6位数是十万 (以10W分割 10W以下全部显示)
			numStr = isPoint() ? numStr.split('.')[0] : numStr
			let decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + point)
			return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万'
		}
	}
	return '0'
}

export const formatWeekTime = (value, key = 'week') => {
	const date = new Date(value)
	if (key === 'week') {
		return ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][date.getDay()]
	} else if (key === 'status') {
		const hour = date.getHours()
		if (hour < 6) {
			return '凌晨'
		} else if (hour < 9){
			return '早晨'
		} else if (hour < 12){
			return '上午'
		} else if (hour < 14){
			return '中午'
		} else if (hour < 17){
			return '下午'
		} else if (hour < 19){
			return '傍晚'
		} else if (hour < 22){
			return '夜晚'
		} else {
			return '深夜'
		}
	} else {
		return uni.$g.timeFormat(date, key)
	}
}