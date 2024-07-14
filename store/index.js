import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
		//公共的变量，这里的变量不能随便修改，只能通过触发mutations的方法才能改变
		bookid:[],
		length:0,
	},
    mutations: {
		//相当于同步的操作
		addbookid(state,id){
			// console.log(id)
			let k = 0
			for(let i=0;i<state.length;i++){
				if(state.bookid[i] == id){
					k = 1
				}
			}
			if(k == 1){
				
			}
			else if(k == 0){
				state.bookid[state.length] = id
				state.length = state.length+1
			}
		},
	},
    actions: {
		//相当于异步的操作,不能直接改变state的值，只能通过触发mutations的方法才能改变
	}
})
export default store