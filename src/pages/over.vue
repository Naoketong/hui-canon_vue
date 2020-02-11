<template>
    <Layout>
        <div>概览</div>

    <el-image
      style="width: 100px; height: 100px"
      :src="url"
      ></el-image>
  </div>
</div>


    </Layout>

</template>
<script>
    import Layout from '@/components/Layout'

    export default {
        data() {
            return{
                fits: ['fill',],
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            }
        },
        components: {
            Layout,
        },
    }
</script>