import service from '@/utils/request.js'
import URLIP from '@/utils/serviceIP.js'

export const DBOutAPI = {
  // 列表
  getList: (data) =>
    service({
      url: URLIP.BASE_URL_DAOHUO + '/api/RDRecord/GetTransferOut',
      method: 'post',
      data
    }),
  // 扫描箱码
  scanBarCode: (data) =>
    service({
      url: URLIP.BASE_URL_DAOHUO + '/api/Stock/GetForList',
      method: 'post',
      data
    }),
  // 保存出库
  save: (data) =>
    service({
      url: URLIP.BASE_URL_DAOHUO + '/api/Transfer_Vouch/PDA_Save_Out',
      method: 'post',
      data
    }),
  // 已出库
  finishedList: (data) =>
    service({
      url: URLIP.BASE_URL_DAOHUO + '/api/RDRecord/GetMSForPage',
      method: 'post',
      data
    })
}
