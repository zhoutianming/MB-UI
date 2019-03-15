<template>
  <!-- 用户登陆界面 -->
  <div>
    <div v-show="showLogin">
      <x-header style="background:blue;height:49px">
        <span>添加</span>
        <x-icon slot="overwrite-left" type="ios-arrow-back" size="30" style="fill:#fff;position:relative;top:-8px;left:-3px;" @click="backspace"></x-icon>
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
      <el-button style="position:fixed;left:10%;top:60%;width:80%" type="primary" @click="UserLogin">登录</el-button>
    </div>
      <div v-show="!showLogin">
        <x-header style="background:blue;height:49px">
        <span>注册</span>
        <x-icon slot="overwrite-left" type="ios-arrow-back" size="30" style="fill:#fff;position:relative;top:-8px;left:-3px;" @click="backspace"></x-icon>
      </x-header>
      <avatar fullname="user" :size="100" style="margin-top:50px">
      </avatar>
      <el-input  style="width:80%" placeholder="请输入用户名" v-model="newName" clearable></el-input>
      <br><br>
      <el-input style="width:80%" type="password" placeholder="请输入密码"  v-model="newPassword1" clearable></el-input>
      <br><br>
      <el-input style="width:80%" type="password" placeholder="请再次输入密码"  v-model="newPassword2" clearable></el-input>
      <hr style="margin-top:20px;width:82%">
      <!-- <a style="float:left">忘记密码</a> -->
      <a style="float:none" @click="showLogin = true">已有账号？登录</a>
      <el-button style="position:fixed;left:10%;top:70%;width:80%" type="primary" @click="UserRegister">注册</el-button>
    </div>
  </div>
</template>

<script>
import {setCookie} from '@/assets/js/cookie.js'
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
      newPassword1: '',
      newPassword2: '',
      showLogin: true
    }
  },
  // mounted () {
  // /* 页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录 */
  //   if (getCookie('username')) {
  //     this.$router.push('/')
  //     this.$store.dispatch('login')
  //   }
  // },
  methods: {
    backspace () {
      this.$router.push({path: '/'})
    },
    UserLogin () {
      if (this.userName === '' || this.password === '') {
        this.$message({
          message: '请输入用户名或密码',
          type: 'warning',
          center: true
        })
      } else {
        var userVo = {
          'name': this.userName,
          'password': this.password
        }
        /* 接口请求 */
        login(userVo).then((response) => {
          /* 接口的传值是(-1,该用户不存在),(-2,密码输入错误),(1,登录成功),(2,管理员登录成功) */
          if (response.data.code === -1) {
            this.$message({
              message: '该用户不存在!',
              type: 'error',
              center: true
            })
          } else if (response.data.code === -2) {
            this.$message({
              message: '密码输入错误!',
              type: 'error',
              center: true
            })
          } else if (response.data.code === '2') {
            this.$message({
              message: '欢迎管理员!',
              type: 'success',
              center: true
            })
            setCookie('userName', this.userName, 99 * 365 * 24 * 3600)
            setTimeout(function () {
              this.$router.push({path: '/'})
              this.$store.dispatch('login')
            }.bind(this), 1000)
            this.userName = ''
            this.password = ''
          } else {
            this.$message({
              message: '登录成功!',
              type: 'success',
              center: true
            })
            setCookie('userName', this.userName, 99 * 365 * 24 * 3600)
            setTimeout(function () {
              this.$router.push({path: '/'})
              this.$store.dispatch('login')
            }.bind(this), 1000)
            this.userName = ''
            this.password = ''
          }
        })
      }
    },
    UserRegister () {
      if (this.newName === '' || this.newPassword1 === '') {
        this.$message({
          message: '请输入用户名或密码',
          type: 'warning',
          center: true
        })
      } else if (this.newPassword2 === '') {
        this.$message({
          message: '请再次输入密码',
          type: 'warning',
          center: true
        })
      } else if (this.newPassword1 !== this.newPassword2) {
        this.$message({
          message: '请核对两次新密码',
          type: 'erorr',
          center: true
        })
      } else {
        let data = {
          'name': this.newName,
          'password': this.newPassword1
        }
        register(data).then((response) => {
          if (response.data.message === 'ok') {
            this.$message({
              message: '注册成功,请登录',
              type: 'success',
              center: true
            })
            this.newName = ''
            this.newPassword1 = ''
            this.newPassword2 = ''
            /* 注册成功之后再跳回登录页 */
            setTimeout(function () {
              this.showLogin = true
            }.bind(this), 1000)
          }
        })
      }
    }
  }
}
</script>

<style>

</style>
