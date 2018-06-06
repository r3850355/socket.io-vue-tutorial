<template>
  <q-page>
    <div class="row" style="margin-top:200px;">
      <div class="col-5"></div>
      <div class="col-2">
        
        <div class="login" v-if="!this.$store.state.users.isLogin">
          <h2 style="text-align:center">測試登入</h2>
          <q-input style="margin:10px;" v-model="username" stack-label="使用者名稱" />
          <q-input style="margin:10px;" v-model="account" stack-label="帳號" />
          <q-input style="margin:10px;" v-model="password" stack-label="密碼" />
          <div style="text-align:center;margin:10px;">
            <q-btn label="Login" @click="login" style="margin-right:10px"/>
            <q-btn label="Signup" @click="signup" />
          </div>          
        </div>

        <div v-else>
          <h2 style="text-align:center">{{ username }}已登入</h2>
          <div style="text-align:center;margin:10px;">
            <q-btn label="Logout" @click="Logout" />
          </div>  
        </div>

      </div>
      <div class="col-5"></div>
    </div>
  </q-page>
</template>

<style>
.login{
  padding:10px;
  width:300px;
  
}
</style>

<script>
export default {
  name: 'PageIndex',
  data(){
    return{
      account:'',
      password:'',
      //username:this.$store.state.users.username,
    }
  },
  methods:{
    login()
    {
      let ac = this.account
      let pw = this.password
      this.$store.dispatch('actionLogin',{ account:ac , password:pw }).then( e => { ac = '' ; pw = ''})
    },
    async signup()
    {
      let ac = this.account
      let pw = this.password
      let res = await this.$store.dispatch('actionSignup',{ account:ac , password:pw , username:this.username }).then( r => { return r }).catch( r => { return r })
      console.log('signup',res)
    },
    Logout()
    {
      this.$store.dispatch('actionLogout')
    }
  },
  computed:{
    username(){ return this.$store.state.users.username }
  }
}
</script>
