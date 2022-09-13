export function loginByBusinessPwd(params = {}){
/**
 * POST /user/oauth/loginByBusinessPwd
 * @description 营业执照密码登录
 * @param username 统一社会信用代码
 * @param password 密码
 */
	return uni.$request({
		url:'/user/oauth/loginByBusinessPwd',
		methods:'POST',
		params
	})
}

export function registerByBusiness(params = {}){
/**
 * POST /user/oauth/registerByBusiness
 * @description 企业注册
 * @param creditCode 统一社会信用代码
 * @param businessName 单位名称
 * @param businessType 法人类型：1、有限责任公司；2、股份有限公司；3、有限合伙企业；4、外商独资公司；5、个人独资企业；6、国有独资公司；7、其他。
 * @param password 密码
 */
	return uni.$request({
		url:'/user/oauth/registerByBusiness',
		methods:'POST',
		params
	})
}

export function loginByMobilePwd(params = {}){
/**
 * POST /user/oauth/loginByMobilePwd
 * @description 手机号密码登录
 * @param username 手机号
 * @param password 密码
 */
	return uni.$request({
		url:'/user/oauth/loginByMobilePwd',
		methods:'POST',
		params
	})
}

export function loginByMobile(params = {}){
/**
 * POST /user/oauth/loginByMobile
 * @description 手机号验证码登录
 * @param mobile 手机号
 * @param code 验证码
 */
	return uni.$request({
		url:'/user/oauth/loginByMobile',
		methods:'POST',
		params
	})
}

export function registerByMobile(params = {}){
/**
 * POST /user/oauth/registerByMobile
 * @description 手机号注册
 * @param mobile 手机号
 * @param code 验证码
 * @param password 密码
 */
	return uni.$request({
		url:'/user/oauth/registerByMobile',
		methods:'POST',
		params
	})
}

export function getPhoneCode(params = {}){
	/**
	 * GET /user/oauth/smsCode
	 * @description 获取验证码
	 * @param mobile 手机号
	 */
	return uni.$request({
		url: `/user/oauth/smsCode${uni.$g.queryParams(params)}`,
		methods:'GET'
	})
}

export function userInfo(params){
	/**
	 * GET /user/user/person
	 * @description 个人详情信息
	 */
	return uni.$request({
		url:'/user/user/person',
		methods:'GET',
		params:params
	})
}

export function feedbackSend(params) {
	/**
	 * GET /app/user/feedback/send
	 * @description 反馈
	 * @param type 反馈类型
	 * @param content 反馈内容
	 * @param images 图片
	 * @param sysInfo 手机系统信息
	 * @param version APP版本号
	 * @param userId 用户id
	 */
	return uni.$request({
		url: '/app/user/feedback/send',
		methods: 'post',
		params
	})
}