<template>
	<web-view :src="url"></web-view>
</template>

<script>
	export default {
		data () {
			return {
				url: '',
				webView: {}
			}
		},
		onLoad(options) {
			this.url = decodeURIComponent(options.url)
		}
	}
</script>

<style>
</style>
