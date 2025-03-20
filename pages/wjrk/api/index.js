import service from '@/utils/request.js'
import URLIP from '@/utils/serviceIP.js'

const API_PREFIX = URLIP.BASE_URL_PDAIN + '/api/Package'

export const API = {
  scan: (WJPBarcode) =>
    service({
      url: API_PREFIX + '/GetV_GZ_Package_KFWJ_Scan',
      method: 'get',
      data: {
        WJPBarcode
      }
    }),
  package: (data) =>
    service({
      url: API_PREFIX + '/GZ_Package_KFWJ',
      method: 'post',
      data
    }),
  getPBarcodeInfo: (pbarcode) =>
    service({
      url: API_PREFIX + '/GetPBarcodeInfo',
      method: 'get',
      data: {
        pbarcode
      }
    }),
  bigPackage: (data) =>
    service({
      url: API_PREFIX + '/GZ_Package_KFWJ_Big',
      method: 'post',
      data
    }),
  getPrintData: (data) =>
    service({
      url: API_PREFIX + '/GZ_Package_KFWJ_GetBigPrintData',
      method: 'get',
      data
    })
}
