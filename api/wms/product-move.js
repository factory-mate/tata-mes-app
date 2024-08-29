import service from '@/utils/request.js'
import URLIP from '@/utils/serviceIP.js'

export const ProductMoveAPI = {
  GetPBarcodeInfo: (data) =>
    service({
      url: URLIP.BASE_URL_PDAIN + '/api/Package/GetPBarcodeInfo',
      method: 'GET',
      data
    }),
  Pos_Adjust: (data) =>
    service({
      url: URLIP.BASE_URL_PDAIN + '/api/Package/Pos_Adjust',
      method: 'POST',
      data
    })
}
