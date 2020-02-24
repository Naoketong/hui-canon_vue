<template>
    <Layout>
        <div>出租</div>
  <div class="block">
    <span class="demonstration">默认为 Date 对象</span>
    <div class="demonstration">值：{{ value1 }}</div>
    <el-date-picker
      v-model="value1"
      type="date"
      placeholder="选择日期"
      format="yyyy 年 MM 月 dd 日">
    </el-date-picker>
  </div>
  <div class="block">
    <span class="demonstration">使用 value-format</span>
    <div class="demonstration">值：{{ value2 }}</div>
    <el-date-picker
      v-model="value2"
      type="date"
      placeholder="选择日期"
      format="yyyy 年 MM 月 dd 日"
      value-format="yyyy-MM-dd">
    </el-date-picker>
  </div>
  <div class="block">
    <span class="demonstration">时间戳</span>
    <div class="demonstration">值：{{ value3 }}</div>
    <el-date-picker
      v-model="value3"
      type="date"
      placeholder="选择日期"
      format="yyyy 年 MM 月 dd 日"
      value-format="timestamp">
    </el-date-picker>
  </div>

    </Layout>

</template>
<script>
    import Layout from '@/components/Layout'

    export default {
        data() {
            return{
              value1: '',
              value2: '',
              value3: ''
            }
        },
        methods: {

        },
      
    
  created(){
   
  },
  methods:{

  },

        components: {
            Layout,
        },
    }
</script>