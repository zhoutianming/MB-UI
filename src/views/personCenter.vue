<template>
  <!-- 用户自己的资料页 -->
  <div :style="styler">
    <div id="nav" style="margin-top:-8px;background:#d4d1cf;width:100%;height:51px;position: fixed">
      <x-icon type="ios-arrow-back" size="30" style="fill:#000000;width:30px;color:#000000;float:left;margin-left:8px;margin-top:10px" @click="backspace"></x-icon>
    </div>
    <br><br>
    <div  @click="imgClick">
      <avatar style="margin-top:20px" :fullname="user.userName" :image="user.headImg" :size="150"></avatar>
      <input style="float: left;  display: none;" type="file" id='uploadFile'  enctype="multipart/form-data" accept="image/*"  ref="head_image" @change="readLocalFile">
    </div>
    <br>
    昵称:<el-input style="width:200px" v-model="userName"></el-input>
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
    <el-button style="width:80%" @click="editUsers">修改</el-button>
    <br>
  </div>
</template>

<script>
import {editUser, getUser} from '@/api'

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
      imgs: []
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
        var userHead1 = new FormData()
        var user1 = this.$store.getters.getUserData
        userHead1.append('userName', this.userName)
        userHead1.append('id', user1.id)
        editUser(userHead1).then(response => {
          localStorage.setItem('userName', this.userName)
          this.$store.commit('setUserData', response.data.data)
          user1 = response.data.data
          getUser(user1).then((response) => {
            this.$store.commit('setUserData', response.data.data)
          })
        })
      } else {
        var userHead = new FormData()
        var user = this.$store.getters.getUserData
        userHead.append('oldHeadImg', this.$store.getters.getUserData.headImg)
        userHead.append('headImg', this.$refs.head_image.files[0])
        userHead.append('userName', this.userName)
        userHead.append('id', user.id)
        editUser(userHead).then(response => {
          localStorage.setItem('userName', this.userName)
          this.$store.commit('setUserData', response.data.data)
          user = response.data.data
          getUser(user).then((response) => {
            this.$store.commit('setUserData', response.data.data)
          })
        })
      }
      this.backspace()
    }
  }
}
</script>

<style>

</style>
