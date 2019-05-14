<template>
  <!-- 用户自己的资料页 -->
  <div style="">
    <x-header style="z-index:2;background:#d4d1cf;color:blue;height:49px;width:100%;position:fixed;margin-left:-1px;margin-top:-2px;">
      <span style="color:#000000">个人收藏</span>
      <x-icon slot="overwrite-left" type="ios-arrow-back" size="30" style="fill:#000000;position:relative;top:-8px;left:-3px;" @click="backspace"></x-icon>
    </x-header>
    <br>
    <div style="margin-top:28px">
      <div v-for="(item, index) in userCollectionMessage" :key="index" style="width:100%;height:80px;background:#8bceb6;text-align:center;margin-top:3px">
        <img :src="item.messageImg" style="float:left;width:20%;height:66px;margin-left:1%;margin-top:8px;display: block;" @click="showMessageDetail(item)">
        <el-button size="small" type="text" style="color:#af1f1f;border-radius:10px;z-index:2;float:right;width:14%;margin-top:20px;margin-right:5px" @click="unCollection(index)">取消收藏</el-button>
        <div style="float:right;width:62%" @click="showMessageDetail(item)">
          <span style="float:right;text-align:left;width:98%;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;">
            {{item.messageContent}}
          </span>
          <div style="width:50%;float:right;text-align:left;margin-top:20px;margin-right:11px">
            <avatar style="float:left" fullname="user" :image="item.headImg" :size="30"></avatar>
            <div style="float:right;text-align:left;width:76%;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;font-size:1em">{{item.userName}}</div>
          </div>
          <span style="float:left;font-size:0.6em;margin-left:10px;margin-top:30px">{{item.time}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getUserCollection, deleteMessage, addView, unCollection} from '@/api'
import {XHeader, Cell, Group} from 'vux'

export default {
  components: {
    XHeader,
    Cell,
    Group
  },
  name: 'personalCollection',
  data () {
    return {
      userCollectionMessage: [],
      datas: []
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
      getUserCollection(userData).then((response) => {
        this.userCollectionMessage = response.data.data
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
        deleteMessage(message).then((response) => {
          if (response.data.message === 'ok') {
            this.userMessage.splice(index, 1)
            this.$message({
              type: 'success',
              customClass: 'messageTop',
              message: '删除成功!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          customClass: 'messageTop',
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    editMessage () {
      this.$router.replace({path: '/add'})
    },
    showMessageDetail (item) {
      item.pageViews++
      var messageVO = {}
      messageVO.messageId = item.messageId
      addView(messageVO)
      this.$store.commit('setCurrentMessage', item)
      this.$router.push({path: '/messageDetail'})
    },
    unCollection (index) {
      var messageVO = {}
      messageVO.userId = this.$store.getters.getUserData.id
      messageVO.messageId = this.userCollectionMessage[index].messageId
      unCollection(messageVO).then((response) => {
        if (response.data.code === 1) {
          this.userCollectionMessage.splice(index, 1)
          localStorage.setItem('celloctionColor', '#ffffff')
          this.$message({
            message: '取消收藏成功!',
            customClass: 'messageTop',
            type: 'success',
            center: true
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.messageTop{
  margin-top:35px;
}
</style>
