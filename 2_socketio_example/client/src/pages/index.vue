<template>
  <q-page>
    <div class="row">
      <div class="col-4"></div>
      <div class="col-4" style="margin-top:200px;padding:20px;">
        <div style="text-align:center;margin-bottom:20px">
          <router-link to="/others"><q-btn label="到別頁去"/></router-link>
        </div>
        
        
        <q-input stack-label="just key something" v-model="inputdata" @change.native="addData"/>
        <br>
        <br>
        最後新增於 {{ getLastUpdate }} <br>
        <label for=""> Socket io here</label>
        <br>
        <br>
        <template v-for="i in getData">
          <p :key="i._id">{{ i.data }}</p>
        </template>

      </div>
      <div class="col-4"></div>
    </div>
    
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  data(){
    return{
      inputdata: '123'
    }
  },
  computed:{
    getData()
    {
      return this.$store.getters.getDatas
    },
    getLastUpdate()
    {
      return this.$store.getters.getLastUpdate
    }
  },
  methods:{
    addData()
    {
      let data = this.inputdata
      console.log('data in view',data)
      this.$store.dispatch('actionAddData', { data:data } )
    }
  },
  mounted()
  {
    console.log('mounted!!!!!!!!!!!!')
    this.$store.dispatch('actionSendData')
  }
}
</script>
