import service from '@/utils/request.js'
import URLIP from '@/utils/serviceIP.js'
export function Login(data) {
	return service({
		url: URLIP.BASE_URL_LOGO+`/api/Login/LoginIn`,
		method: 'POST',
		data,
	})
}
// export function Login(data) {
// 	return service({
// 		url: URLIP.BASE_URL_LOGO+`/api/Authorize/Login?usercode=${data.usercode}&password=${data.password}&bLocal=${data.bLocal}`,
// 		method: 'POST',
// 	})
// }
export function getMue(data) {
	return service({
		url: URLIP.BASE_URL+`/api/Login/GetMenu?usercode=${data.usercode}&bMobile=${data.bMobile}&b_from_local=${data.b_from_local}`,
		method: 'post',
	})
}
