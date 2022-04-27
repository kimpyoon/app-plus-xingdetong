<template>
	<view class="safe-area-inset-bottom page">
		<view class="row xa-flex xa-flex-wrap">
			<view @click="clickItem(item)" class="col xa-flex xa-col-center" v-for="(item, index) in list" :key="index">
				<view class="bg" :style="{ background: item.background }"></view>
				<view class="inner">
					<view class="title">{{item.title}}</view>
					<view class="desc">{{item.desc}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { navHandler } from '../../utils/index.js'
	export default {
		data() {
			return {
				list: [
					{
						title: '旅游景区介绍',
						desc: '我是一句文案描述',
						background: 'linear-gradient(135deg, #FFC689 0%, #FF5151 100%)',
						path: 'https://m.ctrip.com/html5/'
					},
					{
						title: '旅游攻略',
						desc: '我是一句文案描述',
						background: 'linear-gradient(135deg, #FDB541 0%, #FE9241 100%)',
						path: 'https://m.ctrip.com/html5/'
					},
					{
						title: '酒店民宿查询',
						desc: '我是一句文案描述',
						background: 'linear-gradient(135deg, #FDB541 0%, #FE9241 100%)',
						path: 'https://m.ctrip.com/html5/'
					},
					{
						title: '预约入住登记',
						desc: '我是一句文案描述',
						background: 'linear-gradient(135deg, #37D68A 0%, #00B478 100%)',
						path: 'https://m.ctrip.com/html5/'
					},
					{
						title: '景区门票预定',
						desc: '我是一句文案描述',
						background: 'linear-gradient(135deg, #37D68A 0%, #00B478 100%)',
						path: 'https://m.ctrip.com/html5/'
					},
					{
						title: '旅游行程规划',
						desc: '我是一句文案描述',
						background: 'linear-gradient(135deg, #67C3F3 0%, #3590E4 100%)',
						path: 'https://m.ctrip.com/html5/'
					},
					{
						title: '特色美食推荐',
						desc: '我是一句文案描述',
						background: 'linear-gradient(135deg, #FFC689 0%, #FF5151 100%)',
						path: 'https://m.ctrip.com/html5/'
					},
					{
						title: '游客诉求反馈',
						desc: '我是一句文案描述',
						background: 'linear-gradient(135deg, #37D68A 0%, #00B478 100%)',
						path: 'https://m.ctrip.com/html5/'
					}
				]
			}
		},
		onLoad() {

		},
		methods: {
			clickItem (item) {
				navHandler(item.path)
			}
		}
	}
</script>

<style scoped lang="scss">
.page {
	padding-top: 10rpx;
	min-height: 100vh;
	background-color: #F5F6FA;
	font-size: 0;
	box-sizing: border-box;
	.row {
		padding: 0 12rpx 0 30rpx;
		.col {
			position: relative;
			margin: 30rpx 20rpx 0 0;
			padding: 0 20rpx;
			width: 336rpx;
			height: 172rpx;
			border-radius: 16rpx;
			box-sizing: border-box;
			flex: 0 0 auto;
			overflow: hidden;
			.bg {
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				opacity: 0.2;
			}
			.inner {
				position: relative;
				z-index: 1;
				.title {
					font-size: 28rpx;
					font-weight: bold;
					color: #353535;
					line-height: 40rpx;
				}
				.desc {
					margin-top: 8rpx;
					font-size: 24rpx;
					color: #8D8D8D;
					line-height: 34rpx;
				}
			}
		}
	}
}
</style>