import { request, URLIP } from '@/utils'

export class AuthHelperAPI {
  static getMenuAuth() {
    return request({
      url: URLIP.BASE_URL_LOGO + '/api/AuthHelper/GetMenuAuth',
      method: 'get'
    })
  }
}
