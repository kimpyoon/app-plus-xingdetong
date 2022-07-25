<template>
	<view class="page">
		<z-paging ref="paging" :paging-style="{margin: 0,padding:0}" v-model="list" :use-page-scroll="true" @query="queryList">
			<view class="list">
				<view class="item xa-flex xa-row-center xa-col-center" v-for="(item,index) in list" :key="index">
					<image class="bg" :src="item.thumb" mode="aspectFill"></image>
					<view class="content">
						<view class="handle">
							<view class="inner">
								<view class="title">
									<text class="text">{{item.title}}</text>
								</view>
								<view class="address xa-flex xa-col-center xa-row-between">
									<view class="left xa-flex xa-col-center">
										<uni-icons type="location-filled" size="20" color="#333940"></uni-icons>
										<text class="text">{{item.address}}</text>
									</view>
									<view class="right xa-flex xa-col-center" @click="phoneCall(item.phone)">
										<uni-icons type="phone-filled" size="20" color="#333940"></uni-icons>
										<text class="text">{{item.phone}}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</z-paging>
	</view>
</template>

<script>
	import ZPagingMixin from '@/uni_modules/z-paging/components/z-paging/js/z-paging-mixin'
	export default {
		mixins: [ZPagingMixin],
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
					this.$refs.paging.complete([
						{
							title: '润达家政',
							address: '乌兰浩特市五一广场',
							thumb: '../../static/img/18404829827.png',
							phone: '18404829827'
						},
						{
							title: '揽家家政',
							address: '乌兰浩特市万达',
							thumb: '../../static/img/18548200711.png',
							phone: '18548200711'
						},
						{
							title: '亮洁家政',
							address: '乌兰浩特市五一广场',
							thumb: '../../static/img/13644898812.png',
							phone: '13644898812'
						}
					]);
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
			phoneCall(phone) {
				uni.makePhoneCall({
					phoneNumber: phone
				})
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
		.item {
			position: relative;
			margin: 0 auto 24rpx;
			width: 710rpx;
			height: 400rpx;
			background-color: #ffffff;
			border-radius: 0 0 16rpx 16rpx;
			overflow: hidden;
			.bg {
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}
			.content {
				position: relative;
				display: flex;
				flex-direction: column;
				justify-content: flex-end;
				width: 100%;
				height: 400rpx;
				z-index: 1;
				.handle {
					width: 100%;
					.blur {
						position: absolute;
						top: 0;
						right: 0;
						bottom: 0;
						left: 0;
						background: rgba(255,255,255,1);
						border-radius: 0 0 16rpx 16rpx;
						backdrop-filter: blur(10px);
						filter: blur(10px);
						z-index: 0;
					}
					.inner {
						position: relative;
						padding: 16rpx 30rpx;
						background: rgba(255,255,255,0.6000);
						.title {
							.text {
								font-weight: 500;
								color: #554545;
								font-size: 32rpx;
							}
						}
						.address {
							margin-top: 10rpx;
							.text {
								color: #333940;
								font-size: 28rpx;
							}
						}
					}
				}
			}
		}
	}
}
</style>