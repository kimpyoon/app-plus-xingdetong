<template>
	<view class="cus-tab-bar xa-flex xa-col-center safe-area-inset-bottom" v-if="showTab">
		<view :class="['tab-item xa-flex xa-col-center xa-row-center', { active: currentPath === item.path }, { middle: item.middle }]" @click.stop="switchTabHandle(item)" v-for="item in list" :key="item.text">
			<view class="tab-item__inner">
				<view class="icon">
					<image class="img" :src="item.selectIconPath" v-if="currentPath === item.path"></image>
					<image class="img" :src="item.iconPath" v-else></image>
				</view>
				<view class="text" :style="{
					color:currentPath === item.path ? item.selectColor : item.color,
					fontSize: item.fontSize
				}">{{item.text}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { tabbars } from '../../utils/index.js'
	export default {
		data() {
			return {
				currentPath: ''
			};
		},
		computed: {
			list () {
				return tabbars
			},
			showTab () {
				return this.list.findIndex(n => n.path === this.currentPath) > -1
			}
		},
		methods: {
			switchTabHandle (item) {
				if (this.currentPath !== item.path) {
					uni.switchTab({
						url: `/${item.path}`
					})
				}
			}
		},
		mounted() {
			uni.hideTabBar()
			const pages = getCurrentPages();
			const page = pages[pages.length - 1];
			this.currentPath = page.route;
		}
	}
</script>

<style lang="scss" scoped>
.cus-tab-bar {
	position: fixed;
	bottom: 0;
	right: 0;
	left: 0;
	height: 110rpx;
	background: #FFFFFF;
	box-shadow: 0 -8rpx 8rpx 0 rgba(0, 0, 0, 0.05);
	border-radius: 32rpx 32rpx 0 0;
	background-color: #FFFFFF;
	z-index: 99;
	.tab-item {
		padding: 10rpx 0;
		flex: 1;
		.tab-item__inner {
			text-align: center;
			.icon {
				font-size: 0;
				.img {
					width: 52rpx;
					height: 52rpx;
				}
			}
			.text {
				font-size: 22rpx;
			}
		}
	}
	.middle {
		.tab-item__inner {
			.icon {
				margin: 0 auto -40rpx;
				border: 10rpx solid #fff;
				background: #fff;
				transform: translate(0, -40%);
				border-radius: 50%;
			}
		}
	}
}
</style>
