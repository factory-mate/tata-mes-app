const CURRENT_ENV = 'test'

const URLIP = {
  BASE_URL_LOGO: 'http://171.13.38.93:8888',
  BASE_URL: 'http://171.13.38.93:8888:5727', //测试地址1

  // const BASE_URL = 'http://192.168.200.20:5727' //局域网测试地址2
  // const BASE_URL = 'http://117.158.105.114:5726' //正式地址
  // const BASE_URL = 'http://117.158.105.83:10500' //正式地址11
  // const BASE_URL = 'http://192.168.200.20:5726' //局域网地址

  // 171.13.38.94
  // 192.168.1.8

  //PDA到货确认/上架
  BASE_URL_DAOHUO: 'http://171.13.38.93:10500', //测试地址1 wms
  BASE_URL_PDAIN: 'http://171.13.38.93:10100', //测试地址1
  BASE_URL_PDEVICE: 'http://171.13.38.93:10700', //测试地址
  BASE_URL_TOOL: 'http://171.13.38.93:10800',
  BASE_URL_Quantity: 'http://171.13.38.93:11200', //QC
  APP_UPGRADE_URL: 'http://171.13.38.94:84',
  ENV: CURRENT_ENV
}

if (CURRENT_ENV === 'prod') {
  URLIP.BASE_URL_LOGO = 'http://171.13.38.94:8888'
  URLIP.BASE_URL = 'http://171.13.38.94:8888:5727'
  URLIP.BASE_URL_DAOHUO = 'http://171.13.38.94:10500' //测试地址1 wms
  URLIP.BASE_URL_PDAIN = 'http://171.13.38.94:10100' //测试地址1
  URLIP.BASE_URL_PDEVICE = 'http://171.13.38.94:10700' //测试地址
  URLIP.BASE_URL_TOOL = 'http://171.13.38.94:10800'
  URLIP.BASE_URL_Quantity = 'http://171.13.38.94:11200' //QC
}
export default URLIP
