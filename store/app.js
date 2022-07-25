import api from "@/api"
import {
	isIos
} from '@/utils'
// 默认state
const getDefaultState = () => {
	return {
		// #ifdef APP-PLUS
		appVersion: plus.runtime.version,
		// #endif
		wgtVersion: '',
		newVersion: null,
		progress: 0,
		isDownLoading: false,
	}
}

// 获取资源信息
const getProperty = () => {
	return new Promise((resolve, reject) => {
		plus.runtime.getProperty(plus.runtime.appid, widgetInfo => {
			resolve(widgetInfo)
		})
	})
}
let downloader;
const app = {
	namespaced: true,
	state: getDefaultState(),
	mutations: {
		SET_WGT_VERSION: (state, version) => {
			state.wgtVersion = version;
		},
		SET_NEW_VERSION: (state, newVersion) => {
			state.newVersion = newVersion;
		},
		SET_PROGRESS: (state, progress) => {
			state.progress = progress;
		},
		SET_DOWNLOAD_STATE: (state, isDownLoading) => {
			state.isDownLoading = isDownLoading;
		},
	},
	actions: {
		// 检查更新
		async checkUpdate({
			commit,
			dispatch
		}) {
			const widgetInfo = await getProperty();
			commit('SET_WGT_VERSION', widgetInfo.version);
			api.app.getNewVersion({
				appVersion: plus.runtime.version,
				wgtVersion: widgetInfo.version,
			}).then(res => {
				// 有新版本
				if (res.hasNew) {
					commit('SET_NEW_VERSION', res);
					// 提示更新
					if (res.tip) {
						uni.navigateTo({
							url: '/pages/comm/update'
						})
					} else {
						dispatch('doUpdate', {
							url: res.url,
							type: 'wgt'
						});
					}
				}
			})
		},
		// 下载更新
		doUpdate({
			commit,
			state
		}, {
			url,
			type
		}) {
			if (isIos && type === 'apk') {
				return plus.runtime.openURL('http://rs.haoshuninfo.com/app/chejiashu');
			}
			if (state.isDownLoading) return;
			commit('SET_DOWNLOAD_STATE', true);
			downloader = uni.downloadFile({
				url: url,
				success: (result) => {
					if (result.statusCode === 200) {
						console.log('下载成功');
						commit('SET_DOWNLOAD_STATE', false);
						uni.saveFile({
							tempFilePath: result.tempFilePath,
							success: (resu) => {
								plus.runtime.install(resu.savedFilePath, {
									force: true
								}, () => {
									console.log('安装成功');
									console.log(type);
									if (type === 'wgt') {
										uni.showModal({
											title: '安装新版本',
											content: '新版本已经准备好了，是否立即重启？',
											confirmText: '立即重启',
											cancelText: '稍后重启',
											success: (r) => {
												if (r.confirm) {
													plus.runtime
														.restart();
												}
											}
										})
									}
								}, err => {
									console.log('安装失败:' + JSON.stringify(err));
									uni.showModal({
										content: '新版本安装失败，重启应用后重新下载更新',
										confirmText: '立即重启',
										success: (r) => {
											if (r.confirm) {
												plus.runtime.restart();
											}
										}
									})
								})
							}
						})
					} else {
						commit('SET_DOWNLOAD_STATE', false);
						console.log('下载失败：' + result.statusCode);
						uni.showModal({
							content: '新版本下载失败，重启应用后重新下载更新',
							confirmText: '立即重启',
							success: (r) => {
								if (r.confirm) {
									plus.runtime.restart();
								}
							}
						})
					}
				},
				fail: (err) => {
					commit('SET_DOWNLOAD_STATE', false);
					console.log('下载失败:', err);
					uni.showModal({
						content: '新版本下载失败，重启应用后重新下载更新',
						confirmText: '立即重启',
						success: (r) => {
							if (r.confirm) {
								plus.runtime.restart();
							}
						}
					})
				}
			})
			downloader.onProgressUpdate((res) => {
				commit('SET_PROGRESS', res.progress)
			});
		},
		abortDownload({ commit }) {
			downloader && downloader.abort();
			commit('SET_PROGRESS', 0);
			commit('SET_DOWNLOAD_STATE', false);
		}
	}
}

export default app
