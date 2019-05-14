<template>
  <!-- 用户登陆界面 -->
  <div>
    <div v-show="showLogin">
      <x-header style="background:#d4d1cf;height:49px">
        <span style="color:#000000">登录</span>
        <x-icon slot="overwrite-left" type="ios-arrow-back" size="30" style="fill:#000000;position:relative;top:-8px;left:-3px;" @click="backspace"></x-icon>
      </x-header>
      <!-- <div style="width:100%;position: fixed">
        <i style="width:20px;color:#000000cf;float:left;margin-left:5px" class="fa fa-angle-left fa-2x" @click="backspace"></i>
      </div> -->
      <avatar fullname="user" :size="100" style="margin-top:50px">
      </avatar>
      <el-input style="width:80%" placeholder="请输入用户名" v-model="userName" clearable></el-input>
      <br><br>
      <el-input  style="width:80%" type="password" placeholder="请输入密码"  v-model="password" clearable></el-input>
      <hr style="margin-top:20px;width:82%">
      <!-- <a style="float:left">忘记密码</a> -->
      <a style="float:none" @click="showLogin = false">没有账号？注册一个</a>
      <el-button style="margin-top:18px;width:80%" type="primary" @click="userLogin">登录</el-button>
    </div>
      <div v-show="!showLogin">
        <x-header style="background:#d4d1cf;height:49px">
        <span style="color:#000000">注册</span>
        <x-icon slot="overwrite-left" type="ios-arrow-back" size="30" style="fill:#000000;position:relative;top:-8px;left:-3px;" @click="backspace"></x-icon>
      </x-header>
      <div  @click="imgClick">
        <avatar style="margin-top:20px" fullname="user" :image="headImg" :size="100"></avatar>
        <input style="float: left;  display: none;" type="file" id='uploadFile'  enctype="multipart/form-data" accept="image/*"  ref="head_image" @change="readLocalFile">
      </div>
      <el-input  style="width:80%" placeholder="请输入用户名" v-model="newName" clearable></el-input>
      <br><br>
      <el-input style="width:80%" type="password" placeholder="请输入密码"  v-model="newPassword1" clearable></el-input>
      <br><br>
      <el-input style="width:80%" type="password" placeholder="请再次输入密码"  v-model="newPassword2" clearable></el-input>
      <hr style="margin-top:20px;width:82%">
      <a style="float:none" @click="showLogin = true">已有账号？登录</a>
      <el-button style="position:fixed;left:10%;top:60%;width:80%" type="primary" @click="UserRegister">注册</el-button>
    </div>
  </div>
</template>

<script>
import {login, register} from '@/api'
import {XHeader, Icon} from 'vux'

export default {
  components: {
    XHeader,
    Icon
  },
  name: 'login',
  data () {
    return {
      userName: '',
      password: '',
      newName: '',
      headImg: '',
      newPassword1: '',
      newPassword2: '',
      showLogin: true
    }
  },
  methods: {
    backspace () {
      this.$router.go(-1)
    },
    // 加入图片
    imgClick () {
      // this.isShowPicFrom = false
      document.getElementById('uploadFile').click()
    },
    // 点击选中图片
    readLocalFile () {
      var localFile = document.getElementById('uploadFile').files[0]
      var current = this
      var reader = new FileReader()
      var content = reader.readAsDataURL(localFile, 'UTF-8')
      reader.onload = function (event) {
        content = event.target.result
        current.headImg = content// 获取图片base64代码
      }
      reader.onerror = function (event) {
        alert('error')
      }
    },
    userLogin () {
      if (this.userName === '' || this.password === '') {
        this.$message({
          message: '请输入用户名或密码',
          type: 'warning',
          customClass: 'messageTop',
          showClose: true,
          center: true
        })
      } else {
        var userVo = {
          'name': this.userName,
          'password': this.password
        }
        /* 接口请求 */
        login(userVo).then((response) => {
          /*  接口的传值是(-1,该用户不存在),(-2,密码输入错误),(1,登录成功)  */
          if (response.data.code === -1) {
            this.$message({
              message: '该用户不存在!',
              type: 'error',
              customClass: 'messageTop',
              showClose: true,
              center: true
            })
          } else if (response.data.code === -2) {
            this.$message({
              message: '密码输入错误!',
              type: 'error',
              customClass: 'messageTop',
              showClose: true,
              center: true
            })
          } else {
            this.$message({
              message: '登录成功!',
              type: 'success',
              customClass: 'messageTop',
              showClose: true,
              center: true
            })
            localStorage.setItem('userName', this.userName)
            this.$store.commit('setUserData', response.data.data)
            setTimeout(function () {
              this.$router.go(-1)
              this.$store.dispatch('login')
            }.bind(this), 1000)
            this.userName = ''
            this.password = ''
          }
        })
      }
    },
    UserRegister () {
      var userData = new FormData()
      if (this.newName === '' || this.newPassword1 === '') {
        this.$message({
          message: '请输入用户名或密码',
          type: 'warning',
          customClass: 'messageTop',
          showClose: true,
          center: true
        })
      } else if (this.newPassword2 === '') {
        this.$message({
          message: '请再次输入密码',
          type: 'warning',
          customClass: 'messageTop',
          showClose: true,
          center: true
        })
      } else if (this.newPassword1 !== this.newPassword2) {
        this.$message({
          message: '请核对两次新密码',
          type: 'erorr',
          customClass: 'messageTop',
          showClose: true,
          center: true
        })
      } else if (this.$refs.head_image.files.length === 0) {
        userData.append('userName', this.newName)
        userData.append('password', this.newPassword1)
        this.reg(userData)
      } else {
        userData.append('userName', this.newName)
        userData.append('headImg', this.$refs.head_image.files[0])
        userData.append('password', this.newPassword1)
        this.reg(userData)
      }
    },
    reg (userData) {
      register(userData).then((response) => {
        if (response.data.code === 1) {
          this.$message({
            message: '注册成功,请登录',
            type: 'success',
            customClass: 'messageTop',
            showClose: true,
            center: true
          })
          this.newName = ''
          this.newPassword1 = ''
          this.newPassword2 = ''
          /* 注册成功之后再跳回登录页 */
          setTimeout(function () {
            this.showLogin = true
          }.bind(this), 1000)
        } else if (response.data.code === 2) {
          this.$message({
            message: '该账户已存在，请换一个用户名',
            type: 'error',
            showClose: true,
            customClass: 'messageTop',
            center: true
          })
        }
      })
    }
  }
}
</script>

<style>
.messageTop{
  margin-top:35px;
}
</style>
