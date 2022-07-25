// 首页数据
export function getInfo(params){
	return uni.$request({
		url:'/home/info',
		methods:'GET',
		params:params
	})
}

export function getCovidData(province){
	/**
	 * POST /index/index/yiqing
	 * @description 疫情数据
	 * @param province 省份名称，不包含“省”字，例如“广东”
	 */
	// chinaStoreConfirm：国内现有确诊
	// chinaAddConfirm：国内新增确诊
	// provinceAddComfirm：当前省份新增确诊
	return uni.$request({
		url:'/index/index/yiqing',
		methods:'GET',
		params: {
			province
		}
	})
}