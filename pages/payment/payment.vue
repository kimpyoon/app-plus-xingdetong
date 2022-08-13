<template>
	<view class="page">
		<view class="list">
			<view @click="clickItem(item)" class="card" v-for="(item, index) in cards" :key="index">
				<image :src="item.bg" class="bg" mode="widthFix"></image>
				<view class="content">
					<view class="name"><text>{{item.name}}</text></view>
					<view class="desc" v-if="item.desc"><text>{{item.desc}}</text></view>
					<button class="button xa-flex xa-col-center xa-row-center"><text>立即查看</text></button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { navHandler } from '../../utils/index.js'
	import { prefixUrl } from '../../config/common.js'
	export default {
		data () {
			return {
				cards: [
					{
						name: '交电费',
						desc: '',
						bg: `${prefixUrl}/img/fee/df.png`,
						path: {
							// #ifdef MP-WEIXIN
							appId: 'wxd2ade0f25a874ee2'
							// #endif
							// #ifdef APP-PLUS
							appId: 'gh_aceb9bd462ab'
							// #endif
						}
					},
					{
						name: '交水费',
						desc: '',
						bg: `${prefixUrl}/img/fee/sf.png`,
						path: {
							// #ifdef MP-WEIXIN
							appId: 'wxd2ade0f25a874ee2'
							// #endif
							// #ifdef APP-PLUS
							appId: 'gh_aceb9bd462ab'
							// #endif
						}
					},
					{
						name: '交电视费',
						desc: '',
						bg: `${prefixUrl}/img/fee/tv.png`,
						path: 'https://online.96066.com:8443/mcrweb/login.shtml?channelcode=MSB&redirect=INDEX&timestamp=20201109&sign=73E0C85625A8EE39856F2E08B77F93F0'
					}
				]
			}
		},
		methods: {
			clickItem (item) {
				navHandler(item.path)
			}
		}
	}
</script>

<style lang="scss" scoped>
.page {
	.list {
		padding: 40rpx 0;
		.card {
			position: relative;
			padding-left: 30rpx;
			.bg {
				width: 700rpx;
				position: absolute;
				top: 0;
				left: 35rpx;
			}
			.content {
				position: relative;
				height: 240rpx;
				padding-left: 154rpx;
				box-sizing: border-box;
				z-index: 1;
				.name {
					// padding-top: 54rpx;
					padding-top: 80rpx;
					font-size: 36rpx;
					font-weight: bold;
					color: #FFFFFF;
					line-height: 50rpx;
				}
				.desc {
					margin-top: 8rpx;
					font-size: 24rpx;
					color: #FFFFFF;
					line-height: 34rpx;
				}
				.button {
					position: absolute;
					top: 74rpx;
					right: 74rpx;
					height: 52rpx;
					padding: 0 26rpx;
					border-radius: 26rpx;
					border: 2rpx solid rgba(255,255,255,0.3);
					font-size: 24rpx;
					color: #FFFFFF;
					line-height: 1;
					background-color: transparent;
				}
			}
		}
	}
}
</style>