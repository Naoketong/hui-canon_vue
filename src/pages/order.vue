<template>
  <Layout>
  	<div class="pg-main-header">
			<el-button type="primary" @click="handleAddUser">添加订单</el-button>
			<div class="page-input">
				<div class="page-input-title">搜索订单</div>
				<el-input class="page-input-item" v-model="seekInput" placeholder="请输入手机号码"></el-input>
				<el-button class="page-input-button" type="primary"  @click="seekButton">搜索</el-button>
				<el-button type="primary" class="btn" v-show="getData_lock" @click="getData">取消</el-button>
			</div>
			<el-radio-group v-model="radio1" @change="choose">
				<el-radio-button label="orderAll">全部订单</el-radio-button>
				<el-radio-button label="1">进行中</el-radio-button>
				<el-radio-button label="2">已完成</el-radio-button>
				<el-radio-button label="3">已取消</el-radio-button>  
				<el-radio-button label="4">超时订单</el-radio-button>
			</el-radio-group>
      <el-dialog :title="formBoxTitle" :visible="formBoxShow" :show-close="false">
        <el-form  :model="formBoxValue" :rules="Rules" :label-position="labelPosition">
					<el-form-item label="姓名" label-width="70px">
						<el-input name="name" width="200" v-model="formBoxValue.name"></el-input>
					</el-form-item>
					<br>
          <el-form-item label="手机" label-width="70px" prop="phone">
						<el-input type="text" v-model="formBoxValue.phone" autocomplete="off"></el-input>
          </el-form-item>
					<br>
					<el-form-item label="车型" label-width="70px">
						<el-select v-model="formBoxValue.car_id" @change="hadnSelect">
							<el-option v-for="item in vehicleDate" :label="item.car_name" :value="item.id"/>
						</el-select>
					</el-form-item>
					<br>
          <el-form-item label="租借日期" label-width="70px">
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
							<el-tag v-if="scope.row.order_state == 1">进行中</el-tag>
							<el-tag v-if="scope.row.order_state == 2" type="success">已完成</el-tag>
							<el-tag v-if="scope.row.order_state == 3" type="info">已取消</el-tag>
							<el-tag v-if="scope.row.order_state == 4" type="danger">已超时</el-tag>
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
              <el-button  type="text" icon="el-icon-edit" @click="handleEditUser(scope.row,scope.$index)" 
			  			v-show="scope.row.order_state == 1 && scope.row.get_car === 1">编辑</el-button>
              <el-button  type="text" icon="el-icon-delete" @click="handleDelete(scope.row,scope.$index)"
			  			v-show="scope.row.order_state == 2 || scope.row.order_state === 3">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
     	<el-pagination
	      v-show="get_order"
				v-if="pagination.total > pagination.pageSize"
				background
				layout="prev, pager, next"
				:current-page.sync="pagination.currentPage"
				:page-size="pagination.pageSize"
				:total="pagination.total"
				@current-change="getData"
			>
      </el-pagination>

	  	<el-pagination
	      v-show="get_orderState"
				v-if="orderState_pagination.total > orderState_pagination.pageSize"
				layout="prev, pager, next"
				:current-page.sync="orderState_pagination.currentPage"
				:page-size="orderState_pagination.pageSize"
				:total="orderState_pagination.total"
				@current-change="orderState_page"
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
				orderState_pagination: {
					total: 0,
					currentPage: 1,
					pageSize: 10
				},
			
				seekInput:'',//查找
				iscar_id:'',//编辑车辆 原来车辆的id
				user_id:'',//用户id
				order_results:true,
				getData_lock:false,
				labelPosition:'right',
				radio1:'orderAll',
				get_order:true,
				get_orderState:false,
				order_state:'',
			}
		},
		created () {
			this.getData();
			this.getVehicle();
			this.order_timeout()
		},
		methods: {
			seekButton() {
				let phone = this.seekInput;
				if(phone == ''){
					this.$message({
						type: 'info',
						message: '没有搜索号码'
					});
					return
				}
				orderModel.orderFind(phone).then(res=>{
					this.orderData = res.data;
				})
				this.getData_lock = true;
				this.get_order = false;
			},
			choose(e) {
				this.get_orderState = true;
				this.order_state = e;
				if(this.orderState_pagination.currentPage !== 1){
					this.orderState_pagination.currentPage = 1
				}
				if(e == 'orderAll'){
					this.getData();
				}else if(e !== 'orderAll'){
					let params = {
						current_page: this.orderState_pagination.currentPage,
						page_size: this.orderState_pagination.pageSize,
						order_state:e,
					};
					orderModel
						.state(params)
						.then(res=>{
							this.orderData = res.data.datas.order_state;
							this.orderState_pagination.pageSize = Number(res.data.datas.orderState_pagination.page_size);
							this.orderState_pagination.currentPage = Number(res.data.datas.orderState_pagination.current_page);
							this.orderState_pagination.total = Number(res.data.datas.orderState_pagination.total);
						})
					this.get_order=false;
				}
			},
			getData(e) {
				let params = {
					current_page: this.pagination.currentPage,
					page_size: this.pagination.pageSize,
					order_state:0,
				};
				orderModel
					.list(params)
					.then(res => {
						this.orderData = res.data.datas;
						this.pagination.pageSize = Number(res.data.pagination.page_size);
						this.pagination.currentPage = Number(res.data.pagination.current_page);
						this.pagination.total = Number(res.data.pagination.total);
					})
				this.seekInput = '';
				this.getData_lock = false;
				this.get_order = true;
				this.get_orderState = false;
			},
			orderState_page(e){
				this.orderState_pagination.currentPage = e
				this.orderState_pages(this.order_state)
			},
			orderState_pages(e){
				this.get_orderState = true;
				let params = {
					current_page: this.orderState_pagination.currentPage,
					page_size: this.orderState_pagination.pageSize,
					order_state:e,
				};
				orderModel
				.state(params)
				.then(res=>{
					this.orderData = res.data.datas.order_state;
					this.orderState_pagination.pageSize = Number(res.data.datas.orderState_pagination.page_size);
					this.orderState_pagination.currentPage = Number(res.data.datas.orderState_pagination.current_page);
					this.orderState_pagination.total = Number(res.data.datas.orderState_pagination.total);
				})
				this.get_order=false;
			},
			getVehicle(){
				vehicleModel.list().then(res => {
					this.vehicleDate = res.data.vehicleFree;
				})
			},
			hadnSelect(){
				let id = this.formBoxValue.car_id;
				costModel.show(id).then( res => {
					this.costData = res.data[0]
				})
				vehicleModel.show(id).then(res => {
				this.formBoxValue.price = res.data[0].price;
				})
			},
			order_timeout(){
				var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
				var year = currentDate.getFullYear()
				var month = currentDate.getMonth() + 1
				var day = currentDate.getDate()
				let nowData = year + "-" + month + "-" + day;
				let order_state = 1;
				orderModel.state({order_state}).then(res=>{
					let order_all = res.data.state_all;
					let all = order_all.forEach((data)=>{
						let end_at = data.end_at;
						let d1 = new Date(end_at);
						let d2 = new Date(nowData);
						let d3 = (d2 - d1) / (24 * 60 * 60 * 1000)
						let timeout_days = Math.ceil(d3);
						let id = data.order_number;
						if(timeout_days > 1){
							// 执行修改代码
							if(data.get_car == 2){
								let timeout_cost = Number(data.price) * Number(timeout_days)
								let cost_total = Number(data.cost_total) + timeout_cost;
								let order_state = 4;
								orderModel.modify(id,{order_state,timeout_days,timeout_cost,cost_total})
							}else if(data.get_car == 1){
								let order_state = 3;
								orderModel.modify(id,{order_state})
							}																
						}							
					})
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
				let id = this.formBoxValue.car_id;
				costModel.show(id).then( res => {
					this.costData.cost_total = res.data[0].cost_total;
				})
				vehicleModel.show(id).then(res => {
					this.formBoxValue.price = res.data[0].price;
				})
				orderModel.show(data.id).then(res=>{
					this.iscar_id = res.data[0].car_id;
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
				let price = this.formBoxValue.price;//车辆租赁费/天
				let cost_total = Number(price) * Number(rent_days) + Number(total)
				let params = {order_number, name, phone, car_id, sat_at, end_at, rent_days, cost_total }
				let param = {name, phone, car_id, sat_at, end_at, rent_days, cost_total }
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
							let state = 1;
							vehicleModel.update(id,{state})
						})
						.catch(()=>{
						this.formBoxShow = false;
					})
				// 添加
				}else{
					orderModel.add(params)
					.then(res => {
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
				this.reload()
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
	  margin-top:20px;
	  .page-input-title{
		  display:inline-block;
		  color: #909399;
		  font-size:15px;
		  margin-right:15px;
	  }
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

