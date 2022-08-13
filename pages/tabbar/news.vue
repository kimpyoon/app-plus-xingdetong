<template>
	<view class="page">
		<view class="page-wrap" v-if="pageLoad">
			<image :src="`${prefixUrl}/img/work/bg.png`" class="bg"></image>
			<uni-nav-bar statusBar title="兴安咨询" color="#ffffff" :border="false" :backgroundColor="navBarBgColor" fixed></uni-nav-bar>
			<uni-nav-bar backgroundColor="transparent" :border="false"></uni-nav-bar>
			<view class="container">
				<z-paging ref="paging" refresher-theme-style="white" v-model="articles" :use-page-scroll="true" @query="queryList">
					<!-- <view class="head" slot="top">
						<news-head-bar :backgroundColor="navBarBgColor"></news-head-bar>
						<view class="tab-box" :style="{background: navBarBgColor}">
							<tabs :list="tabs" :activeItemStyle="{'font-size': '32rpx'}" :current="curTabIndex" @change="changeTab" bgColor="transparent" height="74" bar-width="36" active-color="#ffffff" inactive-color="#ffffff"></tabs>
						</view>
					</view>
					<view class="banner" v-if="articles.length">
						<swiper class="swiper-box" @change="change" :current="currentBannerIndex">
							<swiper-item class="swiper-item" v-for="(item, index) in banners" :key="index">
								<view class="img-box">
									<image :src="item.url" class="img"></image>
									<view class="nav xa-flex xa-col-center">
										<text class="text">{{item.title}}</text>
									</view>
								</view>
							</swiper-item>
						</swiper>
					</view> -->
					<view class="article-list">
						<view @click="toArticle(item)" class="article-item xa-flex xa-col-center" v-for="(item, index) in articles" :key="index">
							<view class="left">
								<view class="title">{{item.title}}</view>
								<view class="foot xa-flex xa-col-center">
									<view class="date">{{item.date}}</view>
									<view class="read-num">
										<text class="label">来源：</text>
										<text class="num">{{item.editor}}</text>
									</view>
								</view>
							</view>
							<view class="right">
								<image :src="item.thumb" mode="aspectFill" class="img"></image>
							</view>
						</view>
					</view>
				</z-paging>
			</view>
		</view>
		<template v-else>
			<page-loading></page-loading>
		</template>
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import ZPagingMixin from '@/uni_modules/z-paging/components/z-paging/js/z-paging-mixin'
	import PageLoading from '../../lib/components/page-loading.vue'
	import TabBar from '../../lib/components/tab-bar.vue'
	import NewsHeadBar from '../../lib/components/news-head-bar.vue'
	import Tabs from '../../lib/components/tabs.vue'
	import { navHandler, tranNumber } from '../../utils/index.js'
	import { articles } from '../../utils/common.js'
	import { prefixUrl } from '../../config/common.js'
	export default {
		mixins: [ZPagingMixin],
		data() {
			return {
				prefixUrl,
				pageLoad: false,
				navBarBgColor: 'transparent',
				articles: [...articles],
				curTabIndex: 0,
				tabs: [
					{
						name: '头条'
					},
					{
						name: '农业'
					},
					{
						name: '科技'
					},
					{
						name: '财经'
					}
				],
				banners: [
					{
						url: `${prefixUrl}/img/login_foot_bg.png`,
						title: '我是一条新闻的标题'
					}
				],
				currentBannerIndex: 0
			}
		},
		components: {
			PageLoading,
			TabBar,
			NewsHeadBar,
			Tabs
		},
		onLoad() {
			setTimeout(() => {
				this.pageLoad = true
			}, 1000)
		},
		onPageScroll(e) {
			if (e.scrollTop < 200) {
				this.navBarBgColor = `rgba(242, 85, 66, ${e.scrollTop / 50})`
			}
		},
		methods: {
			navHandler,
			tranNumber,
			toArticle (item) {
				uni.setStorageSync('article', item)
				navHandler('/pages/article/detail')
			},
			queryList(pageNo, pageSize) {
				setTimeout(() => {
					this.changeTab(this.curTabIndex)
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
				if (index > 0) {
					this.$refs.paging.complete([]);
				} else {
					this.$refs.paging.complete(articles);
				}
			},
			change(e) {
				this.currentBannerIndex = e.detail.current
			}
		}
	}
</script>

<style scoped lang="scss">
.page {
	background-color: #F5F6FA;
	.page-wrap {
		padding-bottom: 60rpx;
		background-color: #F5F6FA;
		min-height: 85vh;
		.bg {
			position: fixed;
			top: 0;
			right: 0;
			left: 0;
			z-index: 0;
			width: 100%;
			height: 434rpx;
		}
		.container {
			position: relative;
			z-index: 1;
			.head {
				.tab-box {
					padding-bottom: 20rpx;
					padding-left: 20rpx;
				}
			}
			.banner {
				margin-top: 10rpx;
				.swiper-box {
					.swiper-item {
						position: relative;
						overflow: hidden;
						.img-box {
							position: relative;
							margin: 0 auto;
							width: 710rpx;
							height: 312rpx;
							overflow: hidden;
							border-radius: 16rpx;
							background-color: rgba(242, 85, 66, 1);
							.img {
								width: 100%;
								height: 312rpx;
								border-radius: 16rpx;
							}
							.nav {
								position: absolute;
								padding: 18rpx 32rpx;
								width: 710rpx;
								bottom: 0;
								left: 50%;
								height: 68rpx;
								transform: translate(-50%, -50%);
								background: rgba(0, 0, 0, 0.3);
								box-sizing: border-box;
								border-radius: 0 0 16rpx 16rpx;
								.text {
									font-size: 24rpx;
									color: #FFFFFF;
								}
							}
						}
					}
				}
			}
			.slot {
				height: 200rpx;
			}
			.article-list {
				margin: 24rpx auto 0;
				width: 710rpx;
				background: #FFFFFF;
				border-radius: 16rpx;
				overflow: hidden;
				.article-item {
					padding: 26rpx 20rpx;
					height: 230rpx;
					position: relative;
					box-sizing: border-box;
					&::after {
						position: absolute;
						bottom: 0;
						left: 50%;
						height: 2rpx;
						width: 670rpx;
						background-color: #EDEDED;
						transform: translate(-50%, 100%);
						content: '';
					}
					.left {
						flex: 1;
						.title {
							font-size: 28rpx;
							font-weight: bold;
							color: #38393A;
							line-height: 40rpx;
						}
						.foot {
							margin-top: 58rpx;
							white-space: nowrap;
							.date {
								font-size: 24rpx;
								color: #A2A2A2;
								line-height: 34rpx;
							}
							.read-num {
								margin-left: 28rpx;
								font-size: 24rpx;
								color: #A2A2A2;
								line-height: 34rpx;
								.num {
									margin-left: 8rpx;
									color: #000000;
								}
							}
						}
					}
					.right {
						margin-left: 52rpx;
						flex: 0 0 auto;
						width: 226rpx;
						height: 170rpx;
						.img {
							width: 100%;
							height: 100%;
						}
					}
				}
			}
		}
	}
}
</style>