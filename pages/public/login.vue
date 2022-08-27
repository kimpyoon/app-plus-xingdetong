<template>
	<view class="page">
		<image :src="`${prefixUrl}/img/login_bg.png`" class="bg"></image>
		<view class="page-wrap">
			<view class="logo">
				<image :src="`${prefixUrl}/img/logo.png`" mode="scaleToFill" class="img"></image>
			</view>
			<view class="h1">欢迎登录兴得通</view>
			<!-- <view class="h4">我是一局APP宣传语</view> -->
			<view class="form-wrap">
				<view class="tabs xa-flex xa-row-between">
					<view @click="selectLoginMethod(item.value)" :class="['tab', {
						active: item.value === curTab
					}]" v-for="item in tabs" :key="item.value">{{item.text}}</view>
				</view>
				<view class="form">
					<view v-show="curTab === 1">
						<view class="cell">
							<view class="left-icon">
								<image :src="`${prefixUrl}/img/icon/phone.png`" class="img" v-if="codeLogin"></image>
								<image :src="`${prefixUrl}/img/icon/user.png`" class="img" v-else></image>
							</view>
							<input class="input" @input="changeInput" @focus="focusKey = 'phone'" type="text" :value="form.phone" placeholder="请输入手机号" placeholder-style="color:#9f9f9f" />
						</view>
						<view class="cell" v-if="codeLogin">
							<view class="left-icon">
								<image :src="`${prefixUrl}/img/icon/valid.png`" class="img"></image>
							</view>
							<input class="input code-input" @input="changeInput" @focus="focusKey = 'code'" maxlength="6" type="text" :value="form.code" placeholder="请输入手机验证码" placeholder-style="color:#9f9f9f" />
							<text class="code" v-if="countdown > 0">{{countdown}}</text>
							<text class="code" @click="sendPhoneCode" v-else>点击获取验证码</text>
						</view>
						<view class="cell" v-else>
							<view class="left-icon">
								<image :src="`${prefixUrl}/img/icon/password.png`" class="img"></image>
							</view>
							<input class="input" type="text" :password="!showPassword" @input="changeInput" @focus="focusKey = 'password'" :value="form.password" placeholder="请输入登录密码" placeholder-style="color:#9f9f9f" />
							<view class="icon">
								<uni-icons type="eye-filled" size="20" @click="showPassword = false" v-if="showPassword"></uni-icons>
								<uni-icons type="eye-slash-filled" size="20" @click="showPassword = true" v-else></uni-icons>
							</view>
						</view>
					</view>
					<view v-show="curTab === 2">
						<view class="cell">
							<view class="left-icon">
								<image :src="`${prefixUrl}/img/icon/idcard.png`" class="img"></image>
							</view>
							<input class="input" type="text" @input="changeInput" @focus="focusKey = 'creditNo'" :value="form.creditNo" placeholder="请输入统一社会信用代码" placeholder-style="color:#9f9f9f" />
						</view>
						<view class="cell">
							<view class="left-icon">
								<image :src="`${prefixUrl}/img/icon/password.png`" class="img"></image>
							</view>
							<input class="input" type="text" :password="!showBusinesePassword" @input="changeInput" @focus="focusKey = 'businesePassword'" :value="form.businesePassword" placeholder="请输入登录密码" placeholder-style="color:#9f9f9f" />
							<view class="icon">
								<uni-icons type="eye-filled" size="20" @click="showBusinesePassword = false" v-if="showBusinesePassword"></uni-icons>
								<uni-icons type="eye-slash-filled" size="20" @click="showBusinesePassword = true" v-else></uni-icons>
							</view>
						</view>
					</view>
				</view>
				<view class="tip xa-flex xa-row-between">
					<view>
						<text class="text">没有账号，</text>
						<text class="text" @click="toRegist" style="color: #ED413A;">立即注册</text>
					</view>
					<text class="text" @click="toReset" style="color: #ED413A;">忘记密码？</text>
				</view>
				<view class="submit">
					<button class="button xa-flex xa-col-center xa-row-center" @click="submitHandle">登录</button>
				</view>
				<view class="readme xa-flex xa-col-center xa-row-center">
					<view class="radio">
						<uni-icons type="checkbox-filled" size="16" @click="checked = false" v-if="checked"></uni-icons>
						<uni-icons type="circle" size="16" @click="checked = true" v-else></uni-icons>
					</view>
					<view class="text">
						<text @click="checked = !checked">已阅读并同意</text><text class="clickable" @click="toReadme('xieyi')">《用户协议》</text>和<text class="clickable" @click="toReadme('yinsi')">《隐私政策》</text>
					</view>
				</view>
			</view>
			<view class="extral" v-if="curTab === 1">
				<view class="label">其他登录方式</view>
				<view class="inner xa-flex xa-col-center xa-row-center">
					<view class="item" v-if="!codeLogin" @click="codeLogin = true">
						<view class="icon"><image :src="`${prefixUrl}/img/icon/valid-code.png`" class="img"></image></view>
						<view class="text">验证码登录</view>
					</view>
					<view class="item" v-else @click="codeLogin = false">
						<view class="icon"><image :src="`${prefixUrl}/img/icon/valid-code.png`" class="img"></image></view>
						<view class="text">密码登录</view>
					</view>
					<view class="item" @click="getOpenId(item)" v-for="item in loginList" :key="item.appcode">
						<view class="icon xa-flex xa-col-center xa-row-center"><uni-icons :type="item.icon" :color="item.color" size="32"></uni-icons></view>
						<view class="text">{{item.title}}登录</view>
					</view>
				</view>
			</view>
			<image :src="`${prefixUrl}/img/login_foot_bg.png`" mode="" class="foot-bg"></image>
		</view>
	</view>
