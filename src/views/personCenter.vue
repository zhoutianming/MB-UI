<template>
  <!-- 用户自己的资料页 -->
  <div :style="styler">
    <div id="nav" style="margin-top:-8px;background:#d4d1cf;width:100%;height:51px;position: fixed">
      <x-icon type="ios-arrow-back" size="30" style="fill:#000000;width:30px;color:#000000;float:left;margin-left:8px;margin-top:10px" @click="backspace"></x-icon>
    </div>
    <br><br>
    <div  @click="imgClick">
      <avatar style="margin-top:20px" fullname="user" :image="user.headImg" :size="150"></avatar>
      <input style="float:left;  display: none;" type="file" id='uploadFile'  enctype="multipart/form-data" accept="image/*"  ref="head_image" @change="readLocalFile">
    </div>
    <br>
    <div style="margin-left:63px;float:left;width:60%">
      昵称:<el-input style="width:175px" v-model="userName"></el-input>
    </div>
    <div style="float:left;width:70px">
      <el-button type="text" @click="dialogVisible = true">修改密码?</el-button>
    </div>
    <br><br>
    <div>
      <el-button  style="background:#ccceb3;width:10px" @click="changeColor('#ccceb3')"></el-button>
      <el-button  style="background:#91b981;width:10px" @click="changeColor('#91b981')"></el-button>
      <br><el-button  style="background:#1661046e;width:10px" @click="changeColor('#1661046e')"></el-button>
      <el-button  style="background:#e5f37b;width:10px" @click="changeColor('#e5f37b')"></el-button>
      <el-button  style="background:#a3a591d6;width:10px" @click="changeColor('#a3a591d6')"></el-button>
      <el-button  style="background:#82e2a0cf;width:10px" @click="changeColor('#82e2a0cf')"></el-button>
      <el-button  style="background:#dc7c96f0;width:10px" @click="changeColor('#dc7c96f0')"></el-button>
      <br><el-button  style="background:#ff7fe8d9;width:10px" @click="changeColor('#ff7fe8d9')"></el-button>
      <el-button  style="background:#ccceb3;width:10px" @click="changeColor('#ccceb3')"></el-button>
      <el-button  style="background:#70e442b5;width:10px" @click="changeColor('#70e442b5')"></el-button>
      <br><el-button  style="background:#8f8d90;width:10px" @click="changeColor('#8f8d90')"></el-button>
      <el-button  style="background:#dc9d26d9;width:10px" @click="changeColor('#dc9d26d9')"></el-button>
      <el-button  style="background:#1fab98;width:10px" @click="changeColor('#1fab98')"></el-button>
      <el-button  style="background:#718006a3;width:10px" @click="changeColor('#718006a3')"></el-button>
      <el-button  style="background:#ceb272b5;width:10px" @click="changeColor('#ceb272b5')"></el-button>
      <el-button  style="background:#612837ad;width:10px" @click="changeColor('#612837ad')"></el-button>
      <br><el-button  style="background:#bf6229d4;width:10px" @click="changeColor('#bf6229d4')"></el-button>
      <el-button  style="background:#67051f8a;width:10px" @click="changeColor('#67051f8a')"></el-button>
    </div>
    <br><br>
    <el-button style="width:99%" @click="editUsers">修改</el-button>
    <br>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      :show-close="false"
      width="70%"
      center>
      <div style="">
        <el-input style="width:100%" type="password" placeholder="请输入旧密码" v-model="oldPassword" clearable></el-input>
        <br><br>
        <el-input style="width:100%" type="password" placeholder="请输入新密码"  v-model="newPassword1" clearable></el-input>
        <br><br>
        <el-input style="width:100%" type="password" placeholder="请再次输入新密码"  v-model="newPassword2" clearable></el-input>
        <hr style="margin-top:20px;width:99%;margin-bottom:-27px;">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" style="width:45%">取 消</el-button>
        <el-button type="primary" @click="editPassword" style="background:#2886ff;width:45%">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {editUser, getUser, editPassword} from '@/api'

