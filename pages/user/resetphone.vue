<template>
	<view class="page">
		<view class="page-wrap">
			<view class="form-wrap">
				<view class="form">
					<view class="cell">
						<input class="input" maxlength="11" type="text" :value="form.phone" placeholder="请输入新手机号" placeholder-style="color:#9f9f9f" />
					</view>
					<view class="cell">
						<input class="input code-input" maxlength="6" type="text" :value="form.code" placeholder="请输入验证码" placeholder-style="color:#9f9f9f" />
						<text class="code" v-if="countdown > 0">{{countdown}}</text>
						<text class="code" @click="sendPhoneCode" v-else>点击获取验证码</text>
					</view>
				</view>
				<view class="submit">
					<button class="button xa-flex xa-col-center xa-row-center">确定变更</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					phone: '',
					code: ''
				},
				countdown: 0
			};
		},
		methods: {
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
				uni.$g.throttle(this.start, 1000)
			}
		}
	}
</script>

<style lang="scss" scoped>
.page {
	.page-wrap {
		padding: 0 50rpx;
		background-color: #FFFFFF;
		.form-wrap {
			padding: 14rpx 0;
			.form {
				.cell {
					position: relative;
					padding: 30rpx 46rpx;
					margin-top: 30rpx;
					height: 100rpx;
					background: #F3F3F3;
					border-radius: 50rpx;
					box-sizing: border-box;
					.input {
						width: 100%;
						font-size: 28rpx;
						color: #070707;
						line-height: 40rpx;
						box-sizing: border-box;
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
				}
			}
		}
		.submit {
			margin-top: 196rpx;
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
</style>
