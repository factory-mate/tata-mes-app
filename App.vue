<script>
import URLIP from '@/utils/serviceIP.js'
export default {
  onLaunch: function () {
    uni.setStorageSync('unit', uni.getDeviceInfo())
    // #ifdef APP-PLUS
    plus.runtime.getProperty(plus.runtime.appid, function (widgetInfo) {
      uni.request({
        url: `${URLIP.APP_UPGRADE_URL}/${URLIP.env}/version.json`,
        success: (res) => {
          const { version, url } = res.data
          if (widgetInfo.version != version) {
            uni.downloadFile({
              url,
              success: (downloadResult) => {
                if (downloadResult.statusCode === 200) {
                  plus.runtime.install(
                    downloadResult.tempFilePath,
                    { force: false },
                    function () {
                      console.log('install success...')
                      plus.runtime.restart()
                    },
                    function (e) {
                      console.error('install fail...')
                    }
                  )
                }
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
