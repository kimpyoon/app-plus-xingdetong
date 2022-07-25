<template>
	<view class="page">
		<view class="page-wrap" v-if="pageLoad">
			<view class="card">
				<view class="head">
					<view class="title">
						<text class="text">{{article.title}}</text>
					</view>
					<view class="desc xa-flex xa-col-center xa-row-center">
						<text class="date">{{article.date}}</text>
						<view class="read-num">
							<text class="label">来源：</text>
							<text class="num">{{article.editor}}</text>
						</view>
					</view>
				</view>
				<view class="message">
					<rich-text :nodes="node" v-for="(node, index) in article.content" :key="index"></rich-text>
				</view>
			</view>
		</view>
		<template v-else>
			<page-loading></page-loading>
		</template>
	</view>
</template>

<script>
	import PageLoading from '../../lib/components/page-loading.vue'
	export default {
		data () {
			return {
				pageLoad: false,
				article: {}
			}
		},
		components: {
			PageLoading
		},
		onLoad() {
			uni.getStorage({
				key: 'article',
				success: res => {
					this.article = res.data
					this.pageLoad = true
				}
			})
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
.page {
	background-color: #F5F6FA;
	.page-wrap {
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		background-color: #F5F6FA;
		.card {
			padding: 0 20rpx;
			margin: 0 auto;
			width: 690rpx;
			background: #FFFFFF;
			border-radius: 16rpx;
			box-sizing: border-box;
			overflow: hidden;
			.head {
				padding: 30rpx 0;
				border-bottom: 2rpx solid #E0E0E0;
				.title {
					text-align: center;
					.text {
						font-size: 32rpx;
						font-weight: bold;
						color: #070707;
						line-height: 44rpx;
					}
				}
				.desc {
					padding-top: 14rpx;
					.date {
						font-size: 24rpx;
						color: #A2A2A2;
						line-height: 34rpx;
					}
					.read-num {
						margin-left: 32rpx;
						.label {
							font-size: 24rpx;
							color: #A2A2A2;
							line-height: 34rpx;
						}
						.num {
							font-size: 24rpx;
							color: #000000;
							line-height: 34rpx;
						}
					}
				}
			}
			.message {
				padding: 24rpx 0;
				font-size: 28rpx;
				color: #595959;
				line-height: 56rpx;
				word-break: break-word;
			}
		}
	}
}
</style>