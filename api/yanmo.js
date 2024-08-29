import service from '@/utils/request.js'
import URLIP from '@/utils/serviceIP.js'


// 列表
export function GetPDAInOrOutListData(data) {
	return service({
		url: URLIP.BASE_URL_TOOL + '/api/TMS_REPAIR_VOUCH/GetPDAInOrOutListData',
		method: 'post',
		data
	})
}

export function GetSingleWithCheck(data) {
	return service({
		url: URLIP.BASE_URL_TOOL + '/api/TMS_REPAIR_VOUCH/GetSingleWithCheck',
		method: 'get',
		data
	})
}

export function PDA_GrindingStorage(data) {
	return service({
		url: URLIP.BASE_URL_TOOL + '/api/TMS_REPAIR_VOUCH/PDA_GrindingStorage',
		method: 'post',
		data
	})
}
export function GetBodySingle(data) {
	return service({
		url: URLIP.BASE_URL_TOOL + '/api/TMS_REPAIR_VOUCH/GetBodySingle',
		method: 'get',
		data
	})
}
export function GetV_PDA_Repair_In(data) {
	return service({
		url: URLIP.BASE_URL_TOOL + '/api/TMS_REPAIR_VOUCH/GetV_PDA_Repair_In',
		method: 'get',
		data
	})
}
