<template>
	<view class="safe-area-inset-bottom page">
		<view class="page-wrap" v-if="pageLoad">

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
	export default {
		data() {
			return {
				pageLoad: false
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

		}
	}
</script>

<style scoped lang="scss">
.page {
	background-color: #F5F6FA;
	.page-wrap {
		padding-bottom: 130rpx;
		background-color: #F5F6FA;
		font-size: 0;
	}
}
</style>