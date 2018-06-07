import Vue from 'vue'
import * as api from '../../api/api'

const state = {
  patient: {},
  //you can find the _id from mongoDB
  //if not use POSTMAN to create the data with http://localhost:3030/sync-conflicts-example
  patient_id: "5b177fcbd44eb71b3e0b6cb4" 
}

// getters 也可以整理到這邊直接返回 count 內容
const getters = {
  getPatient: state => state.patient,
}

// actions 也是以 Object 形式建構。
const actions = {
  actionGetPatient ({ commit }, payload) {
    api.users.get(state.patient_id).then( res => { 
      commit('getPatient', res )  
      api.users.removeAllListeners('updated')
      api.users.on('updated', res => { commit('getPatient',res) })
    }).catch( err => { console.log(err) })
  },
  actionUpdatePatient( { commit }, { data }) {
    api.users.update(data._id,data)
  }

}

// mutations
const mutations = {
  getPatient (state, result) {
    state.patient = result
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