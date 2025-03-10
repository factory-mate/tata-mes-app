export function printTag(data = {}) {
  // #ifdef APP-PLUS
  printer.printQR2({ text: data?.cCode, height: 150, offset: 2 })
  printer.printText({
    content: `${data?.PRODUCT_VOUCH_cDefindParm30 ?? ''}-${data?.cCode ?? ''}${data?.cProvinceCode ?? ''}${data?.cCityCode ?? ''}\r\n`
  })
  printer.printText({ content: `${data?.cCode ?? ''}\r\n` })
  printer.printText({
    content: `${data?.cProvinceCode ?? ''}${data?.cCityCode ?? ''}\r\n`
  })
  printer.printText({ content: `${data?.cPackageCode ?? ''}\r\n` })
  printer.printText({ content: `${data?.cDefindParm05 ?? ''}\r\n` })
  printer.printText({ content: `${data?.cCusName ?? ''}\r\n` })
  printer.printText({ content: `${data?.PRODUCT_VOUCH_cDefindParm10 ?? ''}\r\n` })
  printer.printText({ content: `${data?.cAddress ?? ''}\r\n` })
  printer.printText({ content: `河南兰考县产业聚集区\r\n` })
  printer.printText({ content: `兰考闼闼同创工贸有限公司(25厂)\r\n` })
  printer.printText({ content: `数量：${data?.iDefindParm14 ?? '0'}\r\n` })
  printer.printText({ content: `包号：第${data?.iDefindParm13 ?? '0'}包\r\n` })
  data.packages.forEach((i) =>
    printer.printText({ content: `${i.cInvName ?? ''}： ${i.nQuantity ?? ''}\r\n` })
  )
  printer.printGoToNextMark()
  // #endif
}
