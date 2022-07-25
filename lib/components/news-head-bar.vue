<template>
	<view class="head-bar" :style="{background: backgroundColor}">
		<status-bar v-if="statusbar"></status-bar>
		<view class="search-bar xa-flex xa-col-center xa-row-center">
			<view class="input-box xa-flex xa-col-center ">
				<uni-icons class="icon" type="search" color="#BBBBBB" size="16" />
				<input class="input" confirm-type="search" :value="searchValue" placeholder-style="color: #BBBBBB;" type="text" placeholder="请输入搜索关键字">
			</view>
			<button class="search-button xa-flex xa-col-center xa-row-center">
				<text class="text">搜索</text>
			</button>
		</view>
	</view>
</template>

<script>
	import StatusBar from '@/lib/components/status-bar.vue'
	export default {
		props: {
			backgroundColor: {
				type: String,
				default: '#ffffff'
			},
			statusbar: {
				type: Boolean,
				default: true
			}
		},
		data () {
			return {
				searchValue: ''
			}
		},
		methods: {
			search () {}
		},
		components: {
			StatusBar
		},
		onBackPress() {
			// #ifdef APP-PLUS
			plus.key.hideSoftKeybord();
			// #endif
		}
	}
</script>

<style lang="scss" scoped>
.head-bar {
	.search-bar {
		padding: 10rpx 20rpx;
		position: relative;
		.input-box {
			flex: 1;
			padding: 18rpx 30rpx;
			background-color: #FFFFFF;
			border-radius: 44rpx;
			.icon {
				margin-right: 6rpx;
			}
			.input {
				flex: 1;
				font-size: 24rpx;
				color: #BBBBBB;
				line-height: 34rpx;
			}
		}
		.search-button {
			position: absolute;
			right: 28rpx;
			top: 18rpx;
			padding: 0 34rpx;
			height: 52rpx;
			background: linear-gradient(135deg, #FD6A50 0%, #FD4B62 100%);
			border-radius: 25rpx;
			.text {
				font-size: 24rpx;
				color: #FFFFFF;
				line-height: 34rpx;
			}
		}
	}
}
</style>