</template>

<script>
	import { prefixUrl } from '@/config/common.js'
	export default {
		data() {
			return {
				prefixUrl,
				curTab: 1,
				codeLogin: false, // true: 验证码登录
				focusKey: '',
				showPassword: false,
				showBusinesePassword: false,
				tabs: [
					{
						text: '个人登录',
						value: 1
					},
					{
						text: '企业登录',
						value: 2
					}
				],
				form: {
					phone: '',
					code: '',
					creditNo: '',
					password: '',
					businesePassword: ''
				},
				checked: false,
				countdown: 0,
				loginList: [
				  //第三方登录集合
				  {
				    icon: "weixin",
				    color: "#00a327",
				    title: "微信",
				    code: "WECHAT",
						appcode: 'weixin'
				  },
				  {
				    icon: "qq",
				    color: "#38ace9",
				    title: "QQ",
				    code: "QQ",
						appcode: 'qq'
				  }
				]
			};
		},
		watch: {
			codeLogin (value) {
				if (value) {
					this.form.password = ''
				} else {
					this.form.code = ''
				}
			}
		},
		mounted() {
			// 加载支持的登录方式
			// this.getProvider()
			uni.hideTabBar()
		},
		methods: {
			getProvider () {
				uni.getProvider({
					service: "oauth",
					success: (result) => {
						const provider = result.provider.filter(n => n === 'weixin' || n === 'qq')
						this.loginList = provider.map((value) => {
							let title = ""; // 展示title
							let code = ""; // 系统code
							let color = "#070707";// icon颜色
							let icon = ""; // 图标
							const appcode = value; // uni 联合登录 code
							switch (value) {
								case "weixin":
									icon = "weixin";
									color = "#00a327";
									title = "微信";
									code = "WECHAT";
									break;
								case "qq":
									icon = "qq";
									color = "#38ace9";
									title = "QQ";
									code = "QQ";
									break;
							}
							return {
								title,
								code,
								color,
								icon,
								appcode
							};
						});
					},
					fail: (error) => {
						this.$toast("获取登录通道失败" + error)
					}
				});	
			},
			changeInput (e) {
				this.form[this.focusKey] = e.target.value
			},
			selectLoginMethod(value) {
				this.curTab = value
			},
			toRegist () {
				uni.navigateTo({
					url: `/pages/public/regist?type=${this.curTab}`
				})
			},
			toReadme (type) {
				this.$toast(type === 'xieyi' ? '服务协议' : '隐私政策')
			},
			toReset () {
				uni.navigateTo({
					url: '/pages/public/reset'
				})
			},
			start () {
				this.countdown = 60
				const timer = setInterval(() => {
					this.countdown -= 1
					if (this.countdown <= 0) {
						clearInterval(timer)
					}
				}, 1000)
			},
			sendPhoneCode () {
				if (this.form.phone) {
					uni.$g.throttle(() => {
						this.start()
						this.$api.user.getPhoneCode({
							mobile: this.form.phone
						}).then(res => {
							this.$toast('短信已发送')
						})
					}, 1000)
				} else {
					this.$toast('请填写手机号')
				}
			},
			submitHandle () {
				if (this.curTab === 1) {
					if (!uni.$g.test.mobile(this.form.phone)) {
						this.$toast('请输入正确的手机号')
						return
					} else if (this.codeLogin) {
						if (!uni.$g.test.code(this.form.code, 4)) {
							this.$toast('请输入4位数字验证码')
							return
						}
					} else if (uni.$g.test.isEmpty(this.form.password)) {
						this.$toast('请输入密码')
						return
					}
				} else if (this.curTab === 2) {
					if (!uni.$g.test.socialCode(this.form.creditNo)) {
						this.$toast('请输入统一社会信用代码')
						return
					} else if (uni.$g.test.isEmpty(this.form.businesePassword)) {
						this.$toast('请输入密码')
						return
					}
				}
				const params = {}
				let api = ''
				if (this.curTab === 1) {
					if (this.codeLogin) {
						params.mobile = this.form.phone
						params.code = this.form.code
						api = 'loginByMobile'
					} else {
						params.username = this.form.phone
						params.password = this.form.password
						api = 'loginByMobilePwd'
					}
				} else if (this.curTab === 2) {
					params.username = this.form.creditNo
					params.password = this.form.businesePassword
					api = 'loginByBusinessPwd'
				}
				if (!this.checked) {
					this.$toast('请勾选已阅读并同意协议内容')
					return
				}
				this.requestHandle(params, api)
			},
			requestHandle (params, api) {
				uni.showLoading({
					title: '正在提交',
					mask: true
				})
				this.$api.user[api](params).then(res => {
					if (res) {
						uni.$g.vuex('vuex_token', res)
						uni.$g.vuex('vuex_user.username', params.username)
						const goPage = uni.getStorageSync('goPage')
						if (goPage && goPage.indexOf('tabbar') > -1) {
							uni.switchTab({
								url: goPage
							})
						} else {
							uni.reLaunch({
								url: '/pages/tabbar/home'
							})
						}
					}
					console.log(res)
					uni.hideLoading()
				}).catch((e) => {
					uni.hideLoading()
					console.log(e)
				})
			},
			async getOpenId(item) {
				this.goOpenidLogin()
				return
				const _this = this;
				// 获取openid
				await uni.login({
					provider: item.appcode,
					success: function (res) {
						uni.getUserInfo({
							provider: item.appcode,
							success: function (infoRes) {
								console.log(res)
								console.log(infoRes.userInfo)
								_this.goOpenidLogin(res.authResult.openid)
							},
						})
					},
					fail(e) {
						_this.$toast("该第三方登录暂不可用！");
					},
				})
			},
			// openid 登录
			goOpenidLogin(openid) {
				this.$toast('第三方登录功能未开放')
			}
		},
		onUnload() {
			uni.hideLoading()
		}
	}
