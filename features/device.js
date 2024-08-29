export const getDeviceHeight = () => {
  const { platform, statusBarHeight } = uni.getSystemInfoSync()
  let totalHeight = 0
  let navBarHeight = 0
  if (platform === 'android') {
    totalHeight = 48 + statusBarHeight
  } else if (platform === 'ios') {
    totalHeight = 44 + statusBarHeight
  }
  navBarHeight = totalHeight - statusBarHeight

  return {
    totalHeight, // 状态栏高度 + 标题栏高度
    statusBarHeight, // 状态栏高度
    navBarHeight // 标题栏高度
  }
}
