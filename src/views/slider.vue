<template>
  <div>
    <Slider
      ref="slider"
      style="height:94%;z-index:9"
      animation="fade"
      :control-btn="false"
      :autoplay="false"
      v-model="sliderIndex">
      <SliderItem
        v-for="(messageArray,index) in messageArrayList"
        :key="index"
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
              v-for="(item, index) in messageArray"
              :width="100"
              :height="item.imageHeight"
              :order="index"
              :key="item.messageId"
              move-class="itemStyle-move"
            >
              <!-- 瀑布流形式内容 -->
              <div class="itemStyle" style="font-size: 0.2em">
                <!-- 每个小格展示内容 -->
                <el-card :body-style="{ padding: '0px' }" shadow="always" style="width:100%;height:auto;background:#9e9d8f;padding:0px">
                  <div style="width:50%;margin-left:40%;text-align:center" @click="showUserDetail(item)">
                    <avatar fullname="My Sticker" :image="item.headImg" :size="30"></avatar>
                    <span style="font-size:13px;">{{item.userName}}</span>
                  </div>
                  <div style="width:100%;" @click="showMessageDetail(item)">
                    <span id="messageText" style="font-size:15px;">
                      {{item.messageContent}}
                    </span>
                    <div>
                      <img :src="item.messageImg" style="width:100%;height:auto;display: block;">
                    </div>
                  </div>
                  <br><br><br>
                  <div style="text-align:center;margin-bottom:10px;color:#000">
                    <span style="float:left;font-size:10px;color:#000;">{{item.time}}</span>
                    <span style="float:right;font-size:10px">点击浏览{{item.pageViews}}次</span>
                    <br><br>
                    <i style="font-size:15px;color:red" class="iconfont icon-dianzan1" :class="{white:!item.isPraise,blue:item.isPraise}" @click="addPraisePoint(item)"></i>
                    <span style="font-size:13px">{{item.praisePoint}}</span>
                    <i style="font-size:15px;margin-left:5px" class="iconfont icon-shoucang1" @click="addCollectionNum(item)"></i>
                    <span style="font-size:13px">{{item.collectionNumber}}</span>
                    <i style="font-size:15px;margin-left:5px" class="iconfont icon-tubiaozhizuomobanyihuifu-" @click="showMessageDetail(item)"></i>
                    <span style="font-size:13px">{{item.reviewNumber}}</span>
                  </div>
                </el-card>
              </div>
            </waterfall-slot>
          </waterfall>
        </div>
      </SliderItem>
    </Slider>
  </div>
</template>

<script>
import {Cell, Group, XHeader, XButton, Badge, Tab, TabItem} from 'vux'
import {getAllMessage, getUser, addPraise, addView, addCollection} from '@/api'
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
        background: '#79c7ab'
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
      messageArrayList: []
    }
  },
  created () {
    this.getData()
    this.sliderIndex = this.$store.getters.getCurrent
  },
  destroyed () {
    this.$store.commit('setCurrent', this.sliderIndex)
  },
  computed: {
    messageList () {
      return this.$store.getters.getMessageList
    },
    user () {
      return this.$store.getters.getUserData
    }
  },
  mounted () {
    /* 页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录 */
    if (localStorage.hasOwnProperty('userName')) {
      this.$router.push({path: '/'})
      this.$store.dispatch('login')
      var user = {}
      user.userName = localStorage.getItem('userName')
      getUser(user).then((response) => {
        this.$store.commit('setUserData', response.data.data)
      })
    }
  },
  methods: {
    getData () {
      getAllMessage().then((response) => {
        var messageList = response.data.data
        for (var i in messageList) {
          messageList[i].imageHeight = messageList[i].imageHeight * 0.55 + 135
          messageList[i].isPraise = false
          messageList[i].isCollection = false
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
    addPraisePoint (item) {
      item.isPraise = !item.isPraise
      item.praisePoint++
      var messageVO = {}
      messageVO.messageId = item.messageId
      addPraise(messageVO)
    },
    addCollectionNum (item) {
      if (localStorage.hasOwnProperty('userName')) {
        var messageVO = {}
        messageVO.userId = this.$store.getters.getUserData.id
        messageVO.messageId = item.messageId
        addCollection(messageVO).then((response) => {
          if (response.data.code === 1) {
            item.collectionNumber++
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
      console.log(item)
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
  background: #ade4c3;
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
  width: 178px;
  height: 140px;
  background: #b5bbae;
  background-size: cover;
  overflow: hidden;
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
  bottom: 0px;
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
