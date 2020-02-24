<template>
    <Layout>
        <div class="block">
    <span class="demonstration" @click="qq">默认</span>
    <el-date-picker
      v-model="value"
      
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      >
    </el-date-picker>
    </br>
  </div>
 
  


    </Layout>

</template>
<script>
    import Layout from '@/components/Layout'

    export default {
        data() {
            return{
                
        value: '',
            }
        },
        created(){
            console.log()
        },
        methods:{
            qq(){
                console.log(this.value)
            },
        },
        components: {
            Layout,
        },
    }
</script>