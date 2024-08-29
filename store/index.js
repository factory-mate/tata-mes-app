import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
	state() {
		return {
			num: 0,
			count:1,
			iconColor:'icon-color'
		}
	},
	mutations: {
		add(state) {
			state.count++
		},
		//改变全局icon颜色
		change(state,icolor){
			state.iconColor = icolor
			uni.getStorage({
				key:'ICON-COLOR',
				success(res) {
					iconColor=res.data
				}
			})
			console.log(state.iconColor);
		},
		//页面刷新vuex数据丢失， 获取一下本地存的'ICON-COLOR'
		getcolor(state){
			uni.getStorage({
				key:'ICON-COLOR',
				success(res) {
			     state.iconColor=res.data
				}
			})
		}
	},
	actions:{
		changColor(context,icolor){
			context.commit('change',icolor)
		}
	}
})
export {
	store
}

