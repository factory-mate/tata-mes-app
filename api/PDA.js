import service from '@/utils/request.js'
import URLIP from '@/utils/serviceIP.js'
//待到货确认PDA列表
export function awaitPDAList(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/ArriveVouch/PDAGetConfirmList',
    method: 'POST',
    data
  })
}

//到货确认PDA列表(详情)
export function confirmPDADetialList(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/ArriveVouch/PDAGetConfirmItemsList',
    method: 'GET',
    data
  })
}
//到货确认
export function confirmPDAList(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/ArriveVouch/PDAConfirmItems',
    method: 'POST',
    data
  })
}
//当天已确认列表
export function confirmDayList(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/ArriveVouch/PDAGetConfirmItemsByUser',
    method: 'POST',
    data
  })
}
//搜索物料
export function getWLInfo(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/ArriveVouch/PDAGetConfirmItemsList',
    method: 'GET',
    data
  })
}

//PDA到货
//提交
export function PDACommit(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/RDRecord/PDACommit',
    method: 'POST',
    data
  })
}
//上架列表
export function PDAGetListToUpFrame(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/RDRecord/PDAGetListToUpFrame',
    method: 'POST',
    data
  })
}
//搜索到货单号
export function PDAGetConfirmList(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/ArriveVouch/PDAGetConfirmList',
    method: 'POST',
    data
  })
}
//详情
export function PDAGetListToUpFrameDetail(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/RDRecord/PDAGetListToUpFrameDetail',
    method: 'GET',
    data
  })
}

//检查货位
export function CheckWareHouseLocationCode(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/RDRecord/CheckWareHouseLocationCode',
    method: 'GET',
    data
  })
}

//上架
export function PDAGetListUpFrameByUser(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/RDRecord/PDAGetListUpFrameByUser',
    method: 'POST',
    data
  })
}
//箱码验证
export function CheckBarCodeToUpFrame(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/RDRecord/CheckBarCodeToUpFrame',
    method: 'GET',
    data
  })
}

//PDA领料通知

// 获取仓库
// /api/WareHouse/GetForList?Conditions=cWareHouseCode = 009 &&cWareHouseTypeCode = 2
export function GetWare(data) {
  return service({
    url: URLIP.BASE_URL_LOGO + '/api/WareHouse/GetForList',
    method: 'POST',
    data
  })
}
//仓库
// /api/MaterialApplyFor/GetDeptNameByCode?code=005002
export function GetCK(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/MaterialApplyFor/GetDeptNameByCode',
    method: 'GET',
    data
  })
}
//物料
// api/MaterialApplyFor/GetInvNameByCode?code=M0000002580
export function GetWL(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/MaterialApplyFor/GetInvNameByCode',
    method: 'GET',
    data
  })
}
//保存
export function MaterialApplyForSave(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/MaterialApplyFor/Add',
    method: 'POST',
    data
  })
}
//提交
export function MaterialApplyForCommit(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/MaterialApplyFor/Commit',
    method: 'POST',
    data
  })
}
//单据
export function MaterialApplyForList(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/MaterialApplyFor/GetForPage',
    method: 'POST',
    data
  })
}
//删除单据
export function DELMaterial(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/MaterialApplyFor/Clear',
    method: 'DELETE',
    data
  })
}
//物料详情
export function MaterialApplyFor(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/MaterialApplyFor/GetSonByMId',
    method: 'GET',
    data
  })
}
//删除物料
export function DELWL(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/MaterialApplyFor/ClearSonById',
    method: 'DELETE',
    data
  })
}

//PDA领料出库
//出库列表
export function MaterialOutList(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/MaterialApplyFor/PDAGetForPage',
    method: 'POST',
    data
  })
}

//领料通知单详情
export function MaterialDetail(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/MaterialApplyFor/PDAGetItemByMId',
    method: 'GET',
    data
  })
}

//上架库位
export function MaterialPut(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/MaterialApplyFor/PDAGetBarCodeInfoByBarCode',
    method: 'POST',
    data
  })
}

export function MaterialPutDown(cKeyCode) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/Stock/GetForList',
    method: 'POST',
    data: {
      Conditions: 'cKeyCode=' + cKeyCode
    }
  })
}

