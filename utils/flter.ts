// 整合 filter 数据形式
export function filterModel(Arr: Array<any>) {
  const arrObj: Array<any> = []
  Arr.forEach((item) => {
    if (item.cAttributeCodeValue) {
      if (item.cAttributeCode !== 'dDate') {
        arrObj.push(
          item.cAttributeCode + ' ' + item.cConditions + ' ' + '' + item.cAttributeCodeValue + ''
        )
      } else if (
        item.cAttributeCode == 'dDate' &&
        item.cAttributeCodeValue &&
        item.cControlTypeCode == 'DatePicker2'
      ) {
        arrObj.push(
          item.cAttributeCode +
            ' ' +
            '>=' +
            ' ' +
            '' +
            item.cAttributeCodeValue[0] +
            '' +
            ' ' +
            '&&' +
            ' ' +
            item.cAttributeCode +
            ' ' +
            '<=' +
            ' ' +
            '' +
            item.cAttributeCodeValue[1] +
            ''
        )
      } else if (
        item.cAttributeCode == 'dDate' &&
        item.cAttributeCodeValue &&
        item.cControlTypeCode == 'DatePicker'
      ) {
        arrObj.push(
          item.cAttributeCode +
            ' ' +
            '>=' +
            ' ' +
            '' +
            item.cAttributeCodeValue +
            'T00:00:00' +
            '' +
            ' ' +
            '&&' +
            ' ' +
            item.cAttributeCode +
            ' ' +
            '<=' +
            ' ' +
            '' +
            item.cAttributeCodeValue +
            'T23:59:59' +
            ''
        )
      } else {
        arrObj.push('')
      }
    }
  })
  const rpx2 = /\s\s/gi
  const rpx3 = /\s\s\s/gi
  const str = arrObj.join(' && ')
  if (rpx3.test(str)) {
    // console.log(str.replace(rpx3," "),"-111-jion");
    return str.replace(rpx3, ' ')
  } else if (rpx2.test(str)) {
    // console.log(str.replace(rpx2," "),"-222-jion");
    return str.replace(rpx2, ' ')
  } else {
    // console.log(str,"-333-jion");
    return str
  }
}
