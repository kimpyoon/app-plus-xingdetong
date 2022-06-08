<template>
	<view class="page">
		<view class="cell-group">
			<view class="cell xa-flex xa-col-center xa-row-between">
				<view class="right xa-flex xa-col-center">
					<input @input="changeInput" @focus="focusKey = 'expressNo'" class="value" type="text" :value="expressNo" placeholder="请输入快递单号">
				</view>
			</view>
		</view>
		<view class="cell-group">
			<view class="cell xa-flex xa-col-center xa-row-between" @click="show = true">
				<picker class="right xa-flex xa-col-center" @change="bindPickerChange" range-key="com" :value="companyIndex" :range="companyOptions">
					<text class="value" v-if="companyText">{{companyText}}</text><text v-else class="value">请选择快递公司</text>
					<uni-icons type="right" color="#B1B1B1" size="14" />
				</picker>
			</view>
		</view>
		<view class="cell-group">
			<view class="cell xa-flex xa-col-center xa-row-between">
				<view class="right xa-flex xa-col-center">
					<input @input="changeInput" @focus="focusKey = 'phone'" maxlength="4" class="value" type="number" :value="phone" placeholder="请输入收件人手机号后4位">
				</view>
			</view>
		</view>
		<view class="submit">
			<button @click="submitHandle" class="button xa-flex xa-col-center xa-row-center">确定查询</button>
		</view>
		<u-select v-model="show" :list="companyOptions"></u-select>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				focusKey: '',
				expressNo: '',
				phone: '',
				companyOptions: [],
				show: false,
				companyIndex: -1
			}
		},
		computed: {
			companyText () {
				if (this.companyOptions.length && this.companyIndex > -1) {
					return this.companyOptions[this.companyIndex].com
				}
				return ''
			},
			company () {
				if (this.companyOptions.length && this.companyIndex > -1) {
					return this.companyOptions[this.companyIndex].no
				}
				return ''
			}
		},
		onShow() {
			uni.removeStorage({
				key: 'express-data'
			})
		},
		onLoad(options) {
			this.$api.logistics.getLogisticsCompany().then(res => {
				this.companyOptions = res
			})
		},
		methods: {
			bindPickerChange (e) {
				this.companyIndex = e.detail.value
			},
			changeInput (e) {
				this[this.focusKey] = e.target.value
			},
			submitHandle () {
				if (uni.$g.test.isEmpty(this.expressNo)) {
					this.$toast('请填写快递单号')
					return
				}
				if (uni.$g.test.isEmpty(this.phone)) {
					this.$toast('请填写收件人手机号后4位')
					return
				}
				if (uni.$g.test.isEmpty(this.company)) {
					this.$toast('请选择快递公司')
					return
				}
				uni.$g.throttle(() => {
					this.$api.logistics.logisticsSearch({
						com: this.company,
						no: this.expressNo,
						receiverPhone: this.phone
					}).then(res => {
						uni.setStorage({
							key: 'express-data',
							data: res
						})
						uni.navigateTo({
							url: '/pages/logistics/result'
						})
					})
				}, 1000)
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
		padding: 0 32rpx;
		background-color: #FFFFFF;
		margin: 0 auto 20rpx;
		width: 690rpx;
		box-sizing: border-box;
		border-radius: 20rpx;
		.cell {
			position: relative;
			height: 88rpx;
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
				flex: 1;
				.value {
					font-size: 28rpx;
					flex: 1;
					color: #333940;
					text-align: left;
				}
			}
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