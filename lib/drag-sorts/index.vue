<template>
	<view>
		<movable-area class="drag-sort" :style="{height:boxHeight }" id="drag">
			<movable-view
			v-for="(item, index) in currentList"
			:key="index"
			:x="item.x"
			v-if="item.isShow === 1"
			:data-index="index"
			@touchstart="touchstart"
			@touchmove.stop="touchmove"
			@touchend="touchend"
			:y="item.y"
			:direction="direction"
			disabled
			damping="40"
			:animation="item.animation"
			class="drag-sort-item"
			:style="boxStyle"
			:class="{'active': active == index, 'long-touch': hadTouch && active == index}">
				<!-- #ifdef MP-WEIXIN -->
				<view @click="$emit('nav', item.path)" class="grid-item-box xa-flex xa-flex-column xa-col-center xa-row-center">
					<image class="image" :src="item.url" mode="aspectFill" />
					<text class="text">{{item.text}}</text>
					<image v-show="!disabled" src="@/static/img/icon/dot_index.png" v-if="item.SortNumber < 11" class="dot"></image>
				</view>
				<!-- #endif -->
				<!-- #ifdef APP-PLUS -->
				<slot name="content" :item="item"></slot>
				<!-- #endif -->
			</movable-view>
		</movable-area>
	</view>

</template>

