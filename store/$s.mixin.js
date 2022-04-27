import { mapState } from 'vuex'
import store from "@/store"
// 尝试将用户在根目录中的store/index.js的vuex的state变量，全部加载到全局变量中
let $storeKey = [];
try {
	$storeKey = store.state ? Object.keys(store.state) : [];
} catch(e) {

}

module.exports = {
	created() {
		// 将vuex方法挂在到$g中
		// 如果要修改vuex的state的token变量为abc => uni.$g.vuex('token', 'abc')
		uni.$g.vuex = (name, value) => {
			this.$store.commit('$initStore', {
				name,
				value
			})
		}
	},
	computed: {
		// 将vuex的state中的所有变量，解构到全局混入的mixin中
		...mapState($storeKey)
	}
}
