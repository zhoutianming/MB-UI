<template>
  <!-- 添加内容界面 -->
  <div style="text-align:center">
    <x-header style="width:100%;background:#d4d1cf;height:49px;margin-left:-1px;margin-top:-1px;">
      <span style="color:#000000">修改留言</span>
      <x-icon slot="overwrite-left" type="ios-arrow-back" size="30" style="fill:#000000;position:relative;top:-8px;left:-3px;" @click="backspace"></x-icon>
    </x-header>
    <div style="margin-top:50px;height:auto">
      <div style="background:#b1e8bb;border-radius:20px;width:90%;height:auto;margin:0 auto;text-align:center;margin-bottom:60px">
        <el-input
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 20}"
          placeholder="请输入内容"
          v-model="message.messageContent"
          style="width:90%;margin-top:20px">
        </el-input>
        <br>
        <!--照片区域-->
        <div :v-show="show" style="float: none; margin: 10px;">
          <i  style="float:right; position: relative;" class="fa fa-times-circle fa-2x" @click="deleteImg()"></i>
          <br><br>
          <div ref="image" >
            <img :src="message.messageImg" width="100%" height="100%"/>
          </div>
        </div>
        <i v-show="!show" style="font-size:50px" class="iconfont icon-tupian" @click="imgClick"></i>
        <input style="float: left;display: none;" type="file" id='uploadFile'  enctype="multipart/form-data" accept="image/*" ref="new_image" @change="readLocalFile">
        <br><br>
      </div>
      <span slot="footer" style="width:100%;position: fixed;left:0;top:92%" class="dialog-footer">
        <el-button style="float:left;width:38%;background:#d4d1cf" @click="backspace">取 消</el-button>
        <el-button style="float:right;width:59%" type="primary" @click="userEditMessage">修改</el-button>
      </span>
    </div>
  </div>
</template>

<script>
import {XHeader} from 'vux'
import {editMessage, editMessageText} from '@/api'

export default {
  components: {
    XHeader
  },
  name: 'add',
  data () {
    return {
      show: true
    }
  },
  computed: {
    message () {
      return this.$store.getters.getCurrentMessage
    }
  },
  methods: {
    backspace () {
      this.$router.push({path: '/userSelf'})
    },
    // 删除图片
    deleteImg () {
      this.show = false
      this.message.messageImg = null
    },
    // 加入图片ss
    imgClick () {
      document.getElementById('uploadFile').click()
    },
    // 点击选中图片
    readLocalFile () {
      var localFile = document.getElementById('uploadFile').files[0]
      var current = this
      var reader = new FileReader()
      var content = reader.readAsDataURL(localFile, 'UTF-8')
      this.show = true
      reader.onload = function (event) {
        content = event.target.result
        current.message.messageImg = content// 获取图片base64代码
      }
      reader.onerror = function (event) {
        alert('error')
      }
    },
    userEditMessage () {
      // 只修改了留言内容
      if (this.$refs.new_image.files.length === 0) {
        var messageData1 = new FormData()
        messageData1.append('messageId', this.message.messageId)
        messageData1.append('messageContent', this.message.messageContent)
        editMessageText(messageData1).then(response => {
          if (response.data.code === 1) {
            this.$message({
              message: '修改成功!',
              type: 'success',
              center: true
            })
            this.$router.replace({path: '/userSelf'})
          } else {
            this.$message({
              message: '修改发生错误!',
              type: 'error',
              center: true
            })
          }
        })
      } else {
        // 修改了图片
        var messageData2 = new FormData()
        var userData = this.$store.getters.getUserData.id
        var imageHeight = this.$refs.image.offsetHeight
        if (imageHeight >= 360) {
          imageHeight = 360
        }
        var imageWidth = this.$refs.image.offsetWidth
        messageData2.append('messageId', this.message.messageId)
        messageData2.append('image', this.$refs.new_image.files[0])
        messageData2.append('messageContent', this.message.messageContent)
        messageData2.append('userId', userData)
        messageData2.append('imageWidth', imageWidth)
        messageData2.append('imageHeight', imageHeight)
        editMessage(messageData2).then(response => {
          if (response.data.code === 1) {
            this.$message({
              message: '修改成功!',
              type: 'success',
              center: true
            })
            this.$router.replace({path: '/userSelf'})
          } else {
            this.$message({
              message: '修改发生错误!',
              type: 'error',
              center: true
            })
          }
        })
      }
    }
  }
}
</script>

<style>

</style>
