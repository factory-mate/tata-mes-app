import { textConf, qrcodeConf } from '@/common'

const mockData = [
  { type: 'size', width: 700, height: 1400 },
  {
    ...textConf,
    content: '零售-P24000509214福建省宁化县',
    x: 80,
    y: 25,
    customFont: 'E:SIMSUN.TTF',
    font: '0',
    widthScale: 25,
    heightScale: 25
  },
  {
    ...textConf,
    content: 'P24000509214',
    x: 80,
    y: 50,
    customFont: 'E:SIMSUN.TTF',
    font: '0',
    widthScale: 25,
    heightScale: 25
  },
  {
    ...textConf,
    content: '福建省宁化县',
    x: 80,
    y: 75,
    customFont: 'E:SIMSUN.TTF',
    font: '0',
    widthScale: 25,
    heightScale: 25
  },
  {
    ...textConf,
    content: '2405544823',
    x: 80,
    y: 100,
    customFont: 'E:SIMSUN.TTF',
    font: '0',
    widthScale: 25,
    heightScale: 25
  },
  {
    ...textConf,
    content: 'D24000501742',
    x: 80,
    y: 125,
    customFont: 'E:SIMSUN.TTF',
    font: '0',
    widthScale: 25,
    heightScale: 25
  },
  {
    ...textConf,
    content: '曲女士',
    x: 80,
    y: 150,
    customFont: 'E:SIMSUN.TTF',
    font: '0',
    widthScale: 25,
    heightScale: 25
  },
  {
    ...textConf,
    content: 'P24000450124',
    x: 80,
    y: 175,
    customFont: 'E:SIMSUN.TTF',
    font: '0',
    widthScale: 25,
    heightScale: 25
  },
  {
    ...textConf,
    content: '宁化县库房',
    x: 80,
    y: 200,
    customFont: 'E:SIMSUN.TTF',
    font: '0',
    widthScale: 25,
    heightScale: 25
  },
  {
    type: 'qrcode',
    x: 350,
    y: 50,
    tolerant: 1,
    content: 'www.baidu.com',
    model: '2',
    factor: 5,
    mask: 7,
    rotate: 90
  },
  {
    ...textConf,
    content: '数量：3',
    x: 80,
    y: 225,
    customFont: 'E:SIMSUN.TTF',
    font: '0',
    widthScale: 25,
    heightScale: 25
  },
  {
    ...textConf,
    content: '包号：第1包',
    x: 350,
    y: 225,
    customFont: 'E:SIMSUN.TTF',
    font: '0',
    widthScale: 25,
    heightScale: 25
  },
  {
    ...textConf,
    content: '福建省三明市瑞玺13-1-501',
    x: 80,
    y: 250,
    customFont: 'E:SIMSUN.TTF',
    font: '0',
    widthScale: 25,
    heightScale: 25
  },
  {
    ...textConf,
    content: '河南兰考县产业聚集区',
    x: 80,
    y: 275,
    customFont: 'E:SIMSUN.TTF',
    font: '0',
    widthScale: 25,
    heightScale: 25
  },
  {
    ...textConf,
    content: '兰考闼闼同创工贸有限公司(25厂)',
    x: 80,
    y: 300,
    customFont: 'E:SIMSUN.TTF',
    font: '0',
    widthScale: 25,
    heightScale: 25
  },
  {
    ...textConf,
    content: '产品名称',
    x: 80,
    y: 350,
    customFont: 'E:SIMSUN.TTF',
    font: '0',
    widthScale: 25,
    heightScale: 25
  },
  {
    ...textConf,
    content: '数量',
    x: 350,
    y: 350,
    customFont: 'E:SIMSUN.TTF',
    font: '0',
    widthScale: 25,
    heightScale: 25
  },
  {
    ...textConf,
    content: '餐边开放柜',
    x: 80,
    y: 375,
    customFont: 'E:SIMSUN.TTF',
    font: '0',
    widthScale: 25,
    heightScale: 25
  },
  {
    ...textConf,
    content: '1',
    x: 350,
    y: 375,
    customFont: 'E:SIMSUN.TTF',
    font: '0',
    widthScale: 25,
    heightScale: 25
  },
  {
    ...textConf,
    content: '餐边开放柜',
    x: 80,
    y: 400,
    customFont: 'E:SIMSUN.TTF',
    font: '0',
    widthScale: 25,
    heightScale: 25
  },
  {
    ...textConf,
    content: '1',
    x: 350,
    y: 400,
    customFont: 'E:SIMSUN.TTF',
    font: '0',
    widthScale: 25,
    heightScale: 25
  },
  {
    ...textConf,
    content: '餐边开放柜',
    x: 80,
    y: 425,
    customFont: 'E:SIMSUN.TTF',
    font: '0',
    widthScale: 25,
    heightScale: 25
  },
  {
    ...textConf,
    content: '2',
    x: 350,
    y: 425,
    customFont: 'E:SIMSUN.TTF',
    font: '0',
    widthScale: 25,
    heightScale: 25
  }
]

export function generatePrintData(data = {}, isMock = false) {
  if (isMock) {
    return mockData
  }
  const fullText = `${data?.PRODUCT_VOUCH_cDefindParm30 ?? ''}-${data?.cCode ?? ''}${data?.cProvinceCode ?? ''}${data?.cCityCode ?? ''}`
  return [
    { type: 'size', width: 700, height: 1400 },
    { ...textConf, content: fullText, x: 80, y: 25 },
    { ...textConf, content: data?.cPackageCode ?? '', x: 80, y: 50 },
    { ...textConf, content: `${data?.cProvinceCode ?? ''}${data?.cCityCode ?? ''}`, x: 80, y: 75 },
    { ...textConf, content: data?.cPackageCode ?? '', x: 80, y: 100 },
    { ...textConf, content: data?.cDefindParm05 ?? '', x: 80, y: 125 },
    { ...textConf, content: data?.cCusName ?? '', x: 80, y: 150 },
    { ...textConf, content: data?.PRODUCT_VOUCH_cDefindParm10 ?? '', x: 80, y: 175 },
    { ...textConf, content: data?.cAddress ?? '', x: 80, y: 200 },
    { ...qrcodeConf, content: data?.cCode ?? '', x: 350, y: 50 },
    { ...textConf, content: `数量：${data?.iDefindParm14 ?? '--'}`, x: 80, y: 225 },
    { ...textConf, content: `包号：第${data?.iDefindParm13 ?? '--'}包`, x: 350, y: 225 },
    { ...textConf, content: data?.cAddress ?? '', x: 80, y: 250 },
    { ...textConf, content: '河南兰考县产业聚集区', x: 80, y: 275 },
    { ...textConf, content: '兰考闼闼同创工贸有限公司(25厂)', x: 80, y: 300 },
    { ...textConf, content: '产品名称', x: 80, y: 350 },
    { ...textConf, content: '数量', x: 350, y: 350 },
    ...data.packages
      .map((i, index) => [
        { ...textConf, content: i.cInvName?.trim(), x: 80, y: 375 + 25 * index },
        { ...textConf, content: i.nQuantity, x: 350, y: 375 + 25 * index }
      ])
      .flat()
  ]
}
