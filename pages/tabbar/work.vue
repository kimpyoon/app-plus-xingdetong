<template>
	<view class="safe-area-inset-bottom page">
		<view class="page-wrap" v-if="pageLoad">
			<uni-nav-bar statusBar title="线上办事" color="#ffffff" :border="false" :backgroundColor="navBarBgColor" fixed></uni-nav-bar>
			<uni-nav-bar backgroundColor="transparent"></uni-nav-bar>
			<image :src="`${prefixUrl}/img/work/bg.png`" class="bg"></image>
			<work-cell></work-cell>
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
	import WorkCell from '../../lib/components/work-cell.vue'
	import { prefixUrl } from '@/config/common.js'
	export default {
		data() {
			return {
				prefixUrl,
				pageLoad: false,
				navBarBgColor: 'transparent'
			}
		},
		components: {
			PageLoading,
			WorkCell,
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
	}
}
</style>