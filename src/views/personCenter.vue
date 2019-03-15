<template>
  <!-- 用户自己的资料页 -->
  <div :style="styler">
    <div id="nav" style="margin-top:-8px;background:#ffffff;width:100%;position: fixed">
      <i style="width:20px;color:#000000cf;float:left;margin-left:5px;margin-top:5px" class="fa fa-angle-left fa-2x" @click="backspace"></i>
    </div>
    <br><br>
    <div  @click="imgClick">
      <avatar style="margin-top:20px" fullname="My Sticker" image="http://nt.com/ssouron/vue-avatar-component/master/img/example3.jpg" :size="150"></avatar>
    </div>
    <input style="float: left;  display: none;" type="file" id='uploadFile'  accept="image/*"  @change="readLocalFile">
    <br>
    昵称:<el-input style="width:200px"></el-input>
    <br><br>
    <div>
      <el-button  style="background:#ccceb3;width:10px" @click="changeColor('#ccceb3')"></el-button>
      <el-button  style="background:#91b981;width:10px" @click="changeColor('#91b981')"></el-button>
      <br><el-button  style="background:#8f8d90;width:10px" @click="changeColor('#8f8d90')"></el-button>
      <el-button  style="background:#e5f37b;width:10px" @click="changeColor('#e5f37b')"></el-button>
      <el-button  style="background:#ccceb3;width:10px" @click="changeColor('#ccceb3')"></el-button>
      <el-button  style="background:#91b981;width:10px" @click="changeColor('#91b981')"></el-button>
      <el-button  style="background:#8f8d90;width:10px" @click="changeColor('#8f8d90')"></el-button>
      <br><el-button  style="background:#e5f37b;width:10px" @click="changeColor('#e5f37b')"></el-button>
      <el-button  style="background:#ccceb3;width:10px" @click="changeColor('#ccceb3')"></el-button>
      <el-button  style="background:#91b981;width:10px" @click="changeColor('#91b981')"></el-button>
      <br><el-button  style="background:#8f8d90;width:10px" @click="changeColor('#8f8d90')"></el-button>
      <el-button  style="background:#e5f37b;width:10px" @click="changeColor('#e5f37b')"></el-button>
      <el-button  style="background:#ccceb3;width:10px" @click="changeColor('#ccceb3')"></el-button>
      <el-button  style="background:#8f8d90;width:10px" @click="changeColor('#8f8d90')"></el-button>
      <el-button  style="background:#8f8d90;width:10px" @click="changeColor('#8f8d90')"></el-button>
      <el-button  style="background:#e5f37b;width:10px" @click="changeColor('#e5f37b')"></el-button>
      <br><el-button  style="background:#ccceb3;width:10px" @click="changeColor('#ccceb3')"></el-button>
      <el-button  style="background:#8f8d90;width:10px" @click="changeColor('#8f8d90')"></el-button>
    </div>
    <br><br>
    <el-button style="width:80%" @click="backspace">修改</el-button>
    <br>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  components: {
  },
  name: 'userSelf',
  data () {
    return {
      styler: {
        width: '100%',
        margin: '0px',
        background: '#edff008a',
        height: ''
      }
    }
  },
  created () {
    window.addEventListener('resize', this.getHeight)
    this.getHeight()
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
      var reader = new FileReader()
      var content
      var current = this
      reader.onload = function (event) {
        content = event.target.result
        current.imgs.push(content)// 获取图片base64代码
      }
      reader.onerror = function (event) {
        alert('error')
      }
      content = reader.readAsDataURL(localFile, 'UTF-8')
      var sss = document.getElementById('uploadFile').value
      console.log(sss)
    }
  }
}
</script>

<style>

</style>
