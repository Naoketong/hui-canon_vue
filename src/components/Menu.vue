<template>
  <div>
    <div class="logo-container">
      <!--<img class="logo" src="~@/assets/login_logo.png">-->
      <div class="logo-title">汇典</div>
      <span>汇典出行</span>
    </div>
    <el-col>
      <el-menu
        :router="true"
        :default-active="defaultActive"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
        
        <el-menu-item index="/admin/user">
          <i class="el-icon-user-solid"></i>
          <span slot="title">用户</span>
        </el-menu-item>

        <el-menu-item index="/admin/vehicle">
          <i class="el-icon-truck"></i>
          <span slot="title">车辆管理</span>
        </el-menu-item>
         <el-menu-item index="/admin/cost">
          <i class="el-icon-s-cooperation"></i>
          <span slot="title">费用管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/order">
          <i class="el-icon-tickets"></i>
          <span slot="title">订单管理</span>
        </el-menu-item>

        <el-menu-item index="/admin/admin_user">
          <i class="el-icon-user-solid"></i>
          <span slot="title">管理员</span>
        </el-menu-item>
        
        
       
        <!--<el-menu-item index="/admin/over">
          <i class="el-icon-platform-eleme"></i>
          <span slot="title">概览</span>
        </el-menu-item>-->




</el-menu>
</el-col>
</div>
</template>

<script>
    export default {
        name: 'Menu',
        data () {
          return{}
        },
        props: {
            defaultActive: String,
        },
        methods: {
            // eslint-disable-next-line
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            // eslint-disable-next-line
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        },
        components: {

        }
    }
</script>

<style scoped lang="less">
    .logo-container {
      display: flex;
      justify-content: center;
      align-items: center;
        height: 60px;
        color: #002140;
        border-bottom: 1px solid #e4e4e4;
        .logo {
            height: 40px;
            margin: 10px 20px;
            vertical-align: middle;
        }
        .logo-title{
          text-align: center;
          width: 50px;
          height: 40px;
          background: #7db3d9;
          color: #f5f5f5;
          font-size: 14px;
          line-height: 40px;
          border-radius: 5px;
        }
        span{
          font-size: 14px;
          margin-left: 10px;
          color: #606266;
        }
    }
    
    .el-menu {
        border-right: 0;
    }
    
</style>