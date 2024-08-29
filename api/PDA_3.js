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
		url: URLIP.BASE_URL_DAOHUO + '/api/MaterialApplyFor/Add',
		method: 'post',
		data
	})
}

export function CheckApplyForGetForPage(data) {
	return service({
		url: URLIP.BASE_URL_DAOHUO + '/api/MaterialApplyFor/GetForPage',
		method: 'post',
		data
	})
}

export function CheckApplyForClear(data) {
	return service({
		url: URLIP.BASE_URL_DAOHUO + '/api/MaterialApplyFor/Clear',
		method: 'DELETE',
		data
	})
}
export function CheckApplyForCommit(data) {
	return service({
		url: URLIP.BASE_URL_DAOHUO + '/api/MaterialApplyFor/Commit',
		method: 'post',
		data
	})
}
export function GetMS_StatisticsForPage(data) {
	return service({
		url: URLIP.BASE_URL_DAOHUO + '/api/MaterialApplyFor/GetMS_StatisticsForPage',
		method: 'post',
		data
	})
}
export function ClearMSBycInvCode(data) {
	return service({
		url: URLIP.BASE_URL_DAOHUO + '/api/MaterialApplyFor/ClearMSBycInvCode',
		method: 'DELETE',
		data
	})
}

export function GetMSForPage(data) {
	return service({
		url: URLIP.BASE_URL_DAOHUO + '/api/MaterialApplyFor/GetMSForPage',
		method: 'post',
		data
	})
}
export function ClearMSByUID(data) {
	return service({
		url: URLIP.BASE_URL_DAOHUO + '/api/MaterialApplyFor/ClearMSByUID',
		method: 'DELETE',
		data
	})
}

export function Return_Add(data) {
	return service({
		url: URLIP.BASE_URL_DAOHUO + '/api/RDRecord/Return_Add',
		method: 'post',
		data
	})
}

export function THStatisticsForPage(data) {
	return service({
		url: URLIP.BASE_URL_DAOHUO + '/api/MaterialApplyFor/GetMS_StatisticsForPage',
		method: 'post',
		data
	})
}

export function K_GetForList(data) {
	return service({
		url: URLIP.BASE_URL_LOGO + '/api/WareHouse_Location/GetForList',
		method: 'post',
		data
	})
}


//设备上刀
export function getPutTool(data) {
	return service({
		url: URLIP.BASE_URL_PDEVICE + '/api/device/GetForList',
		method: 'GET',
		data,
	})
}

export function getScanTool(data) {
	return service({
		url: URLIP.BASE_URL_TOOL + '/api/INVETORY_DETAIL/GetForList',
		method: 'GET',
		data,
	})
}
export function SAVEScanTool(data) {
	return service({
		url: URLIP.BASE_URL_TOOL + '/api/TMS_DEVICE_INVTORY/PDA_UP',
		method: 'POST',
		data,
	})
}

export function DownTool(data) {
	return service({
		url: URLIP.BASE_URL_TOOL + '/api/TMS_DEVICE_INVTORY/PDA_DOWN',
		method: 'POST',
		data,
	})
}
//采购单
export function BuyList(data) {
	return service({
		url: URLIP.BASE_URL_TOOL + '/api/PURCHASE_VOUCH_S/GetForPage',
		method: 'POST',
		data,
	})
}

export function BuyListScan(data) {
	return service({
		url: URLIP.BASE_URL_LOGO + '/api/WareHouse_Location/GetForList',
		method: 'POST',
		data,
	})
}

export function BuyListSave(data) {
	return service({
		url: URLIP.BASE_URL_TOOL + '/api/TMS_RECORD/PDA_Save',
		method: 'POST',
		data,
	})
}

export function getBuyList(data) {
	return service({
		url: URLIP.BASE_URL_TOOL + '/api/TMS_RECORD/GetAreadyOut',
		method: 'POST',
		data,
	})
}
// 调拨入库
export function getAllotInList(data) {
	return service({
		url: URLIP.BASE_URL_TOOL + '/api/TMS_TRANSFER_VOUCH/GetPDAListData',
		method: 'POST',
		data,
	})
}

export function getScanIndex(data) {
	return service({
		url: URLIP.BASE_URL_TOOL + '/api/INVETORY_DETAIL/GetSingleWithCheck',
		method: 'get',
		data,
	})
}