</script>

<style lang="scss" scoped>
.page {
	background-color: #FFFFFF;
	.bg {
		position: absolute;
		width: 100%;
		right: 0;
		left: 0;
		height: 454rpx;
	}
	.foot-bg {
		position: absolute;
		width: 100%;
		height: 396rpx;
		bottom: 0;
		right: 0;
		left: 0;
	}
	.page-wrap {
		position: relative;
		padding: 28rpx 50rpx 0;
		background-color: transparent;
		z-index: 1;
		.logo {
			text-align: center;
			.img {
				width: 120rpx;
				height: 120rpx;
				background: #D8D8D8;
				border-radius: 50%;
			}
		}
		.h1 {
			margin-top: 30rpx;
			font-size: 52rpx;
			font-weight: bold;
			text-align: center;
			color: #070707;
			line-height: 74rpx;
		}
		.h4 {
			margin-top: 5rpx;
			font-size: 28rpx;
			text-align: center;
			color: #070707;
			line-height: 40rpx;
		}
		.form-wrap {
			position: relative;
			margin-top: 65rpx;
			z-index: 1;
			.tabs {
				padding: 6rpx 170rpx;
				.tab {
					position: relative;
					font-size: 28rpx;
					color: #070707;
					line-height: 40rpx;
					opacity: 0.5;
					transition: color 0.2s linear;
					&::after {
						position: absolute;
						bottom: 0;
						left: 50%;
						transform: translate(-50%, 100%);
						width: 60rpx;
						height: 4rpx;
						background: #FFFFFF;
						border-radius: 5rpx;
						content: '';
					}
				}
				.active {
					opacity: 1;
					&::after {
						content: '';
						background: #ED413A;
					}
				}
			}
			.form {
				.cell {
					position: relative;
					padding: 30rpx 58rpx 30rpx 46rpx;
					margin-top: 30rpx;
					height: 100rpx;
					background: #F3F3F3;
					border-radius: 50rpx;
					box-sizing: border-box;
					.left-icon {
						position: absolute;
						top: 50%;
						left: 30rpx;
						transform: translate(0, -52%);
						.img {
							width: 56rpx;
							height: 56rpx;
						}
					}
					.input {
						padding-left: 50rpx;
						width: 100%;
						font-size: 28rpx;
						color: #070707;
						line-height: 40rpx;
					}
					.code-input {
						padding-right: 240rpx;
					}
					.code {
						position: absolute;
						top: 50%;
						right: 44rpx;
						transform: translate(0, -50%);
						font-size: 28rpx;
						color: #ED413A;
						line-height: 40rpx;
					}
					.icon {
						position: absolute;
						top: 50%;
						right: 30rpx;
						transform: translate(0, -50%);
					}
				}
			}
			.tip {
				margin-top: 30rpx;
				padding: 0 46rpx;
				.text {
					font-size: 28rpx;
					color: #9f9f9f;
					line-height: 40rpx;
				}
			}
			.submit {
				margin-top: 60rpx;
				.button {
					width: 650rpx;
					height: 100rpx;
					background: linear-gradient(135deg, #FD6A50 0%, #FD4B62 100%);
					border-radius: 50rpx;
					font-size: 32rpx;
					color: #FFFFFF;
					line-height: 44rpx;
				}
			}
			.readme {
				padding: 40rpx 76rpx;
				height: 34rpx;
				.radio {
					margin-right: 10rpx;
					flex: 0 0 auto;
					border-radius: 50%;
					transform: translate(0, 0);
				}
				.text {
					font-size: 24rpx;
					color: #afafaf;
					line-height: 34rpx;
					.clickable {
						color: #545454;
					}
				}
			}
		}
		.extral {
			position: relative;
			margin-top: 40rpx;
			padding: 12rpx 80rpx 150rpx;
			z-index: 1;
			.label {
				margin-bottom: 36rpx;
				position: relative;
				text-align: center;
				font-size: 24rpx;
				color: #ADADAD;
				line-height: 34rpx;
				&::before,
				&::after {
					position: absolute;
					top: 50%;
					transform: translate(0, -50%);
					width: 209rpx;
					height: 2rpx;
					background: #ADADAD;
					opacity: .4;
					content: '';
				}
				&::before {
					left: -62rpx;
					content: '';
				}
				&::after {
					right: -62rpx;
					content: '';
				}
			}
			.item {
				flex: 1;
				.icon {
					margin: 0 auto;
					width: 84rpx;
					height: 84rpx;
					background: #F7F7F7;
					border-radius: 50%;
					.img {
						width: 100%;
						height: 100%;
					}
				}
				.text {
					margin-top: 14rpx;
					font-size: 24rpx;
					color: #070707;
					line-height: 34rpx;
					text-align: center;
				}
			}
		}
	}
}
</style>
