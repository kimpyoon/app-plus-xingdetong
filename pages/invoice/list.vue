<template>
	<view class="page">
		<z-paging ref="paging" v-model="dataList" :use-page-scroll="true" @query="queryList">
			<tabs slot="top" :list="tabs" :is-scroll="false" :current="curTabIndex" @change="changeTab" height="88" bar-width="60" active-color="#F25542" inactive-color="#333333"></tabs>
			<view class="list">
				<view class="item" @click="applyHandle(item)" v-for="(item,index) in dataList" :key="index">
					<view class="head xa-flex xa-col-center xa-row-between">
						<text class="date">2022/04/12 15:22</text>
						<text class="status">未开票</text>
					</view>
					<view class="content">
						<view class="name">
							<text class="text">我是一个开票类型的名称</text>
						</view>
						<view class="price">
							<text class="num">￥568.00</text>
						</view>
					</view>
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
						name: '全部'
					},
					{
						name: '未开票'
					},
					{
						name: '开票中'
					},
					{
						name: '已开票'
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
			background-color: #FFFFFF;
			border-radius: 16rpx;
			overflow: hidden;
			box-sizing: border-box;
			.head {
				height: 82rpx;
				border-bottom: 1rpx solid #E0E0E0;
				.date {
					font-size: 24rpx;
					color: #A2A2A2;
					line-height: 34rpx;
				}
				.status {
					font-size: 24rpx;
					color: #656565;
					line-height: 34rpx;
				}
				.red {
					color: #F25542;
				}
				.orange {
					color: #FE9D41;
				}
			}
			.content {
				padding: 20rpx 0;
				.name {
					margin-bottom: 20rpx;
					.text {
						font-size: 28rpx;
						font-weight: bold;
						color: #070707;
						line-height: 40rpx;
					}
				}
				.price {
					.num {
						font-size: 36rpx;
						font-weight: bold;
						color: #F25542;
						line-height: 50rpx;
					}
				}
			}
		}
	}
}
</style>