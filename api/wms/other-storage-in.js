import service from '@/utils/request.js'
import URLIP from '@/utils/serviceIP.js'

export const OtherStorageInAPI = {
  // 获取待入库列表
  GetForPage_OtherIn_PDA: (data) =>
    service({
      url: URLIP.BASE_URL_DAOHUO + '/api/MaterialApplyFor/GetForPage_OtherIn_PDA',
      method: 'post',
      data
    }),
  // 获取待入库物料列表
  GetSByMID_UnAllIn: (data) =>
    service({
      url: URLIP.BASE_URL_DAOHUO + '/api/MaterialApplyFor/GetSByMID_UnAllIn',
      method: 'get',
      data
    }),
  // 扫描箱码
  ScanningBarCode: (data) =>
    service({
      url: URLIP.BASE_URL_DAOHUO + '/api/MaterialApplyFor/ScanningBarCode',
      method: 'get',
      data
    }),
  // 保存入库
  PDA_Save_Other: (data) =>
    service({
      url: URLIP.BASE_URL_DAOHUO + '/api/MaterialApplyFor/PDA_Save_Other',
      method: 'post',
      data
    }),
  // 已入库
  GetRDRECORD_SBySource: (data) =>
    service({
      url: URLIP.BASE_URL_DAOHUO + '/api/MaterialApplyFor/GetRDRECORD_SBySource',
      method: 'get',
      data
    })
}
