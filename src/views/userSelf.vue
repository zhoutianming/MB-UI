<template>
  <!-- 用户自己的资料页 -->
  <div style="">
    <x-header style="z-index:2;background:#d4d1cf;height:49px;width:100%;position: fixed;margin-left:-1px;margin-top:-1px;">
      <span style="color:#000000">用户</span>
      <x-icon slot="overwrite-left" type="ios-arrow-back" size="30" style="fill:#000000;position:relative;top:-8px;left:-3px;" @click="backspace"></x-icon>
    </x-header>
    <div :style="styler">
      <avatar style="margin-top:50px" :fullname="user.userName" :image="user.headImg" :size="150"></avatar>
      <br>
      <span style="font-size:24px">{{user.userName}}</span>
      <br>
      <el-button type= "text" style="float:right;color:#000000;width:33px" @click="editUser">修改</el-button>
      <br>
    </div>
    <br>
    <hr>
    <div style="height:auto">
      <el-timeline>
        <el-timeline-item
        v-for="(item, index) in userMessage"
        :key="index"
        :timestamp="item.time"
        icon="iconfont icon-fabu"
        placement="top"
        style="text-align:left;font-size:15px"
        >
          <div slot="dot" style="margin-top:-8px">
            <i style="font-size:28px;" class="iconfont icon-fabu"></i>
          </div>
          <div style="color:#000000;margin-top:2px;height:auto">
            <i style="float:right;font-size:25px;margin-right:36px;" class="iconfont icon-shanchu" @click="deleteMessage(index)"></i>
            <i style="float:right;font-size:25px;margin-right:10px;" class="iconfont icon-xiugai1" @click="editMessage(item)"></i>
          </div>
          <br>
          <div style="border-radius:10px;width:90%;background:#9ebb9b;margin-top:-16px;"  @click="showMessageDetail(item)">
            <div style="width:100%;margin-top:0px;margin-bottom:0px;color:#000000">
              <span style="font-size:20px;margin-left:2%;margin-bottom:10px;width:96%;float:left;overflow:hidden;text-overflow: ellipsis;white-space:normal;text-align:left">
                {{item.messageContent}}
              </span>
              <img :src="item.messageImg" style="border-radius:10px;margin-left:5%;width:90%;display: block;">
              <div style="text-align:center;margin-bottom:10px;margin-top:15px">
                <span style="font-size:0.8em">浏览{{item.pageViews}}次</span>
                <i style="font-size:20px" class="iconfont icon-dianzan"></i>
                <span style="font-size:0.8em">{{item.praisePoint}}</span>
                <i style="font-size:20px;margin-left:5px" class="iconfont icon-shoucang1"></i>
                <span style="font-size:0.8em">{{item.collectionNumber}}</span>
                <i style="font-size:20px;margin-left:5px" class="iconfont icon-tubiaozhizuomobanyihuifu-"></i>
                <span style="font-size:0.8em">{{item.reviewNumber}}</span>
              </div>
            </div>
          </div>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import {getUserMessage, deleteMessage, addView} from '@/api'
import {XHeader} from 'vux'

export default {
  components: {
    XHeader
  },
  name: 'userSelf',
  data () {
    return {
      userMessage: [],
      datas: [],
      styler: {
        height: 'auto',
        background: this.$store.getters.getHeadbgcolor,
        text_align: 'center',
        padding: '10px'
      }
    }
  },
  created () {
    this.getMessage()
  },
  computed: {
    user () {
      return this.$store.getters.getUserData
    }
  },
  methods: {
    getMessage () {
      var userData = {}
      userData.id = this.$store.getters.getUserData.id
      getUserMessage(userData).then((response) => {
        this.userMessage = response.data.data
      })
    },
    backspace () {
      this.$router.push({path: '/'})
    },
    editUser () {
      this.$router.push({path: '/person'})
    },
    deleteMessage (index) {
      this.$confirm('此操作将永久删除该留言, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
        showClose: false
      }).then(() => {
        var message = {}
        message.messageId = this.userMessage[index].messageId
        message.messageImg = this.userMessage[index].messageImg
        deleteMessage(message).then((response) => {
          if (response.data.message === 'ok') {
            this.userMessage.splice(index, 1)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    editMessage (item) {
      this.$store.commit('setCurrentMessage', item)
      this.$router.replace({path: '/edit'})
    },
    showMessageDetail (item) {
      item.pageViews++
      var messageVO = {}
      messageVO.messageId = item.messageId
      addView(messageVO)
      this.$store.commit('setCurrentMessage', item)
      this.$router.push({path: '/messageDetail'})
    }
  }
}
</script>

<style scoped>

</style>
