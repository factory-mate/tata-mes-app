import service from '@/utils/request.js'
import URLIP from '@/utils/serviceIP.js'

const API_PREFIX = URLIP.BASE_URL_DAOHUO + '/api/Stock'

export const API = {
  getList: (cKeyCode) =>
    service({
      url: API_PREFIX + '/GetForList',
      method: 'post',
      data: {
        conditions: `cKeyCode=${cKeyCode}`
      }
    })
}
