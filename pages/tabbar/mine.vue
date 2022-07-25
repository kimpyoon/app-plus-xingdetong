<template>
	<view class="page safe-area-inset-bottom">
		<view class="status-bar"></view>
		<view class="page-wrap" v-if="pageLoad">
			<image src="../../static/img/mine/bg.png" class="bg"></image>
			<view class="content">
				<view class="setting xa-flex xa-col-center xa-row-right">
					<image src="../../static/img/mine/ic_message.png" class="icon"></image>
					<image src="../../static/img/mine/ic_setting.png" class="icon"></image>
				</view>
				<view class="user-info xa-flex xa-col-center">
					<image src="../../static/img/logo.png" class="avatar" @click="navHandler('/pages/user/info')"></image>
					<view class="right">
						<view class="name"><text @click="navHandler('/pages/user/info')">{{vuex_user.username || '未设置'}}</text></view>
						<view class="tags xa-flex xa-col-center">
							<view class="tag xa-flex xa-col-center">
								<image src="../../static/img/mine/renzhengpeizhi.png" class="icon"></image>
								<text class="text">未认证</text>
							</view>
							<view class="tag xa-flex xa-col-center">
								<image src="../../static/img/mine/gerenyonghu.png" class="icon"></image>
								<text class="text">个人用户</text>
							</view>
						</view>
					</view>
				</view>
				<view class="card" v-if="false">
					<view class="title xa-flex xa-row-between">
						<view class="left xa-flex">
							<image src="../../static/img/mine/ic_10.png" class="icon"></image>
							<text class="text">我的档案</text>
						</view>
					</view>
					<view class="row xa-flex xa-flex-wrap">
						<view class="quick-start-large" :style="{width:`${item.width}rpx`}" v-for="(item, index) in quickStartLarge" :key="index">
							<image :src="item.bg" class="bg" mode="heightFix"></image>
							<view class="inner">
								<view class="name">{{item.text}}</view>
								<view class="btn"><text class="text">点击查看</text></view>
							</view>
						</view>
					</view>
				</view>
				<view class="card" v-if="false">
					<view class="title xa-flex xa-row-between" @click="navHandler('/pages/package/index')">
						<view class="left xa-flex">
							<image src="../../static/img/mine/ic_1.png" class="icon"></image>
							<text class="text">电子卡包</text>
						</view>
						<view class="right xa-flex">
							<text class="text">更多</text>
							<uni-icons type="right" color="#BBBBBB" size="16" />
						</view>
					</view>
					<view class="row xa-flex xa-flex-wrap xa-row-around">
						<view class="col xa-flex xa-col-center xa-row-center" v-for="(item, index) in card" :key="index">
							<view class="bg" :style="{ background: item.background }"></view>
							<view class="inner">
								<view>
									<image :src="item.icon" class="icon"></image>
								</view>
								<view class="text">{{item.text}}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="card">
					<view @click="navHandler(item.url)" class="cell xa-flex xa-col-center" :key="index" v-for="(item,index) in cells">
						<image :src="item.icon" class="icon"></image>
						<view class="text">{{item.text}}</view>
						<uni-icons type="right" color="#BBBBBB" size="16" />
					</view>
				</view>
			</view>
		</view>
		<template v-else>
			<page-loading></page-loading>
		</template>
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import PageLoading from '../../lib/components/page-loading.vue'
	import TabBar from '../../lib/components/tab-bar.vue'
	import { navHandler } from '../../utils/index.js'
	export default {
		data() {
			return {
				pageLoad: false,
				quickStartLarge: [
					{
						bg: '../../static/img/mine/shebaochaxun.png',
						text: '社保',
						width: 204
					},
					{
						bg: '../../static/img/mine/yibao.png',
						text: '医保',
						width: 204
					},
					{
						bg: '../../static/img/mine/gongjijin.png',
						text: '公积金',
						width: 204
					},
					{
						bg: '../../static/img/mine/jiaoshuijilu.png',
						text: '缴税记录',
						width: 426
					},
					{
						bg: '../../static/img/mine/budongchan.png',
						text: '不动产',
						width: 204
					}
				],
				card: [
					{
						icon: '../../static/img/mine/jiankangma.png',
						text: '健康码',
						background: 'linear-gradient(135deg, #FFC689 0%, #FF5151 100%)'
					},
					{
						icon: '../../static/img/mine/yibaoka.png',
						text: '医保卡',
						background: 'linear-gradient(135deg, #37D68A 0%, #00B478 100%)'
					},
					{
						icon: '../../static/img/mine/shebaoka.png',
						text: '社保卡',
						background: 'linear-gradient(135deg, #67C3F3 0%, #3590E4 100%)'
					}
				],
				cells: [
					// {
					// 	icon: '../../static/img/mine/ic_3.png',
					// 	text: '办事进度'
					// },
					{
						icon: '../../static/img/mine/ic_3.png',
						text: '我的收藏',
						url: '/pages/collect/list'
					},
					// {
					// 	icon: '../../static/img/mine/ic_4.png',
					// 	text: '预约记录'
					// },
					// {
					// 	icon: '../../static/img/mine/ic_5.png',
					// 	text: '咨询记录'
					// },
					// {
					// 	icon: '../../static/img/mine/ic_6.png',
					// 	text: '发票管理',
					// 	url: '/pages/invoice/list'
					// },
					{
						icon: '../../static/img/mine/ic_7.png',
						text: '投诉记录'
					},
					{
						icon: '../../static/img/mine/ic_8.png',
						text: '意见反馈',
						url: '/pages/feedback/index'
					},
					{
						icon: '../../static/img/mine/ic_9.png',
						text: '关于我们',
						url: '/pages/user/aboutus'
					}
				]
			}
		},
		components: {
			PageLoading,
			TabBar
		},
		onLoad() {
			setTimeout(() => {
				this.pageLoad = true
			}, 1000)
		},
		methods: {
			navHandler
		}
	}
