<template>
  <div>
    <div class="logo-container">
      <!--<img class="logo" src="~@/assets/login_logo.png">-->
      <span>汇典出行</span>
    </div>
    <el-col>
      <el-menu
        :router="true"
        :default-active="defaultActive"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
        <el-menu-item index="/admin/over">
          <i class="el-icon-platform-eleme"></i>
          <span slot="title">概览</span>
        </el-menu-item>
        <el-menu-item index="/admin/user">
          <i class="el-icon-user-solid"></i>
          <span slot="title">用户</span>
        </el-menu-item>

        <el-menu-item index="/admin/vehicle">
          <i class="el-icon-truck"></i>
          <span slot="title">车辆管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/order">
          <i class="el-icon-tickets"></i>
          <span slot="title">订单（创建）管理</span>
        </el-menu-item>

    
        <el-menu-item index="/admin/rent">
          <i class="el-icon-circle-plus"></i>
          <span slot="title">租车管理</span>
        </el-menu-item>

        <el-menu-item index="/admin/cost">
          <i class="el-icon-s-cooperation"></i>
          <span slot="title">费用管理</span>
        </el-menu-item>

        

        

        <el-menu-item index="/admin/admin_user">
          <i class="el-icon-user-solid"></i>
          <span slot="title">管理员</span>
        </el-menu-item>




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
        height: 60px;
        line-height: 59px;
        color: #002140;
        font-size: 14px;
        border-bottom: 1px solid #e4e4e4;
        .logo {
            height: 40px;
            margin: 10px 20px;
            vertical-align: middle;
        }
    }
    
    .el-menu {
        border-right: 0;
    }
</style>