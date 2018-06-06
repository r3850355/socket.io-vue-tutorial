import Vue from 'vue'
import * as auth_api from '../../api/auth'
import * as api from '../../api/api'
import { CookieStorage } from 'cookie-storage';
const Cookie = new CookieStorage();

const state = {
  accessToken: Cookie.getItem('accessToken'),
  isLogin: Cookie.getItem('isLogin'),
  username: Cookie.getItem('username'),
  account: Cookie.getItem('account'),
}

// getters 也可以整理到這邊直接返回 count 內容
const getters = {
  accessToken: state => state.accessToken,
  isLogin: state => state.isLogin
}

// actions 也是以 Object 形式建構。
const actions = {
  actionLogin ({ commit }, { account, password}) {

    let option = {
      strategy: 'local',
      account: account,
      password: password
    }

    auth_api.authenticate(option).then((e)=>{
      commit('successLogin',e)
      console.log('登入成功',e)
      api.users.find({ query:{account:account}}).then( e => { console.log(e);commit('setUserData',e.data[0]) }).catch( e => { console.log(e)})
    }).catch((e)=>{
      console.log('登入失敗',e)
    })
     
  },
  actionLogout ({ commit }) {
    auth_api.logout().then((e)=>{
      console.log('已經登出',e)
      commit('successLogout')
    })
  },
  actionSignup({ commit }, { account, password , username}) {
    let data = { account:account, password:password, username:username}
    return api.users.create(data).then((e)=>{
      console.log('成功註冊',e)
      this.dispatch('actionLogin',{ account:account , password:password })
      return 'suss'
    }).catch(e=>{
      console.log(e)
      return 'err'
    })
  }
}

// mutations
const mutations = {
  successLogin (state, result) {
    state.accessToken = result
    state.isLogin = true
    Cookie.setItem('accessToken',result.accessToken)
    Cookie.setItem('isLogin',true)
  },
  successLogout (state) {
    state.accessToken = ''
    state.isLogin = false
    state.username = ''
    state.account = ''
    Cookie.clear()
    //Cookie.removeItem('accessToken')
    //Cookie.removeItem('isLogin')
  },
  setUserData (state , data) {
    state.username = data.username
    state.account = data.account
    Cookie.setItem('username',data.username)
    Cookie.setItem('account',data.account)
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