// 天气数据
export function getWeatherNow(params){
	/**
	 * POST /index/weather/getNow
	 * @description 获取当前天气
	 * @param location 以英文逗号分隔的经度,纬度坐标（十进制，最多支持小数点后两位）
	 */
	// now.obsTime	
	// 数据观测时间

	// now.temp	
	// 温度，默认单位：摄氏度

	// now.feelsLike	
	// 体感温度，默认单位：摄氏度

	// now.icon	
	// 天气状况和图标的代码，图标可通过天气状况和图标下载

	// now.text	
	// 天气状况的文字描述，包括阴晴雨雪等天气状态的描述

	// now.wind360	
	// 风向360角度

	// now.windDir	
	// 风向

	// now.windScale	
	// 风力等级

	// now.windSpeed	
	// 风速，公里/小时

	// now.humidity	
	// 相对湿度，百分比数值

	// now.precip	
	// 当前小时累计降水量，默认单位：毫米

	// now.pressure	
	// 大气压强，默认单位：百帕

	// now.vis	
	// 能见度，默认单位：公里

	// now.cloud	
	// 云量，百分比数值。可能为空

	// now.dew	
	// 露点温度。可能为空

	// refer.sources	
	// 原始数据来源，或数据源说明，可能为空

	// refer.license	
	// 数据许可或版权声明，可能为空
	return uni.$request({
		url:'/index/weather/getNow',
		methods:'GET',
		params:params
	})
}

export function getWeather24h(params) {
	/**
	 * POST /index/weather/getNow
	 * @description 获取24h天气
	 * @param location 以英文逗号分隔的经度,纬度坐标（十进制，最多支持小数点后两位）
	 */
	// hourly.fxTime	
	// 预报时间

	// hourly.temp	
	// 温度，默认单位：摄氏度

	// hourly.icon	
	// 天气状况和图标的代码，图标可通过天气状况和图标下载

	// hourly.text	
	// 天气状况的文字描述，包括阴晴雨雪等天气状态的描述

	// hourly.wind360	
	// 风向360角度

	// hourly.windDir	
	// 风向

	// hourly.windScale	
	// 风力等级

	// hourly.windSpeed	
	// 风速，公里/小时

	// hourly.humidity	
	// 相对湿度，百分比数值

	// hourly.precip	
	// 当前小时累计降水量，默认单位：毫米

	// hourly.pop	
	// 逐小时预报降水概率，百分比数值，可能为空

	// hourly.pressure	
	// 大气压强，默认单位：百帕

	// hourly.cloud	
	// 云量，百分比数值。可能为空

	// hourly.dew	
	// 露点温度。可能为空

	// refer.sources	
	// 原始数据来源，或数据源说明，可能为空

	// refer.license	
	// 数据许可或版权声明，可能为空
	return uni.$request({
		url:'/index/weather/get24h',
		methods:'GET',
		params:params
	})
}

export function getWeather7d(params) {
	/**
	 * POST /index/weather/getNow
	 * @description 获取7d天气
	 * @param location 以英文逗号分隔的经度,纬度坐标（十进制，最多支持小数点后两位）
	 */
	// daily.fxDate
	// 预报日期
	
	// daily.sunrise	
	// 日出时间
	
	// daily.sunset	
	// 日落时间
	
	// daily.moonrise	
	// 月升时间
	
	// daily.moonset	
	// 月落时间
	
	// daily.moonPhase	
	// 月相名称
	
	// daily.moonPhaseIcon	
	// 月相图标代码，图标可通过天气状况和图标下载
	
	// daily.tempMax	
	// 预报当天最高温度
	
	// daily.tempMin	
	// 预报当天最低温度
	
	// daily.iconDay	
	// 预报白天天气状况的图标代码，图标可通过天气状况和图标下载
	
	// daily.textDay	
	// 预报白天天气状况文字描述，包括阴晴雨雪等天气状态的描述
	
	// daily.iconNight	
	// 预报夜间天气状况的图标代码，图标可通过天气状况和图标下载
	
	// daily.textNight	
	// 预报晚间天气状况文字描述，包括阴晴雨雪等天气状态的描述
	
	// daily.wind360Day	
	// 预报白天风向360角度
	
	// daily.windDirDay	
	// 预报白天风向
	
	// daily.windScaleDay	
	// 预报白天风力等级
	
	// daily.windSpeedDay	
	// 预报白天风速，公里/小时
	
	// daily.wind360Night	
	// 预报夜间风向360角度
	
	// daily.windDirNight	
	// 预报夜间当天风向
	
	// daily.windScaleNight	
	// 预报夜间风力等级
	
	// daily.windSpeedNight	
	// 预报夜间风速，公里/小时
	
	// daily.precip	
	// 预报当天总降水量，默认单位：毫米
	
	// daily.uvIndex	
	// 紫外线强度指数
	
	// daily.humidity	
	// 相对湿度，百分比数值
	
	// daily.pressure	
	// 大气压强，默认单位：百帕
	
	// daily.vis	
	// 能见度，默认单位：公里
	
	// daily.cloud	
	// 云量，百分比数值。可能为空
	
	// refer.sources	
	// 原始数据来源，或数据源说明，可能为空
	
	// refer.license	
	// 数据许可或版权声明，可能为空
	return uni.$request({
		url:'/index/weather/get7d',
		methods:'GET',
		params:params
	})
}
