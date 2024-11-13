<script>
import URLIP from '@/utils/serviceIP.js'

export default {
  onLaunch: function () {
    uni.setStorageSync('unit', uni.getDeviceInfo())

    if (URLIP.ENV === 'local') {
      return
    }
    // #ifdef APP-PLUS
    plus.runtime.getProperty(plus.runtime.appid, function (widgetInfo) {
      uni.request({
        url: `${URLIP.APP_UPGRADE_URL}/${URLIP.ENV}/version.json`,
        success: (res) => {
          const { version, url } = res.data
          console.log(version, widgetInfo.version)
          if (widgetInfo.version != version) {
            console.log(`${URLIP.APP_UPGRADE_URL}/${URLIP.ENV}/${url}`)
            uni.showLoading({
              title: '正在下载更新包'
            })
            uni.downloadFile({
              url: `${URLIP.APP_UPGRADE_URL}/${URLIP.ENV}/${url}`,
              success: (downloadResult) => {
                console.log(downloadResult)
                if (downloadResult.statusCode === 200) {
                  plus.runtime.install(
                    downloadResult.tempFilePath,
                    { force: true },
                    function () {
                      console.log('install success...')
                      plus.runtime.restart()
                    },
                    function (e) {
                      console.error('install fail...')
                      console.log(e)
                    }
                  )
                }
              },
              fail: (downloadResult) => {
                console.log(downloadResult)
              },
              complete: (downloadResult) => {
                console.log(downloadResult)
                uni.hideLoading()
              }
            })
          }
        }
      })
    })
    // #endif
  },
  onShow: function () {},
  onHide: function () {}
}
</script>

<style lang="scss">
@import 'uview-plus/index.scss';

/* 全局样式 */
@import '@/static/css/index.css';
/*每个页面公共css */
@import url('https://at.alicdn.com/t/c/font_3664235_ygblnz8kapd.css');
.icon-img {
  display: inline-block;
  color: green;
}
.img {
  /* // width: 100rpx; */
  /* // height: 100rpx; */
  /* // margin: auto; */
  font-size: 50rpx;
  color: green;
  margin-bottom: 20rpx;
  /* // background-color: black; */
}
</style>
