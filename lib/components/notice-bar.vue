<template>
	<view class="notice-bar xa-flex xa-col-center" :style="customStyle">
		<view class="left-icon-wrap">
			<image :src="`${prefixUrl}/img/icon/bell_icon.png`" class="icon"></image>
		</view>
		<swiper :disable-touch="disableTouch" @change="change" :autoplay="autoplay" :vertical="vertical" circular :interval="duration" class="swiper">
			<swiper-item v-for="(item, index) in list" :key="index" class="swiper-item xa-flex xa-col-center">
				<view
					class="notice-item xa-line-1"
					@click="clickHandle(index)">
					{{ item[valueKey] }}
				</view>
			</swiper-item>
		</swiper>
		<!-- <view class="right-icon-wrap">
			<uni-icons type="right" color="#262A33" size="16" />
		</view> -->
	</view>
</template>

<script>
	import { prefixUrl } from '@/config/common.js'
	export default {
		props: {
			list: {
				type: Array,
				default() {
					return [];
				}
			},
			customStyle: {
				type: Object,
				default: () => {
					return {
						background: '#ffffff'
					}
				}
			},
			autoplay: {
				type: Boolean,
				default: true
			},
			duration: {
				type: [Number, String],
				default: 2000
			},
			disableTouch: {
				type: Boolean,
				default: true
			},
			vertical: {
				type: Boolean,
				default: true
			},
			valueKey: {
				type: String,
				default: 'text'
			}
		},
		data () {
			return {
				prefixUrl
			}
		},
		methods: {
			// 点击通告栏
			clickHandle(index) {
				this.$emit('click', index);
			},
			// 点击关闭按钮
			close() {
				this.$emit('close');
			},
			// 点击更多箭头按钮
			getMore() {
				this.$emit('getMore');
			},
			change(e) {
				let index = e.detail.current;
				if(index == this.list.length - 1) {
					this.$emit('end');
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.notice-bar {
		padding: 26rpx 18rpx 26rpx 30rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
		.left-icon-wrap {
			margin-right: 16rpx;
			flex: 0 0 auto;
			.icon {
				width: 26rpx;
				height: 32rpx;
			}
		}
		.right-icon-wrap {
			margin-left: 16rpx;
			flex: 0 0 auto;
		}
		.swiper {
			height: 36rpx;
			flex: 1;
			.notice-item {
				width: 100%;
				font-size: 26rpx;
				color: #262A33;
				line-height: 36rpx;
			}
		}
	}
</style>
