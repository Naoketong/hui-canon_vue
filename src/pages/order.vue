<template>
    <Layout>
        <div class="pg-main-header">
		<div class="page-input">
			<el-input class="page-input-item" v-model="seekInput" placeholder="请输入手机号码"></el-input>
			<el-button class="page-input-button" type="primary" @click="seekButton">搜索</el-button>
			<el-button type="primary" class="btn" @click="getData">取消</el-button>
		</div>
        <el-button type="primary" @click="handleAddUser">添加订单</el-button>
        <el-dialog :title="formBoxTitle" :visible="formBoxShow" :show-close="false">
          <el-form  :model="formBoxValue" :rules="Rules">
            <el-form-item label="姓名" label-width="60px">
              <el-input name="name" width="200" v-model="formBoxValue.name"></el-input>
            </el-form-item>
            <el-form-item label="手机" label-width="60px" prop="phone">
				<el-input type="text" v-model="formBoxValue.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="车型" label-width="60px">
                <el-select v-model="formBoxValue.car_id" @change="hadnSelect">
                  <el-option v-for="item in vehicleDate" :label="item.car_name" :value="item.id"/>
                </el-select>
            </el-form-item>
            <el-form-item label="租借日期" label-width="90px">
                <div class="block">
                    <el-date-picker
                    v-model="formBoxValue.data"
					:picker-options="expireTimeOption"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd">
                    </el-date-picker>
                </div>
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
          :data="orderData"
          size="small"
          style="width: 100%">
          <el-table-column
            prop="order_number"
            label="订单号">
          </el-table-column>
          <el-table-column
            prop="order_state"
            label="订单状态">
            <template slot-scope="scope" >
                <el-tag :type="scope.row.order_state === 1 ? 'danger' : ''">
                {{ scope.row.order_state === 1 ? "进行中" : "" }}
                {{ scope.row.order_state === 2 ? "已完成" : "" }}
                {{ scope.row.order_state === 3 ? "已取消" : "" }}
                </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="order_state"
            label="是否取车">
            <template slot-scope="scope" >
                <el-tag :type="scope.row.get_car === 1 ? 'danger' : ''">
                {{ scope.row.get_car === 1 ? "未取车" : "" }}
                {{ scope.row.get_car === 2 ? "已取车" : "" }}
                </el-tag>
            </template>
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
              <el-button  type="text" icon="el-icon-s-order" @click="handledetails(scope.row,scope.$index)">查看详情</el-button>
              <el-button  type="text" icon="el-icon-edit" @click="handleEditUser(scope.row,scope.$index)">编辑</el-button>
              <el-button  type="text" icon="el-icon-delete" @click="handleDelete(scope.row,scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
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
    import orderModel from '@/models/order.js'
    import vehicleModel from '@/models/vehicle.js'
    import costModel from '@/models/cost.js'

 	export default {
		inject:["reload"],
    	data () {
			return {
				orderData: [],
				vehicleDate:[],
				costData: [],
				dataIndex: null,
				formBoxID: null,
				formBoxShow: false,
				formBoxTitle: '',
				formBoxValue: {
				name: '',
				phone: '',
				car_id: '',
				data:[],
				price:'',
				},   
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
				expireTimeOption: {
					disabledDate(time) {
						return time.getTime() < Date.now() - 8.64e7;   //禁用以前的日期，今天不禁用
						// return date.getTime() <= Date.now();    //禁用今天以及以前的日期
					}
				},
				pagination: {
					total: 0,
					currentPage: 1,
					pageSize: 10
				},  
				seekInput:'',//查找
				iscar_id:'',//编辑车辆 原来车辆的id
				user_id:'',//用户id
				
			}
    	},
    	created () {
    	  this.getData();
    	  this.getVehicle();
    	  
    	},
    	methods: {
			seekButton() {
				let phone = this.seekInput;
				orderModel.orderFind(phone).then(res=>{
					// console.log(res)
					this.orderData = res.data;
				})
			},
			getData() {
				let params = {
					current_page: this.pagination.currentPage,
					page_size: this.pagination.pageSize,
				};
				// console.log(params)
				orderModel
					.list(params)
					.then(res => {
					// console.log(res)
					this.orderData = res.data.datas;
					this.pagination.pageSize = Number(res.data.pagination.page_size);
					this.pagination.currentPage = Number(res.data.pagination.current_page);
					this.pagination.total = Number(res.data.pagination.total);
				})
				this.seekInput = '';
			},
			getVehicle(){
				vehicleModel.list().then(res => {
				// console.log(res)
				this.vehicleDate = res.data.vehicleFree;
				})
			},
			hadnSelect(){
				// console.log(this.formBoxValue.car_id)
				let id = this.formBoxValue.car_id;
				costModel.show(id).then( res => {
				// console.log(res)
					this.costData = res.data[0]
				})
				vehicleModel.show(id).then(res => {
				this.formBoxValue.price = res.data[0].price;
				})
			},
			handleAddUser() {
				this.formBoxShow = true;
				this.formBoxTitle = '添加订单(仅添加线下订单)';
				this.formBoxID = '';
				this.formBoxValue.name = '';
				this.formBoxValue.car_id = '';
				this.formBoxValue.phone = '';
				this.formBoxValue.data = '';
				// sat_at end_at rent_days cost_total
				// console.log(this.formBoxValue.car_id)
			
			},
			handleCancel() {
				this.formBoxShow = false;
				this.formBoxID = '';
				this.formBoxValue.name = '';
				this.formBoxValue.car_id = '';
				this.formBoxValue.phone = '';
				this.formBoxValue.data = '';
			},
			handleEditUser(data,index) {
				this.formBoxTitle = '编辑订单';
				this.formBoxID = data.id;
				this.formBoxValue.name = data.name;
				this.formBoxValue.car_id = data.car_id;
				this.formBoxValue.phone = data.phone;
				this.formBoxValue.data = data.data;
				this.formBoxShow = true;
				this.dataIndex = index
				//   console.log(this.formBoxValue.car_id,'比较')
				let id = this.formBoxValue.car_id;
				costModel.show(id).then( res => {
					this.costData.cost_total = res.data[0].cost_total;
				})
				vehicleModel.show(id).then(res => {
					this.formBoxValue.price = res.data[0].price;
				})
				orderModel.show(data.id).then(res=>{

					this.iscar_id = res.data[0].car_id;
					console.log(this.iscar_id)
				})				
			},
			handleSave() {
				let order_number = ""; //订单号
				for (let i = 0; i < 6; i++) //6位随机数，用以加在时间戳后面。
				{
					order_number += Math.floor(Math.random() * 10);
				}
				order_number = new Date().getTime() + order_number; //时间戳，用来生成订单号。

				let id = this.formBoxID;
				let index = this.dataIndex;
				let name = this.formBoxValue.name;
				let phone = this.formBoxValue.phone;
				let car_id = this.formBoxValue.car_id;
				if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))){ 
				this.$message.info('手机号码有误，请重填'); 
				return ; 
				}         
				/*租借开始结束时间和天数 */
				let sat_at = this.formBoxValue.data[0];
				let end_at = this.formBoxValue.data[1];
				let d1 = new Date(sat_at);
				let d2 = new Date(end_at);
				let rent_days = (d2 - d1) / (24 * 60 * 60 * 1000)
				if(!this.costData.cost_total){
					this.$message.error('没有添加费用项，无法生成订单')
					return
				}
				let total = this.costData.cost_total;//除租赁费以外的总费用
				// console.log(total)
				let price = this.formBoxValue.price;//车辆租赁费/天
				// console.log(this.vehicleDate)
				let cost_total = Number(price) * Number(rent_days) + Number(total)

				// console.log(this.costData)
				console.log(total,'除租赁费总数')
				console.log(price,'租赁费')
				console.log(cost_total,'总费用')
				let params = {order_number, name, phone, car_id, sat_at, end_at, rent_days, cost_total }
				let param = {name, phone, car_id, sat_at, end_at, rent_days, cost_total }
				console.log(params)
				if(!order_number || !name || !phone || !car_id || !sat_at || !end_at || !rent_days || !cost_total){
				this.$message.error('缺少必要参数')
				return
				}
				
				// 修改
				if(id){
				orderModel.update(id,param)
					.then(() => {
					this.orderData[index].name = name
					this.orderData[index].phone = phone
					this.orderData[index].car_id = car_id
					this.formBoxShow = false;
					this.$message.success('修改成功');
						let id = this.iscar_id;
						let state = 0;
						vehicleModel.update(id,{state})
					})
					.catch(()=>{
					this.formBoxShow = false;
					})

				// // 添加
				}else{
					orderModel.add(params)
					.then(res => {
						conosle.log(res)
						
						let id = res.data.id;
						params.id = id;
						this.orderData.push(params)
						this.formBoxShow = false;
						this.$message.success('添加成功');
					})
					.catch(()=>{
					this.formBoxShow = false;
					})
					this.reload();
				}
			},

			handleDelete(data,index) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
				})
				.then(()=>{
				
				return orderModel.delete(data.id)
				})
				.then(()=>{
				this.orderData.splice(index,1)
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
				name: "Order_details",
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
  .page-input{
	  margin-bottom:20px;
	  .page-input-item{
		  display:inline-block;
		  width:300px;
		  margin-right:30px;
	  }
	  .page-input-button{
		  display:inline-block

	  }
  }
  .page-seek{
    border-bottom: 1px solid #F56C6C;
    margin-bottom: 30px;
    h2{
      display: inline-block;
      color: #F56C6C;
    }
  }
</style>

