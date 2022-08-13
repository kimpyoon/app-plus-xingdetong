<template>
	<view class="page">
		<image :src="`${prefixUrl}/img/login_bg.png`" class="bg"></image>
		<view class="page-wrap">
			<view class="logo">
				<image :src="`${prefixUrl}/img/logo.png`" mode="scaleToFill" class="img"></image>
			</view>
			<view class="h1">欢迎注册兴得通</view>
			<!-- <view class="h4">我是一局APP宣传语</view> -->
			<view class="form-wrap">
				<view class="form">
					<template v-if="registType === '1'">
						<view class="cell">
							<view class="left-icon">
								<image :src="`${prefixUrl}/img/icon/phone.png`" class="img"></image>
							</view>
							<input class="input" @input="changeInput" @focus="focusKey = 'phone'" maxlength="11" type="text" :value="form.phone" placeholder="请输入手机号" placeholder-style="color:#9f9f9f" />
						</view>
						<view class="cell">
							<view class="left-icon">
								<image :src="`${prefixUrl}/img/icon/valid.png`" class="img"></image>
							</view>
							<input class="input code-input" @input="changeInput" @focus="focusKey = 'code'" maxlength="6" type="text" :value="form.code" placeholder="请输入手机验证码" placeholder-style="color:#9f9f9f" />
							<text class="code" v-if="countdown > 0">{{countdown}}</text>
							<text class="code" @click="sendPhoneCode" v-else>点击获取验证码</text>
						</view>
					</template>
					<template v-if="registType === '2'">
						<view class="cell">
							<view class="left-icon">
								<image :src="`${prefixUrl}/img/icon/business.png`" class="img"></image>
							</view>
							<input class="input" @input="changeInput" @focus="focusKey = 'businessName'" type="text" :value="form.businessName" placeholder="请输入单位名称" placeholder-style="color:#9f9f9f" />
						</view>
						<view class="cell">
							<view class="left-icon">
								<image :src="`${prefixUrl}/img/icon/idcard.png`" class="img"></image>
							</view>
							<input class="input" @input="changeInput" @focus="focusKey = 'socialCreditCode'" type="text" :value="form.socialCreditCode" placeholder="请输入统一社会信用代码" placeholder-style="color:#9f9f9f" />
						</view>
						<view class="cell" @click="showPicker = true">
							<view class="left-icon">
								<image :src="`${prefixUrl}/img/icon/user.png`" class="img"></image>
							</view>
							<picker @change="bindPickerChange" :value="typeIndex" :range="legalPersonTypes" range-key="text">
								<view class="input">
									<template v-if="legalPersonType">
										{{legalPersonType}}
									</template>
									<text v-else style="color:#9f9f9f">请选择法人类型</text>
								</view>
							</picker>
							<view class="icon">
								<uni-icons type="right" size="20"></uni-icons>
							</view>
						</view>
					</template>
					<view class="cell">
						<view class="left-icon">
							<image :src="`${prefixUrl}/img/icon/password.png`" class="img"></image>
						</view>
						<input class="input" :password="!showPassword" @input="changeInput" @focus="focusKey = 'password'" type="text" :value="form.password" placeholder="请设置登录密码" placeholder-style="color:#9f9f9f" />
						<view class="icon">
							<uni-icons type="eye-filled" size="20" @click="showPassword = false" v-if="showPassword"></uni-icons>
							<uni-icons type="eye-slash-filled" size="20" @click="showPassword = true" v-else></uni-icons>
						</view>
					</view>
					<view class="cell">
						<view class="left-icon">
							<image :src="`${prefixUrl}/img/icon/password.png`" class="img"></image>
						</view>
						<input class="input" :password="!showConfirmPassword" @input="changeInput" @focus="focusKey = 'confirmPassword'" type="text" :value="form.confirmPassword" placeholder="再次确认密码" placeholder-style="color:#9f9f9f" />
						<view class="icon">
							<uni-icons type="eye-filled" size="20" @click="showConfirmPassword = false" v-if="showConfirmPassword"></uni-icons>
							<uni-icons type="eye-slash-filled" size="20" @click="showConfirmPassword = true" v-else></uni-icons>
						</view>
					</view>
				</view>
				<view class="submit">
					<button class="button xa-flex xa-col-center xa-row-center" @click="submitHandle">注册</button>
				</view>
				<view class="tip">
					<text class="text">已有账号，</text>
					<text class="text" @click="back" style="color: #ED413A;">立即登录</text>
				</view>
			</view>
			<image :src="`${prefixUrl}/img/login_foot_bg.png`" mode="" class="foot-bg"></image>
		</view>
	</view>
