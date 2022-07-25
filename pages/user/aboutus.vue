<template>
	<view class="page">
		<view class="page-wrap" v-if="pageLoad">
			<view class="head xa-flex xa-col-center xa-row-center xa-flex-column">
				<image src="../../build/1024x1024.png" class="logo"></image>
				<text class="app-name">兴得通</text>
				<text class="ver">V{{appVersion}}</text>
			</view>
			<view class="card">
				<text class="message">
					“一句话叫响兴安盟”地域形象宣传语有奖征集活动征集作品阶段也圆满地告一段落。一个多月以来，兴安盟受到全国近30个省市网友的关注，全盟各地50余家部门单位和社会各界也纷纷参与到活动中来，齐心协力为宣介家乡出谋划策、贡献力量，让这个寒冬暖意满满。截止到2021年12月31日下午，主办方已收到3500余封邮件，20000余条作品。在这个特别的日子里，主办方衷心感谢大家对兴安盟的宠爱，特分享一波饱含对兴安盟美好祝福的应征作品，祝福大家2022年温暖平安，和和美美！同时，期待大家持续关注并参与后续活动。
				</text>
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
				appVersion: plus.runtime.version,
			}
		},
		components: {
			PageLoading
		},
		onLoad() {
			setTimeout(() => {
				this.pageLoad = true
			}, 1000)
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
.page {
	background-color: #F5F6FA;
	.page-wrap {
		padding-bottom: 80rpx;
		background-color: #F5F6FA;
		.head {
			padding: 82rpx 0 62rpx;
			.logo {
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
			}
			.app-name {
				margin-top: 30rpx;
				font-size: 48rpx;
				font-weight: bold;
				color: #333333;
				line-height: 66rpx;
			}
			.ver {
				margin-top: 8rpx;
				font-size: 26rpx;
				color: #3A3A3A;
				line-height: 36rpx;
			}
		}
		.card {
			padding: 48rpx 42rpx;
			margin: 0 auto;
			width: 690rpx;
			background: #FFFFFF;
			border-radius: 16rpx;
			box-sizing: border-box;
			overflow: hidden;
			.message {
				font-size: 28rpx;
				color: #595959;
				line-height: 56rpx;
				word-break: break-word;
			}
		}
	}
}
</style>