import service from '@/utils/request.js'
import URLIP from '@/utils/serviceIP.js'



export function changKuGetForList(data) {
	return service({
		url: URLIP.BASE_URL_LOGO + '/api/WareHouse/GetForList',
		method: 'post',
		data
	})
}
export function PDAGetStockByBarCode(data) {
	return service({
		url: URLIP.BASE_URL_DAOHUO + '/api/CheckApplyFor/PDAGetStockByBarCode',
		method: 'get',
		data
	})
}

export function CheckApplyForAdd(data) {
	return service({
		url: URLIP.BASE_URL_DAOHUO + '/api/CheckApplyFor/Add',
		method: 'post',
		data
	})
}
export function CheckApplyForGetForPage(data) {
	return service({
		url: URLIP.BASE_URL_DAOHUO + '/api/CheckApplyFor/GetForPage',
		method: 'post',
		data
	})
}

export function CheckApplyForClear(data) {
	return service({
		url: URLIP.BASE_URL_DAOHUO + '/api/CheckApplyFor/Clear',
		method: 'DELETE',
		data
	})
}
export function CheckApplyForCommit(data) {
	return service({
		url: URLIP.BASE_URL_DAOHUO + '/api/CheckApplyFor/PDACommit',
		method: 'post',
		data
	})
}

export function GetMS_StatisticsForPage(data) {
	return service({
		url: URLIP.BASE_URL_DAOHUO + '/api/CheckApplyFor/GetMS_StatisticsForPage',
		method: 'post',
		data
	})
}
export function ClearMSBycInvCode(data) {
	return service({
		url: URLIP.BASE_URL_DAOHUO + '/api/CheckApplyFor/ClearMSBycInvCode',
		method: 'DELETE',
		data
	})
}

export function GetMSForPage(data) {
	return service({
		url: URLIP.BASE_URL_DAOHUO + '/api/CheckApplyFor/GetMSForPage',
		method: 'post',
		data
	})
}
export function ClearMSByUID(data) {
	return service({
		url: URLIP.BASE_URL_DAOHUO + '/api/CheckApplyFor/ClearMSByUID',
		method: 'DELETE',
		data
	})
}