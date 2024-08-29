import service from '@/utils/request.js'
import URLIP from '@/utils/serviceIP.js'

//
export function GetForList(data) {
  return service({
    url: URLIP.BASE_URL_LOGO + '/api/Factory_Work/GetForList',
    method: 'get',
    data
  })
}
export function GetLineByWork(data) {
  return service({
    url: URLIP.BASE_URL_LOGO + '/api/MES_Factorymodel/GetLineByWork',
    method: 'get',
    data
  })
}
export function GetPositionByLine(data) {
  return service({
    url: URLIP.BASE_URL_LOGO + '/api/Factory_Position/GetPositionByLine2',
    method: 'get',
    data
  })
}

export function ResourceBycPositionCode(data) {
  return service({
    url: URLIP.BASE_URL_LOGO + '/api/Factory_Position/GetSingle_Position_ResourceBycPositionCode_2',
    method: 'get',
    data
  })
}
export function GetProgramByPosition(data) {
  return service({
    url: URLIP.BASE_URL_Quantity + '/api/Project_Config_Resource/GetProgramByPosition',
    method: 'get',
    data
  })
}
export function GetForList5(data) {
  return service({
    url: URLIP.BASE_URL_Quantity + '/api/CheckVouch/GetForList',
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
export function Add_QualityInspection(data) {
  return service({
    url: URLIP.BASE_URL_Quantity + '/api/CheckVouch/Add_QualityInspection',
    method: 'post',
    data
  })
}
export function Factory_Line(data) {
  return service({
    url: URLIP.BASE_URL_LOGO + '/api/Factory_Line/GetForList',
    method: 'get',
    data
  })
}
export function FactoryGetPositionByLine(data) {
  return service({
    url: URLIP.BASE_URL_LOGO + '/api/Factory_Position/GetPositionByLine',
    method: 'get',
    data
  })
}
export function GetProgramByPositionAA(data) {
  return service({
    url: URLIP.BASE_URL_Quantity + '/api/Project_Config_Resource/GetProgramByPosition',
    method: 'get',
    data
  })
}
export function GetForList_S_V(data) {
  return service({
    url: URLIP.BASE_URL_Quantity + '/api/CheckVouch/GetForList_S_V',
    method: 'post',
    data
  })
}