<script>
export default {
	name: 'drag-sort',
	data () {
		return {
			styleObject: {
			color: 'red',
			fontSize: '13px'
			},
			style:{
				background:'red'
			},
			direction:"all",
			windowWidth:100, //屏幕宽度
			height: 90, // 高度
			currentList: [],
			active: -1, // 当前激活的item
			index: 0, // 当前激活的item的原index
			topY: 0, // 距离顶部的距离
			topX: 0, // 距离左侧偏移位置
			deviationX: 0,
			deviationY: 0, // 偏移量
			hadTouch: false
		}
	},
	computed: {
		boxHeight(){
			return (Math.ceil((Number(this.list.length)+1)/4)) * this.height + 'px'  
		}
	},
	props: {
		list: {
			type: Array,
			default: () => {
				return []
			}
		},
		boxStyle: {
			type: Object,
			default: () => {
				return {}
			}
		},
		props: {
			type: Object,
			default: () => {
				return {
					label: 'label',
					value: 'value'
				}
			}
		},
		disabled: {
			type: Boolean,
			default: true
		}
	},
	watch: {
		list (nVal, oVal) {
			// #ifdef APP-PLUS
			this.onUpdateCurrentList()
			// #endif
			// #ifdef MP-WEIXIN
			if (JSON.stringify(nVal) !== JSON.stringify(oVal)) {
				// this.onUpdateCurrentList()
			}
			// #endif
		}
	},
	mounted () {
		const res = uni.getSystemInfoSync();
		this.windowWidth = res.windowWidth - 20
		this.onUpdateCurrentList()
	},
	methods: {
		onUpdateCurrentList (list = this.list) {
			let arr = []
			for (const key in list) {
				// console.log(key)
				let height =  Math.ceil((Number(key)+1)/4) - 1
				let x = 0
				if (key <= 3) {
					x = key * this.windowWidth * 0.24
				} else {
					if ((Number(key)+1)%4 === 0) {
						x = 3 * this.windowWidth * 0.24
					} else {
						x = ((Number(key)+1)%4-1) * this.windowWidth * 0.24
					}
					
				}
				arr.push({
					...list[key],
					isShow:1,
					index: Number(key),
					SortNumber:Number(key),
					y: height * this.height,
					x,
					animation: true
				})
			}
			this.currentList = arr
		},
		// 根据排序进行重新计算位置
		moveUpdateCurrentList(index){
			for (const i in this.currentList) {
				let key
				if(this.currentList[i].SortNumber || this.currentList[i].SortNumber === 0){
					key = this.currentList[i].SortNumber
				}else{
					key = Number(i)
				}
				// console.log(key)
				let temobj = { ...this.currentList[i] }
				 // debugger
				this.currentList[i].y =  (Math.ceil((Number(key)+1)/4) - 1)*this.height 
				if(index == key){
					continue
				}else{
					if(key <= 3){
						this.currentList[i].x = key * this.windowWidth * 0.24
					}else{
						if((Number(key)+1)%4 === 0){
							 this.currentList[i].x = 3 * this.windowWidth * 0.24
						}else{
							 this.currentList[i].x = ((Number(key)+1)%4-1) * this.windowWidth * 0.24
						}
					} 
				}
			}
			this.$emit('change', this.currentList)
		},
		touchstart (e) {
			if (this.disabled) return
			this.hadTouch = true
			// 计算 x y 轴点击位置
			var query = uni.createSelectorQuery().in(this)
			query.select('#drag').boundingClientRect()
			query.exec((res) => {
				this.topY = res[0].top
				this.topX  = res[0].left
				let touchY = e.mp.touches[0].clientY - res[0].top
				let touchX = e.mp.touches[0].clientX - res[0].left
				this.deviationY = touchY
				this.deviationX = touchX
				this.active = Number(e.currentTarget.dataset.index)
				this.index = Number(e.currentTarget.dataset.index)
			})
		},
		touchmove (e) {
			if (this.active < 0 || this.disabled) return
			let temY = e.mp.touches[0].clientY - this.topY
			let temX = e.mp.touches[0].clientX - this.topX
			let touchY = temY - 30
			let touchX = temX - this.windowWidth*0.1
			this.currentList[this.active].y = touchY 
			this.currentList[this.active].x = touchX
			this.currentList[this.active].animation = false
			this.currentList.every( (res, index) => {
			let absX =  Math.abs(touchX - res.x)
			let absY =  Math.abs(touchY - res.y)
			// 设置元素定点距离多少进行重排
			if( 0 < absX && absX <= 10 && absY > 0 && absY <= 10 &&　this.active　!=　index){
				// debugger
				let temNumber = this.currentList[index].SortNumber
				this.currentList.every((_res, _index) => {
					// 判断从大像小移还是从小向大移
					if(this.currentList[this.active].SortNumber < this.currentList[index].SortNumber){
						// 移动元素比目标元素所在位置小，之间元素排序--
						if( this.currentList[_index].SortNumber > this.currentList[this.active].SortNumber && this.currentList[_index].SortNumber <= this.currentList[index].SortNumber){
							_res.SortNumber--
						}
					} else {
						// 反之++
						if (this.currentList[_index].SortNumber < this.currentList[this.active].SortNumber && this.currentList[_index].SortNumber >= this.currentList[index].SortNumber){
							_res.SortNumber++
						}
					}
					return true
				}, this)
				this.currentList[this.active].SortNumber = temNumber 
				this.moveUpdateCurrentList(temNumber)
				return false
			} else {
				return true
			}
		}, this)
		},
		touchend (e) {
			if (this.disabled) return
			this.hadTouch = false
			if(this.currentList[this.active]){
				this.currentList[this.active].animation = true
			}
			if (this.index !== this.currentList[this.active].SortNumber) {
				this.moveUpdateCurrentList(-1)
			}
			this.active = -1
		},
		// 关闭按钮
		close(index){
			// debugger
			uni.showToast({
				title:'点击删除'
			})
			console.log("我是删除的index 的SortNumber")
			console.log(this.currentList[index].SortNumber)
			this.currentList.forEach( (item, i) => {
				if(this.currentList[i].SortNumber > this.currentList[index].SortNumber){
					item.SortNumber--
				}
			})
			
			this.moveUpdateCurrentList(-1)
			this.currentList[index].isShow = 0 
		}
	}
}
</script>

<style lang='less' scoped>
	@import "~./1px.less";
	.drag-sort {
		width: 100%;
	}
	.drag-sort-item {
		position: absolute !important;
		display: flex;
		padding: 40rpx 0;
		align-items: center;
		width: 173rpx;
		height: 140rpx;
		text-align: center;
		color: #fff;
		box-sizing: border-box;
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
	.active {
		/* box-shadow: 0 0 40rpx #DDDDDD; */
		z-index: 99;
	}
	.long-touch {
		animation: all 0.2s ease-in;
		opacity: 0.8;
	}
</style>
