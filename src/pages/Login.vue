<template>
  <div class="account-login-contaienr">
    <div class="account-login-bd">
      <div class="company-info-container">

        <span class="company-info-name">汇典出行</span>
      </div>
      <div class="company-info-desc">小具影响力的选择</div>
      <div class="account-login-mainer">
  
        <div class="login-form-container">
          <div class="login-form-phone">
            <el-form
              :model="smsFrom"
              status-icon
              :rules="smsRules"
              ref="smsFrom"
            >
              <el-form-item prop="phone">
                <el-input
                  type="text"
                  prefix-icon="el-icon-mobile-phone"
                  placeholder="请输手机号"
                  v-model="smsFrom.phone"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item prop="code">
                <div class="flex-cell">
                  <el-input
                    class="flex-cell-bd"
                    type="text"
                    placeholder="请输入密码"
                    v-model="smsFrom.password"
                    autocomplete="off"
                    prefix-icon="el-icon-mobile"
                  ></el-input>
                
                </div>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  style="width: 100%"
                  @click="submitForm('smsFrom')"
                  >登录</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userModel from '@/models/admin_user.js'
export default {
  data() {
    return {
      smsFrom: {
        phone: "",
        password: "",
        checked: true
      },
      smsRules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "目前只支持中国大陆的手机号码",
            trigger: "blur"
          }
        ],
      },
      disabled: false
    };
  },
  created(){
    let token = localStorage.getItem('token');
    console.log(token)
    if(token != null){
        this.$router.push({name: 'User'})
    }
  },
  methods: {
    submitForm(formName) {
        let password = this.smsFrom.password;
        let phone = this.smsFrom.phone;
        if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))){ 
            this.$message.info('手机号码有误，请重填'); 
            return ; 
        } 
        console.log(password,phone)
        if(!phone || !password){
            this.$message.info('请输入账号与密码');
            return
        } 
        userModel.login({phone:phone,password:password}).then(res => {
            if(res.code == 200){
                localStorage.setItem('token',res.token);
                this.$router.replace({ name: "User" })
            }else{
              this.$message.info('请输入正确账号和密码');
              this.smsFrom.password =' ',
              this.smsFrom.phone = ''
              return
            }
        }).catch(err => {
          console.log(err)
            this.$message.info('服务器错误，请联系管理员');
        })
    },
    login:function() {
      
      user.login({phone:phone,password:password}).then(res => {
        if(res.data.code == 200){
          // localStorage.setItem('token',res.data.token);
          // this.$router.push({name: 'user'})
        }
      }).catch(err => {
        this.$message.info('请输入正确账号和密码');
      })
    },
  }
};
</script>

<style lang="less" scoped>
.flex-cell {
  display: flex;
  .flex-cell-bd {
    flex: 1;
  }
  .flex-cell-ft {
    width: 130px;
    margin-left: 8px;
    &:after {
      display: none;
    }
    &.link {
      font-size: 14px;
      font-weight: 500;
      text-align: center;
      color: #409eff;
      text-decoration: none;
    }
  }
}
.account-login-contaienr {
  display: flex;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #F2F6FC;
  background-position: center;
  padding-top: 140px;
  box-sizing: border-box;
}
.account-login-bd {
  flex: 1;
  padding: 32px 0;
}
.company-info-container {
  display: flex;
  justify-content: center;
  align-items: center;
  
  .company-info-name {
    width: 80px;
    height: 80px;
    border-radius: 8px;
    font-size: 28px;
    font-weight: 500;
    color: #f5f5f5;
    background-color: #7db3d9;
    text-align: center;
  }
}
.login-form-phone{
  text-align:center;
}
.company-info-desc {
  margin: 12px 0 40px;
  font-size: 14px;
  opacity: 0.5;
  text-align: center;
}
.account-login-mainer {
  max-width: 388px;
  margin: 40px auto;
}
.login-tab-container {
  text-align: center;
  margin-bottom: 24px;
  .login-tab-item {
    display: inline-block;
    position: relative;
    box-sizing: border-box;
    margin-right: 32px;
    padding: 12px 16px;
    cursor: pointer;
    font-size: 14px;
    line-height: 20px;
    color: #666;
    border-bottom: 2px solid transparent;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    &:last-child {
      margin-right: 0;
    }
    &.active {
      color: #1890ff;
      font-weight: 500;
      border-color: #1890ff;
    }
  }
}
</style>