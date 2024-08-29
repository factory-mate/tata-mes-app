import service from '@/utils/request.js'

//质量异常数据
export  function questionData () {
	return service({
		url:'/api/RepairVouch/GetRepairData',
		method:'get',
	})
}
//返工原因
export  function getReason (data) {
	return service({
		url:'/api/Reason/GetReason',
		method:'get',
		data
	})
}
//审核人
export  function getUser (data) {
	return service({
		url:'/api/Users/GetUsers',
		method:'get',
		data
	})
}
