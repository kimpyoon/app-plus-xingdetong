// 获取快递公司编号对照表
export function getLogisticsCompany(params){
	return uni.$request({
		url: '/logistics/logistics/company',
		methods: 'GET',
		params: params
	})
}
export function logisticsSearch(params){
	/**
	 * POST /logistics/logistics/search
	 * 查询快递
	 * @param com 快递公司编号
	 * @param no 快递单号
	 * @param receiverPhone 收货人手机号后4位（仅顺丰需要）
	 */
	return uni.$request({
		url: '/logistics/logistics/search',
		methods: 'POST',
		params: params,
		loading: true
	})
}
