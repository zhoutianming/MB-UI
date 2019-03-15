<template>
  <!-- 添加内容界面 -->
  <div style="text-align:center">
    <x-header style="width:100%;background:blue;height:49px;margin-left:-1px;margin-top:-1px;">
      <span>添加</span>
      <x-icon slot="overwrite-left" type="ios-arrow-back" size="30" style="fill:#fff;position:relative;top:-8px;left:-3px;" @click="backspace"></x-icon>
    </x-header>
    <div style="margin-top:50px">
      <div style="width:90%;height:auto;margin:0 auto;text-align:center;border:1px dashed #000000">
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
        <div v-for="(urls, index) in imgs " :key="index" style="float: none; margin: 10px;">
          <i style="float:right; position: relative;" class="fa fa-times-circle fa-2x" @click="deleteImg()"></i>
          <img :src="urls" width="100%" height="100%"  />
        </div>
        <i style="font-size:50px" class="iconfont icon-tupian" @click="imgClick"></i>
        <input style="float: left;display: none;" type="file" id='uploadFile'  enctype="multipart/form-data" accept="image/*" ref="new_image" @change="readLocalFile">
        <br><br>
      </div>
      <span slot="footer" style="width:100%;position: fixed;left:0;top:92%" class="dialog-footer">
        <el-button style="float:left;width:38%" @click="backspace">取 消</el-button>
        <el-button style="float:right;width:59%" type="primary" @click="userAddMessage">发 布</el-button>
      </span>
    </div>
  </div>
</template>

<script>
import {XHeader} from 'vux'
import {addMessage} from '@/api'

export default {
  components: {
    XHeader
  },
  name: 'add',
  data () {
    return {
      imgs: [],
      messageContent: 'hahahaha'
    }
  },
  methods: {
    backspace () {
      this.$router.push({path: '/'})
    },
    // 删除图片
    deleteImg () {
      this.imgs.splice(0, 1)
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
        current.imgs.push(content)// 获取图片base64代码
      }
      reader.onerror = function (event) {
        alert('error')
      }
    },
    userAddMessage () {
      if (this.$refs.new_image.files.length !== 0 || this.messageContent !== null) {
        var messageData = new FormData()
        messageData.append('image', this.$refs.new_image.files[0])
        // var param = {}
        // param.image = messageData
        // param.messageContent = this.messageContent
        // console.log(messageData)
        // this.$set(param, 'image', messageData)
        // this.$set(param, 'messageContent', this.messageContent)
        addMessage(messageData, this.messageContent).then(response => {
          console.log('--------------------------')
        })
      }
      // this.backspace()
    }
  }
}
</script>

<style>

</style>
