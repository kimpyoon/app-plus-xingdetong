<template>
	<view class="safe-area-inset-bottom page">
		<uni-nav-bar statusBar leftWidth="140rpx" :border="false" @clickRight="clickRightNavBarButton" @clickLeft="clickLeftNavBarButton" :backgroundColor="navBarBgColor" rightWidth="auto" fixed>
			<block slot="left">
				<view class="nav-city xa-flex">
					<view class="inner">
						<view class="text xa-line-1">{{currentAddress.city || '--'}}</view>
						<view class="weather">{{nowWeatherData.text || '--'}} {{nowWeatherData.temp || '--'}}℃</view>
					</view>
					<uni-icons type="arrowdown" color="#fff" size="16" />
				</view>
			</block>
			<view class="nav-content xa-flex xa-col-center">
				<view class="nav-input-view xa-flex xa-col-center">
					<uni-icons type="search" color="#BBBBBB" size="16" />
					<view class="nav-bar-input" @click="toSearch">
						搜索内容
					</view>
				</view>
			</view>
			<block slot="right">
				<view class="nav-right-icon xa-flex xa-col-center">
					<uni-icons type="scan" color="#fff" size="28" />
				</view>
			</block>
		</uni-nav-bar>

		<view class="page-wrap" v-if="pageLoad">
			<view class="banner-box">
				<uni-swiper-dot v-if="banners.length > 1" class="uni-swiper-dot-box" :current="currentBannerIndex" :info="banners" mode="dot" field="content">
					<swiper class="swiper-box" @change="changeBanner">
						<swiper-item v-for="(item, index) in banners" :key="index">
							<image :src="item.url" class="banner"></image>
						</swiper-item>
					</swiper>
				</uni-swiper-dot>
				<image :src="banners[0].url" class="banner" v-else></image>
			</view>
			<view class="menu">
				<view class="inner">
					<uni-grid :highlight="false" :column="4" :show-border="false" @change="clickMenuItem">
						<uni-grid-item v-for="(item ,index) in menuList" :index="index" :key="index">
							<view class="grid-item-box xa-flex xa-flex-column xa-col-center xa-row-center">
								<image class="image" :src="item.url" mode="aspectFill" />
								<text class="text">{{item.text}}</text>
							</view>
						</uni-grid-item>
					</uni-grid>
				</view>
			</view>
			<notice-bar :list="noticeList" :custom-style="{
				borderRadius: '44rpx',
				width: '710rpx',
				margin: '32rpx auto 0'
			}"></notice-bar>
			<view class="section">
				<view class="s-title xa-flex xa-col-center">
					<image src="../../static/img/icon/love_icon.png" class="icon"></image>
					<text class="text">抗击疫情</text>
				</view>
				<view class="card xa-flex xa-col-center xa-row-center">
					<view class="item" v-for="(item, index) in covid" :key="index">
						<view class="count" :style="{color: item.color}">
							{{item.count}}
						</view>
						<view class="label">
							{{item.text}}
						</view>
					</view>
				</view>
			</view>
			<view class="section">
				<view class="s-title xa-flex xa-col-center">
					<image src="../../static/img/icon/bus_icon.png" class="icon"></image>
					<text class="text">交通出行</text>
				</view>
				<view class="traffic-wrap">
					<view class="scroll-inner xa-flex xa-col-center xa-flex-nowrap">
						<view v-for="(item,index) in traffic" class="item xa-flex xa-col-center xa-row-center">
							<image :src="item.thumb" class="thumb"></image>
							<view class="content xa-flex xa-col-center">
								<view class="inner">
									<view class="title">{{item.name}}</view>
									<view class="desc">{{item.desc}}</view>
								</view>
							</view>
						</view>
						<view class="slot"></view>
					</view>
				</view>
			</view>
			<view class="section">
				<view class="s-title xa-flex xa-col-center">
					<image src="../../static/img/icon/hot_icon.png" class="icon"></image>
					<text class="text">兴安要闻</text>
				</view>
				<view class="article-list">
					<view @click="navHandler('/pages/article/detail')" class="article-item xa-flex xa-col-center" v-for="(item, index) in articles" :key="index">
						<view class="left">
							<view class="title">{{item.title}}</view>
							<view class="foot xa-flex xa-col-center">
								<view class="date">{{item.date}}</view>
								<view class="read-num">
									<text class="label">阅读量</text>
									<text class="num">{{tranNumber(item.readNum)}}</text>
								</view>
							</view>
						</view>
						<view class="right">
							<image :src="item.thumb" mode="aspectFill" class="img"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<template v-else>
			<page-loading></page-loading>
		</template>
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import PageLoading from '../../lib/components/page-loading.vue'
	import NoticeBar from '../../lib/components/notice-bar.vue'
	import TabBar from '../../lib/components/tab-bar.vue'
	import debounce from '../../utils/debounce.js'
	import { navHandler, tranNumber } from '../../utils/index.js'
	export default {
		data() {
			return {
				pageLoad: true,
				currentBannerIndex: 0,
				banners: [
					{
						url: '../../static/img/home_banner.png'
					}
				],
				noticeList: [
					{ text: '我是一条通知信息点击可以进详情' },
					{ text: '我是一条通知信息点击可以进详情,我是一条通知信息点击可以进详情' },
				],
				covid: [
					{ count: 0, text: '省内新增', color: '#00B476' },
					{ count: 0, text: '国内新增', color: '#FE9D4B' },
					{ count: 0, text: '国内现有确诊', color: '#F25542' }
				],
				traffic: [
					{
						thumb: '../../static/img/card_2.png',
						name: '出租车',
						desc: '在线叫车方便快捷'
					},
					{
						thumb: '../../static/img/card_1.png',
						name: '公交车',
						desc: '实时获取公交信息'
					},
					// {
					// 	thumb: '',
					// 	name: '出行规划',
					// 	desc: '实时获取公交信息'
					// }
				],
				navBarBgColor: 'transparent',
				articles: [
					{
						title: '半年报奶粉企业增长分化 新国标 影响或不',
						thumb: '../../static/img/article_2.png',
						date: '今天 13:34',
						readNum: 120000
					},
					{
						title: '年轻广告从业者是否需要购买一 份重疾险？',
						thumb: '../../static/img/article_1.png',
						date: '今天 13:34',
						readNum: 120000
					}
				],
				currentAddress: {},
				nowWeatherData: {}
			}
		},
		components: {
			PageLoading,
			NoticeBar,
			TabBar
		},
		computed: {
			menuList () {
				return [...this.vuex_menus.slice(0, 11), {
					url: '../../static/img/menu_more.png',
					text: '更多',
					path: '/pages/menu/edit'
				}]
			}
		},
		onPullDownRefresh() {
			this.initPage()
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 1000)
		},
		onShow() {
			if (this.pageLoad) {
				this.initPage()
			}
		},
		onLoad() {
			this.initPage()
		},
		onPageScroll(e) {
			if (e.scrollTop < 200) {
				this.navBarBgColor = `rgba(242, 85, 66, ${e.scrollTop / 100})`
			}
			// debounce(() => {
			// 	const query = uni.createSelectorQuery().in(this)
			// 	query.select('.banner').boundingClientRect(data => {
			// 	  if (data.bottom < 116) {
			// 			this.navBarBgColor = '#F25542'
			// 		} else {
			// 			this.navBarBgColor = 'transparent'
			// 		}
			// 	}).exec();
			// }, 500)
		},
		methods: {
			navHandler,
			tranNumber,
			initPage () {
				uni.getLocation({
					type: 'gcj02',
					geocode: true,
					success: (res) => {
						this.currentAddress = res.address
						const params = {
							location: `${res.longitude},${res.latitude}`
						}
						this.$api.home.getCovidData(res.address.province.replace('省', '')).then(covid => {
							this.covid = [
								{ count: covid.provinceAddComfirm, text: `${res.address.province || '--'}新增`, color: '#00B476' },
								{ count: covid.chinaAddConfirm, text: '国内新增', color: '#FE9D4B' },
								{ count: covid.chinaStoreConfirm, text: '国内现有确诊', color: '#F25542' }
							]
							this.pageLoad = true
						})
						this.$api.weather.getWeatherNow(params).then(weather => {
							this.nowWeatherData = weather
							this.pageLoad = true
						})
					},
					fail: (res) => {
						this.pageLoad = true
						uni.showModal({
							content: JSON.stringify(res)
						})
					}
				})
			},
			changeBanner (e) {
				this.currentBannerIndex = e.detail.current
			},
			toSearch () {
				uni.navigateTo({
					url: '/pages/search/index'
				})
			},
			clickMenuItem (e) {
				console.log(this.menuList[e.detail.index].path)
				navHandler(this.menuList[e.detail.index].path)
			},
			clickLeftNavBarButton () {
				uni.navigateTo({
					url: '/pages/location/select'
				})
			},
			clickRightNavBarButton () {
				uni.scanCode({
					success: function (res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
					}
				});
			}
		}
	}
