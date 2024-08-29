import service from '@/utils/request.js'
import URLIP from '@/utils/serviceIP.js'


// 
export function GetInvInfoByBarCode(data) {
	return service({
		url: URLIP.BASE_URL_DAOHUO + '/api/RDRecord/GetInvInfoByBarCode_2',
		method: 'get',
		data
	})
}
export function GetStandardByInvCode(data) {
	return service({
		url: URLIP.BASE_URL_Quantity + '/api/Project_Config_Resource/GetStandardByInvCode',
		method: 'get',
		data
	})
}
export function Add_Laboratory(data) {
	return service({
		url: URLIP.BASE_URL_Quantity + '/api/Pre_CheckVouch/Add_Laboratory',
		method: 'post',
		data
	})
}
export function GetForList_UnBind(data) {
	return service({
		url: URLIP.BASE_URL_Quantity + '/api/Project/GetForList_UnBind',
		method: 'get',
		data
	})
}
export function GetBody(data) {
	return service({
		url: URLIP.BASE_URL_Quantity + '/api/Project/GetBody',
		method: 'get',
		data
	})
}


