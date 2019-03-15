<template>
  <div :style="conheight">
    <!-- 导航栏 -->
    <x-header
    :left-options="{showBack: false}"
    :right-options="{showMore: false}"
    @on-click-more="showMenus = true"
    style="background:#e4e2e4;height:49px;margin-left:-1px;margin-right:-2px;margin-top:-8px;"
    >
      <!-- 主页头像内容 -->
      <div slot="left" style="margin-left:-10px;margin-top:-10px">
        <span @click="showSide" v-show="true">
          <avatar fullname="My Sticker" image="https://raw.githubusercontent.com/ssouron/vue-avatar-component/master/img/example3.jpg" :size="40"></avatar>
        </span>
        <!-- <x-button type="default" text>submit</x-button> -->
        <a style="margin-top:10px;color:green" @click="login" v-show="!showUserIcon">登录</a>
      </div>
      <!-- 搜索框 -->
      <div style="width:100%">
        <input style="width:83%" type="search" class="header_search" id="searchInput" placeholder="输入关键字搜索">
        <div style="float:right;margin-top:8px">
          <x-icon style="color:black;" type="ios-search-strong" @click="search" size="30"></x-icon>
        </div>
      </div>
      <!-- 菜单内容 -->
      <div slot="right" style="">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link" style="font-size:1.2em">
            分类:<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>全部</el-dropdown-item>
            <el-dropdown-item>关注</el-dropdown-item>
            <el-dropdown-item>附近</el-dropdown-item>
            <el-dropdown-item>高赞</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </x-header>
    <!-- 添加按钮 -->
    <div style="position:fixed;left:88%;top:80%;z-index: 10;">
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
            <avatar fullname="My Sticker" image="https://raw.githubusercontent.com/ssouron/vue-avatar-component/master/img/example3.jpg" :size="80"></avatar>
            <br>
            <span>小明</span>
          </div>
          <div style="text-align:center">
            <el-row>
              <br>
              <el-button type="text" style="font-size:0.8em;color:#ff0000;width:100%" @click="showCarePerson">关注的人(99)</el-button>
              <br>
              <el-button type="text" style="font-size:0.8em;color:#b30606;width:100%">个人收藏(88)</el-button>
              <br>
              <el-button type="text" style="font-size:0.8em;color:#800404;width:100%">关注度(100)</el-button>
              <br>
              <el-button type="text" style="font-size:0.8em;color:#250101;width:100%">点赞数(99)</el-button>
            </el-row>
          </div>
          <div style="margin-top:300%">
          <el-button type="text" style="float:left" @click="logout">注销</el-button>
          <el-button type="text" style="float:right" @click="plus.runtime.quit()">退出</el-button>
          </div>
        </div>
      </transition>
    </div>
    <!-- 留言区 -->
    <v-touch style="width: 100%;margin:0px;height:92%;" @swipeup="slideNext" @swipedown="slidePre" @swipeleft="reload" @swiperight="reload">
      <slider ref="slider" :options="option">
        <slideritem
          v-for="item in [1,2]"
          :key="item.index"
          style="color:black"
        >
        <!-- 左右翻页的内容 -->
          <div style="width: 100%;height:100%;margin: 0px;">
            <waterfall
              :line="line"
              :line-gap="line_gap"
              :watch="messageList"
              ref="waterfall"
              :fixed-height="true"
            >
              <waterfall-slot
                v-for="(item, index) in messageList"
                :width="100"
                :height="item.height"
                :order="index"
                :key="item.messageId"
                move-class="itemStyle-move"
              > sdfgfj=
                <!-- 瀑布流形式内容 -->
                <div class="itemStyle" style="font-size: 0.2em">
                  <!-- 每个小格展示内容 -->
                  <el-card :body-style="{ padding: '0px' }" shadow="always" style="width:100%;height:auto;background:#ffeb3b;padding:0px">
                    <div style="width:50%;margin-left:40%;text-align:center" @click="showUserDetail">
                      <avatar fullname="My Sticker" image="https://raw.githubusercontent.com/ssouron/vue-avatar-component/master/img/example3.jpg" :size="30"></avatar>
                      <span style="font-size:2em;">小明</span>
                    </div>
                    <div ref="cards" style="width:100%;" @click="showMessageDetail">
                      <span style="width:100%;float:left;overflow:hidden;text-overflow: ellipsis;white-space: normal;text-align:left">
                        {{item.messageContent}}
                      </span>
                      <img src="../assets/one.gif" style="width:100%;display: block;">
                    </div>
                    <br>
                    <div style="text-align:center;margin-bottom:10px">
                      <span style="float:left;font-size:0.2em;color: #999;">{{item.time}}</span>
                      <span style="float:right;font-size:0.2em">浏览{{item.pageViews}}次</span>
                      <br><br>
                      <i style="font-size:20px" class="iconfont icon-dianzan" @click="item.praisePoint++"></i>
                      <span style="font-size:0.5em">{{item.praisePoint}}</span>
                      <i style="font-size:20px;margin-left:5px" class="iconfont icon-shoucang1" @click="item.collectionNumber++"></i>
                      <span style="font-size:0.5em">{{item.collectionNumber}}</span>
                      <i style="font-size:20px;margin-left:5px" class="iconfont icon-tubiaozhizuomobanyihuifu-" @click="showMarkerLists"></i>
                      <span style="font-size:0.5em">{{item.reviewNumber}}</span>
                    </div>
                  </el-card>
                </div>
              </waterfall-slot>
            </waterfall>
          </div>
        </slideritem>
      </slider>
    </v-touch>
  </div>
