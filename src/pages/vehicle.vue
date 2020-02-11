<template>
    <Layout>
        <div class="pg-main-header">
        <el-button type="primary" @click="handleAddUser">添加用户</el-button>
        <el-dialog :title="formBoxTitle" :visible="formBoxShow" :show-close="false">
          <el-form >
            <el-form-item label="车名" label-width="60px">
              <el-input name="name" width="200" v-model="formBoxValue.name"></el-input>
            </el-form-item>
            <el-form-item label="级别" label-width="60px">

            <!--<template>
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                </template>-->
                <el-select v-model="value">
                    <el-option label="经济型" :value="0" />
                    <el-option label="SUV" :value="1" />
                    <el-option label="中级车" :value="2" />
                    <el-option label="豪华型" :value="3" />
                    <el-option label="商务型" :value="4" />
                    <el-option label="6至15座商务车" :value="5" />
                </el-select>
            </el-form-item>
            <el-form-item label="价格" label-width="60px">
              <el-input type="car_id" name="car_id" width="200" v-model="formBoxValue.car_id"></el-input>
            </el-form-item>
            <el-form-item label="状态" label-width="60px">
                <el-select v-model="car_state">
                    <el-option label="空闲" :value="0" />
                    <el-option label="租出" :value="1" />
                    <el-option label="维修保养" :value="2" />
                </el-select>
            </el-form-item>


            <el-form-item label="图片" label-width="60px">
                <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，一次只能一张，且不超过500kb</div>
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
            prop="id"
            label="车型id">
          </el-table-column>
          <el-table-column
            prop="car_img"
            label="图片">
            <template slot-scope="scope" >
               <el-image
                style="width: 100px; height: 100px"
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
                <el-tag>
                {{ scope.row.level === 0 ? "经济型" : "" }}
                {{ scope.row.level === 1 ? "SUV" : "" }}
                {{ scope.row.level === 2 ? "中级车" : "" }}
                {{ scope.row.level === 3 ? "豪华型" : "" }}
                {{ scope.row.level === 4 ? "商务型" : "" }}
                {{ scope.row.level === 5 ? "6至15座商务车" : "" }}
                </el-tag>
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
    export default {
        data() {
            return{
                fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
                vehicleData:[],
                dataIndex: null,
                formBoxID: null,
                formBoxShow: false,
                formBoxTitle: '',
                formBoxValue: {
                    name: '',
                    car_id: '',
                    phone: '',
                },
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                    }, {
                    value: '选项2',
                    label: '双皮奶'
                    }, {
                    value: '选项3',
                    label: '蚵仔煎'
                    }, {
                    value: '选项4',
                    label: '龙须面'
                    }, {
                    value: '选项5',
                    label: '北京烤鸭'
                    }],
                value: '',
                car_state:'',
            }
        },
        created () {
            vehicleModel.list().then( res => {
            this.vehicleData = res.data;
            // console.log(this.vehicleData)
            })
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },




            handleAddUser() {
            this.formBoxShow = true;
            this.formBoxTitle = '添加车型';
            this.formBoxID = '';
            this.formBoxValue.name = '';
            this.formBoxValue.car_id = '';
            this.formBoxValue.phone = '';
            },
            handleCancel() {
            this.formBoxShow = false;
            this.formBoxID = '';
            this.formBoxValue.name = '';
            this.formBoxValue.car_id = '';
            this.formBoxValue.phone = '';
            },
            handleEditUser(data,index) {
            this.formBoxTitle = '编辑用户';
            this.formBoxID = data.id;
            this.formBoxValue.name = data.name;
            this.formBoxValue.car_id = data.car_id;
            this.formBoxValue.phone = data.phone;
            this.formBoxShow = true;
            this.dataIndex = index
            },
            handleSave() {
            let id = this.formBoxID;
            let name = this.formBoxValue.name;
            let phone = this.formBoxValue.phone;
            let car_id = this.formBoxValue.car_id;
            let index = this.dataIndex;
            let params = { name, phone, car_id }
            // if(!name || !phone || !car_id){
            //   this.$message.error('缺少必要参数')
            //   return
            // }
            // 修改
            if(id){
                vehicleModel.update(id,params)
                .then(() => {
                    this.vehicleData[index].name = name
                    this.vehicleData[index].phone = phone
                    this.vehicleData[index].car_id = car_id
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