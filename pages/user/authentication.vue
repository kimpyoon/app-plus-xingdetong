<template>
	<view class="page">
		<view class="cell-group">
			<view class="cell xa-flex xa-col-center xa-row-between">
				<text class="label">真实姓名</text>
				<view class="right xa-flex xa-col-center">
					<input class="input" type="text" :value="realName" placeholder="请输入真实姓名">
				</view>
			</view>
			<view class="cell xa-flex xa-col-center xa-row-between">
				<text class="label">身份证号</text>
				<view class="right xa-flex xa-col-center">
					<input class="input" type="text" :value="idCardNo" placeholder="请输入身份证号码">
				</view>
			</view>
			<view class="cell xa-flex xa-col-center xa-row-between">
				<text class="label">证件有效起始日期</text>
				<view class="right xa-flex xa-col-center">
					<text class="value">请选择</text>
				</view>
			</view>
			<view class="cell xa-flex xa-col-center xa-row-between">
				<text class="label">证件有效结束日期</text>
				<view class="right xa-flex xa-col-center">
					<text class="value">请选择</text>
				</view>
			</view>
		</view>
		<view class="submit">
			<button class="button xa-flex xa-col-center xa-row-center" @click="submitHandle">退出登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				realName: '',
				idCardNo: ''
			}
		},
		onLoad() {

		},
		methods: {
			submitHandle () {}
		}
	}
</script>

<style lang="scss" scoped>
.page {
	.cell-group {
		padding: 0 40rpx;
		background-color: #FFFFFF;
		.cell {
			position: relative;
			height: 112rpx;
			&:not(:last-child)::after {
				position: absolute;
				left: 0;
				bottom: 0;
				right: 0;
				width: 670rpx;
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
				.value {
					font-size: 28rpx;
					color: #4D5362;
					line-height: 40rpx;
				}
				.input {
					font-size: 28rpx;
					color: #4D5362;
					line-height: 40rpx;
					text-align: right;
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