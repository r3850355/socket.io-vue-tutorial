<template>
  <q-page>
    <div class="row">
      <div class="col-4"></div>
      <div class="col-4" style="margin-top:200px;padding:20px;">
        
       
        <q-input class="datainput" stack-label="姓名" v-model="localdata_patient.name"    @change.native="updateData" @blur="release()" @focus="keepData('name')"/>
        <q-input class="datainput" stack-label="手機" v-model="localdata_patient.phone"   @change.native="updateData" @blur="release()" @focus="keepData('phone')"/>
        <q-input class="datainput" stack-label="住址" v-model="localdata_patient.address" @change.native="updateData" @blur="release()" @focus="keepData('address')"/>

        <h6>最後更新於 {{ localdata_patient.updateAt }}</h6>
      </div>
      <div class="col-4"></div>
    </div>
    <div style="display:none">{{ getPatient }}</div>
  </q-page>
</template>

<style>
.datainput{
  width: 300px;
  margin:10px;
}
</style>

<script>
import _ from 'lodash'
export default {
  name: 'PageIndex',
  data(){
    return{
      localdata_patient: {},
      vuex_backup: {},
      keepKey: '',
      notSync: '',
    }
  },
  computed:{
    getPatient:
    {
      get(){
        let vuexdata  = this.$store.getters.getPatient
  
        //初始化localdata
        if(_.size(this.localdata_patient) == 0){ this.localdata_patient = Object.assign( {} , vuexdata)}

        //初始化修改前vuex
        if(_.size(this.vuex_backup) == 0){ this.vuex_backup = Object.assign( {} , vuexdata)}

        //如果修改前不等於最新的vuex 那就更新最新的值
        if( JSON.stringify(this.vuex_backup) != JSON.stringify(vuexdata) ){ 
          //檢查是否畫面focus在輸入欄位上  是的話就不同步聚焦那格
          if(this.keepKey != ''){
            for( let i in vuexdata)
            {
              if( i != this.keepKey){ 
                this.localdata_patient[i] = vuexdata[i]  
              }else{
                //沒同步到的話 怕他只點選沒改這格 所以要更新這格資料
                this.notSync = vuexdata[i]
              }
            }
          }else{
            this.localdata_patient = Object.assign( {} , vuexdata)
          }          
          this.vuex_backup = Object.assign( {} , vuexdata)
        }
      },
      set(value){
        //nothing to do here ~      
      }      
    }
  },  
  methods:{
    updateData()
    {
      //欄位onchange 就更新到db
      this.$store.dispatch('actionUpdatePatient', {data :this.localdata_patient})
      this.keepKey = ''
      this.notSync = ''
    },
    keepData(key)
    {
      //聚焦時將欄位名稱存起來
      this.keepKey = key
    },
    release()
    {
      //解除聚焦時釋放欄位名稱      
      //如果有鎖定欄位 但沒修改的話就更新成最新的 
      if(this.notSync){ 
        this.localdata_patient[this.keepKey] = this.notSync
        this.$store.dispatch('actionUpdatePatient', {data :this.localdata_patient})
      }
      this.keepKey = ''
      this.notSync = ''
    }
  },
  mounted()
  {
    //初始化觸法socket.io監聽事件
    this.$store.dispatch('actionGetPatient')   
  }
}
</script>
