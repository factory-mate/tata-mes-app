import service from '@/utils/request.js'
import URLIP from '@/utils/serviceIP.js'

// list
export function Pre_GetForPage_Two(data) {
  return service({
    url: URLIP.BASE_URL_Quantity + '/api/Pre_CheckVouch/GetForPage_Two',
    method: 'post',
    data
  })
}
export function GetForPage_Two(data) {
  return service({
    url: URLIP.BASE_URL_Quantity + '/api/CheckVouch/GetForPage_Two',
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
export function SetRealCheckVouch(data) {
  return service({
    url: URLIP.BASE_URL_Quantity + '/api/Pre_CheckVouch/SetRealCheckVouch',
    method: 'get',
    data
  })
}
export function SaveScanningcPackageCode(data) {
  return service({
    url: URLIP.BASE_URL_Quantity + '/api/CheckVouch/SaveScanningcPackageCode',
    method: 'post',
    data
  })
}
export function SetCheckVouchIsOK(data) {
  return service({
    url: URLIP.BASE_URL_Quantity + '/api/CheckVouch/SetCheckVouchIsOK',
    method: 'post',
    data
  })
}
export function SetnDestoryQuantity(data) {
  return service({
    url: URLIP.BASE_URL_Quantity + '/api/CheckVouch/SetnDestoryQuantity',
    method: 'post',
    data
  })
}

export function ScanningcPackageCode(data) {
  return service({
    url: URLIP.BASE_URL_Quantity + '/api/CheckVouch/ScanningcPackageCode',
    method: 'get',
    data
  })
}
export function GetById(data) {
  return service({
    url: URLIP.BASE_URL_Quantity + '/api/CheckVouch/GetById',
    method: 'get',
    data
  })
}

export function GetForList_Package(data) {
  return service({
    url: URLIP.BASE_URL_Quantity + '/api/CheckVouch/GetForList_Package',
    method: 'get',
    data
  })
}

export function SetPackageIsOk(data) {
  return service({
    url: URLIP.BASE_URL_Quantity + '/api/CheckVouch/SetPackageIsOk',
    method: 'post',
    data
  })
}

export function GetForList_S(data) {
  return service({
    url: URLIP.BASE_URL_Quantity + '/api/CheckVouch/GetForList_S',
    method: 'get',
    data
  })
}
export function SetSnNoPassQuantityTJ(data) {
  return service({
    url: URLIP.BASE_URL_Quantity + '/api/CheckVouch/SetSnNoPassQuantity',
    method: 'post',
    data
  })
}
export function GetBodyXL(data) {
  return service({
    url: URLIP.BASE_URL_Quantity + '/api/Standard/GetBody',
    method: 'get',
    data
  })
}

export function Get_S_ById(data) {
  return service({
    url: URLIP.BASE_URL_Quantity + '/api/CheckVouch/Get_S_ById',
    method: 'get',
    data
  })
}

export function GetForList_S_S(data) {
  return service({
    url: URLIP.BASE_URL_Quantity + '/api/CheckVouch/GetForList_S_S',
    method: 'get',
    data
  })
}
export function Add_S_S(data) {
  return service({
    url: URLIP.BASE_URL_Quantity + '/api/CheckVouch/Add_S_S',
    method: 'post',
    data
  })
}
export function Del_S_S(data) {
  return service({
    url: URLIP.BASE_URL_Quantity + '/api/CheckVouch/Del_S_S',
    method: 'delete',
    data
  })
}
export function SHAdd(data) {
  return service({
    url: URLIP.BASE_URL_Quantity + '/api/CheckVouch_Qualitative/Add',
    method: 'post',
    data
  })
}
export function GetForList_S_ByMID(data) {
  return service({
    url: URLIP.BASE_URL_Quantity + '/api/CheckVouch/GetForList_S_ByMID',
    method: 'get',
    data
  })
}
export function Get_S_ById_V(data) {
  return service({
    url: URLIP.BASE_URL_Quantity + '/api/CheckVouch/Get_S_ById_V',
    method: 'get',
    data
  })
}
export function GetPDA_Laboratory_Standard_Detail(data) {
  return service({
    url: URLIP.BASE_URL_Quantity + '/api/CheckVouch/GetPDA_Laboratory_Standard_Detail',
    method: 'get',
    data
  })
}
export function GetDicType(data) {
  return service({
    url: URLIP.BASE_URL_LOGO + '/api/Dictonary/GetDicType',
    method: 'get',
    data
  })
}
