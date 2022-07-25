<template>
	<view class="page">
		<image class="img" src="../../static/img/fam.png" mode="widthFix"></image>
<!-- 		<z-paging ref="paging" v-model="list" :use-page-scroll="true" @query="queryList">
			<view class="list">
				<view class="item xa-flex xa-row-center xa-col-center" v-for="(item,index) in list" :key="index">
					<image :src="item.thumb" mode="aspectFill"></image>
					<view class="">
						
					</view>
				</view>
			</view>
		</z-paging> -->
	</view>
</template>

<script>
	// import ZPagingMixin from '@/uni_modules/z-paging/components/z-paging/js/z-paging-mixin'
	export default {
		// mixins: [ZPagingMixin],
		data () {
			return {
				list: [],
				curTabIndex: 0
			}
		},
		onLoad(options) {
			this.curTabIndex = options.type || 0
		},
		methods: {
			queryList(pageNo, pageSize) {
				setTimeout(() => {
					this.$refs.paging.complete(list);
				}, 1000)
				//这里的pageNo和pageSize会自动计算好，直接传给服务器即可
				//这里的请求只是演示，请替换成自己的项目的网络请求，并在网络请求回调中通过this.$refs.paging.complete(请求回来的数组)将请求结果传给z-paging
				// this.$request.queryList({ pageNo, pageSize }).then(res => {
					//请勿在网络请求回调中给dataList赋值！！只需要调用complete就可以了
					// this.$refs.paging.complete(res.data.list);
				// }).catch(res => {
					//如果请求失败写this.$refs.paging.complete(false)，会自动展示错误页面
					//注意，每次都需要在catch中写这句话很麻烦，z-paging提供了方案可以全局统一处理
					//在底层的网络请求抛出异常时，写uni.$emit('z-paging-error-emit');即可
					// this.$refs.paging.complete(false);
				// })
			}
		}
	}
</script>

<style lang="scss" scoped>
.page {
	background-color: #F5F6FA;
	font-size: 0;
	.img {
		width: 100%;
	}
	.list {
		padding-top: 24rpx;
		.item {
			margin: 0 auto 24rpx;
		}
	}
}
</style>