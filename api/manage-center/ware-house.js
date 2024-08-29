import service from '@/utils/request.js'
import URLIP from '@/utils/serviceIP.js'

export const WareHouseAPI = {
  // 扫描仓库
  GetByCode: (data) =>
    service({
      url: URLIP.BASE_URL_LOGO + '/api/WareHouse/GetByCode',
      method: 'get',
      data
    })
}
