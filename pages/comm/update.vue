<template>
	<view class="mask">
		<view @click.stop="onClick" class="content" v-if="app.newVersion">
			<block v-if="app.isDownLoading">
				<view class="title">升级APP</view>
				<view class="progress">
					<view class="progress-title">正在为您更新，请耐心等待</view>
					<view class="progress-percent">已下载{{ app.progress }}%</view>
					<u-line-progress :percentage="app.progress" activeColor="#94DDFF" :showText="false"></u-line-progress>
				</view>
				<view class="btns">
					<view class="btn btn-default" @click.stop="cancelDownload">取消下载</view>
					<view class="btn btn-primary" @click.stop="background">后台下载</view>
				</view>
			</block>
			<block v-else>
				<view class="title">发现新版本{{ app.newVersion.version }}</view>
				<view class="desc">
					<text>{{ app.newVersion.content }}</text>
				</view>
				<view class="btns">
					<view class="btn btn-default" @click.stop="cancelUpdate" v-if="!app.newVersion.force">暂不升级</view>
					<view class="btn btn-primary" @click.stop="doDownload">立即升级</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	onBackPress(e) {
		if (e.from == 'backbutton') {
			return true;
		}
	},
	computed: mapState(['app']),
	methods: {
		onClick(e) {
			// #ifdef APP-NVUE
			e.stopPropagation();
			// #endif
		},
		// 关闭弹窗
		close() {
			uni.navigateBack();
		},
		// 暂不升级
		cancelUpdate() {
			this.close();
		},
		doDownload() {
			this.$store.dispatch('app/doUpdate', { url: this.app.newVersion.url, type: this.app.newVersion.type });
		},
		// 取消下载
		cancelDownload() {
			this.$store.dispatch('app/abortDownload');
		},
		// 后台下载
		background() {
			this.close();
		}
	}
};
</script>

<style lang="scss">
page {
	background: transparent;
}
.mask {
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.4);
}

.content {
	padding: 30rpx 0;
	width: 600rpx;

	border-radius: 16rpx;
	background-color: #ffffff;
}

.title {
	font-size: 34rpx;
	color: #313131;
	font-weight: bold;
	text-align: center;
	height: 60rpx;
}

.desc {
	padding: 30rpx;
	min-height: 200rpx;
	max-height: 600rpx;
	overflow-y: scroll;
	padding-bottom: 0;
	color: #313131;
	line-height: 60rpx;
}

.progress {
	margin: 0 20rpx;
	margin-top: 60rpx;
}

.progress-title {
	text-align: center;
	font-size: 28rpx;
	color: #313131;
	font-weight: bold;
}

.progress-percent {
	text-align: center;
	font-size: 28rpx;
	color: #94DDFF;
	font-weight: bold;
	margin: 40rpx 0;
}

.btns {
	margin-top: 60rpx;
	@include fr(b, c);
}

.btn {
	height: 80rpx;
	border-radius: 16rpx;
	line-height: 80rpx;
	text-align: center;
	flex-grow: 1;
	margin: 0 20rpx;
}

.btn-default {
	font-size: 28rpx;
	color: #8d8d8d;
	background-color: #ffffff;
	border: 1px solid #e9e9f1;
}

.btn-primary {
	font-size: 28rpx;
	color: #ffffff;
	background-color: #94DDFF;
}
</style>
