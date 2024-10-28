const getIcon = (name) => '../../../static/img/workIcon/' + name

export const moduleMap = new Map([
  // 库房管理
  [
    'MobileApp.StoreRoom.ProductIn',
    {
      title: '成品入库',
      cModelCode: 'MobileApp.StoreRoom.ProductIn',
      src: getIcon('ruku.png'),
      url: '/pages/inStorage/pages/inStorage/inStorage'
    }
  ],
  [
    'MobileApp.StoreRoom.ProductOut',
    {
      title: '成品出库',
      cModelCode: 'MobileApp.StoreRoom.ProductOut',
      src: getIcon('chuku.png'),
      url: '/pages/StorageOut/pages/inWare/inWare?type=2'
    }
  ],
  [
    'MobileApp.StoreRoom.WholeOut',
    {
      title: '整货位出库',
      cModelCode: 'MobileApp.StoreRoom.WholeOut',
      src: getIcon('Allchuku.png'),
      url: '/pages/StorageOut/pages/inWare/inWare?type=3'
    }
  ],
  [
    'MobileApp.StoreRoom.GoodsConfirmation',
    {
      title: '到货确认',
      cModelCode: 'MobileApp.StoreRoom.GoodsConfirmation',
      src: getIcon('queren.png'),
      url: '/pages/PDAgoods/PDAgoods/PDAgoods'
    }
  ],
  [
    'MobileApp.StoreRoom.ProductMove',
    {
      title: '成品移库',
      cModelCode: 'MobileApp.StoreRoom.ProductMove',
      src: getIcon('Allchuku.png'),
      url: '/pages/wms/product-move/index'
    }
  ],
  [
    'MobileApp.StoreRoom.PurchaseInput',
    {
      title: 'PDA上架',
      cModelCode: 'MobileApp.StoreRoom.PurchaseInput',
      src: getIcon('shangjia.png'),
      url: '/pages/PDAput/PDAput/PDAput'
    }
  ],
  [
    'MobileApp.StoreRoom.PickingOutput',
    {
      title: '领料出库',
      cModelCode: 'MobileApp.StoreRoom.PickingOutput',
      src: getIcon('chuku.png'),
      url: '/pages/MaterOut/MaterOut'
    }
  ],
  [
    'MobileApp.StoreRoom.MaterialReturnInput',
    {
      title: '退料入库',
      cModelCode: 'MobileApp.StoreRoom.MaterialReturnInput',
      src: getIcon('tuidan.png'),
      url: '/pages/ReturnWarehouse/ReturnWarehouse'
    }
  ],
  [
    'MobileApp.StoreRoom.VendorReturnApply',
    {
      title: '退货通知',
      cModelCode: 'MobileApp.StoreRoom.VendorReturnApply',
      src: getIcon('tuiliaosq.png'),
      url: '/pages/applicationSQ/applicationSQ'
    }
  ],
  [
    'MobileApp.StoreRoom.VendorReturnOutput',
    {
      title: '退货出库',
      cModelCode: 'MobileApp.StoreRoom.VendorReturnOutput ',
      src: getIcon('tuiliaosq.png'),
      url: '/pages/PurchaseReturnsShelves/PurchaseReturnsShelves'
    }
  ],
  [
    'MobileApp.StoreRoom.MaterialCheck',
    {
      title: '物料盘点',
      cModelCode: 'MobileApp.StoreRoom.MaterialCheck',
      src: getIcon('wuliao.png'),
      url: '/pages/checkBills/checkBills'
    }
  ],
  [
    'MobileApp.StoreRoom.BarcodeSplit',
    {
      title: '条码拆分',
      cModelCode: 'MobileApp.StoreRoom.BarcodeSplit',
      src: getIcon('tuiliaosq.png'),
      url: '/pages/kunCaibao/kunCaibao'
    }
  ],
  [
    'MobileApp.StoreRoom.GoodsMove',
    {
      title: '货位移动',
      cModelCode: 'MobileApp.StoreRoom.GoodsMove',
      src: getIcon('tuiliaosq.png'),
      url: '/pages/kunYidong/kunYidong'
    }
  ],
  [
    'MobileApp.StoreRoom.ProductCheckPackage',
    {
      title: '按包抽检',
      cModelCode: 'MobileApp.StoreRoom.ProductCheckPackage',
      src: getIcon('tuiliaosq.png'),
      url: '/pages/PackBagCheck/PackBagCheck'
    }
  ],
  [
    'MobileApp.StoreRoom.ProductCheckOrder',
    {
      title: '按单抽检',
      cModelCode: 'MobileApp.StoreRoom.ProductCheckOrder',
      src: getIcon('tuiliaosq.png'),
      url: '/pages/DanCheck/DanCheck'
    }
  ],
  [
    'MobileApp.StoreRoom.ProductCheckDaily',
    {
      title: '发货抽检',
      cModelCode: 'MobileApp.StoreRoom.ProductCheckDaily',
      src: getIcon('tuiliaosq.png'),
      url: '/pages/SamplingCheck/SamplingCheck'
    }
  ],
  [
    'MobileApp.StoreRoom.OtherInput',
    {
      title: '其他入库',
      cModelCode: 'MobileApp.StoreRoom.OtherInput',
      src: getIcon('tuiliaosq.png'),
      url: '/pages/wms/other-storage-in/index'
    }
  ],
  [
    'MobileApp.StoreRoom.ProductInAndUp',
    {
      title: '产品入库',
      cModelCode: 'MobileApp.StoreRoom.ProductInAndUp',
      src: getIcon('tuiliaosq.png'),
      url: '/pages/ProductInwarePut/ProductInwarePut'
    }
  ],
  [
    'MobileApp.StoreRoom.OtherOutput',
    {
      title: '其他出库',
      cModelCode: 'MobileApp.StoreRoom.OtherOutput',
      src: getIcon('tuiliaosq.png'),
      url: '/pages/wms/other-storage-out/index'
    }
  ],
  [
    'MobileApp.StoreRoom.ProductOutAndDown',
    {
      title: '销售出库',
      cModelCode: 'MobileApp.StoreRoom.ProductOutAndDown',
      src: getIcon('tuiliaosq.png'),
      url: '/pages/ProductInwareOut/ProductInwareOut'
    }
  ],
  [
    'MobileApp.StoreRoom.AllocateInput',
    {
      title: '调拨入库',
      cModelCode: 'MobileApp.StoreRoom.AllocateInput',
      src: getIcon('tuiliaosq.png'),
      url: '/pages/wms/allocate-in/index'
    }
  ],
  [
    'MobileApp.StoreRoom.AllocateOutput',
    {
      title: '调拨出库',
      cModelCode: 'MobileApp.StoreRoom.AllocateOutput',
      src: getIcon('tuiliaosq.png'),
      url: '/pages/wms/allocate-out/index'
    }
  ],
  // 车间管理
  [
    'MobileApp.Workshop.WSVerify',
    {
      title: '车间审批',
      cModelCode: 'MobileApp.Workshop.WSVerify',
      src: getIcon('ruku.png'),
      url: '/pages/wms/workshop-verify/index'
    }
  ],
  [
    'MobileApp.Workshop.XCCStockTake',
    {
      title: '线边盘点',
      cModelCode: 'MobileApp.Workshop.XCCStockTake',
      src: getIcon('ruku.png'),
      url: '/pages/wms/warehouse-count/index'
    }
  ],
  [
    'MobileApp.Workshop.ReworkInitiate',
    {
      title: '发起异常',
      cModelCode: 'MobileApp.Workshop.ReworkInitiate',
      src: getIcon('errors.png'),
      url: '/pages/SendError/SendError'
    }
  ],
  [
    'MobileApp.Workshop.ReworkExecute',
    {
      title: '内返PDA',
      cModelCode: 'MobileApp.Workshop.ReworkExecute',
      src: getIcon('shouliao.png'),
      url: '/pages/InSendPDA/InSendPDA'
    }
  ],
  [
    'MobileApp.Workshop.DeviceRepairInitiate',
    {
      title: '设备报修',
      cModelCode: 'MobileApp.Workshop.DeviceRepairInitiate',
      src: getIcon('Repair.png'),
      url: '/pages/DeviceRepair/DeviceRepair'
    }
  ],
  [
    'MobileApp.Workshop.DeviceCheckSelf',
    {
      title: '自主点检',
      cModelCode: 'MobileApp.Workshop.DeviceCheckSelf',
      src: getIcon('check.png'),
      url: '/pages/EqupementCheck/EqupementCheck'
    }
  ],
  [
    'MobileApp.Workshop.DeviceMaintainSelf',
    {
      title: '自主保养',
      cModelCode: 'MobileApp.Workshop.DeviceMaintainSelf',
      src: getIcon('miantain.png'),
      url: '/pages/DeviceMantin/DeviceMantin'
    }
  ],
  [
    'MobileApp.Workshop.ToolToDevice',
    {
      title: '设备上刀',
      cModelCode: 'MobileApp.Workshop.ToolToDevice',
      src: getIcon('djaz.png'),
      url: '/pages/PDAshangdao/PDAshangdao'
    }
  ],
  [
    'MobileApp.Workshop.ToolFromDevice',
    {
      title: '设备下刀',
      cModelCode: 'MobileApp.Workshop.ToolFromDevice',
      src: getIcon('djx.png'),
      url: '/pages/PDAxiadao/PDAxiadao'
    }
  ],
  [
    'MobileApp.Workshop.ToolAllocateInput',
    {
      title: '调拨入库',
      cModelCode: 'MobileApp.Workshop.ToolAllocateInput',
      src: getIcon('x-tb.png'),
      url: '/pages/ToolAllotOutStorage/ToolAllotInStorage'
    }
  ],
  [
    'MobileApp.Workshop.ToolAllocateOutput',
    {
      title: '调拨出库',
      cModelCode: 'MobileApp.Workshop.ToolAllocateOutput',
      src: getIcon('x-tb.png'),
      url: '/pages/ToolAllotOutStorageCK/ToolAllotOutStorageCK'
    }
  ],
  [
    'MobileApp.Workshop.MaterialPickingApply',
    {
      title: '领料通知',
      cModelCode: 'MobileApp.Workshop.MaterialPickingApply',
      src: getIcon('tongzhi.png'),
      url: '/pages/HandelMaterInfo/HandelMaterInfo'
    }
  ],
  [
    'MobileApp.Workshop.MaterialCheckApply',
    {
      title: '退料申请',
      cModelCode: 'MobileApp.Workshop.MaterialCheckApply',
      src: getIcon('tuiliaosq.png'),
      url: '/pages/ReturnMaterInfoSQ/ReturnMaterInfoSQ'
    }
  ],
  [
    'MobileApp.Workshop.MaterialReturnApply',
    {
      title: '退料通知',
      cModelCode: 'MobileApp.Workshop.MaterialReturnApply',
      src: getIcon('tuiliaosq.png'),
      url: '/pages/ReturnMaterInfo/ReturnMaterInfo'
    }
  ],
  [
    'MobileApp.Workshop.FirstAndLastCheckApply',
    {
      title: '首末报检',
      cModelCode: 'MobileApp.Workshop.FirstAndLastCheckApply',
      src: getIcon('tuiliaosq.png'),
      url: '/pages/FirstLastInspection/FirstLastInspection'
    }
  ],
  [
    'MobileApp.Workshop.LineMaterialReceive',
    {
      title: '线边库收料',
      cModelCode: 'MobileApp.Workshop.LineMaterialReceive',
      src: getIcon('shouliao.png'),
      url: '/pages/ReceiveMater/ReceiveMater'
    }
  ],
  [
    'MobileApp.Workshop.ProductInApply',
    {
      title: '产品入库通知',
      cModelCode: 'MobileApp.Workshop.ProductInApply',
      src: getIcon('tuiliaosq.png'),
      url: '/pages/FinshiedProductInfo/FinshiedProductInfo'
    }
  ],
  [
    'MobileApp.StoreRoom.WarehouseCheck',
    {
      title: '仓库盘点',
      cModelCode: 'MobileApp.StoreRoom.WarehouseCheck',
      src: getIcon('ruku.png'),
      url: '/pages/wms/stock-count/index'
    }
  ],
  [
    'MobileApp.StoreRoom.CKVerify',
    {
      title: '仓库审批',
      cModelCode: 'MobileApp.StoreRoom.CKVerify',
      src: getIcon('ruku.png'),
      url: '/pages/wms/stock-verify/index'
    }
  ],
  // 设备管理
  [
    'MobileApp.Equipment.DeviceCheckProfessional',
    {
      title: '专业点检',
      cModelCode: 'MobileApp.Equipment.DeviceCheckProfessional',
      src: getIcon('ProCheck.png'),
      url: '/pages/ProEquipmentCheck/ProEquipmentCheck'
    }
  ],
  [
    'MobileApp.Equipment.DeviceMaintainProfessional',
    {
      title: '专业保养',
      cModelCode: 'MobileApp.Equipment.DeviceMaintainProfessional',
      src: getIcon('Promain.png'),
      url: '/pages/ProDeviceMantin/ProDeviceMantin'
    }
  ],
  [
    'MobileApp.Equipment.DeviceRepairAssign',
    {
      title: '维修指派',
      cModelCode: 'MobileApp.Equipment.DeviceRepairAssign',
      src: getIcon('point.png'),
      url: '/pages/PDAPonit/PDAPonit'
    }
  ],
  [
    'MobileApp.Equipment.DeviceRepairExecute',
    {
      title: '设备维修',
      cModelCode: 'MobileApp.Equipment.DeviceRepairExecute',
      src: getIcon('repairGood.png'),
      url: '/pages/PDARepair/PDARepair'
    }
  ],
  // 质量管理
  [
    'MobileApp.Quality.MaterialInputCheck',
    {
      title: '来料检验',
      cModelCode: 'MobileApp.Quality.MaterialInputCheck',
      src: getIcon('tuiliaosq.png'),
      url: '/pages/incomingInspection/incomingInspection'
    }
  ],
  [
    'MobileApp.Quality.MaterialInventoryCheck',
    {
      title: '库存检验',
      cModelCode: 'MobileApp.Quality.MaterialInventoryCheck',
      src: getIcon('tuiliaosq.png'),
      url: '/pages/kuIncomingInspection/incomingInspection'
    }
  ],
  [
    'MobileApp.Quality.NGChecklistDeal',
    {
      title: '不良单处理',
      cModelCode: 'MobileApp.Quality.NGChecklistDeal',
      src: getIcon('tuiliaosq.png'),
      url: '/pages/BadOrderTreatment/BadOrderTreatment'
    }
  ],
  [
    'MobileApp.Quality.NGPackageDeal',
    {
      title: '不良包处理',
      cModelCode: 'MobileApp.Quality.NGPackageDeal',
      src: getIcon('tuiliaosq.png'),
      url: '/pages/BadOrderTreatmentBao/BadOrderTreatment'
    }
  ],
  [
    'MobileApp.Quality.ProcessCheck',
    {
      title: '生产过程检',
      cModelCode: 'MobileApp.Quality.ProcessCheck',
      src: getIcon('tuiliaosq.png'),
      url: '/pages/ProductProcessCheck/ProductProcessCheck'
    }
  ],
  [
    'MobileApp.Quality.FirstAndLastCheck',
    {
      title: '首末件检验',
      cModelCode: 'MobileApp.Quality.FirstAndLastCheck',
      src: getIcon('tuiliaosq.png'),
      url: '/pages/FirstLastInspectionJY/FirstLastInspectionJY'
    }
  ],
  [
    'MobileApp.Quality.ProductPeriodicalCheck',
    {
      title: '定期检验',
      cModelCode: 'MobileApp.Quality.ProductPeriodicalCheck',
      src: getIcon('tuiliaosq.png'),
      url: '/pages/PeriodicSampling/PeriodicSampling'
    }
  ],
  [
    'MobileApp.Quality.ProductDailyCheck',
    {
      title: '日常检验',
      cModelCode: 'MobileApp.Quality.ProductDailyCheck',
      src: getIcon('tuiliaosq.png'),
      url: '/pages/DailyCheck/DailyCheck'
    }
  ],
  [
    'MobileApp.Quality.LineInspection',
    {
      title: '质量巡检',
      cModelCode: 'MobileApp.Quality.LineInspection',
      src: getIcon('tuiliaosq.png'),
      url: '/pages/LineInspectionview/LineInspectionview'
    }
  ],
  [
    'MobileApp.Quality.ArtificialApply',
    {
      title: '人工送样',
      cModelCode: 'MobileApp.Quality.ArtificialApply',
      src: getIcon('tuiliaosq.png'),
      url: '/pages/ManualSampleDelivery/ManualSampleDelivery'
    }
  ],
  [
    'MobileApp.Quality.ScanPackageApply',
    {
      title: '扫码取样',
      cModelCode: 'MobileApp.Quality.ScanPackageApply',
      src: getIcon('tuiliaosq.png'),
      url: '/pages/SweepSampling/SweepSampling'
    }
  ],
  [
    'MobileApp.Quality.LaboratoryCheck',
    {
      title: '实验室检验',
      cModelCode: 'MobileApp.Quality.LaboratoryCheck',
      src: getIcon('tuiliaosq.png'),
      url: '/pages/laboratoryInspection/laboratoryInspection'
    }
  ],
  // 刀具管理
  [
    'MobileApp.Tool.PurchaseAndInput',
    {
      title: '采购入库',
      cModelCode: 'MobileApp.Tool.PurchaseAndInput',
      src: getIcon('caigou.png'),
      url: '/pages/ToolByuInStorage/ToolByuInStorage'
    }
  ],
  [
    'MobileApp.Tool.ToolAllocateOutput',
    {
      title: '调拨出库',
      cModelCode: 'MobileApp.Tool.ToolAllocateOutput',
      src: getIcon('x-tb.png'),
      url: '/pages/ToolAllotOutStorageCK/ToolAllotOutStorageCK'
    }
  ],
  [
    'MobileApp.Tool.ToolAllocateInput',
    {
      title: '调拨入库',
      cModelCode: 'MobileApp.Tool.ToolAllocateInput',
      src: getIcon('x-tb.png'),
      url: '/pages/ToolAllotOutStorage/ToolAllotInStorage'
    }
  ],
  [
    'MobileApp.Tool.ToolRepairOutput',
    {
      title: '研磨出库',
      cModelCode: 'MobileApp.Tool.ToolRepairOutput',
      src: getIcon('ymc.png'),
      url: '/pages/ToolGrindOut/ToolGrindOut'
    }
  ],
  [
    'MobileApp.Tool.ToolRepairInput',
    {
      title: '研磨入库',
      cModelCode: 'MobileApp.Tool.ToolRepairInput',
      src: getIcon('ym.png'),
      url: '/pages/ToolGrindIn/ToolGrindIn'
    }
  ],
  [
    'MobileApp.Tool.ToolScrappedOutput',
    {
      title: '报废出库',
      cModelCode: 'MobileApp.Tool.ToolScrappedOutput',
      src: getIcon('baofei.png'),
      url: '/pages/ToolScarp/ToolScarp'
    }
  ]
])
