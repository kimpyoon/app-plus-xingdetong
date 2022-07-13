<template>
	<view class="page">
		<view class="list">
			<view @click="clickItem(item)" class="card" v-for="(item, index) in cards" :key="index">
				<image :src="item.bg" class="bg" mode="widthFix"></image>
				<view class="content">
					<view class="name"><text>{{item.name}}</text></view>
					<view class="desc" v-if="item.desc"><text>{{item.desc}}</text></view>
					<button class="button xa-flex xa-col-center xa-row-center"><text>立即查看</text></button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { navHandler } from '../../utils/index.js'
	export default {
		data () {
			return {
				cards: [
					{
						name: '防疫政策',
						desc: '',
						bg: '../../static/img/health/fyzc.png',
						path: 'https://mp.weixin.qq.com/s/6k-GZOvRqIv8EzbWA6tQhg'
					},
					// {
					// 	name: '预约挂号',
					// 	desc: '',
					// 	bg: '../../static/img/health/yygh.png',
					// 	path: 'https://expert.baidu.com/med/template/#/pages/guahao/hospitaldetail/index?sf_ref=search_gh_5589&from=&title=%E5%86%85%E8%92%99%E5%8F%A4%E8%87%AA%E6%B2%BB%E5%8C%BA%E4%BA%BA%E6%B0%91%E5%8C%BB%E9%99%A2&hospital=%E5%86%85%E8%92%99%E5%8F%A4%E8%87%AA%E6%B2%BB%E5%8C%BA%E4%BA%BA%E6%B0%91%E5%8C%BB%E9%99%A2&hospital_id=xqwRIxWWG2ij8kBa6JWV4w%3D%3D&fclk=%E5%86%85%E8%92%99%E5%8F%A4%E8%87%AA%E6%B2%BB%E5%8C%BA%E4%BA%BA%E6%B0%91%E5%8C%BB%E9%99%A2&lid=7209443561102620993&referlid=2345768970&_=1q6akam0jhy'
					// },
					{
						name: '核酸检测机构',
						desc: '',
						bg: '../../static/img/health/hsjcjg.png',
						path: 'https://nmg.inspurhealth.com/ihealth-icity/nmg_pass/index.html#/nucleicAcidCity'
					},
					// {
					// 	name: '市人民医院',
					// 	desc: '',
					// 	bg: '../../static/img/health/srmyy.png',
					// 	path: 'http://wlhtwx.udeyun.cn/WxServer/Views/index1.aspx'
					// }
				]
			}
		},
		methods: {
			clickItem (item) {
				navHandler(item.path)
			}
		}
	}
</script>

<style lang="scss" scoped>
.page {
	.list {
		padding: 40rpx 0;
		.card {
			position: relative;
			padding-left: 30rpx;
			.bg {
				width: 700rpx;
				position: absolute;
				top: 0;
				left: 35rpx;
			}
			.content {
				position: relative;
				height: 240rpx;
				padding-left: 154rpx;
				box-sizing: border-box;
				z-index: 1;
				.name {
					// padding-top: 54rpx;
					padding-top: 80rpx;
					font-size: 36rpx;
					font-weight: bold;
					color: #FFFFFF;
					line-height: 50rpx;
				}
				.desc {
					margin-top: 8rpx;
					font-size: 24rpx;
					color: #FFFFFF;
					line-height: 34rpx;
				}
				.button {
					position: absolute;
					top: 74rpx;
					right: 74rpx;
					height: 52rpx;
					padding: 0 26rpx;
					border-radius: 26rpx;
					border: 2rpx solid rgba(255,255,255,0.3);
					font-size: 24rpx;
					color: #FFFFFF;
					line-height: 1;
					background-color: transparent;
				}
			}
		}
	}
}
</style>