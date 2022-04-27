// 首页数据
export function getInfo(params){
	return uni.$request({
		url:'/home/info',
		methods:'GET',
		params:params
	})
}