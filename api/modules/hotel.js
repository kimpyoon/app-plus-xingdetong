export function getHotelList(params){
	return uni.$request({
		url:'/enjoy/hotel/page',
		methods:'POST',
		params: params
	})
}

export function getHotelInfo(params){
	return uni.$request({
		url:'/enjoy/hotel/info',
		methods:'GET',
		params: params
	})
}