//下架保存
export function PDACommitOut(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/MaterialApplyFor/PDACommitOut',
    method: 'POST',
    data
  })
}
//出库列表
export function OutList(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/MaterialApplyFor/PDAGetOutRDRecord',
    method: 'POST',
    data
  })
}

//线边仓收料
//线边仓扫描箱码返回信息
export function RDRecord(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/RDRecord/GetInvInfoByBarCode',
    method: 'get',
    data
  })
}
//保存
export function LineWareHouseCommit(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/RDRecord/PDALineWareHouseCommit',
    method: 'POST',
    data
  })
}
//单据列表
export function PDAGetRDRecordList(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/RDRecord/PDAGetRDRecordList',
    method: 'POST',
    data
  })
}
//单据详情
export function PDARecordDetailList(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/RDRecord/PDAGetRDRecordMSList',
    method: 'POST',
    data
  })
}
//箱码详情
export function PDAXMList(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/RDRecord/PDAGetShelfRDRecordList',
    method: 'POST',
    data
  })
}

//发起异常
// 获取异常信息
export function GetTaskList(data) {
  return service({
    url: URLIP.BASE_URL_PDAIN + '/api/V_Task/GetForList',
    method: 'get',
    data
  })
}
export function GetFactoryModelList(data) {
  return service({
    url: URLIP.BASE_URL_PDAIN + '/api/MES_Factorymodel/GetForList',
    method: 'get',
    data
  })
}
//保存接口
export function SaveReportError(data) {
  return service({
    url: URLIP.BASE_URL_PDAIN + '/api/REPAIR_VOUCH/ReportError',
    method: 'POST',
    data
  })
}

export function RepairVouchList(data) {
  return service({
    url: URLIP.BASE_URL_PDAIN + '/api/REPAIR_VOUCH/GetForPage',
    method: 'POST',
    data
  })
}

//内返PDA

//获取异常列表
export function ErrorList(data) {
  return service({
    url: URLIP.BASE_URL_PDAIN + '/api/REPAIR_VOUCH/GetErrorForPage',
    method: 'POST',
    data
  })
}
//异常列表关闭
export function ErrorListClose(data) {
  return service({
    url: URLIP.BASE_URL_PDAIN + '/api/REPAIR_VOUCH/Close',
    method: 'POST',
    data
  })
}
//异常获取照片列表
export function GetPicList(data) {
  return service({
    url: URLIP.BASE_URL_PDAIN + '/api/REPAIR_VOUCH/GetBindedFileByTaskSSSUID',
    method: 'get',
    data
  })
}
//获取原因
export function GetReason(data) {
  return service({
    url: URLIP.BASE_URL_LOGO + '/api/MES_REASONCLASS/GetTree',
    method: 'get',
    data
  })
}
//类型
export function GetClassify(data) {
  return service({
    url: URLIP.BASE_URL_LOGO + '/api/Dictonary/GetForList',
    method: 'get',
    data
  })
}
//内返获取工艺路线
export function GetRoute(data) {
  return service({
    url: URLIP.BASE_URL_PDAIN + '/api/REPAIR_VOUCH/GetRoute',
    method: 'get',
    data
  })
}
//内返编辑保存
export function GetRouteSave(data) {
  return service({
    url: URLIP.BASE_URL_PDAIN + '/api/REPAIR_VOUCH/Save',
    method: 'POST',
    data
  })
}
//产线
export function GetProductLine(data) {
  return service({
    url: URLIP.BASE_URL_LOGO + '/api/Product_Craftroute/GetList',
    method: 'POST',
    data
  })
}

//产品入库通知
//验证箱码
export function ProductBarCode(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/ArriveVouch/PDAGetProductBarCode',
    method: 'get',
    data
  })
}
//提交保存8888
export function PostSave(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/MaterialAppLyFor/Add',
    method: 'POST',
    data
  })
}

//产品入库
//产品入库列表10500
export function ProudctInWareList(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/MaterialApplyFor/PDAGetInForPage',
    method: 'POST',
    data
  })
}
//待上架产品详情
export function GetProductDetail(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/MaterialApplyFor/PDAGetItemCountByMId',
    method: 'get',
    data
  })
}
//上架（货位）
export function PutProductInware(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/RDRecord/CheckWareHouseLocationCode',
    method: 'get',
    data
  })
}