</template>

<script>
import {delCookie} from '@/assets/js/cookie.js'
import {XHeader, XButton} from 'vux'
import {getAllMessage} from '@/api'

export default {
  components: {
    XHeader,
    XButton
  },
  name: 'home',
  data () {
    return {
      goodNumber: 100,
      currentDate: '2019-11-12',
      line: 'v',
      line_gap: 100,
      conheight: {
        height: ''
      },
      option: {
        effect: 'fade',
        currentPage: 0,
        direction: 'horizontal',
        pagination: true,
        thresholdDistance: 50,
        thresholdTime: 300,
        speed: 300,
        loop: true
      },
      messageList: []
    }
  },
  created () {
    this.getData()
    window.addEventListener('resize', this.getHeight)
    this.getHeight()
    window.addEventListener('resize', this.getWidth)
    this.getWidth()
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
    /* 页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录 */
    // if (getCookie('username')) {
    //   this.$router.push({path: '/'})
    //   this.$store.dispatch('login')
    // }
    this.search()
  },
  methods: {
    getData () {
      getAllMessage().then((response) => {
        this.messageList = response.data.data
        for (var i in this.messageList) {
          this.$set(this.messageList[i], 'height', 300)
        }
      })
    },
    login () {
      this.$router.push({path: '/login'})
    },
    addMessage () {
      this.$router.push({path: '/add'})
    },
    showUserDetail () {
      this.$router.push({path: '/userDetail'})
    },
    showUserSelf () {
      this.$router.push({path: '/userSelf'})
    },
    showMessageDetail () {
      this.$router.push({path: '/messageDetail'})
    },
    showMarkerLists () {
      this.$router.push({path: '/messageDetail'})
    },
    showCarePerson () {
      this.$router.push({path: '/care'})
    },
    addOne (param) {
      param++
    },
    getHeight () {
      this.conheight.height = window.innerHeight + 'px'
    },
    getWidth () {
      this.line_gap = window.innerWidth / 2 - 2
    },
    slideNext () {
      this.$refs.slider.$emit('slideNext')
      this.reload()
    },
    slidePre () {
      this.$refs.slider.$emit('slidePre')
      this.reload()
    },
    showSide () {
      this.$store.dispatch('showSideBar')
    },
    reload () {
      this.messageList.sort(function () {
        return Math.random() - 0.5
      })
    },
    hideSide () {
      this.$store.dispatch('hideSideBar')
    },
    logout () {
      this.hideSide()
      this.$store.dispatch('logout')
      /* 删除cookie */
      delCookie('username')
    },
    search () {
      setTimeout(() => {
        var divHeight = this.$refs.cards
        for (var i in this.messageList) {
          var innerDivHeight = divHeight[i].offsetHeight
          var cardDiv = innerDivHeight + 110
          this.messageList[i].height = cardDiv
        }
      }, 500)
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
  width: 120px;
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
  width: 118px;
  height: 118px;
  background: #ffffff;
  background-size: cover;
  border: 1px solid #fff;
  overflow: hidden;
}
body {
  margin: 5px;
  font-family: Helvetica, sans-serif;
}
.itemStyle {
  position: absolute;
  top: 2px;
  left: 4px;
  right: 4px;
  bottom: 2px;
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
</style>
