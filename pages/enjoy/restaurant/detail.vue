<template>
	<view class="main" v-if="ready">
		<image class="back" @click="back" src="../../../static/icon/ico_back.png" mode=""></image>
			<!-- <swiper class="swiper" circular :indicator-dots="true" :autoplay="false" :interval="3000"
				:duration="500">
				<swiper-item v-for="img in info.banner.split(',')" style="z-index: -1;">
					<image class="swiper-item" :src="img"></image>
					<view class="swiper-item" :style="{
						backgroundImage: `url(${img})`
					}"></view>
				</swiper-item>
			</swiper> -->
			<!-- <image class="swiper-item" :src="info.banner.split(',')[0]"></image> -->
		<view class="swiper-item" :style="{
			backgroundImage: `url(${info.banner.split(',')[0]})`
		}"></view>
		<view style="margin-top: -70rpx;">
			<view class="info">
				<image class="cover" :src="info.cover" mode=""></image>
				<view class="card">
					<view class="title">
						{{ info.title }}
					</view>
					<view class="second">
						<view class="score">
							<image class="star" src="../../../static/icon/shoucangxiao@2x.png" />
							<text>4.8</text>
						</view>
						<view class="address">
							<image class="loc" src="../../../static/icon/ico_loc.png" />
							<text>914m</text>
						</view>
					</view>
					<view class="time">
						<text>营业中  周一至周日10:00-22:00</text>
					</view>
					<view class="tags" v-if="info.tags!=''">
						<view 
							class="tags-item" 
							v-for="(tag,i) in info.tags.split(',')" 
							:style="{ color: colors[i%3].color,border: colors[i%3].border, background: colors[i%3].background }">
							{{tag}}
						</view>
					</view>
				</view>
			</view>
			<view class="panel">
				<view class="score">
					<view class="score-panel">
						<image src="../../../static/icon/shoucangxiao@2x.png"></image>
						<text>{{ info.score.toFixed(1) }}</text>
					</view>
					<view class="score-number">
						<view class="score-number-text">
							325条
						</view>
						<image class="score-number-icon" src="../../../static/icon/ico_right.png"></image>
					</view>
				</view>
				<view class="address">
					<view class="address-title">西城区培英胡同18号</view>
					<view class="address-juli">
						<image src="../../../static/icon/ico_loc.png"></image>
						<text>912m</text>
					</view>
					<view class="address-click">
						<image src="../../../static/icon/ico_map.png" mode=""></image>
						<text>导航</text>
					</view>
				</view>
			</view>
			<view class="sku-list">
				<view class="sku-item">
					<image class="sku-cover" :src="`${prefixUrl}/img/sku-d.png`"></image>
					<view class="sku-info">
						<view class="sku-title">
							单份碳烧鸡
						</view>
						<view class="sku-desc">
							豆腐麻辣鲜香、酱香浓郁口感嫩滑、下饭一绝
						</view>
					</view>
					<view class="sku-price">
						￥15
					</view>
				</view>
				<view class="sku-item">
					<image class="sku-cover" :src="`${prefixUrl}/img/sku-e.png`"></image>
					<view class="sku-info">
						<view class="sku-title">
							单份麻辣豆腐
						</view>
						<view class="sku-desc">
							肉质鲜嫩、口感酥脆
						</view>
					</view>
					<view class="sku-price">
						￥19
					</view>
				</view>
				<view class="sku-item">
					<image class="sku-cover" :src="`${prefixUrl}/img/sku-f.png`"></image>
					<view class="sku-info">
						<view class="sku-title">
							无骨咖喱鸡饭
						</view>
						<view class="sku-desc">
							牛肉丸、海带丝结、鱼豆腐、鱼丸、白萝卜
						</view>
					</view>
					<view class="sku-price">
						￥28
					</view>
				</view>
			</view>
			<view class="detail">
				<view class="detail-title">
					<image src="../../../static/icon/ico_trumb.png" mode=""></image>
					<text>图文详情</text>
				</view>
				<view class="detail-content" v-html="info.detail">
					
				</view>
			</view>
			<view class="button">
				<view class="btn-call" @click="call">
					电话订购
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import { prefixUrl } from '@/config/common.js'
	export default {
		data() {
			return {
				prefixUrl,
				id: 0,
				ready: false,
				info: {},
				colors: [
					{
						color: '#05B87A',
						background: 'rgba(11, 183, 127, 0.1)',
						border: '1rpx solid #1CC083'
					},
					{
						color: '#FE9A41',
						background: 'rgba(253, 173, 68, 0.1)',
						border: '1rpx solid #FE9C41'
					},
					{
						color: '#FD4F5F',
						background: 'rgba(253, 75, 98, .1)',
						border: '1rpx solid #FD4E60'
					}
				]
			}
		},
		onLoad(options) {
			const id = options.id;
			this.id = id;
			this.getInfo(id);
		},
		methods: {
			getInfo(id) {
				this.$api.restaurant.getRestaurantInfo({
					id
				}).then(res => {
					this.info = res;
					this.ready = true;
				})
			},
			call() {
				uni.makePhoneCall({
					phoneNumber: this.info.phone
				})
			},
			back() {
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #EEEEEE;
	}
	
	.main{
		position: relative;
	}
	
	.back {
		position: absolute;
		top: 114rpx;
		left: 20rpx;
		@include size(48rpx);
	}

	.swiper {
		height: 602rpx;
		z-index: 88;
	}

	.swiper-item {
		height: 602rpx;
		width: 750rpx;
		line-height: 602rpx;
		text-align: center;
		z-index: 88;
		background-size: cover;
	}


	.info {
		display: block;
		border-radius: 28rpx 28rpx 0px 0px;
		padding: 30rpx;
		// width: 750rpx;
		background-color: #FFFFFF;
		// margin-top: -70rpx;
		z-index: 99;
		border-bottom: 1rpx solid rgba(216, 216, 216, .2);
		@include fr(s,s);
		.cover{
			@include size(218rpx,182rpx);
		}
		.card{
			margin-left: 20rpx;
			.title{
				line-height: 42rpx;
				font-size: 40rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #070707;
			}
			.second{
				margin-top: 12rpx;
				@include fr(s,s);
				.score{
					@include fr(s,c);
					.star{
						@include size(24rpx);
					}
					text{
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #A7A7A7;
						line-height: 24rpx;
						margin-left: 8rpx;
					}
				}
				.address{
					margin-left: 44rpx;
					@include fr(s,c);
					.loc{
						@include size(24rpx);
					}
					text{
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #A7A7A7;
						line-height: 24rpx;
						margin-left: 8rpx;
					}
				}
			}
			.time{
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #262A33;
				line-height: 34rpx;
				margin-top: 14rpx;
			}
			.tags{
				@include fr(s,s);
				margin-top: 18rpx;
				flex-wrap: wrap;
				.tags-item{
					@include fr(c,c);
					font-size: 20rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					line-height: 20rpx;
					border-radius: 18rpx;
					margin-right: 10rpx;
					padding: 8rpx 14rpx;
					opacity: 0.5;
					flex-shrink: 0;
					margin-bottom: 5rpx;
				}
			}
		}
	}
	
	.panel{
		@include fr(s,s);
		background-color: #FFFFFF;
		padding: 0 30rpx;
		padding-top: 30rpx;
		.score{
			width: 242rpx;
			height: 146rpx;
			background: linear-gradient(135deg, rgba(253, 181, 65, .1) 0%, rgba(254, 146, 65, .1) 100%);
			border-radius: 16rpx;
			.score-panel{
				@include fr(s,s);
				margin-top: 32rpx;
				margin-left: 28rpx;
				image{
					@include size(36rpx);
				}
				text{
					font-size: 36rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #FE9A41;
					line-height: 36rpx;
					margin-left: 10rpx;
				}
			}
			.score-number{
				@include fr(s,c);
				margin-left: 28rpx;
				margin-top: 18rpx;
				.score-number-text{
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #3F4148;
					line-height: 34rpx;
				}
				.score-number-icon{
					margin-left: 4rpx;
					@include size(20rpx);
				}
			}
		}
		
		.address{
			position: relative;
			@include size(428rpx,146rpx);
			background: linear-gradient(135deg, rgba(253, 106, 80, .1) 0%, rgba(253, 75, 98, .1) 100%);
			border-radius: 16rpx;
			margin-left: 20rpx;
			.address-title{
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #070707;
				line-height: 40rpx;
				margin-top: 30rpx;
				margin-left: 30rpx;
			}
			.address-juli{
				@include fr(s,c);
				margin-top: 18rpx;
				margin-left: 30rpx;
				image{
					@include size(24rpx);
				}
				text{
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #A7A7A7;
					line-height: 24rpx;
					margin-left: 8rpx;
				}
			}
			.address-click{
				@include fc(s,c);
				position: absolute;
				top: 32rpx;
				right: 28rpx;
				image{
					@include size(48rpx);
				}
				text{
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #7C7D80;
					line-height: 34rpx;
					margin-top: 4rpx;
				}
			}
		}
		
	}
	
	.sku-list{
		background-color: #FFFFFF;
		padding: 30rpx;
		
		.sku-item {
			position: relative;
			margin-bottom: 28rpx;
			@include fr(s,s);
			.sku-cover{
				@include size(146rpx);
			}
			.sku-info{
				margin-left: 24rpx;
				.sku-title{
					margin-top: 12rpx;
					font-size: 30rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #070707;
					line-height: 42rpx;
				}
				.sku-desc{
					margin-top: 16rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #999EAA;
					line-height: 34rpx;
				}
			}
			.sku-price{
				position: absolute;
				top: 12rpx;
				right: 0;
				font-size: 32rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #FD575B;
				line-height: 44rpx;
			}
		}
		.sku-item::last-child {
			margin-bottom: 28rpx;
		}
	}

	.detail{
		padding: 30rpx;
		background-color: #FFFFFF;
		margin-top: 20rpx;
		.detail-title{
			@include fr(s,c);
			image{
				@include size(36rpx);
			}
			text{
				font-size: 30rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #070707;
				line-height: 42rpx;
				margin-left: 4rpx;
			}
		}
		.detail-content{
			margin-top: 28rpx;
			img{
				width: 100%;
			}
		}
	}
	
	.button {
		background-color: #FFFFFF;
		padding-bottom: 100rpx;
		padding-top: 62rpx;
		.btn-call{
			margin: 0 auto;
			
			@include fr(c,c);
			width: 690rpx;
			height: 96rpx;
			background: linear-gradient(135deg, #FD6A50 0%, #FD4B62 100%);
			border-radius: 48rpx;
			
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			line-height: 44rpx;
		}
	}
	
	
	.uni-padding-wrap {
		width: 550rpx;
		padding: 0 100rpx;
	}
</style>
