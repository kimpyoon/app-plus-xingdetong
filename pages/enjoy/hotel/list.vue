<template>
	<view>
		<view class="list">
			<view class="item" v-for="item in list" @click="navTo(item.id)">
				<view class="cover">
					<image :src="item.cover"></image>
				</view>
				<view class="content">
					<view class="title">{{ item.title }}</view>
					<view class="tags" v-if="item.tags!=''">
						<view 
							class="tags-item" 
							v-for="(tag,i) in item.tags.split(',')" 
							:style="{ color: colors[i%3].color,border: colors[i%3].border, background: colors[i%3].background }">
							{{tag}}
						</view>
					</view>
					<view class="item-bottom">
						<view class="score">
							<image class="star" v-for="(star,startIndex) in item.score % 6" src="../../../static/icon/shoucangxiao@2x.png" />
						</view>
						<view class="distance">
							1.5km
						</view>
					</view>
				</view>
				<view class="price">{{item.minPrice}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				size: 20,
				list: [],
				status: 'load',
				colors: [
					{
						color: '#FD4F5F',
						background: 'rgba(253, 78, 96, 0.1)',
						border: '1rpx solid #FD4E60'
					},
					{
						color: '#4BA2E8',
						background: 'rgba(75, 162, 232, 0.1)',
						border: '1rpx solid #4FA6EA'
					},
					{
						color: '#05B87A',
						background: 'rgba(11, 183, 127, 0.1)',
						border: '1rpx solid #1CC083'
					}
				]
			}
		},
		onLoad() {
			this.getHotelList(1);
		},
		onPullDownRefresh() {
			this.page = 1;
			this.list = [];
			this.status = 'load';
			this.getHotelList();
		},
		onReachBottom() {
			this.getHotelList();
		},
		methods:{
			getHotelList(cur) {
				if(cur) {
					this.page = cur;
				}
				const { status,page,size } = this;
				if(status==='loading'||status==='nomore') return;
				this.status = 'loading';
				this.$api.hotel.getHotelList({
					page,size
				}).then(res=>{
					uni.stopPullDownRefresh();
					this.list = this.list.concat(res.list);
					this.status = 'load';
					this.page ++;
					if(res.list.length < size) {
						this.status = 'nomore';
					}
				}).catch(err=>{
					this.status = 'load';
					uni.stopPullDownRefresh();
				})
			},
			navTo(id) {
				uni.navigateTo({
					url: `/pages/enjoy/hotel/detail?id=${id}`
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F5F6FA;
	}
	.list{
		background-color: #FFFFFF;
		border-radius: 16rpx;
		margin: 20rpx;
		overflow: hidden;
		padding: 0 20rpx;
	}
	
	.item:last-child{
		border-bottom: none!important;
	}
	
	.item{
		position: relative;
		margin-top: 32rpx;
		padding-bottom: 30rpx;
		border-bottom: 1rpx solid rgba(216, 216, 216, .2);
		@include fr(s,s);
		.cover {
			@include size(198rpx,166rpx);
			image{
				@include size(198rpx,166rpx);
			}
		}
		.content{
			margin-left: 20rpx;
			.title{
				line-height: 42rpx;
				font-size: 30rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #070707;
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
			.item-bottom{
				@include fr(s,s);
				margin-top: 28rpx;
				.score{
					@include fr(s,s);
					.star{
						@include size(24rpx);
						margin-right: 6rpx;
					}
				}
				.distance{
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #070707;
					line-height: 24rpx;
					margin-left: 10rpx;
				}
			}
		}
		.price {
			position: absolute;
			right: 20rpx;
			bottom: 36rpx;
			
			font-size: 36rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #FD4C61;
			line-height: 50rpx;
		}
		.price::before{
			content: '￥';
			font-size: 24rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #FD4C61;
			line-height: 24rpx;
		}
		.price::after{
			content: '起';
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #070707;
			line-height: 24rpx;
			margin-left: 4rpx;
		}
	}
</style>
