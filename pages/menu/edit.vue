<template>
	<view class="page">
		<uni-nav-bar left-icon="left" title="服务中心" statusBar :border="false" @clickLeft="clickLeftNavBarButton" @clickRight="clickRightNavBarButton" rightWidth="auto" fixed>
			<block slot="right">
				<view class="nav-bar-right-text" v-show="disableEdit">
					{{saveText}}
				</view>
				<view class="nav-bar-right-btn xa-flex xa-col-center xa-row-center" v-show="!disableEdit">
					{{saveText}}
				</view>
			</block>
		</uni-nav-bar>

		<view class="menu">
			<view class="tip" v-show="!disableEdit">
				长按拖动可以调整排序
			</view>
			<view class="inner">
				<drag-sort @nav="nav" :list="menus" @change="sortChange" :disabled="disableEdit">
					<!-- #ifdef APP-PLUS -->
					<template v-slot:content="{item}">
						<view @click="nav(item.path)" class="grid-item-box xa-flex xa-flex-column xa-col-center xa-row-center">
							<image class="image" :src="item.url" mode="aspectFill" />
							<text class="text">{{item.text}}</text>
							<image v-show="!disableEdit" src="../../static/img/icon/dot_index.png" v-if="item.SortNumber < 11" class="dot"></image>
						</view>
					</template>
					<!-- #endif -->
				</drag-sort>
			</view>
		</view>
	</view>
</template>

<script>
	import DragSort from '../../lib/drag-sorts/index.vue'
	import { navHandler } from '../../utils/index.js'
	export default {
		data() {
			return {
				saveText: '管理',
				disableEdit: true,
				menus: []
			}
		},
		onLoad() {
			this.menus = JSON.parse((JSON.stringify(this.vuex_menus)))
		},
		methods: {
			nav (path) {
				if (this.disableEdit) {
					navHandler(path)
				}
			},
			clickRightNavBarButton () {
				if (this.saveText === '管理') {
					this.saveText = '保存'
					this.disableEdit = false
					uni.setNavigationBarTitle({
						title: '管理排序'
					})
				} else {
					uni.$g.vuex('vuex_menus', this.newList)
					this.saveText = '管理'
					this.disableEdit = true
					uni.setNavigationBarTitle({
						title: '服务中心'
					})
				}
			},
			clickLeftNavBarButton () {
				uni.navigateBack()
			},
			sortChange (e) {
				const temp = JSON.parse(JSON.stringify(e))
				temp.sort((a, b) => a.SortNumber - b.SortNumber)
				const newList = temp.map(n => {
					return {
						url: n.url,
						text: n.text,
						path: n.path
					}
				})
				this.newList = newList
			}
		},
		components: {
			DragSort
		}
	}
</script>

<style scoped lang="scss">
.page {
	padding: 2rpx 30rpx;
	font-size: 0;
	background-color: #F5F6FA;
	box-sizing: border-box;
	min-height: 100vh;
	.nav-bar-right-text {
		font-size: 26rpx;
		color: #F25542;
	}
	.nav-bar-right-btn {
		width: 82rpx;
		height: 40rpx;
		background: linear-gradient(135deg, #FD6A50 0%, #FD4B62 100%);
		border-radius: 20rpx;
		font-weight: bold;
		color: #FFFFFF;
		line-height: 34rpx;
	}
	.menu {
		margin-top: 24rpx;
		padding: 20rpx 0;
		width: 690rpx;
		min-height: 212rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		box-sizing: border-box;
		.tip {
			padding-bottom: 20rpx;
			text-align: center;
			font-size: 26rpx;
			color: #B1B1B1;
			line-height: 36rpx;
		}
		.inner {
			padding: 20rpx 0 10rpx;
		}
		.grid-item-box {
			position: relative;
			padding: 30rpx 0;
			flex: 1;
			.dot {
				position: absolute;
				top: 28rpx;
				right: 36rpx;
				width: 30rpx;
				height: 30rpx;
			}
			.image {
				width: 84rpx;
				height: 84rpx;
				flex: 0 0 auto;
			}
			.text {
				margin-top: 20rpx;
				font-size: 26rpx;
				color: #262A33;
				line-height: 36rpx;
				white-space: nowrap;
			}
		}
	}
}
</style>