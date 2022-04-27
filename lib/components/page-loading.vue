<template>
	<view class="page-loading">
		<uni-load-more iconType="circle" status="loading" :contentText="contentText" />
	</view>
</template>

<script>
	export default {
		data () {
			return {
				contentText: {
					contentdown: "",
					contentrefresh: "加载中...",
					contentnomore: ""
				}
			}
		}
	}
</script>

<style scoped lang="scss">
</style>
