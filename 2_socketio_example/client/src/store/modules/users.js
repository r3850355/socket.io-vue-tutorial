import Vue from 'vue'
import * as api from '../../api/api'

const state = {
  data: [],
  lastUpdate:''
}

// getters 也可以整理到這邊直接返回 count 內容
const getters = {
  getDatas: state => state.data,
  getLastUpdate: state => state.lastUpdate
}

// actions 也是以 Object 形式建構。
const actions = {
  actionSendData ({ commit }, payload) {
    const params = {
      query: {
        $limit: 30
      }
    }
    api.users.find(params).then( res => { 
      commit('getData', res.data )
      console.log('before created')
      api.users.removeAllListeners('created')
      api.users.on('created', res => {
        console.log(res)
        commit('addData', { data:res.data, update:res.updatedAt})
      })
      //api.users.on('created', res => { commit('addData', {date:res})})
    }).catch( err => { console.log(err) })

  },
  actionAddData({commit}, {data}){
    console.log('in action',data)
    let createdata = { data:data}
    api.users.create(createdata).then( res => {
      //commit('addData',createdata)
    })
  }
}

// mutations
const mutations = {
  getData (state, result) {
    console.log('getData')
    state.data = result
    //state.lastUpdate = result.
  },
  addData (state,result)
  {
    console.log('addData')
    state.data.push(result)
    state.lastUpdate = result.update
  }
}

/*
  因為我們把 vuex 所有職權都寫在同一隻檔案，
  所以必須要 export 出去給最外層 index.js 組合使用
*/
export default {
  state,
  getters,
  actions,
  mutations
}