</script>

<style scoped lang="scss">
.page {
	background-color: #F5F6FA;
	.status-bar {
		height: var(--status-bar-height);
	}
	.page-wrap {
		padding-bottom: 130rpx;
		background-color: #F5F6FA;
		font-size: 0;
		.bg {
			position: absolute;
			top: 0;
			right: 0;
			left: 0;
			width: 100%;
		}
		.content {
			position: relative;
			z-index: 1;
			.setting {
				padding: 0 2rpx;
				.icon {
					flex: 0 0 auto;
					margin-right: 28rpx;
					width: 44rpx;
					height: 44rpx;
				}
			}
			.user-info {
				padding: 8rpx 30rpx 18rpx;
				.avatar {
					margin-right: 18rpx;
					flex: 0 0 auto;
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
					overflow: hidden;
					background-color: #fff;
				}
				.right {
					flex: 1;
					.name {
						font-size: 40rpx;
						font-weight: bold;
						color: #FFFFFF;
						line-height: 56rpx;
					}
					.tags {
						margin-top: 4rpx;
						.tag {
							margin-right: 14rpx;
							height: 40rpx;
							padding: 0 14rpx;
							background: #D1373D;
							border-radius: 22rpx;
							.text {
								font-size: 22rpx;
								color: #FFFFFF;
								line-height: 1;
								flex: 1;
							}
							.icon {
								margin-right: 10rpx;
								flex: 0 0 auto;
								width: 20rpx;
								height: 20rpx;
							}
						}
					}
				}
			}
			.card {
				margin: 20rpx auto 0;
				width: 690rpx;
				background: #FFFFFF;
				border-radius: 16rpx;
				overflow: hidden;
				.title {
					margin-bottom: 6rpx;
					position: relative;
					padding: 20rpx;
					border-radius: 16rpx 16rpx 0 0;
					&::after {
						position: absolute;
						left: 50%;
						transform: translateX(-50%);
						bottom: 0;
						width: 650rpx;
						height: 2rpx;
						background: #F5F5F5;
						content: ''
					}
					.left {
						.icon {
							margin-right: 8rpx;
							flex: 0 0 auto;
							width: 36rpx;
							height: 36rpx;
						}
						.text {
							display: inline-block;
							transform: translateY(2rpx);
							font-size: 32rpx;
							font-weight: bold;
							color: #262A33;
							line-height: 1;
						}
					}
					.right {
						font-size: 24rpx;
						color: #797E89;
						line-height: 34rpx;
					}
				}
				.cell {
					padding: 0 20rpx;
					height: 112rpx;
					position: relative;
					&:after {
						content: " ";
						width: 200%;
						height: 200%;
						position: absolute;
						bottom: 0;
						left: 0;
						border-radius: inherit;
						transform: scale(0.5);
						transform-origin: 0 0;
						pointer-events: none;
						box-sizing: border-box;
						border: 0 #F5F5F5 solid;
						border-bottom-width: 1px;
					}
					.icon {
						margin-right: 16rpx;
						flex: 0 0 auto;
						width: 44rpx;
						height: 44rpx;
					}
					.text {
						flex: 1;
						font-size: 28rpx;
						font-weight: bold;
						color: #2C2D2E;
						line-height: 40rpx;
					}
				}
				.row {
					padding: 20rpx 0 20rpx 20rpx;
					.quick-start-large {
						position: relative;
						margin: 0 18rpx 20rpx 0;
						flex: 0 0 auto;
						height: 204rpx;
						.bg {
							height: 204rpx;
						}
						.inner {
							position: absolute;
							top: 46rpx;
							padding: 0 20rpx;
							z-index: 1;
							.name {
								font-size: 30rpx;
								font-weight: bold;
								color: #FFFFFF;
								line-height: 42rpx;
							}
							.btn {
								margin-top: 8rpx;
								display: inline-block;
								padding: 0 6rpx;
								box-sizing: border-box;
								height: 30rpx;
								line-height: 30rpx;
								border-radius: 28rpx;
								border: 1rpx solid rgba(255, 255, 255, 0.4);
								.text {
									font-size: 16rpx;
									font-weight: bold;
									color: #FFFFFF;
								}
							}
						}
					}
					.col {
						position: relative;
						margin: 0 20rpx 20rpx 0;
						flex: 0 0 auto;
						width: 190rpx;
						height: 190rpx;
						border-radius: 12rpx;
						overflow: hidden;
						.bg {
							position: absolute;
							top: 0;
							right: 0;
							bottom: 0;
							left: 0;
							opacity: 0.1;
						}
						.inner {
							text-align: center;
							.icon {
								width: 92rpx;
								height: 92rpx;
							}
							.text {
								margin-top: 14rpx;
								font-size: 26rpx;
								color: #262A33;
								line-height: 36rpx;
							}
						}
					}
				}
			}
		}
	}
}
</style>