//箱码验证
// export  function BarCodeCheck(data) {
// 	return service({
// 		url:URLIP.BASE_URL_DAOHUO+'/api/RDRecord/CheckBarCodeToUpFrame',
// 		method:'get',
// 		data,
// 	})
// }
//保存
export function ProudcPutSave(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/MaterialApplyFor/PDACommitInWareHouse',
    method: 'POST',
    data
  })
}
//成品已入库列表
export function ProudctList(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/MaterialApplyFor/PDAGetFinishedProductInventorys',
    method: 'POST',
    data
  })
}
//销售出库
//销售出库列表
export function ProductOutList(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/MaterialApplyFor/PDAGetOutForPage',
    method: 'POST',
    data
  })
}
//销售出库详情
export function ProudctOutDetail(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/MaterialApplyFor/PDAGetItemByMId',
    method: 'get',
    data
  })
}

//销售出库下架保存
export function ProudcOutSave(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/MaterialApplyFor/PDACommitOut',
    method: 'POST',
    data
  })
}

//产品已下架列表
export function ProudctOutList(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/MaterialApplyFor/PDAGetFinishedProductInventorys',
    method: 'POST',
    data
  })
}

//设备点检
// 设备点检列表

// http://117.158.105.83:10700/api/device_tourvouch/GetForListByUser
export function DeviceList(data) {
  return service({
    url: URLIP.BASE_URL_PDEVICE + '/api/device_tourvouch/GetForListByUser',
    method: 'POST',
    data
  })
}

export function DeviceVouchFileGetForList(data) {
  return service({
    url: URLIP.BASE_URL_PDEVICE + '/api/device_vouch_file/GetForList',
    method: 'get',
    data
  })
}

export function DeviceVouchFileGetById(data) {
  return service({
    url: URLIP.BASE_URL_PDEVICE + '/api/device_vouch_file/GetById',
    method: 'get',
    data
  })
}

export function DeviceRepairVouchGetById(data) {
  return service({
    url: URLIP.BASE_URL_PDEVICE + '/api/device_RepairVouch/GetById',
    method: 'get',
    data
  })
}

//点检数据
export function DeviceListInfoItem(data) {
  return service({
    url: URLIP.BASE_URL_PDEVICE + '/api/device_tourvouch/GetBodys',
    method: 'get',
    data
  })
}

export function DeviceTourvouchGetById(data) {
  return service({
    url: URLIP.BASE_URL_PDEVICE + '/api/device_tourvouch/GetById',
    method: 'get',
    data
  })
}
//上传图片
export function PostPic(data) {
  return service({
    url: URLIP.BASE_URL_PDEVICE + '/api/device_tourvouch/Vouch_S_FileAdd',
    method: 'POST',
    data
  })
}
//指标
export function GetTarget(data) {
  return service({
    url: URLIP.BASE_URL_PDEVICE + '/api/device_tourvouch/GetStandBodys',
    method: 'get',
    data
  })
}
//指标保存
export function TargetSave(data) {
  return service({
    url: URLIP.BASE_URL_PDEVICE + '/api/device_tourvouch/Vouch_S_S_Save',
    method: 'POST',
    data
  })
}

//单据文档
export function GetFile(data) {
  return service({
    url: URLIP.BASE_URL_PDEVICE + '/api/device_pro_file/GetForList',
    method: 'get',
    data
  })
}
//设备文档
export function GetDevFile(data) {
  return service({
    url: URLIP.BASE_URL_PDEVICE + '/api/device_dev_file/GetForList',
    method: 'get',
    data
  })
}
//返修--获取故障列表
export function GetFaultList(data) {
  return service({
    url: URLIP.BASE_URL_PDEVICE + '/api/device_fault/GetForList',
    method: 'get',
    data
  })
}
export function GetFaultLists(data) {
  return service({
    url: URLIP.BASE_URL_PDEVICE + '/api/device_faultconfig/GetForList',
    method: 'get',
    data
  })
}
//保养单
// 保养列表
export function MantainList(data) {
  return service({
    url: URLIP.BASE_URL_PDEVICE + '/api/device_preservevouch/GetForListByUser',
    method: 'POST',
    data
  })
}
// 待保养--保养
export function GetMianItemInfo(data) {
  return service({
    url: URLIP.BASE_URL_PDEVICE + '/api/device_preservevouch/GetBodys',
    method: 'get',
    data
  })
}
//备件下拉数据
export function GetPart(data) {
  return service({
    url: URLIP.BASE_URL_PDEVICE + '/api/device_preservevouch/GetPartBodys',
    method: 'get',
    data
  })
}
//备件保存
export function SavePart(data) {
  return service({
    url: URLIP.BASE_URL_PDEVICE + '/api/device_preservevouch/Vouch_S_S_Save',
    method: 'POST',
    data
  })
}
//查看指标
export function GetMaintainTarget(data) {
  return service({
    url: URLIP.BASE_URL_PDEVICE + '/api/device_dev_part_stand/GetForList',
    method: 'get',
    data
  })
}
//查看指标项

