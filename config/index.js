const CONFIG = {
	//开发环境配置
	development: {
		// #ifndef H5
		baseUrl: "http://1iv9065600.zicp.vip/app",
		// #endif
		// #ifdef H5
		baseUrl: "/app",
		// #endif
	},

	//生产环境配置
	production: {
		baseUrl: "http://1iv9065600.zicp.vip/app"
	}

}
export default CONFIG[process.env.NODE_ENV];
