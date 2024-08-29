import service from '@/utils/request.js'
import URLIP from '@/utils/serviceIP.js'

//
export function GetSingle_Position(data) {
  return service({
    url: URLIP.BASE_URL_LOGO + '/api/Factory_Position/GetSingle_Position_ResourceBycPositionCode',
    method: 'get',
    data
  })
}
export function GetSingleByCode_V(data) {
  return service({
    url: URLIP.BASE_URL_LOGO + '/api/Inentory_info/GetSingleByCode_V',
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
export function Add_FirstAndLastPiece(data) {
  return service({
    url: URLIP.BASE_URL_Quantity + '/api/Pre_CheckVouch/Add_FirstAndLastPiece',
    method: 'post',
    data
  })
}
