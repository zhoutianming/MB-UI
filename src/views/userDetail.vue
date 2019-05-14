<template>
  <!-- user详情页 -->
  <div style="width:100%;height:100%;">
    <x-header style="z-index:2;background:#8bceb6;height:49px;width:100%;position: fixed;margin-left:-1px;margin-top:-1px;">
      <span style="color:#000000">用户</span>
      <x-icon slot="overwrite-left" type="ios-arrow-back" size="30" style="fill:#000000;position:relative;top:-8px;left:-3px;" @click="backspace"></x-icon>
    </x-header>
    <div style="height:auto;background:#edff008a;text-align:center;padding:10px">
      <avatar style="margin-top:50px" fullname="user" :image="thisUser.headImg" :size="150"></avatar>
      <br>
      <span style="font-size:24px">{{thisUser.userName}}</span>
      <br><br>
      <el-button style="background:blue;color:white;width:35%;margin-bottom:20px;" @click="addAttention">+关注</el-button>
    </div>
    <br>
    <hr>
    <div style="height:auto">
      <!-- <el-timeline>
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
          <el-card style="border-radius:10px;width:90%;background:#9ebb9b;padding:1px;">
            <div style="width:100%;margin-top:0px;margin-bottom:0px;color:#000000">
              <span style="font-size:20px;margin-left:5%;margin-bottom:10px;width:90%;float:left;overflow:hidden;text-overflow: ellipsis;white-space:normal;text-align:left">
                {{item.messageContent}}
              </span>
              <img :src="item.messageImg" style="border-radius:10px;margin-left:8%;width:84%;display: block;">
              <div style="text-align:center;margin-bottom:10px;margin-top:15px">
                <span style="font-size:0.8em">浏览{{item.pageViews}}次</span>
                <i style="font-size:20px" class="iconfont icon-dianzan"></i>
                <span style="font-size:0.8em">{{item.praisePoint}}</span>
                <i style="font-size:20px;margin-left:5px" class="iconfont icon-shoucang1"></i>
                <span style="font-size:0.8em">{{item.collectionNumber}}</span>
                <i style="font-size:20px;margin-left:5px" class="iconfont icon-tubiaozhizuomobanyihuifu-" @click="showMarkerLists"></i>
                <span style="font-size:0.8em">{{item.reviewNumber}}</span>
              </div>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline> -->
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
          <div style="border-radius:10px;width:90%;background:#9ebb9b;"  @click="showMessageDetail(item)">
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
import {getUserMessage, addView, addCare} from '@/api'
import {XHeader} from 'vux'

export default {
  components: {
    XHeader
  },
  name: 'userDetail',
  data () {
    return {
      userMessage: [],
      showMarkerPage: false
    }
  },
  computed: {
    thisUser () {
      return this.$store.getters.getCurrentUser
    }
  },
  created () {
    this.getMessage()
  },
  methods: {
    backspace () {
      this.$router.go(-1)
    },
    getMessage () {
      var userData = {}
      userData.id = this.thisUser.userId
      getUserMessage(userData).then((response) => {
        this.userMessage = response.data.data
      })
    },
    showMessageDetail (item) {
      item.pageViews++
      var messageVO = {}
      messageVO.messageId = item.messageId
      addView(messageVO)
      this.$store.commit('setCurrentMessage', item)
      this.$router.push({path: '/messageDetail'})
    },
    addAttention () {
      if (localStorage.hasOwnProperty('userName')) {
        var carePersonDO = {}
        carePersonDO.userId = this.$store.getters.getUserData.id
        carePersonDO.carePersonId = this.thisUser.userId
        addCare(carePersonDO).then((response) => {
          if (response.data.code === 1) {
            this.$message({
              message: '关注成功!',
              customClass: 'messageTop',
              type: 'success',
              center: true
            })
          } else if (response.data.code === -1) {
            this.$message({
              message: '您已关注过Ta了哦!',
              customClass: 'messageTop',
              type: 'info',
              center: true
            })
          } else {
            this.$message({
              message: '关注失败了!',
              customClass: 'messageTop',
              type: 'error',
              center: true
            })
          }
        })
      } else {
        this.$message({
          message: '请先登录!',
          customClass: 'messageTop',
          type: 'success',
          center: true
        })
        this.$router.push({path: '/login'})
      }
    }
  }
}
</script>

<style scoped>
.messageTop{
  margin-top:35px;
}
</style>
