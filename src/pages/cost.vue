<template>
    <Layout>
        <div class="pg-main-header">
        <el-button type="primary" @click="handleAddUser">添加费用项</el-button>
        <el-dialog :title="formBoxTitle" :visible="formBoxShow" :show-close="false">
          <el-form >
          <el-form-item label="车型" label-width="60px">
                <el-select v-model="formBoxValue.car_id">
                  <el-option v-for="item in vehicleDate" :label="item.car_name" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="基础服务费" label-width="90px">
              <el-input name="cost_basis" width="100" v-model="formBoxValue.cost_basis"></el-input>
            </el-form-item>
            
            <el-form-item label="整备费" label-width="60px">
              <el-input name="cost_servic" width="100" v-model="formBoxValue.cost_servic"></el-input>
            </el-form-item>
            <el-form-item label="保险费" label-width="60px">
              <el-input name="cost_insurance" width="100" v-model="formBoxValue.cost_insurance"></el-input>
            </el-form-item>                   
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleSave">保存</el-button>
            <el-button @click="handleCancel">取消</el-button>
          </div>
        </el-dialog>
      </div>
      <div class="pg-main-body">
        <el-table
          :data="costData"
          size="small"
          style="width: 100%">
          <el-table-column
            prop="car_img"
            label="图片">
            <template slot-scope="scope" >
               <el-image
                style="width: 140px; height: 100px"
                :src="scope.row.car_img"
                ></el-image>
            </template>
          </el-table-column>
          <el-table-column
            prop="car_name"
            label="车名">
          </el-table-column>
          <el-table-column
            prop="cost_basis"
            label="基础费">
            <template slot-scope="scope">
                {{scope.row.cost_basis}}元
            </template>
          </el-table-column>
          
          <el-table-column
            prop="cost_servic"
            label="整备费">
			 <template slot-scope="scope">
                {{scope.row.cost_servic}}元
            </template>
          </el-table-column>
          <el-table-column
            prop="cost_insurance"
            label="保险费">
			 <template slot-scope="scope">
                {{scope.row.cost_insurance}}元
            </template>
          </el-table-column>
          <el-table-column
            prop="cost_total"
            label="除租赁总费用">
			 <template slot-scope="scope">
                {{scope.row.cost_total}}元
            </template>
          </el-table-column>
         
          <el-table-column
            prop="operation"
            label="操作">
            <template slot-scope="scope">
              <el-button  type="text" icon="el-icon-edit" @click="handleEditUser(scope.row,scope.$index)">编辑</el-button>
              <el-button  type="text" icon="el-icon-delete" @click="handleDelete(scope.row,scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </Layout>

</template>
<script>
    import Layout from '@/components/Layout'
    import costModel from '@/models/cost.js'
    import vehicleModel from '@/models/vehicle.js'
    export default {
		inject:["reload"],
        data() {
            return{
                fileList:[],
                costData:[],
                vehicleDate:[],
                dataIndex: null,
                formBoxID: null,
                formBoxShow: false,
                formBoxTitle: '',
                formBoxValue: {
                    car_id: '',
                    cost_basis: '',
                    cost_servic: '',
                    cost_insurance: '',
                    // cost_total: '',
                },
                
            }
        },
        created () {
            costModel.list().then( res => {
                this.costData = res.data;
                console.log(res)
            });
            vehicleModel.list().then(res => {
                this.vehicleDate = res.vehicle;
                // console.log(this.vehicleDate)
            })
            
        },
        methods: {
            handleAddUser() {
                this.formBoxShow = true;
                this.formBoxTitle = '添加费用项';
                this.formBoxID = '';
                this.formBoxValue.car_id = '';
                this.formBoxValue.cost_basis = '';
                this.formBoxValue.cost_servic = '';
                this.formBoxValue.cost_insurance = '';
            },
            handleCancel() {
                this.formBoxShow = false;
                this.formBoxID = '';
                this.formBoxValue.car_id = '';
                this.formBoxValue.cost_basis = '';
                this.formBoxValue.cost_servic = '';
                this.formBoxValue.cost_insurance = '';
            },
            handleEditUser(data,index) {
                this.formBoxTitle = '编辑费用';
                this.formBoxID = data.id;
                this.formBoxValue.car_id = data.car_id;
                this.formBoxValue.cost_basis = data.cost_basis;
                this.formBoxValue.cost_servic = data.cost_servic;
                this.formBoxValue.cost_insurance = data.cost_insurance;
                this.formBoxShow = true;
                this.dataIndex = index
            },
            handleSave() {
                let id = this.formBoxID;
                let car_id = this.formBoxValue.car_id;
                let cost_basis = this.formBoxValue.cost_basis;
                let cost_servic = this.formBoxValue.cost_servic;
                let cost_insurance = this.formBoxValue.cost_insurance
                let index = this.dataIndex;
                let params = { car_id, cost_basis, cost_servic,  cost_insurance }
                console.log(params)
                if(!car_id || !cost_basis || !cost_servic ||  !cost_insurance){
                  this.$message.error('缺少必要参数')
                  return
                }
                // 修改
                if(id){
                    costModel.update(id,params)
                    .then(() => {
                        this.costData[index].car_id = car_id
                        this.costData[index].cost_basis = cost_basis
                        this.costData[index].cost_servic = cost_servic
                        this.costData[index].cost_insurance = cost_insurance;
                        this.costData[index].car_img = car_img
                        this.costData[index].car_name = car_name

                        this.formBoxShow = false;
                        this.$message.success('修改成功');
                    })
                    .catch(()=>{
                        this.formBoxShow = false;
                    })
                
                }else{
                    // 添加
                    costModel.add(params)
                    .then(res => {
						this.reload();
                        console.log(res)
                        let id = res.data.id;
                        params.id = id;
                        this.costData.push(params)
                        this.formBoxShow = false;
                        this.$message.success('添加成功');
						
                    })
                    .catch(()=>{
                        this.formBoxShow = false;
                    })
                }
            },
            handleDelete(data,index) {
                this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(()=>{
                    
                    return costModel.delete(data.id)
                })
                .then(()=>{
                    this.costData.splice(index,1)
                    this.$message({
                    type: 'success',
                    message: '删除成功!'
                    });
                })
                .catch(() => {
                    this.$message({
                    type: 'info',
                    message: '已取消删除'
                    });
                });
            }
        },
        components: {
            Layout,
        },
    }
</script>
<style lang="less">
  .pg-main-body{
    margin-top: 20px;
  }
  .el-form-item {
      margin-bottom: 22px;
      display: inline-block;
      width:250px;
  }
  .input-text{
      width:194px;
  }
</style>