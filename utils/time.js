export function TimeCha(oldTime, newTime) {
  // var date1= '2015/05/01 00:00:00';  //开始时间
  //  var date2 = new Date();    //结束时间
  var date1 = oldTime
  var date2 = new Date()
  var date3 = date2.getTime() - new Date(date1).getTime() //时间差的毫秒数
  //计算出相差天数
  var days = Math.floor(date3 / (24 * 3600 * 1000))
  //计算出小时数
  var leave1 = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
  var hours = Math.floor(leave1 / (3600 * 1000))
  //计算相差分钟数
  var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
  var minutes = Math.floor(leave2 / (60 * 1000))
  //计算相差秒数
  var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
  var seconds = Math.round(leave3 / 1000)
  if (minutes > 0) {
    return {
      m: seconds * minutes,
      data: ' 相差 ' + days + '天 ' + hours + '小时 ' + minutes + ' 分钟' + seconds + ' 秒'
    }
  } else {
    return {
      m: seconds,
      data: ' 相差 ' + days + '天 ' + hours + '小时 ' + minutes + ' 分钟' + seconds + ' 秒'
    }
  }
}
export function time() {
  var date = new Date()
  var sign2 = ':'
  var year = date.getFullYear() // 年
  var month = date.getMonth() + 1 // 月
  var day = date.getDate() // 日
  var hour = date.getHours() // 时
  var minutes = date.getMinutes() // 分
  var seconds = date.getSeconds() //秒
  var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天']
  var week = weekArr[date.getDay()]
  // 给一位数的数据前面加 “0”
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (day >= 0 && day <= 9) {
    day = '0' + day
  }
  if (hour >= 0 && hour <= 9) {
    hour = '0' + hour
  }
  if (minutes >= 0 && minutes <= 9) {
    minutes = '0' + minutes
  }
  if (seconds >= 0 && seconds <= 9) {
    seconds = '0' + seconds
  }
  return year + '-' + month + '-' + day + ' ' + hour + sign2 + minutes + sign2 + seconds
}
