import service from '@/utils/request.js'
import URLIP from '@/utils/serviceIP.js'

export function GetCheckPeo(data) {
  return service({
    url: URLIP.BASE_URL_LOGO + '/api/Employee/GetForList',
    method: 'get',
    data
  })
}
export function GetGropList(data) {
  return service({
    url: URLIP.BASE_URL_LOGO + '/api/MES_Factorymodel/GetForList',
    method: 'get',
    data
  })
}
export function ScanPack(data) {
  return service({
    url: URLIP.BASE_URL_PDAIN + '/api/Package/GetPBarcodeInfo',
    method: 'get',
    data
  })
}

export function PackPut(data) {
  return service({
    url: URLIP.BASE_URL_Quantity + '/api/Pre_CheckVouch/Add',
    method: 'POST',
    data
  })
}

export function GetDanData(data) {
  return service({
    url: URLIP.BASE_URL_PDAIN + '/api/PRODUCTVOUCH/GetCJOrder',
    method: 'POST',
    data
  })
}

export function GetAICheckID(data) {
  return service({
    url: URLIP.BASE_URL_PDAIN + '/api/PRODUCTVOUCH/GetRCCJOrder',
    method: 'POST',
    data
  })
}

export function GetProudctClassify(data) {
  return service({
    url: URLIP.BASE_URL_LOGO + '/api/Dictonary/GetDicType',
    method: 'get',
    data
  })
}

export function DelDan(data) {
  return service({
    url: URLIP.BASE_URL_Quantity + '/api/Pre_CheckVouch/Delete',
    method: 'get',
    data
  })
}
export function GetToal(data) {
  return service({
    url: URLIP.BASE_URL_Quantity + '/api/Pre_CheckVouch/GetTotal',
    method: 'post',
    data
  })
}

export function GetSeachPage(data) {
  return service({
    url: URLIP.BASE_URL_Quantity + '/api/Pre_CheckVouch/GetForPage',
    method: 'post',
    data
  })
}

export function CommitPost(data) {
  return service({
    url: URLIP.BASE_URL_Quantity + '/api/Pre_CheckVouch/Commit',
    method: 'post',
    data
  })
}

export function Close(data) {
  return service({
    url: URLIP.BASE_URL_Quantity + '/api/Pre_CheckVouch/Close',
    method: 'get',
    data
  })
}

export function GetCheck(data) {
  return service({
    url: URLIP.BASE_URL_Quantity + '/api/CheckVouch/Add',
    method: 'post',
    data
  })
}

export function GetCheckedList(data) {
  return service({
    url: URLIP.BASE_URL_Quantity + '/api/CheckVouch/GetForPage_Two',
    method: 'post',
    data
  })
}

export function GetTarget(data) {
  return service({
    url: URLIP.BASE_URL_Quantity + '/api/CheckVouch/GetForList_S_ByMID',
    method: 'get',
    data
  })
}

export function Commit(data) {
  return service({
    url: URLIP.BASE_URL_Quantity + '/api/CheckVouch/Commit',
    method: 'post',
    data
  })
}

export function Stand(data) {
  return service({
    url: URLIP.BASE_URL_Quantity + '/api/Standard/GetBody',
    method: 'get',
    data
  })
}

export function GetListBYMID(data) {
  return service({
    url: URLIP.BASE_URL_Quantity + '/api/CheckVouch/GetForList_S_ByMID',
    method: 'get',
    data
  })
}

export function GetListBYMIDSS(data) {
  return service({
    url: URLIP.BASE_URL_Quantity + '/api/CheckVouch/GetForList_S_S',
    method: 'get',
    data
  })
}

export function GetProductScan(data) {
  return service({
    url: URLIP.BASE_URL_Quantity + '/api/CheckVouch/ProductCommitOK',
    method: 'post',
    data
  })
}

export function GetBadProductScan(data) {
  return service({
    url: URLIP.BASE_URL_Quantity + '/api/CheckVouch/ProductGetData',
    method: 'post',
    data
  })
}
export function GetStationScan(data) {
  return service({
    url: URLIP.BASE_URL_LOGO + '/api/Factory_Position/GetForList',
    method: 'get',
    data
  })
}

export function ProductPut(data) {
  return service({
    url: URLIP.BASE_URL_Quantity + '/api/CheckVouch/ProductCommitBAD',
    method: 'post',
    data
  })
}
export function getCheckEdList(data) {
  return service({
    url: URLIP.BASE_URL_Quantity + '/api/CheckVouch/GetForPage_Total',
    method: 'post',
    data
  })
}

export function getTarget(data) {
  return service({
    url: URLIP.BASE_URL_Quantity + '/api/CheckVouch/GetForList_S_ByMID',
    method: 'GET',
    data
  })
}
