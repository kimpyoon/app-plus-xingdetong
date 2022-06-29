// 从服务端获取app最新版本信息
export function getNewVersion(params){
	return uni.$request({
		url:'/app/version/getNewVersion',
		methods:'POST',
		params:params
	})
}