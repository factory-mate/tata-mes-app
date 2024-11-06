import service from '@/utils/request.js'
import URLIP from '@/utils/serviceIP.js'

const API_PREFIX = URLIP.BASE_URL_DAOHUO + '/api/ArriveVouch'

export const API = {
  getList: (data) =>
    service({
      url: API_PREFIX + '/GetPrintLabelAgain',
      method: 'post',
      data
    })
}
