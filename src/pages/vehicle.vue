<template>
    <Layout>
        <div class="pg-main-header">
        <el-button type="primary" @click="handleAddUser">添加车型以及费用</el-button><br>
        <el-radio-group style="margin-top:20px;" v-model="radio1" @change="choose">
            <el-radio-button label="vehicle">全部车型</el-radio-button>
			<el-radio-button label="0">经济型</el-radio-button>
			<el-radio-button label="1">SUV</el-radio-button>
            <el-radio-button label="2">中级车</el-radio-button>
            <el-radio-button label="3">豪华型</el-radio-button>
            <el-radio-button label="4">MPV</el-radio-button>
            <el-radio-button label="5">6至15座商务车</el-radio-button>
		</el-radio-group>
        <el-dialog :title="formBoxTitle" :visible="formBoxShow" :show-close="false">
          <el-form class="handEdit" >
            <el-form-item label="车名" label-width="60px">
              <el-input class="input-text" name="car_name" width="200" v-model="formBoxValue.car_name"></el-input>
            </el-form-item>
            <el-form-item label="排量" label-width="60px">
              <el-input class="input-text" name="car_displacement" width="200" v-model="formBoxValue.car_displacement"></el-input>
            </el-form-item>
            <el-form-item label="结构" label-width="60px">
              <el-input class="input-text" name="car_structure" width="200" v-model="formBoxValue.car_structure"></el-input>
            </el-form-item>
            <el-form-item label="级别" label-width="60px">          
                <el-select v-model="formBoxValue.level">
                    <el-option label="经济型" :value="0" />
                    <el-option label="SUV" :value="1" />
                    <el-option label="中级车" :value="2" />
                    <el-option label="豪华型" :value="3" />
                    <el-option label="MPV" :value="4" />
                    <el-option label="6至15座商务车" :value="5" />
                </el-select>
            </el-form-item>
            <el-form-item label="状态" label-width="60px">
                <el-select v-model="formBoxValue.state">
                    <el-option label="空闲" :value="0" />
                    <el-option label="租出" :value="1" />
                    <el-option label="维修保养" :value="2" />
                </el-select>
            </el-form-item>
            <br>
            <el-form-item label="上传文件" prop="file_id">
                <el-upload
                    class="upload-demo"
                    ref="upload"
                    action=""
                    :limit="1"
                    :before-upload="handleBeforeUpload"
                    :on-preview="handleOnPreview"
                    :on-remove="handleBeforeRemove"
                    :file-list="fileList"
                    list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>          
          </el-form>
          <el-form v-if="formBoxCost" :label-position="labelPosition">
            <div style="font-size: 18px;color: #303133;margin-bottom: 10px;">添加费用项(必填)</div>            
            <el-form-item style="width:42%;" label="价格" label-width="60px">
              <el-input class="input-text cost" name="price" width="200" v-model="formBoxValue.price"></el-input>
            </el-form-item>
            <el-form-item style="width:42%;" label="保险费" label-width="60px">
              <el-input class="input-text cost" name="cost_insurance" width="100" v-model="formBoxValue.cost_insurance"></el-input>
            </el-form-item>             
            <el-form-item style="width:39%;" label="整备费" label-width="60px">
              <el-input class="input-text cost" name="cost_servic" width="100" v-model="formBoxValue.cost_servic"></el-input>
            </el-form-item>
            <el-form-item style="width:42%;" label="基础服务费" label-width="90px">
              <el-input class="input-text cost" name="cost_basis" width="100" v-model="formBoxValue.cost_basis"></el-input>
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
          :data="vehicleData"
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
            prop="level"
            label="级别">
            <template slot-scope="scope" >
                {{ scope.row.level === 0 ? "经济型" : "" }}
                {{ scope.row.level === 1 ? "SUV" : "" }}
                {{ scope.row.level === 2 ? "中级车" : "" }}
                {{ scope.row.level === 3 ? "豪华型" : "" }}
                {{ scope.row.level === 4 ? "MPV" : "" }}
                {{ scope.row.level === 5 ? "6至15座商务车" : "" }}
            </template>
          </el-table-column>
           <el-table-column
            prop="state"
            label="状态">
            <template slot-scope="scope" >
                <el-tag :type="scope.row.state === 2 ? 'danger' : ''">
                {{ scope.row.state === 0 ? "空闲" : "" }}
                {{ scope.row.state === 1 ? "租出" : "" }}
                {{ scope.row.state === 2 ? "维修保养" : "" }}
                </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="car_displacement"
            label="排量">
          </el-table-column>
          <el-table-column
            prop="car_structure"
            label="车身结构">
          </el-table-column>
           <el-table-column
            prop="price"
            label="价格">
            <template slot-scope="scope">
                {{scope.row.price}}元
            </template>
          </el-table-column>
          <el-table-column
            prop="operation"
            label="操作">
            <template slot-scope="scope">
                <el-button  type="text" icon="el-icon-discount" @click="handledetails(scope.row,scope.$index)">查看详情</el-button>
                <el-button  type="text" icon="el-icon-edit" @click="handleEditUser(scope.row,scope.$index)">编辑</el-button>
                <el-button  type="text" icon="el-icon-delete" @click="handleDelete(scope.row,scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
     <el-pagination
        v-show="paging"
        v-if="pagination.total > pagination.pageSize"
        background
        layout="prev, pager, next"
        :current-page.sync="pagination.currentPage"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        @current-change="getData"
        >
        </el-pagination>
    </Layout>
