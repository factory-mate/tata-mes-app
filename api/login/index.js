import { request }  from '@/utils/request'

// import  request   from '@/utils/request'

// 登录接口
export function getLogin(data) {
	console.log("传参--",data);
	return request({
		url: '/api/Authorize/Login',
		method: 'post',
		data:data
		
	})
}
