<script>
	export default {
		onLaunch: function() {
			if (!this.vuex_token) {
				const pages = getCurrentPages()
				const page = pages.length ? pages[pages.length - 1] : {}
				if (uni.$g.test.isEmpty(page) || !uni.$g.test.contains(page.route, 'login')) {
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/public/login'
						})
					}, 70)
				}
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
page {
	-webkit-font-smoothing: antialiased;
	-webkit-overflow-scrolling : touch;
	font-family: system-ui;
	background-color: #F5F6FA;
}
.page-wrap {
	min-height: 100vh;
	background-color: #FFFFFF;
	box-sizing: border-box;
	font-size: 0;
}
.page-loading {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
.xa-flex {
	display: flex;
	flex-direction: row;
}

.xa-flex-wrap {
	flex-wrap: wrap;
}

.xa-flex-nowrap {
	flex-wrap: nowrap;
}

.xa-flex-column {
	flex-direction: column;
}

.xa-col-center {
	align-items: center;
}

.xa-row-center {
	justify-content: center;
}

.xa-row-left {
	justify-content: flex-start;
}

.xa-row-right {
	justify-content: flex-end;
}

.xa-row-between {
	justify-content: space-between;
}

.xa-row-around {
	justify-content: space-around;
}

.xa-col-top {
	align-items: flex-start;
}

.xa-col-bottom {
	align-items: flex-end;
}
.xa-line-1 {
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.xa-line-2 {
	display: -webkit-box;
	overflow: hidden;
	text-overflow: ellipsis;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
.safe-area-inset-bottom {
	padding-bottom: env(safe-area-inset-bottom);
}
/* #ifndef APP-NVUE */
::-webkit-scrollbar,
::-webkit-scrollbar,
::-webkit-scrollbar {
	display: none;
	width: 0 !important;
	height: 0 !important;
	-webkit-appearance: none;
	background: transparent;
}
/* #endif */
</style>
