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
		},
		onReady(e) {
			// 获取当前Webview窗口对象
			let currentWebview = this.$scope.$getAppWebview();
			let webview = currentWebview.children()[0];
			webview.setStyle({'scalable':true});
		}
	}
</script>

<style>
</style>
