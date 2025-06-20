import service from '@/utils/request.js'
import URLIP from '@/utils/serviceIP.js'

const API_PREFIX = URLIP.BASE_URL_DAOHUO + '/api/STOCK_TAKE'
const DICT_API_PREFIX = URLIP.BASE_URL_LOGO + '/api/Dictonary'
const WAREHOUSE_API_PREFIX = URLIP.BASE_URL_LOGO + '/api/WareHouse_Location'

export const API = {
  getList: (data) =>
    service({
      url: API_PREFIX + '/GetSTOCK_TAKE_PDA',
      method: 'post',
      data
    }),
  save: (data) =>
    service({
      url: API_PREFIX + '/PDASave',
      method: 'post',
      data
    }),
  getByBarcode: (data) =>
    service({
      url: API_PREFIX + '/GetByBarcode',
      method: 'get',
      data
    }),
  finish: (data) =>
    service({
      url: API_PREFIX + '/End',
      method: 'post',
      data
    }),
  begin: (data) =>
    service({
      url: API_PREFIX + '/Begin',
      method: 'post',
      data
    }),
  fetchType: () =>
    service({
      url: DICT_API_PREFIX + '/GetDicType',
      method: 'get',
      data: {
        cTableCode: 'FM_WMS_STOCK_TAKE',
        cAttributeCode: 'cTakeTypeCode'
      }
    }),
  scanWareHouseLocation: (data) =>
    service({
      url: WAREHOUSE_API_PREFIX + '/GetForPage',
      method: 'post',
      data
    })
}