</template>

<script>
	import { legalPersonTypes } from '../../utils/common.js'
	import { prefixUrl } from '@/config/common.js'
	export default {
		data() {
			return {
				prefixUrl,
				form: {
					phone: '',
					code: '',
					businessName: '',
					socialCreditCode: '',
					legalPersonType: '',
					password: '',
					confirmPassword: ''
				},
				focusKey: '',
				registType: '1',
				showPicker: false,
				countdown: 0,
				typeIndex: 0,
				legalPersonType: '',
				legalPersonTypes,
				showPassword: false,
				showConfirmPassword: false
			};
		},
		onLoad({ type }) {
			this.registType = type || '1'
		},
		methods: {
			changeInput (e) {
				this.form[this.focusKey] = e.target.value
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
				if (this.registType === '1') {
					if (!uni.$g.test.mobile(this.form.phone)) {
						this.$toast('请输入正确的手机号')
						return
					} else if (!uni.$g.test.code(this.form.code, 4)) {
						this.$toast('请输入4位数字验证码')
						return
					}
				} else if (this.registType === '2') {
					if (uni.$g.test.isEmpty(this.form.businessName)) {
						this.$toast('请输入单位名称')
						return
					} else if (!uni.$g.test.socialCode(this.form.socialCreditCode)) {
						this.$toast('请输入统一社会信用代码')
						return
					} else if (uni.$g.test.isEmpty(this.form.legalPersonType)) {
						this.$toast('请选择法人类型')
						return
					}
				}
				if (uni.$g.test.isEmpty(this.form.password)) {
					this.$toast('请输入密码')
					return
				} else if (uni.$g.test.isEmpty(this.form.confirmPassword)) {
					this.$toast('请输入确认密码')
					return
				} else if (this.form.confirmPassword) {
					if (this.form.password !== this.form.confirmPassword) {
						this.$toast('两次输入的密码不一致')
						return
					}
				}
				const params = {
					password: this.form.password
				}
				let api = ''
				if (this.registType === '1') {
					params.mobile = this.form.phone
					params.code = this.form.code
					api = 'registerByMobile'
				} else if (this.registType === '2') {
					params.businessName = this.form.businessName
					params.businessType = this.form.legalPersonType
					params.creditCode = this.form.socialCreditCode
					api = 'registerByBusiness'
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
						const goPage = uni.getStorageSync('goPage')
						uni.reLaunch({
							url: goPage || '/pages/index/index'
						})
					}
					console.log(res)
					uni.hideLoading()
				}).catch((e) => {
					uni.hideLoading()
					console.log(e)
				})
			},
			bindPickerChange (e) {
				this.typeIndex = e.detail.value
				this.form.legalPersonType = legalPersonTypes[this.typeIndex].value
				this.legalPersonType = legalPersonTypes[this.typeIndex].text
			},
			back () {
				uni.navigateBack()
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
		overflow: hidden;
		.logo {
			text-align: center;
			.img {
				width: 120rpx;
				height: 120rpx;
				background: #D8D8D8;
				border-radius: 36rpx;
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
		.logo {
			margin-top: 33rpx;
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
			color: #070707;
			line-height: 74rpx;
		}
		.h4 {
			margin-top: 5rpx;
			font-size: 28rpx;
			color: #070707;
			line-height: 40rpx;
		}
		.form-wrap {
			position: relative;
			margin-top: 60rpx;
			z-index: 1;
			.form {
				.cell {
					position: relative;
					padding: 30rpx 46rpx;
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
					.code {
						position: absolute;
						top: 50%;
						right: 44rpx;
						transform: translate(0, -50%);
						font-size: 28rpx;
						color: #ED413A;
						line-height: 40rpx;
					}
					.code-input {
						padding-right: 240rpx;
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
				padding: 30rpx 0 230rpx;
				text-align: center;
				.text {
					font-size: 28rpx;
					color: #9f9f9f;
					line-height: 40rpx;
				}
			}
			.submit {
				margin-top: 96rpx;
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
		}
	}
}
</style>
