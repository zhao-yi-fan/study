import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  // strict: ProcessingInstruction.env.NODE_ENV != 'production', // 严格模式防止直接改state
  state: { // 类似data
    count: 15,
    b: {
      a: 1
    }
  },
  mutations: { // 类似 methods
    add (state, value) {
      state.count = state.count + value;
    }
  },
  actions: { // 类似 async methods
    minusActions (context, value) {
      // context = {state, commit}
      setTimeout(() => {
        context.commit('add', -10)
      }, 2000);

    }
  },
  getters: { // 类似computed
    countGetters (state) {
      return state.count % 3 == 0 ? '可被3整除' : '不可被3整除';
    }
  },
  modules: {}
})

export default store;

