<template>
	<view class="page">
		<view class="cell-group">
			<view class="cell xa-flex xa-col-center xa-row-between">
				<text class="label">选择反馈的意见类型</text>
				<view class="right xa-flex xa-col-center">
					<text class="value">请选择</text>
					<uni-icons type="right" color="#B1B1B1" size="14" />
				</view>
			</view>
		</view>
		<view class="title">反馈内容</view>
		<view class="textarea">
			<uni-easyinput :inputBorder="false" :clearable="false" maxlength="100" type="textarea" v-model="content" placeholder="请输入您要反馈的意见内容 0/100"></uni-easyinput>
		</view>
		<view class="upload-title">图片（选填，提供问题截图）</view>
		<view class="upload-wrap xa-flex xa-flex-wrap">
			<image :src="item" class="preview-img" v-for="(item,index) in fileList" :key="index"></image>
			<view class="add xa-flex xa-col-center xa-row-center" @click="uploadHandle">
				<uni-icons type="plusempty" color="#ACACAC" size="52" />
			</view>
		</view>
		<view class="submit">
			<button class="button xa-flex xa-col-center xa-row-center">确定提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				content: '',
				fileList: []
			}
		},
		onLoad(options) {

		},
		methods: {
			uploadHandle() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						this.fileList = res.tempFilePaths
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.page {
	padding: 24rpx 0 40rpx;
	background-color: #F5F6FA;
	font-size: 0;
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
				.value {
					font-size: 28rpx;
					color: #B1B1B1;
					line-height: 1;
					text-align: right;
				}
			}
		}
	}
	.title {
		padding: 30rpx 30rpx 18rpx;
		font-size: 32rpx;
		font-weight: bold;
		color: #332C25;
		line-height: 44rpx;
	}
	.textarea {
		margin: 18rpx auto 0;
		border-radius: 16rpx;
		padding: 40rpx 30rpx;
		box-sizing: border-box;
		width: 690rpx;
		height: 376rpx;
		background: #FFFFFF;
		font-size: 26rpx;
		.uni-easyinput__content-textarea {
			height: 100%;
		}
	}
	.upload-title {
		padding: 28rpx 30rpx;
		font-size: 26rpx;
		font-weight: bold;
		color: #ACACAC;
	}
	.upload-wrap {
		padding: 32rpx 22rpx 22rpx 32rpx;
		margin: 0 auto;
		width: 690rpx;
		background-color: #FFFFFF;
		border-radius: 16rpx;
		box-sizing: border-box;
		.add {
			margin-right: 10rpx;
			margin-bottom: 10rpx;
			width: 156rpx;
			height: 156rpx;
			flex: 0 0 1;
			background: #F5F5F5;
			border-radius: 10rpx;
			border: 2rpx solid #F2F2F2;
			box-sizing: border-box;
		}
		.preview-img {
			margin-right: 10rpx;
			margin-bottom: 10rpx;
			width: 156rpx;
			height: 156rpx;
			flex: 0 0 1;
			border-radius: 10rpx;
		}
	}
	.submit {
		margin-top: 188rpx;
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