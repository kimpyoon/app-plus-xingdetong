<template>
	<view class="safe-area-inset-bottom page">
		<view class="section">
			<view class="s-title xa-flex xa-col-center">
				<image :src="`${prefixUrl}/img/icon/loc_icon_1.png`" class="icon"></image>
				<text class="text">当前定位站点</text>
			</view>
			<view class="row xa-flex xa-flex-wrap">
				<view @click="getLocal" :class="{active: currentLocal === vuex_location.address.city}" class="col xa-flex xa-col-center xa-row-center">
					{{currentLocal || '点击定位'}}
				</view>
			</view>
		</view>
		<view class="section">
			<view class="s-title xa-flex xa-col-center">
				<image :src="`${prefixUrl}/img/icon/loc_icon_2.png`" class="icon"></image>
				<text class="text">选择旗县站点</text>
			</view>
			<view class="row xa-flex xa-flex-wrap">
				<view @click="selectHandle(item)" :key="index" class="col xa-flex xa-col-center xa-row-center" :class="{active: currentCounty === item.address.city}" v-for="(item, index) in countyList">
					{{item.address.city}}
				</view>
			</view>
		</view>
		<view class="submit">
			<button class="button xa-flex xa-col-center xa-row-center" @click="submitHandle">确 定</button>
		</view>
	</view>
</template>

<script>
	import { prefixUrl } from '@/config/common.js'
	export default {
		data() {
			return {
				prefixUrl,
				currentPlace: {},
				countyList: [
					{
						longitude: 121.593972,
						latitude: 45.381918,
						address: {
							city: '突泉'
						}
					},
					{
						longitude: 122.093309,
						latitude: 46.072233,
						address: {
							city: '乌兰浩特市'
						}
					},
					{
						longitude: 119.943575,
						latitude: 47.17744,
						address: {
							city: '阿尔山市'
						}
					},
					{
						longitude: 121.952513,
						latitude: 46.079673,
						address: {
							city: '科尔沁右翼前旗'
						}
					},
					{
						longitude: 121.476238,
						latitude: 45.060633,
						address: {
							city: '科尔沁右翼中旗'
						}
					},
					{
						longitude: 122.89957,
						latitude: 46.72314,
						address: {
							city: '扎赉特旗'
						}
					}
				],
				currentCounty: '',
				currentLocal: '',
				currentItem: {}
			}
		},
		onLoad() {
			// this.getLocal()
		},
		methods: {
			selectHandle (item) {
				this.currentItem = item
				this.currentCounty = item.address.city
			},
			submitHandle () {
				uni.$g.vuex('vuex_location', this.currentItem)
				uni.navigateBack()
			},
			getLocal () {
				const that = this
				uni.getLocation({
					type: 'gcj02',
					geocode: true,
					success: function (res) {
						uni.$g.vuex('vuex_location', res)
						that.currentItem = res
						that.currentLocal = res.address.city
						// uni.chooseLocation({
						// 	latitude: res.latitude,
						// 	longitude: res.longitude,
						// 	success: function (res) {
						// 		that.currentPlace = res
						// 		console.log('位置名称：' + res.name);
						// 		console.log('详细地址：' + res.address);
						// 	}
						// });
					}
				});
			}
		}
	}
</script>

<style scoped lang="scss">
.page {
	padding: 2rpx 30rpx;
	font-size: 0;
	background-color: #F5F6FA;
	box-sizing: border-box;
	min-height: 100vh;
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
	.section {
		margin-top: 24rpx;
		padding: 20rpx 0 20rpx 20rpx;
		width: 690rpx;
		min-height: 212rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		box-sizing: border-box;
		.s-title {
			padding-right: 20rpx;
			height: 84rpx;
			box-sizing: border-box;
			border-bottom: 2rpx solid #F5F5F5;
			.icon {
				margin-right: 4rpx;
				width: 36rpx;
				height: 36rpx;
				flex: 0 0 auto;
			}
			.text {
				font-size: 32rpx;
				font-weight: bold;
				color: #262A33;
				line-height: 44rpx;
			}
		}
		.row {
			.col {
				padding: 0 44rpx 0 46rpx;
				margin-top: 24rpx;
				margin-right: 20rpx;
				height: 76rpx;
				background: #F9F9F9;
				border-radius: 50rpx;
				color: #515151;
				font-size: 24rpx;
				line-height: 34rpx;
			}
			.active {
				color: #FFFFFF;
				background: linear-gradient(135deg, #FD6A50 0%, #FD4B62 100%)
			}
		}
	}
}
</style>