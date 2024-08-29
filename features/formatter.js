import dayjs from 'dayjs'

export const formatTime = (time, format = 'YYYY-MM-DD HH:mm:ss', placeholder = '--') => {
  if (!time) {
    return placeholder
  }
  return dayjs(time).format(format)
}

export const formatString = (str, placeholder = '--') => {
  if (!str) {
    return placeholder
  }
  return str
}
