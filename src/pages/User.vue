<template>
    <Layout>
        <div class="pg-main-header">
			<el-button type="primary" @click="handleAddUser">添加用户</el-button>
			<br>

			<el-radio-group style="margin-top:20px;" v-model="radio1" @change="choose">
				<el-radio-button label="online">线上用户</el-radio-button>
				<el-radio-button label="offline">线下用户</el-radio-button>
			</el-radio-group>
			<el-dialog :title="formBoxTitle" :visible="formBoxShow" :show-close="false">
			<el-form :model="formBoxValue" :rules="Rules">
				<el-form-item label="姓名" label-width="60px">
					<el-input
					type="text"
					prefix-icon="el-icon-user"
					placeholder="请输入姓名"
					v-model="formBoxValue.name"
					autocomplete="off"
					></el-input>
				</el-form-item>
				<el-form-item label="手机" label-width="60px" prop="phone">
					<el-input
					type="text"
					prefix-icon="el-icon-mobile-phone"
					placeholder="请输手机号"
					v-model="formBoxValue.phone"
					autocomplete="off"
					></el-input>
				</el-form-item>
				<!--<el-form-item label="车型" label-width="60px">
					<el-select v-model="formBoxValue.car_id">
					<el-option v-for="item in vehicleDate" :label="item.car_name" :value="item.id" />
					</el-select>
				</el-form-item>-->
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="handleSave">保存</el-button>
				<el-button @click="handleCancel">取消</el-button>
			</div>
			</el-dialog>
		</div>
		<div class="pg-main-body">
			<el-table
			:data="userData"
			size="small"
			style="width: 100%">
			<el-table-column
				prop="id"
				label="id">
			</el-table-column>
			<el-table-column
				prop="name"
				label="姓名">
			</el-table-column>
			<el-table-column
				prop="phone"
				label="电话">
			</el-table-column>
			
			<el-table-column
				prop="operation"
				label="操作">
				<template slot-scope="scope">
				<el-button  type="text" icon="el-icon-user" @click="handledetails(scope.row,scope.$index)">查看订单</el-button>
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
    import userModel from '@/models/user.js'
    import vehicleModel from '@/models/vehicle.js'
    import orderModel from '@/models/order.js'

    export default {
      data () {
        return {
			radio1: 'online',			
            userData: [],
            vehicleDate:[],
            dataIndex: null,
            formBoxID: null,
            formBoxShow: false,
            formBoxTitle: '',
            formBoxValue: {
                name: '',
                car_id: '',
                phone: '',
            },
            value:'',
            Rules: {
            phone: [
                { required: true, message: "请输入手机号", trigger: "blur" },
                {
                pattern: /^1[3456789]\d{9}$/,
                message: "目前只支持中国大陆的手机号码",
                trigger: "blur"
                }
            ],
          // code: [{ required: true, message: "z请输入验证码", trigger: "blur" }]
      },
        }
      },
      created () {
        userModel.list().then( res => {
          this.userData = res.data.userOnline;;
        });
        // vehicleModel.list().then(res => {
        //   this.vehicleDate = res.data;
        // })
      },
      methods: {
		choose(e){
			// console.log(e)
			if(e == 'online'){
				userModel.list().then( res => {
					this.userData = res.data.userOnline;
				});
			}else{
				userModel.list().then( res => {
					this.userData = res.data.userOffline;
				});
			}
		},
        handleAddUser() {
          this.formBoxShow = true;
          this.formBoxTitle = '添加用户(仅添加线下用户，线上用户从移动端增加)';
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
          let is_online = 2;
          let name = this.formBoxValue.name;
          let phone = this.formBoxValue.phone;
          if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))){ 
              this.$message.info('手机号码有误，请重填'); 
              return ; 
          } 
          let car_id = this.formBoxValue.car_id;
          let index = this.dataIndex;
          let params = { name, phone, car_id, is_online }
          console.log(params,id,'id')
          // if(!name || !phone || !car_id){
          //   this.$message.error('缺少必要参数')
          //   return
          // }
          // 修改
          if(id){
            userModel.update(id,params)
              .then(() => {
                this.userData[index].name = name
                this.userData[index].phone = phone
                this.userData[index].car_id = car_id
                this.formBoxShow = false;
                this.$message.success('修改成功');
              })
              .catch(()=>{
                this.formBoxShow = false;
              })
          // // 添加
          }else{
            userModel.add(params)
              .then(res => {
                if(res.code == 0){
                  this.$message.info('添加失败，请检查电话是否相同');
                }
                console.log(res)
                let id = res.data.id;
                params.id = id;
                this.userData.push(params)
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
            
            return userModel.delete(data.id)
          })
          .then(()=>{
            this.userData.splice(index,1)
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
              name: "User_details",
              params: { id }
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
</style>
