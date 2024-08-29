import service from '@/utils/request.js'
import URLIP from '@/utils/serviceIP.js'

export const WareHouseLocationAPI = {
  // 扫描货位
  GetByCode: (data) =>
    service({
      url: URLIP.BASE_URL_LOGO + '/api/WareHouse_Location/GetByCode',
      method: 'get',
      data
    })
}
