<template>
  <!-- 添加内容界面 -->
  <div style="text-align:center">
    <x-header style="width:100%;background:#d4d1cf;height:49px;margin-left:-1px;margin-top:-1px;">
      <span style="color:#000000">添加</span>
      <x-icon slot="overwrite-left" type="ios-arrow-back" size="30" style="fill:#000000;position:relative;top:-8px;left:-3px;" @click="backspace"></x-icon>
    </x-header>
    <div style="margin-top:10px;height:auto">
      <div style="background:#b1e8bb;border-radius:20px;width:90%;height:auto;margin:0 auto;text-align:center;">
        <span>添加文字：</span><br>
        <el-input
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 10}"
          placeholder="请输入内容"
          v-model="messageContent"
          style="width:90%">
        </el-input>
        <br>
        <span>添加图片：</span>
        <br>
        <!--照片区域-->
        <div style="float: none; margin: 10px;">
          <i v-show="show" style="float:right;font-size:30px;position: relative;" class="iconfont icon-icon-test1" @click="deleteImg()"></i>
          <br><br>
          <div ref="image" >
            <img v-show="show" :src="imgs[0]" width="100%" height="100%"/>
          </div>
        </div>
        <i v-show="!show" style="font-size:50px" class="iconfont icon-tupian" @click="imgClick"></i>
        <input style="float: left;display: none;" type="file" id='uploadFile'  enctype="multipart/form-data" accept="image/*" ref="new_image" @change="readLocalFile">
        <br><br>
        <div style="margin-top:6px;margin-bottom:20px">
          <checker
            v-model="messageTabs"
            type="checkbox"
            default-item-class="item"
            selected-item-class="item-selected">
            <checker-item v-for="(item, index) in ['情感', '搞笑', '段子', '求助', '问答']" :key="index" :value="item">{{item}}</checker-item>
          </checker>
        </div>
        <br><br>
      </div>
      <span slot="footer" style="width:100%;position: fixed;left:0;top:92%" class="dialog-footer">
        <el-button style="float:left;width:38%;background:#d4d1cf" @click="backspace">取 消</el-button>
        <el-button style="float:right;width:59%" type="primary" @click="userAddMessage">发 布</el-button>
      </span>
    </div>
  </div>
</template>

<script>
import {XHeader, Checker, CheckerItem} from 'vux'
import {addMessage} from '@/api'

export default {
  components: {
    XHeader,
    Checker,
    CheckerItem
  },
  name: 'add',
  data () {
    return {
      imgs: [],
      messageContent: '',
      show: false,
      messageTabs: ''
    }
  },
  methods: {
    backspace () {
      this.$router.go(-1)
    },
    // 删除图片
    deleteImg () {
      this.show = false
      this.imgs.splice(0, 1)
    },
    // 加入图片
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
        current.imgs.push(content)// 获取图片base64代码
      }
      reader.onerror = function (event) {
        alert('error')
      }
    },
    userAddMessage () {
      if (this.$refs.new_image.files.length === 0) {
        var messageData1 = new FormData()
        messageData1.append('messageContent', this.messageContent)
        messageData1.append('userId', this.$store.getters.getUserData.id)
        messageData1.append('messageTabs', this.messageTabs)
        addMessage(messageData1).then(response => {
          var message = response.data.data
          message.headImg = this.$store.getters.getUserData.headImg
          message.userName = this.$store.getters.getUserData.userName
          message.reviewNumber = 0
          this.$store.commit('addMessageList', message)
          this.$store.commit('setCurrent', 0)
          this.$router.go(-1)
        })
      } else if (this.$refs.new_image.files.length !== 0 || this.messageContent !== null) {
        var messageData = new FormData()
        var userData = this.$store.getters.getUserData.id
        var imageHeight = this.$refs.image.offsetHeight
        if (imageHeight >= 250) {
          imageHeight = 250
        }
        var imageWidth = this.$refs.image.offsetWidth
        messageData.append('image', this.$refs.new_image.files[0])
        messageData.append('messageContent', this.messageContent)
        messageData.append('userId', userData)
        messageData.append('imageWidth', imageWidth)
        messageData.append('imageHeight', imageHeight)
        messageData.append('messageTabs', this.messageTabs)
        addMessage(messageData).then(response => {
          var message = response.data.data
          message.headImg = this.$store.getters.getUserData.headImg
          message.userName = this.$store.getters.getUserData.userName
          message.reviewNumber = 0
          this.$store.commit('addMessageList', message)
          this.$store.commit('setCurrent', 0)
          this.$router.go(-1)
        })
      }
    }
  }
}
</script>

<style>
.item {
  width: 100px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  border-radius: 10px;
  border: 1px solid #ccc;
  background-color: #ffffff;
  margin-right: 6px;
}
.item-selected {
  background: #65b0f3;
  border-color: #ff4a00;
}
</style>
