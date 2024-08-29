import service from '@/utils/request.js'
import URLIP from '@/utils/serviceIP.js'

// 列表
export function GetForPage_PDA_Out(data) {
  return service({
    url: URLIP.BASE_URL_TOOL + '/api/TMS_DESTROY_VOUCH/GetForPage_PDA_Out',
    method: 'post',
    data
  })
}
export function CheckInvStatus(data) {
  return service({
    url: URLIP.BASE_URL_TOOL + '/api/TMS_DESTROY_VOUCH/CheckInvStatus',
    method: 'get',
    data
  })
}

export function PDA_DESTROY_OUT(data) {
  return service({
    url: URLIP.BASE_URL_TOOL + '/api/TMS_DESTROY_VOUCH/PDA_DESTROY_OUT',
    method: 'post',
    data
  })
}
export function GetBodySingle(data) {
  return service({
    url: URLIP.BASE_URL_TOOL + '/api/TMS_DESTROY_VOUCH/GetBodySingle',
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

export function GetPDAListData(data) {
  return service({
    url: URLIP.BASE_URL_TOOL + '/api/TMS_TRANSFER_VOUCH/GetPDAListData',
    method: 'post',
    data
  })
}
export function GetOutInfo(data) {
  return service({
    url: URLIP.BASE_URL_TOOL + '/api/TMS_STOCK/GetOutInfo',
    method: 'post',
    data
  })
}

export function PDA_Save(data) {
  return service({
    url: URLIP.BASE_URL_TOOL + '/api/TMS_RECORD/PDA_Save',
    method: 'post',
    data
  })
}
export function GetAreadyOut(data) {
  return service({
    url: URLIP.BASE_URL_TOOL + '/api/TMS_RECORD/GetAreadyOut',
    method: 'post',
    data
  })
}
