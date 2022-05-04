<template>
	<view class="page">
		<view class="page-wrap" v-if="pageLoad">
			<view class="card">
				<view class="head">
					<view class="title">
						<text class="text">自治区本级大厅支持预约办理</text>
					</view>
					<view class="desc xa-flex xa-col-center xa-row-center">
						<text class="date">2022-04-21 14:33</text>
						<view class="read-num">
							<text class="label">阅读量</text>
							<text class="num">12万</text>
						</view>
					</view>
				</view>
				<view class="message">
					<rich-text :nodes="message"></rich-text>
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
				message: `
				<p>　为进一步做好辖区疫情防控工作，督促药店落实疫情防控有关规定，科右前旗公安局居力很派出所民警近日对辖区药店进行疫情防控安全检查。</p>
				<div><img src="../../static/img/article-demo.png" style="width: 100%;" /></div>
				<p>民警重点检查退烧、止咳、抗感冒、抗病毒类药品的购买、销售是否按要求进行登记上报。同时，民警要求工作人员要认真登记药品名称、规格、数量、购买人与使用人的姓名、身份证号码、详细地址及联系电话等信息，杜绝此类药品流入非法渠道和违规销售咳嗽退烧类药品。 记者于舰勐摄</p>
				`
			}
		},
		components: {
			PageLoading
		},
		onLoad() {
			setTimeout(() => {
				this.pageLoad = true
			}, 300)
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