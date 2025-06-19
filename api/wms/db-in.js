import service from '@/utils/request.js'
import URLIP from '@/utils/serviceIP.js'

export const DBInAPI = {
  // 获取待入库列表
  getList: (data) =>
    service({
      url: URLIP.BASE_URL_DAOHUO + '/api/Transfer_Vouch/GetForPage_In',
      method: 'post',
      data
    }),
  // 获取待入库物料列表
  getMaterialList: (data) =>
    service({
      url: URLIP.BASE_URL_DAOHUO + '/api/Transfer_Vouch/GetBodyList_In_UnAll',
      method: 'get',
      data
    }),
  // 扫描箱码
  scanBarCode: (data) =>
    service({
      url: URLIP.BASE_URL_DAOHUO + '/api/Transfer_Vouch/ScanningBarCode_In',
      method: 'get',
      data
    }),
  // 保存入库
  save: (data) =>
    service({
      url: URLIP.BASE_URL_DAOHUO + '/api/Transfer_Vouch/PDA_Save_In',
      method: 'post',
      data
    }),
  // 已入库
  finishedList: (data) =>
    service({
      url: URLIP.BASE_URL_DAOHUO + '/api/RDRecord/GetMSForPage',
      method: 'post',
      data
    })
}
