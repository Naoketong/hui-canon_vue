<template>
    <Layout>
        <div class="pg-main-header">
        <el-button type="primary" @click="handleAddUser">添加车型</el-button>
        <el-dialog :title="formBoxTitle" :visible="formBoxShow" :show-close="false">
          <el-form >
            <el-form-item label="车名" label-width="60px">
              <el-input name="name" width="200" v-model="formBoxValue.name"></el-input>
            </el-form-item>
            <el-form-item label="级别" label-width="60px">          
                <el-select v-model="formBoxValue.level">
                    <el-option label="经济型" :value="0" />
                    <el-option label="SUV" :value="1" />
                    <el-option label="中级车" :value="2" />
                    <el-option label="豪华型" :value="3" />
                    <el-option label="商务型" :value="4" />
                    <el-option label="6至15座商务车" :value="5" />
                </el-select>
            </el-form-item>
            <el-form-item label="价格" label-width="60px">
              <el-input type="price" name="price" width="200" v-model="formBoxValue.price"></el-input>
            </el-form-item>
            <el-form-item label="状态" label-width="60px">
                <el-select v-model="formBoxValue.state">
                    <el-option label="空闲" :value="0" />
                    <el-option label="租出" :value="1" />
                    <el-option label="维修保养" :value="2" />
                </el-select>
            </el-form-item>


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
            prop="name"
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
                {{ scope.row.level === 4 ? "商务型" : "" }}
                {{ scope.row.level === 5 ? "6至15座商务车" : "" }}
            </template>
          </el-table-column>
           <el-table-column
            prop="price"
            label="价格">
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
    import vehicleModel from '@/models/vehicle.js'
    import qiniuService from "@/models/qiniu.js"
    export default {
        data() {
            return{
                fileList:[],
                car_img:'',
                vehicleData:[],
                dataIndex: null,
                formBoxID: null,
                formBoxShow: false,
                formBoxTitle: '',
                formBoxValue: {
                    name: '',
                    price: '',
                    state: '',
                    level: '',
                },
                formData:{
                    file_id:'',
                },
                uploadLimit:{
                    size:2048,
                },
                
                
                btnloading:false,
            }
        },
        created () {
            vehicleModel.list().then( res => {
            this.vehicleData = res.data;
            })
            
        },
        methods: {
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
                this.formBoxTitle = '添加车型';
                this.formBoxID = '';
                this.formBoxValue.name = '';
                this.formBoxValue.price = '';
                this.formBoxValue.state = '';
                this.formBoxValue.level = '';
                // this.car_img = '';
            },
            handleCancel() {
                this.formBoxShow = false;
                this.formBoxID = '';
                this.formBoxValue.name = '';
                this.formBoxValue.price = '';
                this.formBoxValue.state = '';
                this.formBoxValue.level = '';
            },
            handleEditUser(data,index) {
                this.formBoxTitle = '编辑用户';
                this.formBoxID = data.id;
                this.formBoxValue.name = data.name;
                this.formBoxValue.price = data.price;
                this.formBoxValue.state = data.state;
                this.formBoxValue.level = data.level;
                this.formBoxShow = true;
                this.dataIndex = index
            },
            handleSave() {
                let id = this.formBoxID;
                let name = this.formBoxValue.name;
                let state = this.formBoxValue.state;
                let price = this.formBoxValue.price;
                let level = this.formBoxValue.level
                let index = this.dataIndex;
                let car_img = this.car_img;
                let params = { name, state, price, level, car_img }
                console.log(params)
                // if(!name || !state || !price){
                //   this.$message.error('缺少必要参数')
                //   return
                // }
                // 修改
                if(id){
                    vehicleModel.update(id,params)
                    .then(() => {
                        this.vehicleData[index].name = name
                        this.vehicleData[index].state = state
                        this.vehicleData[index].price = price
                        this.vehicleData[index].level = level;
                        // this.vehicleData[index].car_img = car_img
                        this.formBoxShow = false;
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
                    })
                    .catch(()=>{
                        this.formBoxShow = false;
                    })
                }
            },
            handleDelete(data,index) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
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
            }
        },
        components: {
            Layout,
        },
    }
</script>