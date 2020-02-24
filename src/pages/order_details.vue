<template>
    <Layout>
        <div>订单详情</div>
    </Layout>

</template>
<script>
    import Layout from '@/components/Layout'
    import orderModel from '@/models/order.js'
    export default {
        data() {
            return{
                 orderData: [],
            }
        },
        created(){
            orderModel.list().then( res => {
                this.orderData = res.data;
                console.log(this.orderData)
            });
        },
        components: {
            Layout,
        },
    }
</script>