</template>
<script>
    import Layout from '@/components/Layout'
    import vehicleModel from '@/models/vehicle.js'
    import qiniuService from "@/models/qiniu.js"
    export default {
        data() {
            return{
                radio1: 'vehicle',	
                labelPosition:'right ',		
                fileList:[],
                car_img:'',
                vehicleData:[],
                dataIndex: null,
                formBoxID: null,
                formBoxShow: false,
                formBoxCost:false,
                formBoxTitle: '',
                formBoxValue: {
                    car_name: '',
                    state: '',
                    level: '',
                    car_displacement:'',
                    car_structure:'',
                    price:'',
                    cost_basis:'',
                    cost_servic:'',
                    cost_insurance:'',
                },
                formData:{
                    file_id:'',
                },
                uploadLimit:{
                    size:2048,
                },
                btnloading:false,
                pagination: {
                    total: 0,
                    currentPage: 1,
                    pageSize: 10
                },
                paging:false,               
            }
        },
        created () {
            this.getData();
        },
        methods: {
            choose(e){
                if(e == 'vehicle'){
                    this.getData();
                }else if(e !== 'vehicle'){
                    let level = e;
                    vehicleModel.level({level}).then(res=>{
                        this.vehicleData = res.data.vehicle;
                        this.paging = false;
                    })
                }
            },
            getData() {
                let params = {
                    current_page: this.pagination.currentPage,
                    page_size: this.pagination.pageSize,
                };
                // console.log(params)
                vehicleModel
                    .list(params)
                    .then(res => {
                    // console.log(res)
                    this.vehicleData = res.data.datas;
                    this.pagination.pageSize = Number(res.data.pagination.page_size);
                    this.pagination.currentPage = Number(res.data.pagination.current_page);
                    this.pagination.total = Number(res.data.pagination.total);
                })
                this.paging = true;
            },
            handleOnPreview(file) {
                window.open(file.url);
            },
            handleBeforeRemove(file) {
                if (file && file.status === 'success') {
                this.fileList = [];
                this.formData.file_id = '';
                }
            },
            handleBeforeUpload(file) {
                if (!file || !this.validateSize(file)) {
                return false;
                }
                this.btnloading = true;
                qiniuService.upload(file).then(res => {
                    // console.log(res)
                    this.car_img = res;
                this.fileList = [{ name: '上传成功', url: res }];
                this.formData.file_id = res.id;
                }).finally(() => {
                this.btnloading = false;
                });
                return false;
            },
            // 验证大小
            validateSize(file) {
                const size = this.uploadLimit * 1024 * 1024;
                const fileName = file.name;
                const suffix = fileName.split('.').pop();
                const imageRegex = /(jpeg|png|jpg)/;
                if (file.size > size || !imageRegex.test(suffix)) {
                this.$message.error(`请上传不大于 ${this.uploadLimit}MB 且格式为zip、rar 的文件`);
                return false;
                }
                return true;          
            },
            handleAddUser() {
                this.formBoxShow = true;
                this.formBoxCost = true,
                this.formBoxTitle = '添加车型';
                this.formBoxID = '';
                this.formBoxValue.car_name = '';
                this.formBoxValue.state = '';
                this.formBoxValue.level = '';
                this.formBoxValue.car_displacement = '',
                this.formBoxValue.car_structure = '';
                this.formBoxValue.price = '';
                this.cost_basis = '';
                this.cost_servic = '';
                this.cost_insurance = '';
            },
            handleCancel() {
                this.formBoxShow = false;
                this.formBoxID = '';
                this.formBoxValue.car_name = '';
                this.formBoxValue.state = '';
                this.formBoxValue.level = '';
                this.formBoxValue.car_displacement = '',
                this.formBoxValue.car_structure = '';
                this.formBoxValue.price = '';
                this.fileList = [];
                this.cost_basis = '';
                this.cost_servic = '';
                this.cost_insurance = '';
            },
            handleEditUser(data,index) {
                this.formBoxTitle = '编辑车型';
                this.formBoxCost = false,
                this.formBoxID = data.id;
                this.formBoxValue.car_name = data.car_name;
                this.formBoxValue.state = data.state;
                this.formBoxValue.level = data.level;
                this.formBoxValue.car_displacement = data.car_displacement;
                this.formBoxValue.car_structure =  data.car_structure;
                this.formBoxValue.price = data.price;
                this.formBoxShow = true;
                
                this.dataIndex = index;
                this.cost_basis = '';
                this.cost_servic = '';
                this.cost_insurance = '';
            },
            handleSave() {
                this.fileList = [];
                let id = this.formBoxID; 
                let index = this.dataIndex;
                let car_name = this.formBoxValue.car_name;
                let state = this.formBoxValue.state;
                let level = this.formBoxValue.level
                let car_img = this.car_img;
                let car_displacement = this.formBoxValue.car_displacement;
                let car_structure = this.formBoxValue.car_structure;
                let price = this.formBoxValue.price;
                let cost_basis = this.formBoxValue.cost_basis;
                let cost_servic = this.formBoxValue.cost_servic;
                let cost_insurance = this.formBoxValue.cost_insurance
                // let params = { car_name, state, price, level, car_img, car_displacement, car_structure }
                let params = {
                    car_name, 
                    state, 
                    price, 
                    level, 
                    car_img, 
                    car_displacement, 
                    car_structure,
                    cost_basis,
                    cost_servic,
                    cost_insurance
                }
                let paramsedit = {
                    car_name, 
                    state, 
                    price, 
                    level, 
                    car_displacement, 
                    car_structure,
                    cost_basis,
                    cost_servic,
                    cost_insurance
                    }
                console.log(params)
                // if(!car_name || !state || !level || !price || !car_img || !car_displacement || !car_structure){
                //   this.$message.error('缺少必要参数(车型)')
                //   return
                // }
                // if( !cost_basis || !cost_servic ||  !cost_insurance){
                //   this.$message.error('缺少必要参数(费用)')
                //   return
                // }
                // 修改
                if(id){
                    vehicleModel.update(id,paramsedit)
                    .then(() => {
                        this.vehicleData[index].car_name = car_name;
                        this.vehicleData[index].state = state;
                        this.vehicleData[index].level = level;
                        this.vehicleData[index].car_displacement = car_displacement
                        this.vehicleData[index].car_structure = car_structure;
                        this.vehicleData[index].price = price;
                        // this.vehicleData[index].car_img = car_img;
                        this.formBoxValue.cost_basis = '';
                        this.formBoxValue.cost_servic = '';
                        this.formBoxValue.cost_insurance = '';
                        this.formBoxShow = false;
                        this.vehicleData.splice(index,1)
                        this.$message.success('修改成功');
                    })
                    .catch(()=>{
                        this.formBoxShow = false;
                    })
                
                }else{
                    // 添加
                    vehicleModel.add(params)
                    .then(res => {
                        console.log(res)
                        let id = res.data.id;
                        params.id = id;
                        this.vehicleData.push(params)
                        this.formBoxShow = false;
                        this.$message.success('添加成功');
                        this.formBoxValue.cost_basis = '';
                        this.formBoxValue.cost_servic = '';
                        this.formBoxValue.cost_insurance = '';
                    })
                    .catch(()=>{
                        this.formBoxShow = false;
                    })
                   
                }
            },
            handleDelete(data,index) {
                this.$confirm('此操作将永久删除该车型及费用列表, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(()=>{
                    
                    return vehicleModel.delete(data.id)
                })
                .then(()=>{
                    this.vehicleData.splice(index,1)
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
            },
            handledetails(row) {
            const { id } = row;
            this.$router.push({
                name: "Vehicle_details",
                params: { id }
            });
            },
        },
        components: {
            Layout,
        },
    }
</script>
<style scoped lang="less">
    .el-form-item {
        margin-bottom: 22px;
        display: inline-block;
    }
    .input-text{
        width:194px;
    }
    .input-text.cost{
        width:194px;
    }
</style>