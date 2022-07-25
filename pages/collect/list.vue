<template>
	<view class="page">
		<z-paging ref="paging" v-model="dataList" :use-page-scroll="true" @query="queryList">
			<tabs slot="top" :list="tabs" :is-scroll="false" :current="curTabIndex" @change="changeTab" height="88" bar-width="60" active-color="#F25542" inactive-color="#333333"></tabs>
			<view class="list">
				<view class="item xa-flex xa-row-center xa-col-center" @click="applyHandle(item)" v-for="(item,index) in dataList" :key="index">
					<text>收藏的内容</text>
				</view>
			</view>
		</z-paging>
	</view>
</template>

<script>
	import Tabs from '../../lib/components/tabs.vue'
	import ZPagingMixin from '@/uni_modules/z-paging/components/z-paging/js/z-paging-mixin'
	import { navHandler } from '@/utils/index.js'
	export default {
		mixins: [ZPagingMixin],
		data () {
			return {
				dataList: [],
				curTabIndex: 0,
				tabs: [
					{
						name: '分类1'
					},
					{
						name: '分类2'
					},
					{
						name: '分类3'
					},
					{
						name: '分类4'
					}
				]
			}
		},
		components: {
			Tabs
		},
		onLoad(options) {
			this.curTabIndex = options.type || 0
		},
		methods: {
			navHandler,
			queryList(pageNo, pageSize) {
				setTimeout(() => {
					this.$refs.paging.complete([1,2,3,4,5,6,7,8,9]);
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
			},
			changeTab (index) {
				this.curTabIndex = index
				if (index < 2) {
					this.$refs.paging.complete([1,2,3,4,5,6,7,8,9]);
				} else {
					this.$refs.paging.complete([]);
				}
			},
			applyHandle (item) {
				navHandler('/pages/invoice/apply?orderNo=1')
			}
		}
	}
</script>

<style lang="scss" scoped>
.page {
	background-color: #F5F6FA;
	font-size: 0;
	.list {
		padding-top: 24rpx;
		.item {
			margin: 0 auto 24rpx;
			padding: 0 20rpx;
			width: 690rpx;
			height: 240rpx;
			background-color: #FFFFFF;
			border-radius: 16rpx;
			overflow: hidden;
			box-sizing: border-box;
			font-size: 28rpx;
			font-weight: bold;
			color: #070707;
		}
	}
}
</style>