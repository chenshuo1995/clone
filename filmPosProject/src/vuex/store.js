import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state={
    url:'118.190.112.59:8070',
    ticket:[],//用于存放购物车的数据
}

const mutations={
    add(state){
        state.num++;
    },
    reduce(state){
        state.num--;
    }
}
export default new Vuex.Store({
	state,
	mutations
})
