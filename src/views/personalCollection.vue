<template>
  <!-- 用户自己的资料页 -->
  <div style="">
    <x-header style="z-index:2;background:#d4d1cf;color:blue;height:49px;width:100%;position:fixed;margin-left:-1px;margin-top:-2px;">
      <span style="color:#000000">个人收藏</span>
      <x-icon slot="overwrite-left" type="ios-arrow-back" size="30" style="fill:#000000;position:relative;top:-8px;left:-3px;" @click="backspace"></x-icon>
    </x-header>
    <br>
    <div style="margin-top:28px">
      <div v-for="(item, index) in userCollectionMessage" :key="index" style="width:100%;height:80px;background:#8080ab;text-align:center;margin-top:3px" @click="showMessageDetail(item)">
        <img :src="item.messageImg" style="float:left;width:66px;height:66px;margin-left:8px;margin-top:8px;display: block;">
        <span style="float:right;text-align:left;width:80%;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;">
          {{item.messageContent}}
        </span>
        <div style="float:right;text-align:left;margin-top:20px;margin-right:11px">
          <avatar style="float:left" :fullname="item.userName" :image="item.headImg" :size="30"></avatar>
          <div style="float:right;font-size:1em">{{item.userName}}</div>
        </div>
        <span style="float:left;font-size:0.2em;margin-left:10px;margin-top:33px">{{item.time}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {getUserCollection, deleteMessage, addView} from '@/api'
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
    }
  }
}
</script>

<style scoped>

</style>
