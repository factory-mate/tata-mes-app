const request = (options) =>
  new Promise((resolve, reject) => {
    const config = options.config ?? {
      showToast: true,
      showModal: false
    }
    console.log(options)
    uni.request({
      url: options.url,
      method: options.method || 'GET',
      header: {
        Authorization: `Bearer ${uni.getStorageSync('token') || ''}`
      },
      timeout: 60000, // 接口请求超时时间设置
      data: options.data || {},
      success: (res) => {
        const data = res.data
        console.log(res.data)
        if (data.status === 401 || data.status === 403) {
          if (Array.isArray(data.errmsg) && data.errmsg.length > 0) {
            uni.showToast({
              icon: 'error',
              title: data.errmsg[0].Value || '登录失败'
            })
          } else {
            uni.showToast({
              icon: 'error',
              title: '没有权限'
            })
          }
          uni.removeStorageSync('token')
          uni.removeStorageSync('User')
          uni.navigateTo({
            url: '/pages/login/login'
          })
          return
        } else if (data.status !== 200) {
          if (config.showToast) {
            uni.showToast({
              icon: 'none',
              title:
                data.msg ||
                data.errmsg?.[0]?.msg ||
                data.errmsg?.[0]?.Value ||
                data.errmsg ||
                '失败！'
            })
          }
          if (config.showModal) {
            uni.showModal({
              showCancel: false,
              title: '提示',
              content:
                data.msg ||
                data.errmsg?.[0]?.msg ||
                data.errmsg?.[0]?.Value ||
                data.errmsg ||
                '失败！'
            })
          }
          reject(data)
        } else {
          if (data.success == false) {
            uni.showToast({
              icon: 'none',
              title:
                data.msg ||
                data.errmsg?.[0]?.msg ||
                data.errmsg?.[0]?.Value ||
                data.errmsg ||
                '失败！'
            })
          }
          resolve(data)
        }
      },
      fail: (error) => {
        console.log(error, '--请求错误')
        uni.hideLoading()
        if (
          error.errMsg == 'request:fail timeout' ||
          error.errMsg == 'request:fail abort statusCode:-1 timeout'
        ) {
          uni.showModal({
            showCancel: false,
            content: '请求超时，请重新扫描！'
          })
        } else {
          uni.showModal({
            showCancel: false,
            content: error.errMsg
          })
        }
        reject(error)
      }
    })
  })
export default request
