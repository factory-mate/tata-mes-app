import axios from 'axios'
//导入pinia

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// create an axios instance
const service = axios.create({
	baseURL: "http://117.158.105.83:5727", // 本地开发环境地址
	withCredentials: false, // send cookies when cross-domain requests
	timeout: 10000 // request timeout
})


service.interceptors.request.use(
	config => {
		//拿到Token
		// const token = getToken()
		// // do something before request is sent
		// if (token) {
		// 		config.headers.Authorization = `Bearer ${token}`
		// 	}
		return config
	},
	error => {
		// do something with request error
		console.log("22--", error) // for debug
		return Promise.reject(error)
	}
)
// response interceptor
service.interceptors.response.use(({
		config,
		data
	}) => {
		console.log("333", data);
		return data
	},
	error => {
		console.log("4444", error);
		// const {
		// 	code,
		// 	msg
		// } = error.response.data

		// if (code === 'A0230') { // token过期
		// 	uni.showToast({
		// 		title: '会话已过期，请重新登录',
		// 		success() {
		// 			uni.navigateTo({
		// 				url: `/pages/login/login`,
		// 			});
		// 		}
		// 	})
		// } else {
		// 	uni.showToast({
		// 		title: msg,
		// 		icon: 'none'
		// 	});
		// 	return Promise.reject(new Error(msg || 'Errors'))
		// }
	}
)

service.defaults.adapter = function(config) {
	 return new Promise((resolve, reject) => {
			var settle = require('axios/lib/core/settle');
			console.log(settle,"0099");
			var buildURL = require('axios/lib/helpers/buildURL');
			var buildFullPath = require('axios/lib/core/buildFullPath');
			let fullurl = buildFullPath(config.baseURL,config.url)
			uni.request({
				method: config.method.toUpperCase(),
				url: buildURL(fullurl, config.params, config.paramsSerializer),
				header: config.headers,
				data: config.data,
				dataType: config.dataType,
				responseType: config.responseType,
				sslVerify: config.sslVerify,
				complete:function complete(response){
					response = {
					  data: response.data,
					  status: response.statusCode,
					  errMsg: response.errMsg,
					  header: response.header,
					  config: config
					};
					
				settle(resolve, reject, response);
				}
			})
	    })
}

// service.defaults.adapter = function(config) {
//   return new Promise((resolve, reject) => {
//       console.log(config)
//       var settle = require('axios/lib/core/settle');
//       var buildURL = require('axios/lib/helpers/buildURL');
//       uni.request({
//           method: config.method.toUpperCase(),
//           url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
//           header: config.headers,
//           data: config.data,
//           dataType: config.dataType,
//           responseType: config.responseType,
//           sslVerify: config.sslVerify,
//           complete: function complete(response) {
//               response = {
//                   data: response.data,
//                   status: response.statusCode,
//                   errMsg: response.errMsg,
//                   header: response.header,
//                   config: config
//               };

//               settle(resolve, reject, response);
//           }
//       })
//   })
// }

export default service
