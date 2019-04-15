<template>
  <div :style="conheight">
    <!-- 导航栏 -->
    <x-header
      :left-options="{showBack: false}"
      :right-options="{showMore: false}"
      @on-click-more="showMenus = true"
      style="background:#d4d1cf;width:100%;height:49px;margin-left:-1px;margin-top:-1px;z-index:2;position:fixed;"
      >
      <!-- 主页头像内容 -->
      <div slot="left" style="margin-left:-10px;margin-top:-10px">
        <span @click="showSide" v-show="showUserIcon">
          <avatar fullname="userName" :image="user.headImg" :size="40"></avatar>
        </span>
        <a style="margin-top:10px;color:green" @click="login" v-show="!showUserIcon">登录</a>
      </div>
      <!-- 搜索框 -->
      <div style="width:100%">
        <input style="width:83%" type="search" class="header_search" id="searchInput" placeholder="输入关键字搜索" v-model="searchWord">
        <div style="float:right;margin-top:8px">
          <x-icon style="color:black;" type="ios-search-strong" @click="search" size="30"></x-icon>
        </div>
      </div>
    </x-header>
    <!-- 添加按钮 -->
    <div style="position:fixed;left:86%;top:80%;z-index: 10;">
      <x-icon style="fill:#f17703;" type="ios-plus" @click="addMessage" size="50"></x-icon>
    </div>
    <!-- 侧栏内容 -->
    <div>
      <transition name="fade" @touchmove.stop.prevent>
        <!-- 这部分功能主要是关闭侧栏菜单，类似一层遮罩的效果 -->
        <div class="menu-mask" v-show="isShowside" @click="hideSide"></div>
      </transition>
      <transition name="slide-fade">
        <!-- 这里才是侧栏代码部分 -->
        <div class="side-content" v-show="isShowside">
          <div class="head" @click="showUserSelf">
            <avatar style="margin-top:10px" :fullname="user.userName" :image="user.headImg" :size="100"></avatar>
            <br>
            <span>{{user.userName}}</span>
          </div>
          <div style="margin-top:-20px;text-align:center">
            <group>
              <cell style="background:#d4d1cf;height:20px;color:#000000;" is-link @click.native="showCarePerson">
                <span slot="title" style="">关注的人({{user.carePersonNum}})</span>
              </cell>
              <cell style="background:#d4d1cf;height:20px;color:#000000;" is-link @click.native="toPersonalCollection">
                <span slot="title" style="">个人收藏({{user.collectionNum}})</span>
              </cell>
              <cell style="background:#d4d1cf;height:20px;color:#000000;">
                <span slot="title" style="color:#000000;">
                  <span style="vertical-align:middle;">关注度({{user.beCaredNum}})</span>
                  <badge text="+1"></badge>
                </span>
              </cell>
              <cell style="background:#d4d1cf;height:20px;color:#250101;">
                <span slot="title" style="color:#000000;">
                  <span style="vertical-align:middle;">点赞数({{user.praisedNum}})</span>
                  <badge text="+1"></badge>
                </span>
              </cell>
            </group>
          </div>
          <div style="margin-top:185%">
            <div @click="logout" style="float:left">
              <i style="font-size:25px;" class="iconfont icon-icon-test"></i>
              <el-button type="text">注销</el-button>
            </div>
            <div @click="plus.runtime.quit()" style="float:right">
              <i style="font-size:25px;" class="iconfont icon-tuichu"></i>
              <el-button type="text">退出</el-button>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <br>
    <!-- 留言区 -->
    <v-touch style="width:100%;margin-top:25px;height:92%;" @swipeup="slideNext" @swipedown="slidePre">
      <Slider
        ref="slider"
        style="height:95%;z-index:9"
        animation="fade"
        :control-btn="false"
        :autoplay="false"
        v-model="sliderIndex"
      >
        <SliderItem
          v-for="(messageArray,index1) in messageArrayList"
          :key="index1"
          style="color:black;"
        >
        <!-- 左右翻页的内容 -->
          <div style="width: 100%;height:100%;margin: 0px;">
            <waterfall
              :line="line"
              :line-gap="line_gap"
              :watch="messageArray"
              ref="waterfall"
              :fixed-height="true"
            >
              <waterfall-slot
                v-for="(item, index2) in messageArray"
                :width="100"
                :height="item.imageHeight"
                :order="index2"
                :key="item.messageId"
                move-class="itemStyle-move"
              >
                <!-- 瀑布流形式内容 -->
                <div class="itemStyle" style="font-size: 0.2em">
                  <el-card :body-style="{ padding: '0px' }" shadow="always" :style="cardStyle">
                    <div style="width:90%;margin-left:5%;text-align:center" @click="showUserDetail(item)">
                      <avatar fullname="My Sticker" :image="item.headImg" :size="30"></avatar>
                      <span style="font-size:13px;">{{item.userName}}</span>
                    </div>
                    <div style="width:100%;" @click="showMessageDetail(item)">
                      <span v-show="isDuanzi" style="float:left;text-align:left;width:100%;height:140px;overflow:hidden;text-overflow: ellipsis;white-space: normal;font-size:13px;">
                        {{item.messageContent}}
                      </span>
                      <span v-show="!isDuanzi" style="float:left;text-align:left;width:100%;height:24px;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;font-size:13px;">
                        {{item.messageContent}}
                      </span>
                      <div>
                        <img :src="item.messageImg" style="width:100%;height:auto;display: block;">
                      </div>
                    </div>
                    <br>
                    <div style="text-align:center;margin-bottom:10px;color:#000">
                      <div>
                        <span style="float:left;font-size:10px;color:#000;">{{item.time}}</span>
                        <span style="float:right;font-size:10px">点击浏览{{item.pageViews}}次</span>
                      </div>
                      <br>
                      <div style="width:100%;margin-top:10px;">
                        <i :style="{font_size: '13px',margin_left: '0px',color:item.isPraise}" class="iconfont icon-dianzan1" @click="addPraisePoint(index1, index2)"></i>
                        <span style="font-size:10px">{{item.praisePoint}}</span>
                        <i :style="{font_size:'13px',margin_left:'5px',color: item.isCollection}" class="iconfont icon-shoucang" @click="addCollectionNum(index1,index2)"></i>
                        <span style="font-size:10px">{{item.collectionNumber}}</span>
                        <i style="font-size:13px;margin-left:5px" class="iconfont icon-tubiaozhizuomobanyihuifu-" @click="showMessageDetail(item)"></i>
                        <span style="font-size:10px">{{item.reviewNumber}}</span>
                      </div>
                    </div>
                  </el-card>
                </div>
              </waterfall-slot>
            </waterfall>
          </div>
        </SliderItem>
      </Slider>
    </v-touch>
    <!-- 底部菜单栏 -->
    <div style="margin-top:-32px;">
      <tab style="z-index:5"
        :line-width=5
        active-color='#f17703'>
        <tab-item
          class="vux-center"
          :selected="item === tab"
          v-for="(item, index) in ['精选', '情感', '搞笑', '美食', '段子', '求助', '其他']"
          :key="index"
          @on-item-click="selectMenu(item)">
          {{item}}
        </tab-item>
      </tab>
    </div>
  </div>
