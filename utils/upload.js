import config from '@/config/index.js'
import { platform,getDeviceInfo } from './index.js'
export function upload({ filePath }, api='/comm/upload') {
	return new Promise(async (resolve,reject) =>{
		let token = uni.getStorageSync('token');
		console.log(token);
		let deviceInfo = await getDeviceInfo();
		uni.uploadFile({
			url: config.baseUrl + api,
			filePath: filePath,
			name: 'file',
			header: {
				'authorization': 'Bearer ' + token,
				'platform':platform,
				'systemInfo':JSON.stringify(uni.getSystemInfoSync()),
				'deviceInfo':JSON.stringify(deviceInfo),
			},
			formData: {},
			success: function(res) {
				try{
					uni.hideLoading()
					console.log(res);
					const result = JSON.parse(res.data);
					if(result.code==100) {
						resolve(result.data);
					}else{
						reject(result);
					}
				}catch(e){
					reject(e);
				}
			},
			fail: function(err) {
				console.log(err);
				uni.hideLoading()
				reject(err);
			}
		})
	})
}