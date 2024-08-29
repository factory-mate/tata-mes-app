import request from '@/utils/request'


// get
export function getCart() {
	return request({
		url: '/mall-oms/app-api/v1/carts',
		method: 'get',
		headers: {
			'auth': true // 需要认证
		}
	})
}
// patch
/**
 * 全选/全不选
 * @param {Object} params
 */
export function checkAll(params) {
	return request({
		url: '/mall-oms/app-api/v1/carts/_check',
		method: 'patch',
		params: params,
		headers: {
			'auth': true
		}
	})
}


// delete
export function deleteCart() {
	return request({
		url: '/mall-oms/app-api/v1/carts',
		method: 'delete',
		headers: {
			'auth': true
		}
	})
}


// post
export function addCartItem(skuId) {
	return request({
		url: '/mall-oms/app-api/v1/carts',
		method: 'post',
		params: {
			skuId: skuId
		},
		headers: {
			'auth': true
		}
	})
}

// put
export function updateCartItem(skuId, data) {
	return request({
		url: '/mall-oms/app-api/v1/carts/skuId/' + skuId,
		method: 'put',
		data: data,
		headers: {
			'auth': true
		}
	})
}


