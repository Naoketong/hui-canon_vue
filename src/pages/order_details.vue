<template>
    <Layout>
        <div class="content-control">
        <a href="/admin/order">返回订单列表</a>
        </div>
        <div class="content-mainer">
        <div class="form-section">
            <div class="form-item">
                <div class="form-text">客户名称：<span>{{orderData.name}}</span></div>
            </div>
            <div class="form-item">
                <div class="form-text">联系电话：<span>{{orderData.phone}}</span></div>
            </div>
            <div class="form-item">
                <div class="form-text">订单号：<span>{{orderData.order_number}}</span></div>
            </div>
            
            <div class="form-item">
                <div class="form-text">创建时间：<span>{{orderData.order_date}}</span></div>
            </div>
            <div class="form-item">
                <div class="form-text">订单状态：
                    <el-tag :type="orderData.order_state === 1 ? 'danger' : ''">
                    {{ orderData.order_state === 1 ? "进行中" : "" }}
                    {{ orderData.order_state === 2 ? "已完成" : "" }}
                    {{ orderData.order_state === 3 ? "已取消" : "" }}
                    </el-tag>
                </div>
            </div>
            <div class="form-item">
                <div class="form-text">是否取车：
                    <el-tag :type="orderData.get_car === 1 ? 'danger' : ''">
                    {{ orderData.get_car === 1 ? "未取车" : "" }}
                    {{ orderData.get_car === 2 ? "已取车" : "" }}
                    </el-tag>
                </div>
            </div>






            <div class="form-item">
                <div class="form-text">车辆租赁费：<span>{{orderData.price}}元</span></div>
            </div>
            <div class="form-item">
                <div class="form-text">基础服务费：<span>{{costData.cost_basis}}元</span></div>
            </div>
            <div class="form-item">
                <div class="form-text">车辆整备费：<span>{{costData.cost_servic}}元</span></div>
            </div>
            <div class="form-item">
                <div class="form-text">车辆保险费：<span>{{costData.cost_insurance}}元</span></div>
            </div>
            <div class="form-item">
                <div class="form-text">费用总数：<span>{{orderData.cost_total}}元</span></div>
            </div>
             <div class="form-item"  v-show="not_getCar">
                <div class="form-text">取车状态切换：<br>
                    <el-select v-model="get_car" style="margin:10px 20px 0 0 ;">
                        <el-option label="确定取车" :value="2" />
                        <el-option label="取消取车" :value="1" />
                    </el-select>
                    <a @click="handButton_car">确定</a>
                </div>
            </div>           
            
        </div>

        <div class="log-section">
            
            <div class="form-item">
                <div class="form-text">车型名字：<span>{{orderData.car_name}}</span></div>
            </div>
             <div class="form-item">
                <div class="form-text">车型id：<span v-model="car_id">{{orderData.car_id}}</span></div>
            </div>
            <img class="car_img" :src="orderData.car_img" :alt="orderData.car_name">
            <div class="form-item">
                <div class="form-text">车型级别：
                    {{ orderData.level === 0 ? "经济型" : "" }}
                    {{ orderData.level === 1 ? "SUV" : "" }}
                    {{ orderData.level === 2 ? "中级车" : "" }}
                    {{ orderData.level === 3 ? "豪华型" : "" }}
                    {{ orderData.level === 4 ? "商务型" : "" }}
                    {{ orderData.level === 5 ? "6至15座商务车" : "" }}
                </div>
            </div>
            <div class="form-item">
                <div class="form-text">租借开始时间：<span>{{orderData.sat_at}}</span></div>
            </div>
            <div class="form-item">
                <div class="form-text"> 租借结束时间：<span>{{orderData.end_at}}</span></div>
            </div>
            <div class="form-item">
                <div class="form-text">租借天数：<span>{{orderData.rent_days}}天</span></div>
            </div>
            <div class="form-item" v-show="order_results">
                <div class="form-text">订单状态切换：<br>
                    <el-select v-model="order_state" style="margin:10px 20px 0 0 ;">
                        <!--<el-option label="继续进行" :value="1" />-->
                        <el-option label="完成订单" :value="2" />
                        <el-option label="取消订单" :value="3" />
                    </el-select>
                    <a @click="handButton">确定</a>
                </div>
            </div>           
            </div>
        </div>
        </div>
    </Layout>

