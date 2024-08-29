import service from '@/utils/request.js'
import URLIP from '@/utils/serviceIP.js'
//获取物料信息(并添加到已扫描列表)
export function getWLInfo(data) {
  return service({
    url: URLIP.BASE_URL_PDAIN + '/api/Package/GetPBarcodeInfo',
    method: 'GET',
    data
  })
}

//获取已扫描列表
export function getInfoList(data) {
  return service({
    url: URLIP.BASE_URL_PDAIN + '/api/KFScan/GetScanLogList',
    method: 'GET',
    data
  })
}

//提交入库列表（已扫描过的）
export function getScanInfo(data) {
  return service({
    url: URLIP.BASE_URL_PDAIN + '/api/KFScan/ScanIn',
    method: 'POST',
    data
  })
}

//物料列表删除
export function deleteScanInfo(data, type) {
  return service({
    url: URLIP.BASE_URL_PDAIN + '/api/KFScan/DeleteScanLog?ctype=' + type,
    method: 'post',
    data
  })
}
// 出库
export function ScanOut(data) {
  return service({
    url: URLIP.BASE_URL_PDAIN + `/api/Package/ScanSaveOut`,
    method: 'post',
    data,
    config: {
      showToast: false,
      showModal: true
    }
  })
}
// 全部出库
export function PosScanOut(data) {
  return service({
    url: URLIP.BASE_URL_PDAIN + `/api/Package/ScanSaveAllOut`,
    method: 'post',
    data,
    config: {
      showToast: false,
      showModal: true
    }
  })
}
//获取库位上的信息
export function getStationInfo(data) {
  return service({
    url: URLIP.BASE_URL_PDAIN + '/api/Package/GetPositionInfo',
    method: 'post',
    data: data
  })
}
//清空
export function CleartAll(data) {
  return service({
    url:
      URLIP.BASE_URL_PDAIN +
      `/api/KFScan/ClearScanLog?ctype=${data.ctype}&cposcode=${data.cposcode}`,
    method: 'post'
  })
}

//提交入库
export function putRuKU(data) {
  return service({
    url: URLIP.BASE_URL_PDAIN + `/api/Package/ScanSaveIn`,
    method: 'post',
    data
  })
}
// 异常接口
export function errLog(data) {
  return
  return service({
    url: URLIP.BASE_URL_PDAIN + `/api/KFScan/SetAppLog`,
    method: 'post',
    data: data
  })
}