export default {
  components: {
  },
  name: 'userSelf',
  data () {
    return {
      userName: this.$store.getters.getUserData.userName,
      styler: {
        width: '100%',
        margin: '0px',
        background: this.$store.getters.getHeadbgcolor,
        height: ''
      },
      imgs: [],
      dialogVisible: false,
      oldPassword: '',
      newPassword1: '',
      newPassword2: ''
    }
  },
  created () {
    window.addEventListener('resize', this.getHeight)
    this.getHeight()
  },
  computed: {
    user () {
      return this.$store.getters.getUserData
    },
    color () {
      return this.$store.getters.getHeadbgcolor
    }
  },
  methods: {
    backspace () {
      this.$router.push({path: '/userSelf'})
    },
    getHeight () {
      this.styler.height = window.innerHeight + 'px'
    },
    changeColor (color) {
      this.styler.background = color
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
        current.user.headImg = content// 获取图片base64代码
      }
      reader.onerror = function (event) {
        alert('error')
      }
    },
    editUsers () {
      this.$store.commit('setHeadbgcolor', this.styler.background)
      if (this.$refs.head_image.files.length === 0) {
        if (this.$store.getters.getUserData.userName !== this.userName) {
          var userHead1 = new FormData()
          var user1 = this.$store.getters.getUserData
          userHead1.append('userName', this.userName)
          userHead1.append('id', user1.id)
          editUser(userHead1).then(response => {
            if (response.data.code === 2) {
              this.$message({
                message: '该昵称已存在，请换一个昵称',
                customClass: 'messageTop',
                type: 'error',
                center: true
              })
            } else if (response.data.code === 1) {
              user1 = response.data.data
              localStorage.setItem('userName', user1.userName)
              getUser(user1).then((response) => {
                this.$store.commit('setUserData', response.data.data)
              })
              this.backspace()
            }
          })
        }
      } else {
        if (this.$store.getters.getUserData.userName !== this.userName) {
          var userHead = new FormData()
          var user = this.$store.getters.getUserData
          userHead.append('headImg', this.$refs.head_image.files[0])
          userHead.append('userName', this.userName)
          userHead.append('id', user.id)
          editUser(userHead).then(response => {
            if (response.data.code === 2) {
              this.$message({
                message: '该昵称已存在，请换一个昵称',
                customClass: 'messageTop',
                type: 'error',
                center: true
              })
            } else if (response.data.code === 1) {
              user = response.data.data
              localStorage.setItem('userName', user.userName)
              getUser(user).then((response) => {
                this.$store.commit('setUserData', response.data.data)
              })
              this.backspace()
            }
          })
        } else {
          var userHead2 = new FormData()
          var user2 = this.$store.getters.getUserData
          userHead2.append('headImg', this.$refs.head_image.files[0])
          userHead2.append('id', user2.id)
          editUser(userHead2).then(response => {
            if (response.data.code === 1) {
              user2 = this.$store.getters.getUserData
              localStorage.setItem('userName', user2.userName)
              getUser(user2).then((response) => {
                this.$store.commit('setUserData', response.data.data)
              })
              this.backspace()
            }
          })
        }
      }
    },
    editPassword () {
      if (this.oldPassword === '') {
        this.$message({
          customClass: 'messageTop',
          message: '请输入旧密码',
          type: 'error',
          center: true
        })
      } else if (this.newPassword1 === '') {
        this.$message({
          customClass: 'messageTop',
          message: '请输入新密码',
          type: 'error',
          center: true
        })
      } else if (this.oldPassword === this.newPassword1) {
        this.$message({
          message: '输入的新旧密码相同!',
          customClass: 'messageTop',
          type: 'warn',
          center: true
        })
      } else if (this.newPassword1 !== this.newPassword2) {
        this.$message({
          message: '请核对两次新密码',
          type: 'erorr',
          customClass: 'messageTop',
          center: true
        })
      } else {
        var userVO = {}
        userVO.name = this.$store.getters.getUserData.userName
        userVO.oldPassword = this.oldPassword
        userVO.newPassword = this.newPassword1
        editPassword(userVO).then(response => {
          if (response.data.code === 2) {
            this.$message({
              message: '输入的旧密码错误',
              customClass: 'messageTop',
              type: 'error',
              center: true
            })
          } else if (response.data.code === 1) {
            this.$message({
              message: '修改成功',
              customClass: 'messageTop',
              type: 'success',
              center: true
            })
            this.dialogVisible = false
          }
        })
      }
    }
  }
}
</script>

<style>
.messageTop{
  margin-top:35px;
}
</style>