</template>
<script>
    import Layout from '@/components/Layout'
    import orderModel from '@/models/order.js'
    import costModel from '@/models/cost.js'
    export default {
        inject:["reload"],
        data() {
            return {
                orderData: [],
                costData:[],
                car_id:'',
                order_state: '请选择状态',
                get_car:'请确定是否取车',
                not_getCar:true,
                order_results:true,
            }
        },
        created() {
            let id = this.$route.params.id;
            orderModel.show(id).then(res => {
                // console.log(res)
                this.orderData = res.data[0];
                let id = res.data[0].car_id
                costModel.show(id).then( res => {
                    this.costData = res.data[0];
                });
                // console.log(res[0].get_car)
                if(res.data[0].get_car == 1){
                    this.not_getCar = true;
                }else{
                    this.not_getCar = false
                }
                if(res.data[0].order_state == 2 || res.data[0].order_state == 3){
                    this.order_results = false;
                }
            });
        },
        methods:{
            handButton_car: function(){
                let id = this.orderData.order_number;
                let get_car = this.get_car;
                // console.log(get_car)
                if(get_car == 2){
                    this.$confirm('确定客户已到店及确定取车吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    })
                    .then(()=>{
                        return orderModel.modify(id,{get_car})
                        
                    })
                    .then(()=>{
                        // this.reload();
                        this.$message({
                        type: 'success',
                        message: '成功切换状态!'
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
                    
                }else{
                    this.$confirm('确定客户放弃取车吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    })
                    .then(()=>{
                        return orderModel.modify(id,{get_car})
                        
                    })
                    .then(()=>{
                        this.reload();
                        this.$message({
                        type: 'success',
                        message: '成功切换状态!'
                        });
                    })
                    .catch(() => {
                        this.$message({
                        type: 'info',
                        message: '已取消切换状态'
                        });
                    });
                }

            },
            handButton: function(){
                let id = this.orderData.order_number;
                let order_state = this.order_state;
                let car_id = this.orderData.car_id;
                let get_car = this.orderData.get_car;
                // console.log(get_car)
                if(this.orderData.get_car == 2 && order_state == 3){
                    this.$message({
                    type: 'info',
                    message: '客户已取车，无法取消订单!'
                    });
                    return
                }
                this.$confirm('确定状态并返回订单主页, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(()=>{
                    return orderModel.modify(id,{order_state,car_id})
                })
                .then(()=>{
                    this.$message({
                    type: 'success',
                    message: '切换状态成功!'
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
            Layout,
        },
    }
</script>

<style>
    .content-control {
        margin: 10px 0;
    }
    
    a {
        display: inline-block;
        width: 110px;
        line-height: 40px;
        font-size: 14px;
        border-radius: 4px;
        text-align: center;
        color: #FFF;
        background-color: #409EFF;
        border-color: #409EFF;
        text-decoration: none;
        cursor:pointer;
    }
    .car_img{
        width:130px;
        height:100px;
    }
    
    .form-item {
        width: 400px;
        margin: 20px 0;
        font-size: 14px;
        color: #606266;
    }
    
    .form-item .form-text span {
        color: #303133;
    }
    
    .form-input {
        display: block;
        width: 100%;
        height: 40px;
        line-height: 40px;
        padding: 10px;
        border: 1px solid #e4e4e4;
        border-radius: 4px;
        font-size: 14px;
    }
    
    .form-textarea {
        display: block;
        width: 100%;
        line-height: 20px;
        height: 80px;
        padding: 10px;
        border: 1px solid #e4e4e4;
        border-radius: 4px;
        font-size: 14px;
    }
    
    .form-button {
        display: block;
        width: 100%;
        height: 40px;
        text-align: center;
        font-size: 16px;
    }
    /*记录列表样式*/
    
    .content-mainer {
        display: flex;
    }
    
    .log-section {
        flex: 1;
        margin-left: 60px;
    }
    
    
</style>