import wx from 'weixin-js-sdk'
import store from '@/store'
import { wxjssdk,getDefultShare } from '@/api/weixin.js'
import { inWechat,inQQ,isIos,parseShareUrl } from './index.js'

// 微信js-sdk签名配置
export const wxConfig = async (callback) => {
	let url = ''
	if (isIos) {
		url = window.initUrl || window.location.href
	} else {
		url = window.location.href
	}
	let params = {
		url: encodeURIComponent(url)
	}
	let times = 0
	let data = await wxjssdk(params)
	console.log(data);
	wx.config({
		debug: false, // 开启调试模式
		appId: data.appid, // 必填，公众号的唯一标识
		timestamp: data.timestamp.toString(), // 必填，生成签名的时间戳
		nonceStr: data.nonceStr.toString(), // 必填，生成签名的随机串
		signature: data.signature, // 必填，签名，见附录1
		jsApiList: data.jsApiList
	});
	wx.ready(() => {
		callback && callback(wx)
	})
	wx.error(async (err) => {
		return
		// config信息验证失败会执行error函数
		if(times<3){
			// 更新签名,最多3次
			if (url == window.initUrl) {
				url = window.location.href
			} else {
				url = window.initUrl
			}
			params = {
				url: encodeURIComponent(url)
			}
			let data = await wxjssdk(params)
			wx.config({
				debug: false, // 开启调试模式
				appId: data.appid, // 必填，公众号的唯一标识
				timestamp: data.timestamp.toString(), // 必填，生成签名的时间戳
				nonceStr: data.nonceStr.toString(), // 必填，生成签名的随机串
				signature: data.signature, // 必填，签名，见附录1
				jsApiList: data.jsApiList
			});
		}
		times++
	});
};

// 微信分享
export const wxShare = async (params, callback) => {
	// #ifdef H5
	let shareTitle, shareImg, shareDesc, shareUrl
	if (params) {
		shareTitle = params.shareTitle
		shareImg = params.shareImg
		shareDesc = params.shareDesc
		shareUrl = params.shareUrl
	} else {
		const shareInfo = await getDefultShare()
		shareTitle = shareInfo.share_title
		shareImg = shareInfo.wechat_share_img
		shareDesc = shareInfo.share_synopsis
		shareUrl = shareInfo.wechat_share_link
		shareUrl = parseShareUrl(shareUrl)
	}
	if (inWechat) {
		wxConfig(() => {
			wx.onMenuShareAppMessage({
				title: shareTitle, // 分享标题
				desc: shareDesc, // 分享描述
				link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				imgUrl: shareImg, // 分享图标
				success: function() {
					// 用户确认分享后执行的回调函数
					callback && callback(1)
				}
			})
			wx.onMenuShareTimeline({
				title: shareTitle, // 分享标题
				link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				imgUrl: shareImg, // 分享图标
				success: function() {
					// 用户确认分享后执行的回调函数
					callback && callback(2)
				}
			})
			wx.onMenuShareWeibo({
				title: shareTitle, // 分享标题
				desc: shareDesc, // 分享描述
				link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				imgUrl: shareImg, // 分享图标
				success: function() {
					// 用户确认分享后执行的回调函数
					callback && callback(1)
				}
			})
			wx.onMenuShareQQ({
				title: shareTitle, // 分享标题
				desc: shareDesc, // 分享描述
				link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				imgUrl: shareImg, // 分享图标
				success: function() {
					// 用户确认分享后执行的回调函数
					callback && callback(1)
				}
			})
			wx.onMenuShareQZone({
				title: shareTitle, // 分享标题
				link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				imgUrl: shareImg, // 分享图标
				success: function() {
					// 用户确认分享后执行的回调函数
					callback && callback(2)
				}
			})
		})
	} else if(inQQ){
		setShareInfo({
			title: shareTitle, 
			summary: shareDesc, 
			pic: shareImg, 
			url: shareUrl,
		})
	}
	// #endif
};