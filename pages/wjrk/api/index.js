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
  package: (codes) =>
    service({
      url: API_PREFIX + '/GZ_Package_KFWJ',
      method: 'post',
      data: {
        WJPBarcode: codes
      }
    })
}