</script>

<style scoped lang="scss">
.page {
	background-color: #F5F6FA;
	.uni-navbar {
		position: absolute;
		z-index: 999;
	}
	.page-wrap {
		padding-bottom: 130rpx;
		background-color: #F5F6FA;
		font-size: 0;
		.banner-box {
			.banner, .swiper-box {
				width: 100%;
				height: 568rpx;
			}
		}
		.menu {
			position: relative;
			padding-bottom: 18rpx;
			margin: -104rpx auto 0;
			width: 710rpx;
			background: #FFFFFF;
			border-radius: 32rpx;
			.inner {
				min-height: 200rpx;
				.grid-item-box {
					padding: 30rpx 0;
					.image {
						width: 84rpx;
						height: 84rpx;
						flex: 0 0 auto;
					}
					.text {
						margin-top: 20rpx;
						font-size: 26rpx;
						color: #262A33;
						line-height: 36rpx;
					}
				}
			}
		}
		.section {
			margin-top: 32rpx;
			.s-title {
				padding: 0 24rpx;
				.icon {
					margin-right: 10rpx;
					width: 36rpx;
					height: 36rpx;
					flex: 0 0 auto;
				}
				.text {
					font-size: 32rpx;
					font-weight: bold;
					color: #38393A;
					line-height: 44rpx;
				}
			}
			.card {
				margin: 20rpx auto 0;
				height: 150rpx;
				width: 710rpx;
				background: #FFFFFF;
				border-radius: 16rpx;
				.item {
					text-align: center;
					flex: 1;
					.count {
						font-size: 36rpx;
						font-weight: bold;
						line-height: 50rpx;
					}
					.label {
						margin-top: 6rpx;
						font-size: 24rpx;
						color: #464748;
						line-height: 34rpx;
					}
				}
			}
			.traffic-wrap {
				margin-top: 20rpx;
				overflow: hidden;
				.scroll-inner {
					padding: 0 4rpx;
					overflow-y: hidden;
					overflow-x: auto;
					&::-webkit-scroller {
						display: none;
						height: 0;
						width: 0;
						color: transparent;
						-webkit-appearance: none;
					}
					.item {
						position: relative;
						margin-left: 16rpx;
						width: 320rpx;
						height: 150rpx;
						border-radius: 16rpx;
						overflow: hidden;
						flex: 0 0 auto;
						.thumb {
							width: 100%;
							height: 100%;
							background: linear-gradient(135deg, #67C3F3 0%, #3590E4 100%);
							border-radius: 16rpx;
						}
						.content {
							position: absolute;
							top: 0;
							right: 0;
							bottom: 0;
							left: 0;
							.inner {
								padding: 0 30rpx;
								.title {
									font-size: 32rpx;
									font-weight: bold;
									color: #FFFFFF;
									line-height: 44rpx;
								}
								.desc {
									margin-top: 14rpx;
									font-size: 24rpx;
									color: #FFFFFF;
									line-height: 34rpx;
								}
							}
						}
					}
					.slot {
						flex: 0 0 auto;
						width: 16rpx;
						height: 150rpx;
					}
				}
			}
			.article-list {
				margin: 20rpx auto 0;
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
						.title {
							font-size: 28rpx;
							font-weight: bold;
							color: #38393A;
							line-height: 40rpx;
						}
						.foot {
							margin-top: 58rpx;
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
<style lang="scss">
	/* #ifdef MP-WEIXIN */
	.uni-navbar {
		position: absolute;
		z-index: 999;
	}
	/* #endif */
.uni-navbar__header-btns-left {
	flex: 0 0 auto;
}
.nav-city {
	flex: 0 0 auto;
	width: 100%;
	.inner {
		flex: 1;
		width: 100%;
	}
	.text {
		font-size: 26rpx;
		color: #fff;
		line-height: 36rpx;
		max-width: 110rpx;
	}
	.weather {
		font-size: 20rpx;
		color: #fff;
		line-height: 28rpx;
	}
}
.nav-content {
	width: 100%;
	height: 100%;
	.nav-input-view {
		padding: 0 10rpx 0 14rpx;
		flex: 1;
		height: 58rpx;
		background-color: #FFFFFF;
		border-radius: 29rpx;
		box-sizing: border-box;
		overflow: hidden;
		.nav-bar-input {
			width: 100%;
			font-size: 24rpx;
			background-color: #FFFFFF;
			color: #BBBBBB;
		}
	}
}
.nav-right-icon {
	width: 100%;
	height: 100%;
}
</style>