export function GetTargetList(data) {
  return service({
    url: URLIP.BASE_URL_PDEVICE + '/api/device_dev_part_stand/GetStandBodys',
    method: 'POST',
    data
  })
}

//完成
export function EndPost(data) {
  return service({
    url: URLIP.BASE_URL_PDEVICE + '/api/device_preservevouch/End',
    method: 'POST',
    data
  })
}

//设备报修

export function getDevList(data) {
  return service({
    url: URLIP.BASE_URL_PDEVICE + '/api/device/GetForList',
    method: 'get',
    data
  })
}
export function getDevListPage(data) {
  return service({
    url: URLIP.BASE_URL_PDEVICE + '/api/device/GetForPage',
    method: 'post',
    data
  })
}

export function getRepairList(data) {
  return service({
    url: URLIP.BASE_URL_PDEVICE + '/api/device_falutvouch/GetForPage',
    method: 'POST',
    data
  })
}

//指派
export function Assign(data) {
  return service({
    url: URLIP.BASE_URL_PDEVICE + '/api/device_falutvouch/Assign',
    method: 'POST',
    data
  })
}
//领取
export function Receive(data) {
  return service({
    url: URLIP.BASE_URL_PDEVICE + '/api/device_falutvouch/Receive',
    method: 'POST',
    data
  })
}
//详情
export function GetById(data) {
  return service({
    url: URLIP.BASE_URL_PDEVICE + '/api/device_falutvouch/GetById',
    method: 'GET',
    data
  })
}
export function DeviceFalutVouchClose(data) {
  return service({
    url: URLIP.BASE_URL_PDEVICE + '/api/device_falutvouch/Close',
    method: 'POST',
    data
  })
}

export function GetEmployee(data) {
  return service({
    url: URLIP.BASE_URL_LOGO + '/api/Employee/GetForPage',
    method: 'POST',
    data
  })
}
//维修单

export function PDARepairVouch(data) {
  return service({
    url: URLIP.BASE_URL_PDEVICE + '/api/device_RepairVouch/GetForPage',
    method: 'POST',
    data
  })
}

export function PDABegin(data) {
  return service({
    url: URLIP.BASE_URL_PDEVICE + '/api/device_RepairVouch/Begin',
    method: 'get',
    data
  })
}

export function PDAClose(data) {
  return service({
    url: URLIP.BASE_URL_PDEVICE + '/api/device_RepairVouch/Close',
    method: 'POST',
    data
  })
}

export function RepairVouchVerify(data) {
  return service({
    url: URLIP.BASE_URL_PDAIN + '/api/REPAIR_VOUCH/Verify',
    method: 'POST',
    data
  })
}

export function RepairVouchGetDetail(data) {
  return service({
    url: URLIP.BASE_URL_PDAIN + '/api/REPAIR_VOUCH/GetRepairDetail',
    method: 'GET',
    data
  })
}

export function PDAPROGRAM(data) {
  return service({
    url: URLIP.BASE_URL_PDEVICE + '/api/DEVICE_PROGRAM/GetForList',
    method: 'get',
    data
  })
}

export function PDAPROGRAMs(data) {
  return service({
    url: URLIP.BASE_URL_PDEVICE + '/api/device_dev_pro_config/GetForList',
    method: 'get',
    data
  })
}
export function PDAPROJECT(data) {
  return service({
    url: URLIP.BASE_URL_PDEVICE + '/api/DEVICE_PROJECT/GetForList',
    method: 'get',
    data
  })
}
export function PDAPROJECTs(data) {
  return service({
    url: URLIP.BASE_URL_PDEVICE + '/api/device_fault_project/GetForList',
    method: 'get',
    data
  })
}