</template>

<script>
import {Cell, Group, XHeader, XButton, Badge, Tab, TabItem} from 'vux'
import {getTabAllMessage, getAllMessage, getUser, addPraise, addView, addCollection, search} from '@/api'
import {split} from '@/util/splitArray'

export default {
  components: {
    Cell,
    Group,
    XHeader,
    XButton,
    Badge,
    Tab,
    TabItem
  },
  name: 'home',
  data () {
    return {
      sliderIndex: Number,
      line: 'v',
      line_gap: 100,
      conheight: {
        height: '',
        background: '#c8e4da'
      },
      option: {
        effect: 'nest',
        currentPage: 1,
        direction: 'horizontal',
        pagination: true,
        thresholdDistance: 50,
        thresholdTime: 300,
        loop: true
      },
      messageArrayList: [],
      messageTabs: '',
      searchWord: '',
      cardStyle: {
        width: '100%',
        height: 'auto',
        background: '#8bceb6',
        padding: '0px'
      },
      isDuanzi: false,
      praiseStyle: {
        font_size: '13px',
        margin_left: '0px',
        color: '#ffffff'
      },
      collectionStyle: {
        font_size: '13px',
        margin_left: '5px',
        color: '#ffffff'
      }
    }
  },
  created () {
    var user = {}
    user.userName = localStorage.getItem('userName')
    getUser(user).then((response) => {
      this.$store.commit('setUserData', response.data.data)
    })
    var item = this.$store.getters.getTab
    if (item !== null) {
      this.messageArrayList = []
      if (item === '精选') {
        this.getDatas()
      } else {
        if (item === '段子') {
          this.isDuanzi = true
          this.getDuanziData(item)
        } else {
          this.isDuanzi = false
          this.getData(item)
        }
      }
    }
    window.addEventListener('resize', this.getHeight)
    this.getHeight()
    window.addEventListener('resize', this.getWidth)
    this.getWidth()
    this.sliderIndex = this.$store.getters.getCurrent
    this.$store.dispatch('hideSideBar')
  },
  destroyed () {
    this.$store.commit('setCurrent', this.sliderIndex)
  },
  computed: {
    isShowside () {
      return this.$store.getters.isShowside
    },
    showUserIcon () {
      return this.$store.getters.isShowUserIcon
    },
    messageList () {
      return this.$store.getters.getMessageList
    },
    user () {
      return this.$store.getters.getUserData
    },
    tab () {
      return this.$store.getters.getTab
    }
  },
  mounted () {
    /* 页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录 */
    if (localStorage.hasOwnProperty('userName')) {
      this.$router.push({path: '/'})
      this.$store.dispatch('login')
    }
  },
  methods: {
    getDatas () {
      var messageVO = {}
      messageVO.userId = this.$store.getters.getUserData.id
      getAllMessage(messageVO).then((response) => {
        var messageList = response.data.data
        for (var i in messageList) {
          messageList[i].imageHeight = messageList[i].imageHeight * 0.6 + 150
        }
        this.$store.commit('setMessageList', messageList)
        var list = messageList.slice(0, 20)
        this.messageArrayList = split(list, 4)
      })
    },
    getData (datas) {
      var messageVO = {}
      messageVO.userId = this.$store.getters.getUserData.id
      messageVO.messageTabs = datas
      getTabAllMessage(messageVO).then((response) => {
        var messageList = response.data.data
        for (var i in messageList) {
          messageList[i].imageHeight = messageList[i].imageHeight * 0.6 + 150
        }
        this.$store.commit('setMessageList', messageList)
        this.messageArrayList = split(messageList, 4)
      })
    },
    getDuanziData (datas) {
      var messageVO = {}
      messageVO.userId = this.$store.getters.getUserData.id
      messageVO.messageTabs = datas
      getTabAllMessage(messageVO).then((response) => {
        var messageList = response.data.data
        for (var i in messageList) {
          messageList[i].imageHeight = messageList[i].imageHeight * 0.6 + 240
        }
        this.$store.commit('setMessageList', messageList)
        this.messageArrayList = split(messageList, 4)
      })
    },
    login () {
      this.$router.push({path: '/login'})
    },
    addMessage () {
      this.$router.push({path: '/add'})
    },
    showUserDetail (item) {
      if (item.userId === this.$store.getters.getUserData.id) {
        this.showUserSelf()
      } else {
        var user = {}
        user.userId = item.userId
        user.userName = item.userName
        user.headImg = item.headImg
        this.$store.commit('setCurrentUser', user)
        this.$router.push({path: '/userDetail'})
      }
    },
    showUserSelf () {
      this.$router.push({path: '/userSelf'})
    },
    toPersonalCollection () {
      this.$router.push({path: '/personalCollection'})
    },
    showMessageDetail (item) {
      item.pageViews++
      var messageVO = {}
      messageVO.messageId = item.messageId
      addView(messageVO)
      this.$store.commit('setCurrentMessage', item)
      this.$router.push({path: '/messageDetail'})
    },
    showCarePerson () {
      this.$router.push({path: '/care'})
    },
    addPraisePoint (index1, index2) {
      if (localStorage.hasOwnProperty('userName')) {
        var userData = {}
        var user = this.$store.getters.getUserData
        userData.id = user.id
        userData.praiseList = user.praiseList + ',' + this.messageArrayList[index1][index2].messageId
        addPraise(userData).then((response) => {
          if (response.data.code === 1) {
            this.messageArrayList[index1][index2].praisePoint++
            this.messageArrayList[index1][index2].isPraise = '#ff0000'
            this.$store.commit('addPraiseMessage', userData.praiseList)
            this.$message({
              message: '点赞!',
              type: 'success',
              center: true
            })
          } else {
            this.$message({
              message: '您已点赞过~',
              type: 'error',
              center: true
            })
          }
        })
      } else {
        this.$message({
          message: '请先登录!',
          type: 'success',
          center: true
        })
        this.$router.push({path: '/login'})
      }
    },
    addCollectionNum (index1, index2) {
      if (localStorage.hasOwnProperty('userName')) {
        var messageVO = {}
        messageVO.userId = this.$store.getters.getUserData.id
        messageVO.messageId = this.messageArrayList[index1][index2].messageId
        addCollection(messageVO).then((response) => {
          if (response.data.code === 1) {
            this.messageArrayList[index1][index2].collectionNumber++
            this.messageArrayList[index1][index2].isCollection = '#f17703'
            this.$message({
              message: '收藏成功!',
              type: 'success',
              center: true
            })
          } else if (response.data.code === -1) {
            this.$message({
              message: '您已收藏留言!',
              type: 'error',
              center: true
            })
          } else {
            this.$message({
              message: '收藏失败!',
              type: 'error',
              center: true
            })
          }
        })
      } else {
        this.$message({
          message: '请先登录!',
          type: 'success',
          center: true
        })
        this.$router.push({path: '/login'})
      }
    },
    getHeight () {
      this.conheight.height = window.innerHeight - 8 + 'px'
    },
    getWidth () {
      this.line_gap = window.innerWidth / 2 - 2
    },
    slideNext () {
      this.$refs.slider.next()
    },
    slidePre () {
      this.$refs.slider.prev()
    },
    showSide () {
      var user = {}
      user.userName = localStorage.getItem('userName')
      getUser(user).then((response) => {
        this.$store.commit('setUserData', response.data.data)
      })
      this.$store.dispatch('showSideBar')
    },
    hideSide () {
      this.$store.dispatch('hideSideBar')
    },
    logout () {
      this.hideSide()
      this.$store.dispatch('logout')
      /* 删除cookie */
      localStorage.clear()
    },
    toManagePage () {
      this.$router.replace({path: '/admin'})
    },
    selectMenu (item) {
      this.$store.commit('setTab', item)
      this.messageArrayList = []
      if (item === '精选') {
        setTimeout(this.getDatas(), 800)
      } else {
        if (item === '段子') {
          this.isDuanzi = true
          setTimeout(this.getDuanziData(item), 800)
        } else {
          this.isDuanzi = false
          setTimeout(this.getData(item), 800)
        }
      }
    },
    search () {
      var messageVO = {}
      this.messageArrayList = []
      messageVO.userId = this.$store.getters.getUserData.id
      messageVO.messageContent = this.searchWord
      search(messageVO).then((response) => {
        var messageList = response.data.data
        for (var i in messageList) {
          messageList[i].imageHeight = messageList[i].imageHeight * 0.55 + 150
          messageList[i].isCollection = false
        }
        this.$store.commit('setMessageList', messageList)
        this.messageArrayList = split(messageList, 4)
      })
    },
    getRandomColor () {
      var rand = Math.floor(Math.random() * 0xFFFFFF).toString(16)
      if (rand.length === 6) {
        return rand
      } else {
        return this.getRandomColor()
      }
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
.navbar {
  position: fixed;
  left: 0;
  top: 0;
  margin-top: 10%;
  z-index: 10;
}
.navigation {
  position: fixed;
  left: 88%;
  top: 0;
  margin-top: 10%;
  z-index: 10;
}
.set-head-icon {
  width: 2em;
  border-radius: 50%;
}
.menu-mask {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  opacity: 1;
  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
}
.side-content {
  z-index: 11;
  position: fixed;
  width: 180px;
  height: 100%;
  background: #d4d1cf;
  top: 0;
  left: 0;
  bottom: 0;
  -webkit-overflow-scrolling: touch;
}
.fade-enter-to,
.fade-leave-to {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.slide-fade-enter-to,
.slide-fade-leave-to {
  transition: transform 0.3s;
  transform: translate(0px, 0px);
}
.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
  -webkit-transform: translate(-286px, 0px);
  transform: translate(-286px, 0px);
  -webkit-transition: opacity 0.3s ease-in-out 0.3s,
    -webkit-transform 0.3s ease-in-out;
  transition: opacity 0.3s ease-in-out 0.3s, transform 0.3s ease-in-out;
}
.head {
  display: block;
  width: 180px;
  height: 180px;
  background: #b5bbae;
  background-size: cover;
  overflow: hidden;
}
.vux-header-title-area{
    margin: 0px;
    height: 40px;
    width: 70%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
body {
  margin: 5px;
  font-family: Helvetica, sans-serif;
}
.itemStyle {
  position: absolute;
  top: 6px;
  left: 6px;
  right: 6px;
  bottom: 10px;
  font-size: 1.5em;
  color: rgb(0,158,107);
}
.itemStyle:after {
  content: attr(index);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}
.wf-transition {
  transition: opacity 0.3s ease;
  -webkit-transition: opacity 0.3s ease;
}
.wf-enter {
  opacity: 0;
}
.itemStyle-move {
  transition: all .5s cubic-bezier(.55,0,.1,1);
  -webkit-transition: all .5s cubic-bezier(.55,0,.1,1);
}
.time {
  float:left;
  font-size: 0.2em;
  color: #999;
}
#messageText {
  float:left;
  text-align:left;
  width:100%;
  height:24px;
  overflow:hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
