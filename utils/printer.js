export function sendPrintCommand({ data, encoding = 'utf-8', cmdType = 'zpl' }) {
  // #ifdef APP-PLUS
  const printerModule = uni.requireNativePlugin('ammagician-printer')
  const modal = uni.requireNativePlugin('modal')
  printerModule.getDevices({ isUSB: false }, (res) => {
    const currentDevice = res.data[0]
    console.log(res)
    if (currentDevice) {
      modal.toast({ message: '正在连接设备：' + currentDevice.name })
      printerModule.connect(
        {
          address: currentDevice.address,
          vendorId: currentDevice.vendorId,
          productId: currentDevice.productId,
          deviceId: currentDevice.deviceId,
          isUSB: false,
          isIP: false
        },
        (res) => {
          console.log(res)
          modal.toast({ message: res.msg })
          printerModule.print(
            {
              encoding,
              cmdType,
              data,
              isUSB: false,
              isIP: false
            },
            (res) => {
              console.log(res)
              modal.toast({ message: res.msg })
              printerModule.disconnect({ isUSB: true, isIP: false }, (res) => {})
            }
          )
        }
      )
    } else {
      modal.toast({ message: res.msg || '未找到设备' })
    }
  })
  // #endif
}
