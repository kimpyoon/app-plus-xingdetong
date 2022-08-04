<template>
	<view class="page">
		<uni-nav-bar left-icon="left" title="兴得通" :color="navBarColor" @clickRight="toSelectLocal" statusBar :backgroundColor="navBarBgColor" :border="false" @clickLeft="$navBack" fixed>
			<block slot="right">
				<view class="nav-city xa-flex">
					<view class="inner">
						<view class="text xa-line-1" :style="{color:navBarColor}">{{vuex_location.address.city || '--'}}</view>
						<view class="weather" :style="{color:navBarColor}">{{nowData.text || '--'}} {{nowData.temp || '--'}}℃</view>
					</view>
					<!-- <uni-icons type="arrowdown" :color="navBarColor" size="16" /> -->
				</view>
			</block>
		</uni-nav-bar>
		<view class="page-wrap" v-if="pageLoad">
			<image :src="`${prefixUrl}/img/weather/bg.png`" mode="" class="bg"></image>
			<view class="content">
				<view class="head">
					<view class="temp-box xa-flex xa-col-bottom xa-row-center">
						<view class="temp xa-flex xa-col-bottom">
							<text class="icon" :class="[`qi-${nowData.icon}`]"></text>
							<text class="num">{{nowData.temp}}</text>
							<text class="unit">℃</text>
						</view>
					</view>
					<view class="date">
						{{formatWeekTime(nowData.obsTime)}}, {{formatWeekTime(nowData.obsTime, 'mm月dd日 hh:MM')}}
					</view>
				</view>
				<view class="day-box">
					<view class="scroll-wrap">
						<view class="inner xa-flex xa-col-center xa-flex-nowrap">
							<view class="item" v-for="(item, index) in dayData" :key="index">
								<view class="time">{{formatWeekTime(item.fxTime, 'status')}}{{formatWeekTime(item.fxTime, 'hh:MM')}}</view>
								<view class="icon-box">
									<text class="icon" :class="[`qi-${item.icon}`]"></text>
								</view>
								<view class="temp">{{item.temp}}℃</view>
							</view>
						</view>
					</view>
				</view>
				<view class="panel">
					<view class="row">
						<view class="col xa-flex xa-col-center xa-row-between" v-for="(item, index) in weekData" :key="index">
							<text class="text">{{item.fxDate}}</text>
							<text class="icon" :class="[`qi-${item.iconDay}`]"></text>
							<text class="text">{{item.tempMax}} / {{item.tempMin}}℃</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<template v-else>
			<page-loading></page-loading>
		</template>
	</view>
</template>

<script>
	import { formatWeekTime } from '../../utils/index.js'
	import PageLoading from '../../lib/components/page-loading.vue'
	import { prefixUrl } from '@/config/common.js'
	export default {
		data () {
			return {
				prefixUrl,
				pageLoad: false,
				navBarColor: '#ffffff',
				navBarBgColor: 'rgba(255, 255, 255, 0)',
				nowData: {},
				weekData: [],
				dayData: []
			}
		},
		onShow() {
			const params = {
				location: `${this.vuex_location.longitude},${this.vuex_location.latitude}`
			}
			this.getWeatherNow(params)
			this.getWeather24h(params)
			this.getWeather7d(params)
			return
			uni.getLocation({
				type: 'gcj02',
				success: (res) => {
					const params = {
						location: `${res.longitude},${res.latitude}`
					}
					this.getWeatherNow(params)
					this.getWeather24h(params)
					this.getWeather7d(params)
				}
			})
		},
		onPageScroll(e) {
			if (e.scrollTop > 50) {
				this.navBarColor = '#000000'
				this.navBarBgColor = '#ffffff'
			} else {
				this.navBarColor = '#ffffff'
				this.navBarBgColor = 'transparent'
			}
		},
		methods: {
			formatWeekTime,
			toSelectLocal () {
				uni.navigateTo({
					url: '/pages/location/select'
				})
			},
			getWeatherNow(location) {
				this.$api.weather.getWeatherNow(location).then(res => {
					this.nowData = res
					this.pageLoad = true
				})
			},
			getWeather24h(location) {
				this.$api.weather.getWeather24h(location).then(res => {
					this.dayData = res.sort((a, b) => new Date(b.fxTime).getTime() - new Date(a.fxTime).getTime())
					this.pageLoad = true
				})
			},
			getWeather7d(location) {
				this.$api.weather.getWeather7d(location).then(res => {
					this.weekData = res
					this.pageLoad = true
				})
			}
		},
		components: {
			PageLoading
		}
	}
</script>

<style lang="scss" scoped>
@import url("@/static/weather/qweather-icons.css");
.page {
	font-size: 0;
	background-color: #ffffff;
	box-sizing: border-box;
	min-height: 100vh;
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
			white-space: nowrap;
		}
	}
	.page-wrap {
		.bg {
			position: absolute;
			top: 0;
			right: 0;
			left: 0;
			width: 100%;
			height: 878rpx;
		}
		.content {
			position: relative;
			z-index: 1;
			.head {
				padding: 70rpx 0;
				.temp-box {
					.temp {
						position: relative;
						.icon {
							margin-right: 8rpx;
							font-size: 92rpx;
							color: #ffffff;
						}
						.num {
							width: 140rpx;
							height: 116rpx;
							font-size: 116rpx;
							font-weight: 600;
							color: #FFFFFF;
							line-height: 116rpx;
						}
						.unit {
							position: absolute;
							transform: translate(100%, 0);
							top: 0;
							right: 0;
							font-size: 52rpx;
							font-weight: bold;
							color: #FFFFFF;
							line-height: 74rpx;
						}
					}
				}
				.date {
					margin-top: 10rpx;
					text-align: center;
					font-size: 26rpx;
					color: #FFFFFF;
					line-height: 36rpx;
				}
			}
			.day-box {
				margin: 0 auto;
				width: 710rpx;
				height: 260rpx;
				background: rgba(255, 255, 255, 0.1);
				border-radius: 16rpx;
				border: 1rpx solid rgba(255, 255, 255, 0.06);
				box-sizing: border-box;
				.scroll-wrap {
					overflow: hidden;
					height: 100%;
					.inner {
						height: 100%;
						overflow-x: auto;
						overflow-y: hidden;
						.item {
							flex: 0 0 auto;
							width: 160rpx;
							text-align: center;
							.temp {
								font-size: 32rpx;
								font-weight: bold;
								color: #FFFFFF;
								line-height: 44rpx;
							}
							.time {
								font-size: 24rpx;
								color: #FFFFFF;
								line-height: 34rpx;
							}
							.icon-box {
								margin: 20rpx auto;
							}
							.icon {
								font-size: 64rpx;
								color: #ffffff;
							}
						}
					}
				}
			}
			.panel {
				padding: 70rpx 0 10rpx;
				margin: 80rpx auto 0;
				background: #FFFFFF;
				border-radius: 54rpx 54rpx 0 0;
				border: 1rpx solid rgba(255, 255, 255, 0.06);
				.row {
					.col {
						padding: 0 58rpx;
						margin-bottom: 58rpx;
						.text {
							font-size: 30rpx;
							color: #333333;
							line-height: 42rpx;
							flex: 0 0 auto;
							white-space: nowrap;
						}
						.icon {
							flex: 0 0 auto;
							font-size: 64rpx;
							color: #f25542;
						}
					}
				}
			}
		}
	}
}
</style>