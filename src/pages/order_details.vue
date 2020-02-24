<template>
    <Layout>
        
        <div class="content-control">
        <a href="/admin/order">返回订单列表</a>
        </div>
        <div class="content-mainer">
        <div class="form-section">
            <div class="form-item">
                <div class="form-text">客户名称：<span>{{orderData.guest_name}}</span></div>
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
                <div class="form-text">订单状态：<span>{{orderData.order_state}}</span></div>
            </div>






            <div class="form-item">
                <div class="form-text">车辆租赁费：<span>{{costData.cost_lease}}元</span></div>
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
            
            
                <!-- <div class="form-item">
                    <select id="clueUserId" class="form-input">
                        <option value="0">请选择分配销售</option>
                    </select>
                </div> -->
            
            <!-- <div class="form-item">
                <p class="form-text">备注：</p>
                <textarea id="clueRemark" class="form-textarea" placeholder="备注信息">clue.remark}}</span></textarea>
            </div> -->
            <!-- <div class="form-item">
            </div> -->
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
                <div class="form-text">车型级别：<span>{{orderData.level}}</span></div>
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
        data() {
            return {
                orderData: [],
                costData:[],
                car_id:'',
            }
        },
        created() {
            let id = this.$route.params.id;
            orderModel.show(id).then(res => {
                this.orderData = res.data[0];
                let id = res.data[0].car_id
                costModel.show(id).then( res => {
                    this.costData = res.data[0];
                });
            });
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