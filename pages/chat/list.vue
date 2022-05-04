<template>
	<view class="page">
		<z-paging ref="paging" v-model="dataList" :use-chat-record-mode="true" :use-page-scroll="true" @query="queryList">
			<view class="list">
				<view class="item" :id="`z-paging-${index}`" v-for="(item, index) in dataList" :key="index">
					<view class="date xa-flex xa-col-center xa-row-center">
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
			<view class="input-bottom" slot="bottom">
				<view class="input-box xa-flex xa-col-center xa-row-between">
					<input @confirm="addChatRecordClick" class="input" confirm-type="send" @input="changeInput" :value="inputValue" placeholder-style="color: rgba(51, 57, 64, 0.5);" type="text" placeholder="发送消息">
					<image @click="uploadImgHandle" src="../../static/img/icon/ic_img_upload.png" class="icon"></image>
				</view>
			</view>
		</z-paging>
	</view>
</template>

<script>
	const list = [
		{
			dateTime: '昨天 下午4:34',
			avatar: '../../static/img/menu_10.png',
			content: '您好 我想要问一下办理个税抵扣是要怎么操',
			direction: 'right',
			type: 'text'
		},
		{
			dateTime: '昨天 下午4:34',
			avatar: '../../static/img/logo.png',
			content: '您好，您是咨询什么问题？',
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
				inputValue: ''
			}
		},
		onLoad(options) {
			if (options.title) {
				uni.setNavigationBarTitle({
					title: options.title
				})
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
						avatar: '../../static/img/menu_10.png',
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
							avatar: '../../static/img/menu_10.png',
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