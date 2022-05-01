<template>
	<view class="page">
		<view class="info">
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
		<view class="cell-group">
			<view class="cell xa-flex xa-col-center xa-row-between">
				<text class="label">抬头类型</text>
				<view class="right xa-flex xa-col-center">
					<view @click="changeRadio(item)" class="radio-group xa-flex xa-col-center" :class="{active: item.value === current}" v-for="(item,index) in radios" :key="index">
						<view class="round xa-flex xa-col-center xa-row-center">
							<uni-icons type="checkmarkempty" color="#ffffff" size="14" v-if="item.value === current" />
						</view>
						<text class="name">{{item.name}}</text>
					</view>
				</view>
			</view>
			<view class="cell xa-flex xa-col-center xa-row-between">
				<text class="label">发票抬头</text>
				<view class="right xa-flex xa-col-center">
					<input class="input" type="text" :value="invoiceHeader" placeholder="前填写您的姓名">
				</view>
			</view>
			<view class="cell xa-flex xa-col-center xa-row-between" v-if="current === 'business'">
				<text class="label">纳税人识别号</text>
				<view class="right xa-flex xa-col-center">
					<input class="input" type="text" :value="identityNo" placeholder="请填写纳税人识别号">
				</view>
			</view>
			<view class="cell xa-flex xa-col-center xa-row-between">
				<text class="label">发票内容</text>
				<view class="right xa-flex xa-col-center">
					<uni-icons type="right" color="#6f788d" size="14" />
				</view>
			</view>
			<view class="cell xa-flex xa-col-center xa-row-between">
				<text class="label">费用明细</text>
				<view class="right xa-flex xa-col-center">
					<uni-icons type="right" color="#6f788d" size="14" />
				</view>
			</view>
			<view class="cell xa-flex xa-col-center xa-row-between">
				<text class="label">收票人邮箱</text>
				<view class="right xa-flex xa-col-center">
					<input class="input" type="text" :value="email" placeholder="请填写查收发票的邮箱">
				</view>
			</view>
		</view>
		<view class="submit">
			<button class="button xa-flex xa-col-center xa-row-center">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				orderNo: '',
				email: '',
				invoiceHeader: '',
				radios: [
					{
							value: 'personal',
							name: '个人'
					},
					{
							value: 'business',
							name: '单位'
					}
				],
				identityNo: '',
				current: 'personal'
			}
		},
		onLoad(options) {
			this.orderNo = options.orderNo
		},
		methods: {
			changeRadio(item) {
				this.current = item.value
			}
		}
	}
</script>

<style lang="scss" scoped>
.page {
	padding: 24rpx 0 40rpx;
	background-color: #F5F6FA;
	font-size: 0;
	.info {
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
	.cell-group {
		padding: 0 20rpx;
		background-color: #FFFFFF;
		margin: 0 auto;
		width: 690rpx;
		box-sizing: border-box;
		border-radius: 16rpx;
		.cell {
			position: relative;
			height: 112rpx;
			&:not(:last-child)::after {
				position: absolute;
				left: 0;
				bottom: 0;
				right: 0;
				width: 650rpx;
				height: 2rpx;
				background: #F5F5F5;
				border-radius: 2rpx;
				content: '';
			}
			.label {
				font-size: 28rpx;
				font-weight: bold;
				color: #2C2D2E;
				line-height: 40rpx;
				white-space: nowrap;
			}
			.right {
				.input {
					font-size: 28rpx;
					color: #4D5362;
					line-height: 40rpx;
					text-align: right;
				}
				.radio-group {
					margin-left: 64rpx;
					.round {
						width: 36rpx;
						height: 36rpx;
						background-color: #FFFFFF;
						border-radius: 50%;
						flex: 0 0 1;
						overflow: hidden;
						border: 2rpx solid #EDEDED;
						box-sizing: border-box;
					}
					.name {
						margin-left: 12rpx;
						font-size: 28rpx;
						color: #2C2D2E;
						line-height: 40rpx;
					}
				}
				.active {
					.round {
						background-image: linear-gradient(to right, #FD6A50, #FD4B62);
						border: none;
					}
				}
			}
		}
	}
	.submit {
		margin-top: 196rpx;
		.button {
			width: 650rpx;
			height: 100rpx;
			background: linear-gradient(135deg, #FD6A50 0%, #FD4B62 100%);
			border-radius: 50rpx;
			font-size: 32rpx;
			color: #FFFFFF;
			line-height: 44rpx;
		}
	}
}
</style>