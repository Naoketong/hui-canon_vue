<template>
  <Layout>
    <div class="pg-main-body">
      <el-table
        :data="user_orderData"
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
            <el-tag v-if="scope.row.order_state == 1" type="danger">进行中</el-tag>
            <el-tag v-if="scope.row.order_state == 2" type="success">已完成</el-tag>
            <el-tag v-if="scope.row.order_state == 3" type="info">已取消</el-tag>
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
          prop="car_name"
          label="租借车辆">
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
    
  </Layout>

</template>
<script>
    import Layout from '@/components/Layout'
    import userModel from '@/models/user.js'
 	export default {
		// inject:["reload"],
    	data () {
        return {
          user_orderData:[],
        }
    	},
    	created () {
    	  let id = this.$route.params.id;
        userModel.show(id).then(res => {
          if(res.data[0].id !== null){
            this.user_orderData = res.data;
          }
        });
    	},
    	methods: {
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

