<template>
	<view class="page">
		<view class="tab-panel">
			<view class="list">
				<view class="list-item" v-for="(item, index) in list" :key="index">
					<view class="left">
						<view class="round-circle" :class="[!index?'hl':'']"></view>
					</view>
					<view class="right-content">
						<view class="head">
							<text class="text ml" v-if="!index">{{detail.status_text}}</text>
							<text class="text">{{formatDateTime(item.datetime)}}</text>
						</view>
						<view class="remark">
							<text class="text">{{item.remark}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				detail: {}
			}
		},
		computed: {
			list () {
				if (this.detail.list) {
					return this.detail.list.reverse()
				}
				return []
			}
		},
		onLoad(options) {
			uni.getStorage({
				key: 'express-data',
				success: (res) => {
					this.detail = res.data
				}
			})
		},
		methods: {
			formatDateTime(value) {
				if (value) {
					return uni.$g.timeFormat(value.replace(/\-/g, '/'), 'mm月dd日 hh:MM')
				}
				return ''
			}
		}
	}
</script>

<style lang="scss" scoped>
.page {
	padding: 20rpx 0;
	font-size: 0;
}
.tab-panel {
	margin: 0 auto;
	width: 690rpx;
	background-color: #FFFFFF;
	.list {
		padding: 30rpx;
		.list-item {
			position: relative;
			display: flex;
			justify-content: space-between;
			padding-bottom: 50rpx;
			&:not(:last-child) {
				&::after {
					position: absolute;
					top: 0;
					left: 12rpx;
					bottom: 0;
					content: '';
					width: 2rpx;
					background-color: #E5E5E5;
				}
			}
			.left {
				position: relative;
				flex: 0 0 auto;
				width: 50rpx;
				z-index: 1;
				.round-circle {
					position: absolute;
					top: 0;
					left: 0;
					width: 24rpx;
					height: 24rpx;
					background-color: #E5E5E5;
					border-radius: 50%;
					box-sizing: content-box;
				}
				.hl {
					background-color: #EA574B;
				}
			}
			.right-content {
				margin-top: -6rpx;
				position: relative;
				z-index: 1;
				flex: 1;
				.head {
					.ml {
						margin-right: 8rpx;
					}
					.text {
						font-size: 26rpx;
						color: #000000;
						line-height: 36rpx;
					}
				}
				.remark {
					margin-top: 20rpx;
					.text {
						font-size: 24rpx;
						color: #999999;
						line-height: 34rpx;
					}
				}
			}
		}
	}
}
</style>