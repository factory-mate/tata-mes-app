import service from '@/utils/request.js'
import URLIP from '@/utils/serviceIP.js'

const API_PREFIX = URLIP.BASE_URL_PDAIN + '/api/Package'

export const API = {
  list: (data) =>
    service({
      url: API_PREFIX + '/GetGZ_PDAList',
      method: 'post',
      data
    }),
  scan: (cBarCode) =>
    service({
      url: API_PREFIX + '/GetV_GZ_Package_CJ_Scan',
      method: 'get',
      data: {
        cBarCode
      }
    }),
  package: (codes) =>
    service({
      url: API_PREFIX + '/GZ_Package_CJ',
      method: 'post',
      data: {
        list_cBarCode: codes
      }
    }),
  packageDetail: (data) =>
    service({
      url: API_PREFIX + '/GetPositionInfo',
      method: 'post',
      data
    }),
  packageItemDetail: (data) =>
    service({
      url: API_PREFIX + '/GetV_GZ_Package_CJ',
      method: 'post',
      data
    })
}
