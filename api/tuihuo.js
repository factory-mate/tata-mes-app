import service from '@/utils/request.js'
import URLIP from '@/utils/serviceIP.js'


// 仓库
export function changKuGetForList(data) {
	return service({
		url: URLIP.BASE_URL_LOGO + '/api/WareHouse/GetForList',
		method: 'post',
		data
	})
}
// 箱码
export function PDAGetStockByBarCode(data) {
	return service({
		url: URLIP.BASE_URL_DAOHUO + '/api/Stock/GetSingle',
		method: 'post',
		data
	})
}
// 提交保存
export function CheckApplyForAdd(data) {
	return service({
		url: URLIP.BASE_URL_DAOHUO + '/api/CheckBackApplyFor/Add',
		method: 'post',
		data
	})
}
// 单据
export function CheckApplyForGetForPage(data) {
	return service({
		url: URLIP.BASE_URL_DAOHUO + '/api/CheckBackApplyFor/GetForPage',
		method: 'post',
		data
	})
}
// 删除1
export function CheckApplyForClear(data) {
	return service({
		url: URLIP.BASE_URL_DAOHUO + '/api/CheckBackApplyFor/Del',
		method: 'DELETE',
		data
	})
}
// 提交
export function CheckApplyForCommit(data) {
	return service({
		url: URLIP.BASE_URL_DAOHUO + '/api/CheckBackApplyFor/Submit',
		method: 'post',
		data
	})
}
// 物料详情
export function GetMS_StatisticsForPage(data) {
	return service({
		url: URLIP.BASE_URL_DAOHUO + '/api/CheckBackApplyFor/GetForListInvBatchByUID',
		method: 'get',
		data
	})
}
// 物料删除
export function ClearMSBycInvCode(data) {
	return service({
		url: URLIP.BASE_URL_DAOHUO + '/api/CheckBackApplyFor/DelSInvBatchByUID?cBatch='+data.cBatch+'&cInvCode='+data.cInvCode+'&uid='+data.uid,
		method: 'DELETE',
		// data
	})
}
// 箱码
export function GetMSForPage(data) {
	return service({
		url: URLIP.BASE_URL_DAOHUO + '/api/CheckBackApplyFor/GetForListByUIDInvBatch',
		method: 'get',
		data
	})
}
// 删除
export function ClearMSByUID(data) {
	return service({
		url: URLIP.BASE_URL_DAOHUO + '/api/CheckBackApplyFor/DelSByUID?UID='+data.uid,
		method: 'DELETE',
		// data
	})
}