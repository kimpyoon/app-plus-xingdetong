<template>
	<view class="page">
		<uni-nav-bar statusBar leftIcon="left" :border="false" backgroundColor="#F5F6FA" rightText="取消" @clickRight="clickRightNavBarButton" @clickLeft="clickLeftNavBarButton" leftWidth="auto" rightWidth="auto" fixed>
			<view class="nav-content xa-flex xa-col-center">
				<view class="nav-input-view xa-flex xa-col-center">
					<uni-icons type="search" color="#BBBBBB" size="16" />
					<input :value="inputText" @input="changeInput" confirm-type="search" placeholder-style="color:#BBBBBB;" class="nav-bar-input" type="text" placeholder="搜索内容"
						@confirm="search" />
				</view>
			</view>
		</uni-nav-bar>
		<template v-if="hadSearch">
			<view class="empty xa-flex xa-col-center xa-row-center" v-if="isEmpty">
				<view class="inner">
					<view><image src="../../static/img/search_empty.png" class="img"></image></view>
					<view class="text">暂无搜索结果</view>
				</view>
			</view>
			<view class="result" v-else>
				
			</view>
		</template>
		<template v-else>
			<view class="section">
				<view class="title">
					<text class="text">热门搜索</text>
				</view>
				<view class="content xa-flex xa-flex-wrap">
					<view @click="clickQuickStart(item)" class="quick-item xa-flex xa-col-center" v-for="(item, index) in quickStarts" :key="index">
						<text class="text">{{item.text}}</text>
					</view>
				</view>
			</view>
			<view class="section">
				<view class="title xa-flex xa-row-between">
					<text class="text">搜索历史</text>
					<uni-icons type="trash" size="18" color="#999999" @click="delHistory"></uni-icons>
				</view>
				<view class="card">
					<view class="list">
						<view class="item xa-flex xa-col-center" v-for="(item, index) in history" :key="index">
							<text class="text">{{item.text}}</text>
						</view>
					</view>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
	import debounce from '../../utils/debounce.js'
	import { navHandler } from '../../utils/index.js'
	export default {
		data() {
			return {
				inputText: '',
				quickStarts: [
					{
						text: '社保'
					},
					{
						text: '公积金'
					},
					{
						text: '健康码'
					}
				],
				history: [
					{
						text: '水费'
					},
					{
						text: '疫情情况'
					}
				],
				hadSearch: false
			}
		},
		computed: {
			isEmpty () {
				return true
			}
		},
		onLoad() {

		},
		methods: {
			search () {
				debounce(() => {
					this.$toast('搜索：' + this.inputText)
					this.hadSearch = true
				})
			},
			clickLeftNavBarButton () {
				uni.navigateBack()
			},
			clickRightNavBarButton () {
				this.inputText = ''
				this.hadSearch = false
			},
			changeInput(e) {
				this.inputText = e.target.value
			},
			clickQuickStart(item) {
				if (this.history.findIndex(n => n.text === item.text) < 0) {
					this.history.unshift(item)
				} else {
					const index = this.history.findIndex(n => n.text === item.text)
					this.history.splice(index, 1)
					this.history.unshift(item)
				}
			},
			delHistory () {
				this.history = []
			}
		}
	}
</script>

<style scoped lang="scss">
.page {
	background-color: #F5F6FA;
	font-size: 0;
	.empty {
		margin: 24rpx auto 0;
		width: 690rpx;
		height: 816rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		.inner {
			display: block;
			transform: translateY(-20%);
		}
		.img {
			width: 284rpx;
			height: 284rpx;
		}
		.text {
			margin-top: 20rpx;
			text-align: center;
			font-size: 24rpx;
			color: #868686;
			line-height: 34rpx;
		}
	}
	.section {
		padding: 48rpx 0 0;
		.title {
			padding: 0 30rpx;
			.text {
				font-size: 32rpx;
				font-weight: bold;
				color: #332C25;
				line-height: 44rpx;
			}
		}
		.content {
			padding: 24rpx 10rpx 0 30rpx;
			.quick-item {
				margin-right: 20rpx;
				margin-bottom: 16rpx;
				padding: 0 44rpx;
				height: 76rpx;
				background: #FFFFFF;
				border-radius: 50rpx;
				box-sizing: border-box;
				box-sizing: border-box;
				.text {
					font-size: 26rpx;
					color: #2C2D2E;
					line-height: 36rpx;
				}
			}
		}
		.card {
			margin: 24rpx auto 0;
			width: 690rpx;
			min-height: calc(100vh - 498rpx);
			background: #FFFFFF;
			border-radius: 16rpx;
			overflow: hidden;
			.list {
				.item {
					position: relative;
					padding: 0 32rpx 0 60rpx;
					height: 88rpx;
					&::before {
						position: absolute;
						top: 50%;
						left: 32rpx;
						transform: translate(0, -50%);
						width: 16rpx;
						height: 16rpx;
						background: #E2E2E2;
						border-radius: 50%;
						content: '';
					}
					.text {
						font-size: 26rpx;
						color: #2C2D2E;
						line-height: 36rpx;
					}
				}
			}
		}
	}
}
</style>
<style lang="scss">
.nav-content {
	width: 100%;
	height: 100%;
	.nav-input-view {
		padding: 0 10rpx 0 14rpx;
		flex: 1;
		height: 58rpx;
		background-color: #FFFFFF;
		border-radius: 29rpx;
		box-sizing: border-box;
		overflow: hidden;
		.nav-bar-input {
			width: 100%;
			font-size: 24rpx;
			background-color: #FFFFFF;
			color: #070707;
		}
	}
}
</style>