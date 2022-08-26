export function getRestaurantList(params){
	return uni.$request({
		url:'/enjoy/restaurant/page',
		methods:'POST',
		params: params
	})
}

export function getRestaurantInfo(params){
	return uni.$request({
		url:'/enjoy/restaurant/info',
		methods:'GET',
		params: params
	})
}