import service from '@/utils/request.js'
import URLIP from '@/utils/serviceIP.js'


// list
export function GetForPage_CheckVouch(data) {
	return service({
		url: URLIP.BASE_URL_Quantity + '/api/CheckVouch_Qualitative/GetForPage_CheckVouch',
		method: 'post',
		data
	})
}
export function Close(data) {
	return service({
		url: URLIP.BASE_URL_Quantity + '/api/CheckVouch_Qualitative/Close',
		method: 'post',
		data
	})
}
export function GetForList(data) {
	return service({
		url: URLIP.BASE_URL_Quantity + '/api/NoPassClear/GetForList',
		method: 'get',
		data
	})
}
export function GetById_CheckVouch(data) {
	return service({
		url: URLIP.BASE_URL_Quantity + '/api/CheckVouch_Qualitative/GetById_CheckVouch',
		method: 'get',
		data
	})
}
export function GetById_CheckVouch_Package(data) {
	return service({
		url: URLIP.BASE_URL_Quantity + '/api/CheckVouch_Qualitative/GetById_CheckVouch_Package',
		method: 'get',
		data
	})
}
export function Submit(data) {
	return service({
		url: URLIP.BASE_URL_Quantity + '/api/CheckVouch_Qualitative/Submit',
		method: 'post',
		data
	})
}
export function GetForPage_CheckVouch_Package(data) {
	return service({
		url: URLIP.BASE_URL_Quantity + '/api/CheckVouch_Qualitative/GetForPage_CheckVouch_Package',
		method: 'post',
		data
	})
}
