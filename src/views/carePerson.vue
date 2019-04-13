<template>
  <div>
    <x-header style="z-index:2;position:fixed;width:100%;background:#d4d1cf;height:49px;margin-left:-1px;margin-top:-2px;">
      <!-- 搜索框 -->
      <span style="color:#000000">关注的人</span>
      <x-icon slot="overwrite-left" type="ios-arrow-back" size="30" style="fill:#000000;position:relative;top:-8px;left:-3px;" @click="backspace"></x-icon>
    </x-header>
    <br>
    <div style="margin-top:35px">
      <div v-for="(item, index) in careUserList" :key="index" style="border-radius:10px;width:100%;height:80px;background:#d4d1cf;text-align:center;margin-top:10px">
        <div @click="showUserDetail(item)">
          <avatar style="margin-top:4px;margin-left:6px;float:left" :fullname="item.userName" :image="item.headImg" :size="72"></avatar>
          <div style="float:left;text-align:left;margin-top:28px;margin-left:6px;">
            <div style="font-size:1em">{{item.userName}}</div>
            <div style="text-align:center;margin-bottom:10px">
              <span style="font-size:0.5em">点赞数:{{item.praisedNum}}</span>
              <span style="font-size:0.5em">关注度:{{item.beCaredNum}}</span>
            </div>
          </div>
        </div>
        <el-button circle size="normal" type="primary" style="z-index:2;float:right;width:80px;margin-top:20px;margin-right:24px" @click="unfollow(item)">取消关注</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {XHeader, XButton} from 'vux'
import {getCare, unfollow} from '@/api'

export default {
  components: {
    XHeader,
    XButton
  },
  name: 'care',
  data () {
    return {
      careUserList: []
    }
  },
  created () {
    this.getCarePerson()
  },
  computed: {
    isShowside () {
      return this.$store.getters.isShowside
    },
    showUserIcon () {
      return this.$store.getters.isShowUserIcon
    }
  },
  mounted () {
  },
  methods: {
    getCarePerson () {
      var userData = {}
      userData.id = this.$store.getters.getUserData.id
      getCare(userData).then((response) => {
        this.careUserList = response.data.data
      })
    },
    backspace () {
      this.$router.push({path: '/'})
    },
    showUserDetail (users) {
      var user = {}
      user.userId = users.id
      user.userName = users.userName
      user.headImg = users.headImg
      this.$store.commit('setCurrentUser', user)
      this.$router.push({path: '/userDetail'})
    },
    unfollow (item) {
      var carePersonDO = {}
      carePersonDO.userId = this.$store.getters.getUserData.id
      carePersonDO.carePersonId = item.id
      unfollow(carePersonDO).then((response) => {
        if (response.data.code === 1) {
          this.$message({
            message: '取消关注成功!',
            type: 'success',
            center: true
          })
          for (var i in this.careUserList) {
            if (this.careUserList[i].id === item.id) {
              this.careUserList.splice(i, 1)
            }
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.header_search {
    box-sizing: border-box;
    padding-left: 10px;
    width: 90%;
    height: 34px;
    margin-top: 4px;
    border-radius: 17px;
    background: rgba(255,255,255,0.9);
    font-size: 14px;
    color: #999;
    border: none;
}
</style>
