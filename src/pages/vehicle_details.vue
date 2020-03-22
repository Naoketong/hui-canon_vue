<template>
    <Layout>
        <div class="content-control">
        <a href="/admin/vehicle">返回车辆列表</a>
        </div>
        <div class="content-mainer">
            <div class="form-section">

                <div class="form-item">
                    <div class="form-text">车型名字：<span>{{vehicleData.car_name}}</span></div>
                </div>
                <div class="form-item">
                    <div class="form-text">车型id：<span>{{vehicleData.id}}</span></div>
                </div>
                <img class="car_img" :src="vehicleData.car_img" :alt="vehicleData.car_name">
                <div class="form-item">
                    <div class="form-text">车型级别：
                        {{ vehicleData.level === 0 ? "经济型" : "" }}
                        {{ vehicleData.level === 1 ? "SUV" : "" }}
                        {{ vehicleData.level === 2 ? "中级车" : "" }}
                        {{ vehicleData.level === 3 ? "豪华型" : "" }}
                        {{ vehicleData.level === 4 ? "商务型" : "" }}
                        {{ vehicleData.level === 5 ? "6至15座商务车" : "" }}
                    </div>
                </div>
                
                <div class="form-item">
                    <div class="form-text">车辆排放：<span>{{vehicleData.car_displacement}}</span></div>
                </div>
                <div class="form-item">
                    <div class="form-text">车辆结构：<span>{{vehicleData.car_structure}}</span></div>
                </div>

                <div class="form-item">
                    <div class="form-text">车辆状态切换：<br>
                        <el-select v-model="state" style="margin:10px 20px 0 0 ;">
                            <el-option label="空闲" :value="0" />
                            <el-option label="租出" :value="1" />
                            <el-option label="维修保养" :value="2" />
                        </el-select>
                        <a @click="handButton">确定</a>
                    </div>
                </div>      

                
            </div>

            <div class="log-section">
                <div class="form-item">
                    <div class="form-text">车辆租赁费：<span>{{vehicleData.price}}元</span></div>
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
                
            </div>
        </div>
    </Layout>

</template>
<script>
    import Layout from '@/components/Layout'
    import vehicleModel from '@/models/vehicle.js'
    import costModel from '@/models/cost.js'
    export default {
        data() {
            return {
                vehicleData: [],
                costData:[],
                car_id:'',
                state: 0,
            }
        },
        created() {
            let id = this.$route.params.id;
            vehicleModel.show(id).then(res => {
                // console.log(res)
                this.vehicleData = res.data[0];
                let id = res.data[0].id
                costModel.show(id).then( res => {
                    this.costData = res.data[0];
                });
            });
        },
        methods:{
            handButton: function(){
                let id = this.vehicleData.id;
                let state = this.state;
                console.log(id,state)

                this.$confirm('确定状态并返回车辆管理页, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(()=>{
                    return vehicleModel.update(id,{state})
                })
                .then(()=>{
                    this.$message({
                    type: 'success',
                    message: '切换状态成功!'
                    });
                    this.$router.push({
                        name: "Vehicle",
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