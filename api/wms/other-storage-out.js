import service from '@/utils/request.js'
import URLIP from '@/utils/serviceIP.js'

export const OtherStorageOutAPI = {
  // 获取待出库列表
  GetForPage_OtherOut_PDA: (data) =>
    service({
      url: URLIP.BASE_URL_DAOHUO + '/api/MaterialApplyFor/GetForPage_OtherOut_PDA',
      method: 'post',
      data
    }),
  // 获取待出库物料列表
  GetSByMID_UnAllOut: (data) =>
    service({
      url: URLIP.BASE_URL_DAOHUO + '/api/MaterialApplyFor/GetSByMID_UnAllOut',
      method: 'get',
      data
    }),
  // 扫描箱码
  ScanningBarCode_Out: (data) =>
    service({
      url: URLIP.BASE_URL_DAOHUO + '/api/MaterialApplyFor/ScanningBarCode_Out',
      method: 'get',
      data
    }),
  // 保存出库
  PDA_Save_Other: (data) =>
    service({
      url: URLIP.BASE_URL_DAOHUO + '/api/MaterialApplyFor/PDA_Save_Other',
      method: 'post',
      data
    }),
  // 已出库
  GetRDRECORD_SBySource: (data) =>
    service({
      url: URLIP.BASE_URL_DAOHUO + '/api/MaterialApplyFor/GetRDRECORD_SBySource',
      method: 'get',
      data
    })
}
