<template>
	<view class="safe-area-inset-bottom page">
		<view class="page-wrap" v-if="pageLoad">
			<uni-nav-bar statusBar title="线上办事" color="#ffffff" :border="false" :backgroundColor="navBarBgColor" fixed></uni-nav-bar>
			<uni-nav-bar backgroundColor="transparent"></uni-nav-bar>
			<image :src="`${prefixUrl}/img/work/bg.png`" class="bg"></image>
			<view class="section">
				<view class="title xa-flex xa-col-center border-bottom">
					<image :src="`${prefixUrl}/img/work/ic_love.png`" class="icon"></image>
					<text class="text">线上办事</text>
				</view>
				<view class="cell-group">
					<view @click="nav(item.url, item.name)" class="cell xa-flex xa-col-center xa-row-between border-bottom" v-for="(item,index) in cells" :key="index">
						<text class="text">{{item.name}}</text>
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
	import { prefixUrl } from '@/config/common.js'
	export default {
		data() {
			return {
				prefixUrl,
				pageLoad: false,
				navBarBgColor: 'transparent',
				cells: [
					{
						name: '居民核办身份证',
						url: '/pages/chat/list?type=1'
					},
					{
						name: '核发居住证',
						url: '/pages/chat/list?type=2'
					},
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
		onPageScroll(e) {
			if (e.scrollTop < 200) {
				this.navBarBgColor = `rgba(242, 85, 66, ${e.scrollTop / 100})`
			}
		},
		methods: {
			nav (url, name) {
				uni.navigateTo({
					url: `${url}&title=${encodeURIComponent(name)}`
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.page {
	background-color: #F5F6FA;
	.page-wrap {
		padding-bottom: 130rpx;
		min-height: 85vh;
		background-color: #F5F6FA;
		.border-bottom {
			position: relative;
			&::after {
				position: absolute;
				right: 30rpx;
				bottom: 0;
				width: 570rpx;
				height: 1rpx;
				background-color: #EBEBEB;
				content: '';
			}
		}
		.bg {
			position: fixed;
			top: 0;
			right: 0;
			left: 0;
			z-index: 0;
			width: 100%;
			height: 434rpx;
		}
		.section {
			position: relative;
			margin: -30rpx auto 0;
			width: 710rpx;
			background: #FFFFFF;
			border-radius: 16rpx;
			overflow: hidden;
			z-index: 1;
			.title {
				padding: 40rpx 30rpx 40rpx 40rpx;
				border-radius: 16rpx 0 0 16rpx;
				.icon {
					margin-right: 28rpx;
					width: 52rpx;
					height: 52rpx;
					flex: 0 0 1;
				}
				.text {
					font-size: 36rpx;
					font-weight: bold;
					color: #070707;
					line-height: 50rpx;
				}
			}
			.cell-group {
				background-color: #FFFFFF;
				.cell {
					padding: 0 30rpx 0 112rpx;
					height: 100rpx;
					.text {
						font-size: 28rpx;
						color: #333940;
						line-height: 40rpx;
						opacity: 0.5;
					}
				}
			}
		}
	}
}
</style>