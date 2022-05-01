<template>
	<view class="page safe-area-inset-bottom">
		<view class="page-wrap" v-if="pageLoad">
			<view class="cell-group">
				<view class="cell avatar xa-flex xa-col-center xa-row-between">
					<text class="label">头像</text>
					<view class="right xa-flex xa-col-center">
						<image src="../../static/img/logo.png" class="img"></image>
						<uni-icons type="right" color="#6f788d" size="14" />
					</view>
				</view>
				<view class="cell xa-flex xa-col-center xa-row-between">
					<text class="label">手机号</text>
					<view class="right xa-flex xa-col-center">
						<text class="value">18514463635</text>
						<text class="a" @click="navHandler('/pages/user/resetphone')">变更</text>
					</view>
				</view>
				<view class="cell xa-flex xa-col-center xa-row-between" @click="navHandler('/pages/user/authentication')">
					<text class="label">实名认证</text>
					<view class="right xa-flex xa-col-center">
						<text class="value">未实名</text>
						<uni-icons type="right" color="#6f788d" size="14" />
					</view>
				</view>
				<view class="cell xa-flex xa-col-center xa-row-between">
					<text class="label">微信</text>
					<view class="right xa-flex xa-col-center">
						<text class="value">已绑定</text>
						<!-- <uni-icons type="right" color="#6f788d" size="14" /> -->
					</view>
				</view>
				<view class="cell xa-flex xa-col-center xa-row-between" @click="navHandler('/pages/public/reset', '修改密码')">
					<text class="label">修改密码</text>
					<view class="right xa-flex xa-col-center">
						<uni-icons type="right" color="#6f788d" size="14" />
					</view>
				</view>
				<view class="cell xa-flex xa-col-center xa-row-between">
					<text class="label">收货地址</text>
					<view class="right xa-flex xa-col-center">
						<text class="value">未设置</text>
						<uni-icons type="right" color="#6f788d" size="14" />
					</view>
				</view>
			</view>
			<view class="submit">
				<button class="button xa-flex xa-col-center xa-row-center" @click="submitHandle">退出登录</button>
			</view>
		</view>
		<template v-else>
			<page-loading></page-loading>
		</template>
	</view>
</template>

<script>
	import PageLoading from '../../lib/components/page-loading.vue'
	import { navHandler } from '../../utils/index.js'
	export default {
		data () {
			return {
				pageLoad: false
			}
		},
		components: {
			PageLoading
		},
		onLoad() {
			setTimeout(() => {
				this.pageLoad = true
			}, 1000)
		},
		methods: {
			navHandler,
			submitHandle () {}
		}
	}
</script>

<style lang="scss" scoped>
.page {
	.page-wrap {
		overflow: hidden;
		.cell-group {
			padding: 0 40rpx;
			.cell {
				position: relative;
				height: 112rpx;
				&:not(:last-child)::after {
					position: absolute;
					left: 0;
					bottom: 0;
					right: 0;
					width: 670rpx;
					height: 2rpx;
					background: #F5F5F5;
					border-radius: 2rpx;
					content: '';
				}
				.label {
					font-size: 28rpx;
					font-weight: bold;
					color: #2C2D2E;
					line-height: 40rpx;
					white-space: nowrap;
				}
				.right {
					.img {
						margin-right: 20rpx;
						width: 100rpx;
						height: 100rpx;
						border-radius: 50%;
					}
					.value {
						font-size: 28rpx;
						color: #4D5362;
						line-height: 40rpx;
					}
					.a {
						margin-left: 26rpx;
						font-size: 28rpx;
						color: #ED413A;
						line-height: 40rpx;
					}
				}
			}
			.avatar {
				height: 154rpx;
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