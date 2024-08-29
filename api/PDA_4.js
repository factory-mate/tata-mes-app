import service from '@/utils/request.js'
import URLIP from '@/utils/serviceIP.js'



export function GetForPage(data) {
	return service({
		url: URLIP.BASE_URL_DAOHUO + '/api/Stock/GetForPage',
		method: 'post',
		data
	})
}

export function GetSingleBycBarCode(data) {
	return service({
		url: URLIP.BASE_URL_DAOHUO + '/api/Stock/GetSingleBycBarCode?cKeyCode='+data.cKeyCode,
		method: 'post',
		data
	})
}


export function UnpackingBar(data) {
	return service({
		url: URLIP.BASE_URL_DAOHUO + '/api/Stock/UnpackingBar',
		method: 'post',
		data
	})
}

export function CheckMoveBar(data) {
	return service({
		url: URLIP.BASE_URL_DAOHUO + '/api/Stock/CheckMoveBar',
		method: 'post',
		data
	})
}

export function MoveBar(data) {
	return service({
		url: URLIP.BASE_URL_DAOHUO + '/api/Stock/MoveBar',
		method: 'post',
		data
	})
}

