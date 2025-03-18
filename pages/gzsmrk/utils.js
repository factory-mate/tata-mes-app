export const textConf = {
  type: 'text',
  customFont: 'E:SIMSUN.TTF',
  widthScale: 30,
  heightScale: 30,
  rotate: 90
}

export const rightTextConf = {
  type: 'text',
  customFont: 'E:SIMSUN.TTF',
  widthScale: 25,
  heightScale: 25,
  rotate: 90
}

export const textBlockConf = {
  type: 'textBlock',
  customFont: 'E:SIMSUN.TTF',
  widthScale: 30,
  heightScale: 30,
  rotate: 90
}

export const qrcodeConf = {
  type: 'qrcode',
  tolerant: 1,
  model: '2',
  factor: 7,
  mask: 7,
  rotate: 90
}

function getSpec(item) {
  return `${item.X ?? '?'}*${item.Y ?? '?'}*${item.Z ?? '?'}`
}

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
  const locationText = `${data?.cProvinceCode ?? ''}${data?.cCityCode ?? ''}`
  data.packages = data.packages.filter((_, index) => index < 15)
  return [
    { type: 'size', width: 700, height: 1400 },
    { ...textConf, content: fullText, x: 575, y: 25 },
    { ...textConf, content: data?.cCode ?? '', x: 515, y: 25, widthScale: 60, heightScale: 60 },
    { ...textConf, content: locationText, x: 475, y: 25, widthScale: 45, heightScale: 45 },
    { ...textConf, content: data?.cPackageCode ?? '', x: 440, y: 25 },
    { ...textConf, content: data?.PRODUCT_VOUCH_cDefindParm05 ?? '', x: 395, y: 25 },
    { ...textConf, content: data?.cCusName ?? '', x: 350, y: 25 },
    { ...textConf, content: data?.PRODUCT_VOUCH_cDefindParm10 ?? '', x: 305, y: 25 },
    { ...textBlockConf, content: data?.cDefindParm04 ?? '', x: 260, y: 25, width: 430, height: 30 },
    { ...qrcodeConf, content: data?.cCode ?? '', x: 320, y: 270 },
    { ...textConf, content: `数量：${data?.PACKAGEVOUCH_S_iDefindParm14 ?? '??'}`, x: 215, y: 25 },
    { ...textConf, content: `包号：第${data?.cDynamicsParm10 ?? '??'}包`, x: 215, y: 230 },
    { ...textBlockConf, content: data?.cAddress ?? '', x: 170, y: 25, width: 430, height: 30 },
    { ...textConf, content: '河南兰考县产业聚集区', x: 125, y: 25 },
    {
      ...textConf,
      content: '兰考闼闼同创工贸有限公司(25厂)',
      x: 85,
      y: 25,
      widthScale: 25,
      heightScale: 25
    },
    { ...rightTextConf, content: '产品名称', x: 580, y: 470 },
    { ...rightTextConf, content: '规格', x: 580, y: 690 },
    { ...rightTextConf, content: '材质颜色', x: 580, y: 840 },
    { ...rightTextConf, content: '数量', x: 580, y: 1050 },
    ...data.packages
      .map((i, index) => [
        { ...rightTextConf, content: i.cInvName?.trim(), x: 580 - 33 * (index + 1), y: 470 },
        { ...rightTextConf, content: getSpec(i), x: 580 - 33 * (index + 1), y: 690 },
        { ...rightTextConf, content: i.cDynamicsParm06, x: 580 - 33 * (index + 1), y: 840 },
        { ...rightTextConf, content: i.nQuantity, x: 580 - 33 * (index + 1), y: 1050 }
      ])
      .flat(),
    { type: 'box', x: 80, y: 20, width: 540, height: 430, thickness: 2 },
    { type: 'box', x: 80, y: 20, width: 40, height: 430, thickness: 1 },
    { type: 'box', x: 120, y: 20, width: 45, height: 430, thickness: 1 },
    { type: 'box', x: 165, y: 20, width: 45, height: 430, thickness: 1 },
    { type: 'box', x: 210, y: 20, width: 45, height: 430, thickness: 1 },
    { type: 'box', x: 255, y: 20, width: 45, height: 430, thickness: 1 },
    { type: 'box', x: 300, y: 20, width: 45, height: 215, thickness: 1 },
    { type: 'box', x: 345, y: 20, width: 45, height: 215, thickness: 1 },
    { type: 'box', x: 390, y: 20, width: 45, height: 215, thickness: 1 },
    { type: 'box', x: 435, y: 20, width: 45, height: 215, thickness: 1 },
    { type: 'box', x: 300, y: 235, width: 180, height: 215, thickness: 1 },
    { type: 'box', x: 480, y: 20, width: 95, height: 430, thickness: 1 },
    { type: 'box', x: 575, y: 20, width: 45, height: 430, thickness: 1 },

    { type: 'box', x: 80, y: 460, width: 540, height: 660, thickness: 2 },
    ...Array.from({ length: 15 }, (_, index) => index).map((i) => ({
      type: 'box',
      x: 80 + 33 * i,
      y: 460,
      width: 33,
      height: 660,
      thickness: 1
    })),
    { type: 'box', x: 80, y: 460, width: 540, height: 220, thickness: 1 },
    { type: 'box', x: 80, y: 680, width: 540, height: 150, thickness: 1 },
    { type: 'box', x: 80, y: 830, width: 540, height: 210, thickness: 1 },
    { type: 'box', x: 80, y: 1040, width: 540, height: 100, thickness: 1 }
  ]
}
