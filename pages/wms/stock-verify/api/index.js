import service from '@/utils/request.js'
import URLIP from '@/utils/serviceIP.js'

const API_PREFIX = URLIP.BASE_URL_DAOHUO + '/api/MaterialApplyFor'

export const API = {
  getList: (data) =>
    service({
      url: API_PREFIX + '/GetForPage',
      method: 'post',
      data
    }),
  audit: (data) =>
    service({
      url: API_PREFIX + '/Commit',
      method: 'post',
      data: {
        ...data,
        iStatus: '6'
      }
    }),
  reject: (data) =>
    service({
      url: API_PREFIX + '/Commit',
      method: 'post',
      data: {
        ...data,
        iStatus: '51'
      }
    }),
  getDetail: (data) =>
    service({
      url: API_PREFIX + '/GetItemByMID',
      method: 'get',
      data
    }),
  edit: (data) =>
    service({
      url: API_PREFIX + '/Edit',
      method: 'post',
      data
    })
}
