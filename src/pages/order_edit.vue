<template>
    <Layout>
        <div class="page-container">
            <div class="page-content">
                <el-form  :model="orderData" :rules="Rules">
                    <el-form-item label="姓名" label-width="60px">
                    <el-input name="name" width="200" v-model="orderData.name"></el-input>
                    </el-form-item>
                    <el-form-item label="手机" label-width="60px" prop="phone">
                        <el-input
                        type="text"
                        v-model="orderData.phone"
                        autocomplete="off"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="车型" label-width="60px">
                        <el-select v-model="orderData.car_id" @change="hadnSelect" value="请重新选择">
                        <el-option v-for="item in vehicleDate" :label="item.car_name" :value="item.id"/>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="租借日期" label-width="90px">
                        <div class="block">
                            <el-date-picker
                            v-model="orderData.data"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </div>
                    </el-form-item>
                    <el-button type="primary" @click="handleSave">保存</el-button>{{orderData.price}}
                    <el-button type="primary" @click="handCancel">取消</el-button>
                </el-form>
            </div>
        </div>
    </Layout>

</template>
<script>
    import Layout from '@/components/Layout'
    import orderModel from '@/models/order.js'
    import vehicleModel from '@/models/vehicle.js'
    import costModel from '@/models/cost.js'

    export default {
        data () {
            return {
                costData:[],
                orderData: {
                    data:[],
                    name: '',
                    phone: '',
                    car_id: '',
                    price:'',
                },  
                vehicleDate:[],
                Rules: {
                    phone: [
                    { required: true, message: "请输入手机号", trigger: "blur" },
                    {
                        pattern: /^1[3456789]\d{9}$/,
                        message: "目前只支持中国大陆的手机号码",
                        trigger: "blur"
                    }
                    ],
                },   
                iscar_id:'',
                price:'',
                car_id:'',
                cost_total:'',
            
            }
        },
        created () {
            this.getOrder();
            this.hadnSelect()
            this.getVehicle();
            this.getPrice();
            
        },
        methods: {
            getOrder(){ 
                let id = this.$route.params.id;
                orderModel.show(id).then(res => {
                    this.orderData = res.data[0];
                    this.car_id = res.data[0].car_id;
                });
            },
            getVehicle(){
                vehicleModel.list().then(res => {
                    this.vehicleDate = res.vehicle;
                })
            },
            hadnSelect(){
                this.car_id = this.orderData.car_id;
                console.log(this.car_id)
                
                // costModel.show(id).then( res => {
                //     // console.log(res)
                //     this.costData = res.data[0]
                // })
                               
            },
            getPrice(){
                // let id = this.car_id;
                // console.log(id)
                // costModel.show(id).then( res => {
                //         // console.log(res.data[0].cost_total)
                //     this.total = res.data[0].cost_total;
                // })
                // vehicleModel.show(id).then(res => {
                //     // console.log(res.data[0].price)
                //     this.price = res.data[0].price;
                // })
                // // console.log(total,'total')
            },

            handleSave:function(){
                
                // console.log(this.orderData)
                let id = this.$route.params.id;
                let index = this.dataIndex;
                let name = this.orderData.name;
                let phone = this.orderData.phone;
                if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))){ 
                    this.$message.info('手机号码有误，请重填'); 
                    return ; 
                }     

                let car_id = this.car_id;                   
                /*租借开始结束时间和天数 */
                let sat_at = this.orderData.data[0];
                let end_at = this.orderData.data[1];
                let d1 = new Date(sat_at);
                let d2 = new Date(end_at);
                let rent_days = (d2 - d1) / (24 * 60 * 60 * 1000)



                let total = this.cost_total;//除租赁费以外的总费用
                console.log(total,'total')
                let price = this.price;//车辆租赁费/天
                console.log(price,'price')
                let cost_total = Number(price) * Number(rent_days) + Number(total)

                console.log(total,'除租赁费总数')
                console.log(price,'租赁费')
                console.log(cost_total,'总费用')

                let params = {name, phone, car_id, sat_at, end_at, rent_days, cost_total }
                console.log(params)
                if( !name || !phone || !car_id || !sat_at || !end_at || !rent_days || !cost_total){
                    this.$message.error('缺少必要参数')
                    return
                }

                // orderModel.update(id,params)
                // .then(() => {
                
                //     this.$message.success('修改成功');
                // })
                // .catch(()=>{
                // })



            },






            handCancel:function(){
                this.$confirm('确定取消修改订单?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(()=>{
                    this.$router.push({
                        name: "Order",
                    });
                })
                .then(()=>{
                    this.$message({
                    type: 'success',
                    message: '返回成功!'
                    });
                    this.$router.push({
                        name: "Order",
                    });
                })
                .catch(() => {
                    this.$message({
                    type: 'info',
                    message: '已取消切换状态'
                    });
                });




               
            },
        },
        components: {
            Layout
        }
    }
</script>
<style lang="less">
  .pg-main-body{
    margin-top: 20px;
  }
  .el-form-item {
      margin-bottom: 22px;
      display: inline-block;
  }
  .input-text{
      width:194px;
  }
  .page-content{
      width:300px;
  }
</style>
