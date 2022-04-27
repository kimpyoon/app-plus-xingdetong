<template>
	<view class="safe-area-inset-bottom page">
		<view class="section">
			<view class="s-title xa-flex xa-col-center">
				<image src="../../static/img/icon/loc_icon_1.png" class="icon"></image>
				<text class="text">当前定位站点</text>
			</view>
			<view class="row xa-flex xa-flex-wrap">
				<view @click="getLocal" class="col xa-flex xa-col-center xa-row-center">
					{{currentPlace.name || '点击定位'}}
				</view>
			</view>
		</view>
		<view class="section">
			<view class="s-title xa-flex xa-col-center">
				<image src="../../static/img/icon/loc_icon_2.png" class="icon"></image>
				<text class="text">选择旗县站点</text>
			</view>
			<view class="row xa-flex xa-flex-wrap">
				<view @click="currentCounty = item.text" :key="index" class="col xa-flex xa-col-center xa-row-center" :class="{active: currentCounty === item.text}" v-for="(item, index) in countyList">
					{{item.text}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentPlace: {},
				countyList: [
					{
						text: '兴安盟本级'
					},
					{
						text: '乌兰浩特市'
					},
					{
						text: '阿尔山市'
					},
					{
						text: '科尔沁右翼前旗'
					},
					{
						text: '科尔沁右翼中旗'
					},
					{
						text: '扎赉特旗'
					}
				],
				currentCounty: ''
			}
		},
		onLoad() {

		},
		methods: {
			getLocal () {
				const that = this
				uni.getLocation({
					type: 'gcj02',
					success: function ({ latitude, longitude }) {
						uni.chooseLocation({
							latitude: latitude,
							longitude: longitude,
							success: function (res) {
								that.currentPlace = res
								console.log('位置名称：' + res.name);
								console.log('详细地址：' + res.address);
							}
						});
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