export function PDAPART(data) {
  return service({
    url: URLIP.BASE_URL_PDEVICE + '/api/device_dev_pro_part/GetForList',
    method: 'get',
    data
  })
}

export function RepairVouchSave(data) {
  return service({
    url: URLIP.BASE_URL_PDEVICE + '/api/device_RepairVouch/Save',
    method: 'POST',
    data
  })
}

export function PDAFile(data) {
  return service({
    url: URLIP.BASE_URL_PDEVICE + '/api/device_dev_file/GetForList',
    method: 'get',
    data
  })
}

export function PDAGetBodys(data) {
  return service({
    url: URLIP.BASE_URL_PDEVICE + '/api/device_falutvouch/GetForList',
    method: 'get',
    data
  })
}

export function PDAGetItemCheck(data) {
  return service({
    url: URLIP.BASE_URL_PDEVICE + '/api/device_RepairVouch/GetBodys',
    method: 'get',
    data
  })
}

//物料盘点
export function STOCKTAKEPage(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/STOCK_TAKE/GetForPage',
    method: 'POST',
    data
  })
}
export function STOCKTViewPage(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/STOCK_TAKE_S/GetForPage',
    method: 'POST',
    data
  })
}

export function STOCKTAKEStart(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/STOCK_TAKE/StartInventory',
    method: 'POST',
    data
  })
}

export function STOCKTAKESave(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/STOCK_TAKE_S_S_S/BatchAdd',
    method: 'POST',
    data
  })
}
export function SCAN(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/ArriveVouch/getProductBarcodeAndLocationCode',
    method: 'GET',
    data
  })
}

export function STOCKlist(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/STOCK_TAKE_S_S_S/GetForList',
    method: 'GET',
    data
  })
}

export function Warelist(data) {
  return service({
    url: URLIP.BASE_URL_LOGO + '/api/WareHouse_Area/GetForPage',
    method: 'POST',
    data
  })
}

export function SCANBoth(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/ArriveVouch/getProductBarcodeAndLocationCode',
    method: 'GET',
    data
  })
}

export function GetUpFrameBarCodeInfo(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/ArriveVouch/GetUpFrameBarCodeInfo',
    method: 'GET',
    data
  })
}

export function WareHouseLocation(data) {
  return service({
    url: URLIP.BASE_URL_LOGO + '/api/WareHouse_Location/GetForList',
    method: 'POST',
    data
  })
}

// 刀具管理
export function GetToolList(data) {
  return service({
    url: URLIP.BASE_URL_TOOL + '/api/TMS_REPAIR_VOUCH/GetPDAListData',
    method: 'POST',
    data
  })
}

export function GetOutInfo(data) {
  return service({
    url: URLIP.BASE_URL_TOOL + '/api/TMS_STOCK/GetOutInfo',
    method: 'POST',
    data
  })
}

export function ToolGrindSave(data) {
  return service({
    url: URLIP.BASE_URL_TOOL + '/api/TMS_RECORD/PDA_Save',
    method: 'POST',
    data
  })
}

export function GetAreadyOut(data) {
  return service({
    url: URLIP.BASE_URL_TOOL + '/api/TMS_RECORD/GetAreadyOut',
    method: 'POST',
    data
  })
}

export function TMSRecordGetForPage_SS(data) {
  return service({
    url: URLIP.BASE_URL_TOOL + '/api/TMS_RECORD/GetForPage_SS',
    method: 'POST',
    data
  })
}

export function device_vouch_file(data) {
  return service({
    url: URLIP.BASE_URL_PDEVICE + '/api/device_vouch_file/GetForList',
    method: 'get',
    data
  })
}

export function factory_position_resource_list(data) {
  return service({
    url: URLIP.BASE_URL_DAOHUO + '/api/factory_position_resource/GetForList',
    method: 'get',
    data
  })
}

export function factory_position_resource_page(data) {
  return service({
    url: URLIP.BASE_URL_LOGO + '/api/factory_position_resource/GetForPage',
    method: 'POST',
    data
  })
}
