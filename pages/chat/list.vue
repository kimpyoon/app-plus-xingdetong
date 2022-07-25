<template>
	<view class="page">
		<z-paging ref="paging" v-model="dataList" :use-chat-record-mode="true" :use-page-scroll="true" @query="queryList">
			<view class="list">
				<view class="item" :id="`z-paging-${index}`" v-for="(item, index) in dataList" :key="index">
					<view v-if="item.dateTime" class="date xa-flex xa-col-center xa-row-center">
						<text class="text">{{item.dateTime}}</text>
					</view>
					<view :class="['content-wrap', 'xa-flex', `xa-row-${item.direction}`]">
						<image :src="item.avatar" class="avatar" v-if="item.direction === 'left'"></image>
						<view :class="['content', item.direction]">
							<text class="text" v-if="item.type === 'text'">{{item.content}}</text>
							<image :src="item.content" class="img" mode="widthFix" v-if="item.type === 'img'"></image>
						</view>
						<image :src="item.avatar" class="avatar" v-if="item.direction === 'right'"></image>
					</view>
				</view>
			</view>
			<view class="input-bottom" slot="bottom" v-if="false">
				<view class="input-box xa-flex xa-col-center xa-row-between">
					<input @confirm="addChatRecordClick" class="input" confirm-type="send" @input="changeInput" :value="inputValue" placeholder-style="color: rgba(51, 57, 64, 0.5);" type="text" placeholder="发送消息">
					<image @click="uploadImgHandle" src="../../static/img/icon/ic_img_upload.png" class="icon"></image>
				</view>
			</view>
		</z-paging>
	</view>
</template>

<script>
	const list1 = [
		{
			dateTime: '',
			avatar: '../../static/img/logo.png',
			content: `3办理地点：乌兰浩特市-长青街与代钦路30号五一派出所户籍窗口
			办理时间：周一至周五上午8：30-11：30，下午14:30-17:30（法定节假日除外）
			公交路线：1路公交车或步行至代钦路30号`,
			direction: 'left',
			type: 'text'
		},
		{
			dateTime: '',
			avatar: '../../static/img/logo.png',
			content: `2办理地点：乌兰浩特市政务服务中心二楼公安4号窗口
			办理时间：周一至周五上午8：30-11：30，下午14:30-17:30（法定节假日除外）
			公交路线：2路 3路政务局站下车北行50米`,
			direction: 'left',
			type: 'text'
		},
		{
			dateTime: '',
			avatar: '../../static/img/logo.png',
			content: `1《中华人民共和国居民身份证法》 第二条居住在中华人民共和国境内的年满十六周岁的中国公民，应当依照本法的规定申请领取居民身份证；未满十六周岁的中国公民，可以依照本法的规定申请领取居民身份证。`,
			direction: 'left',
			type: 'text'
		}
	]
	const list2 = [
		{
			dateTime: '',
			avatar: '../../static/img/logo.png',
			content: `2.办理地点：乌兰浩特市政务服务中心二楼公安4号窗口
			办理时间：周一至周五上午8：30-11：30，下午14:30-17:30（法定节假日除外）
			公交路线：2路 3路政务局站下车北行50米`,
			direction: 'left',
			type: 'text'
		},
		{
			dateTime: '',
			avatar: '../../static/img/logo.png',
			content: `1【行政法规】《居住证暂行条例》（国务院令第663号） 第二条公民离开常住户口所在地，到其他城市居住半年以上，符合有合法稳定就业、合法稳定住所、连续就读条件之一的，可以依照本条例的规定申领居住证。 第八条公安机关负责居住证的申领受理、制作、发放、签注等证件管理工作。`,
			direction: 'left',
			type: 'text'
		}
	]
	import ZPagingMixin from '@/uni_modules/z-paging/components/z-paging/js/z-paging-mixin'
	export default {
		data () {
			return {
				mixins: [ZPagingMixin],
				dataList: [],
				inputValue: '',
				type: '1'
			}
		},
		onLoad(options) {
			if (options.title) {
				uni.setNavigationBarTitle({
					title: decodeURIComponent(options.title)
				})
			}
			if (options.type) {
				this.type = options.type
			}
		},
		onPageScroll(e) {
			if (e.scrollTop < 10) {
				this.$refs.paging.doChatRecordLoadMore();
			}
		},
		methods: {
			queryList(pageNo, pageSize) {
				setTimeout(() => {
					const list = this.type === '1' ? list1 : list2
					this.$refs.paging.complete(list);
				}, 600)
				//这里的pageNo和pageSize会自动计算好，直接传给服务器即可
				//这里的请求只是演示，请替换成自己的项目的网络请求，并在网络请求回调中通过this.$refs.paging.complete(请求回来的数组)将请求结果传给z-paging
				// this.$request.queryList({ pageNo, pageSize }).then(res => {
					//请勿在网络请求回调中给dataList赋值！！只需要调用complete就可以了
					// this.$refs.paging.complete(res.data.list);
				// }).catch(res => {
					//如果请求失败写this.$refs.paging.complete(false)，会自动展示错误页面
					//注意，每次都需要在catch中写这句话很麻烦，z-paging提供了方案可以全局统一处理
					//在底层的网络请求抛出异常时，写uni.$emit('z-paging-error-emit');即可
					// this.$refs.paging.complete(false);
				// })
			},
			changeInput (e) {
				this.inputValue = e.detail.value
			},
			addChatRecordClick() {
				if (this.inputValue && this.inputValue.trim()) {
					this.$refs.paging.addChatRecordData({
						dateTime: '刚刚',
						avatar: '../../static/img/logo.png',
						content: this.inputValue,
						direction: 'right',
						type: 'text'
					});
					this.inputValue = ''
				} else {
					this.$toast('不能发送空内容')
				}
			},
			uploadImgHandle () {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						this.$refs.paging.addChatRecordData({
							dateTime: '刚刚',
							avatar: '../../static/img/logo.png',
							content: res.tempFilePaths[0],
							direction: 'right',
							type: 'img'
						});
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.page {
	background-color: #FFFFFF;
	font-size: 0;
	.list {
		background-color: #FFFFFF;
		.item {
			position: relative;
			padding: 0 30rpx;
			margin-top: 20rpx;
			.avatar {
				width: 68rpx;
				height: 68rpx;
				flex: 0 0 1;
				border-radius: 50%;
			}
			.content {
				padding: 18rpx 24rpx;
				max-width: 530rpx;
				min-height: 64rpx;
				border-radius: 20rpx;
				flex: 0 0 1;
				box-sizing: border-box;
			}
			.left {
				margin-left: 12rpx;
				background: #F5F5F7;
				.text {
					font-size: 30rpx;
					color: #070707;
					line-height: 42rpx;
				}
			}
			.right {
				margin-right: 12rpx;
				background: #F04F48;
				.text {
					font-size: 30rpx;
					color: #FFFFFF;
					line-height: 46rpx;
				}
				.img {
					width: 480rpx;
				}
			}
			.date {
				padding: 30rpx 0;
				.text {
					font-size: 24rpx;
					color: #333940;
					line-height: 34rpx;
				}
			}
		}
	}
	.input-bottom {
		padding: 20rpx 30rpx;
		background-color: #FFFFFF;
		.input-box {
			padding: 18rpx 20rpx;
			background: #F7F7F7;
			border-radius: 44rpx;
			.input {
				padding: 0 82rpx 0 52rpx;
				flex: 1;
				font-size: 28rpx;
				color: #333940;
				line-height: 40rpx;
			}
			.icon {
				flex: 0 0 1;
				width: 52rpx;
				height: 52rpx;
			}
		}
	}
}
</style>