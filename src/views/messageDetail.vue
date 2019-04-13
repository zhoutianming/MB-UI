<template>
  <!-- 每个留言的详情页 -->
  <div style="">
    <x-header style="width:100%;background:#d4d1cf;height:49px;position:fixed;margin-top:-1px">
      <x-icon slot="overwrite-left" type="ios-arrow-back" size="30" style="fill:#000000;position:relative;top:-8px;left:-3px;" @click="backspace"></x-icon>
      <div style="text-align:center" @click="showUserDetail(message)">
        <avatar style="" :fullname="message.userName" :image="message.headImg" :size="35"></avatar>
        <span style="margin-top:-2px;color:#000000">{{message.userName}}</span>
      </div>
    </x-header>
    <x-header style="width:100%;background:#d4d1cf;height:49px;position:fixed;left:0px;top:93%;;margin-left:-1px;margin-top:-1px;" @touchmove.prevent>
      <div slot="overwrite-left">
        <i style="font-size:30px;color:#ff0000" class="iconfont icon-dianzan" @click="addPraisePoint(message)"></i>
        <i style="margin-left:5px;font-size:30px;color:#000000" class="iconfont icon-shoucang1"  @click="addCollectionNum(message)"></i>
      </div>
      <div slot="right">
        <i style="font-size:35px;color:#000000" class="iconfont icon-tubiaozhizuomobanyihuifu-" @click="showMarkPage"></i>
      </div>
    </x-header>
    <div style="overflow:scroll;height:90%;margin-bottom:70px">
      <div style="border-radius:10px;background:#d4d1cf;width:100%;text-align:center;margin-top:52px;">
        <div style="width:90%;margin-left:5%;float:left;text-overflow:ellipsis;white-space:normal;text-align:left;font-size:20px">
          {{message.messageContent}}
        </div>
        <div style="margin-left:2%;width:96%;display: block;">
          <img :src="message.messageImg" style="margin-top:20px;margin-bottom:20px;width:100%;height:100%">
        </div>
      </div>
      <time class="time" style="float:left;margin-left:10px">{{message.time}}</time><br>
      <div style="text-align:center;">
          <span style="font-size:12px">浏览{{message.pageViews}}次</span>
          <i style="font-size:20px;margin-left:15px" class="iconfont icon-dianzan"></i>
          <span style="font-size:0.5em">{{message.praisePoint}}</span>
          <i style="font-size:20px;margin-left:15px" class="iconfont icon-shoucang1"></i>
          <span style="font-size:0.5em">{{message.collectionNumber}}</span>
          <i style="font-size:23px;margin-left:15px" class="iconfont icon-006pinglunhuifu" @click="showMarkerList"></i>
          <span style="font-size:0.5em">{{message.reviewNumber}}</span>
      </div>
      <div style="width:90%;height:auto;margin-left:5%;margin-top:20px;margin-bottom:65px" v-show="showMarkerPage">
        <div v-for="(review, index) in reviewList" :key="index" class="review" @click="showPlusMarkPage(review)">
          <div @click="showUserDetail(review)" style="float:left">
            <avatar :fullname="review.userName" :image="review.headImg" :size="25"></avatar>
            <div style="margin-left:6px;margin-top:4px;float:right;font-size:0.8em">{{review.userName}}:</div>
          </div>
          <div style="margin-left:5%;width:90%;float:left;overflow:hidden;text-overflow: ellipsis;white-space: normal;text-align:left;font-size:0.9em">
            {{review.reviewContent}}
          </div>
          <br>
          <div v-for="(reviewPlus, index) in review.reviewPlusList" :key="index" class="reviewPlus">
            <span style="float:left;padding:1px;font-size:10px;color:#bdd02f">{{reviewPlus.userName}}:</span>
            <span style="float:left;overflow:hidden;text-overflow: ellipsis;white-space: normal;text-align:left;font-size:0.6em">
              {{reviewPlus.reviewContent}}
            </span>
          </div>
        </div>
      </div>
      <!-- 留言评论界面 -->
      <el-dialog
        width="100%"
        top="20%"
        :visible.sync="isShowMarkPage"
        :modal="false"
        :append-to-body="true"
        :show-close="false"
        style=""
        >
        <div style="margin-top:-48px;width:100%;height:100%">
          <el-input
            type="textarea"
            :rows="6"
            placeholder="请输入内容"
            v-model="reviews"
            style="font-size:15px"
          >
          </el-input>
        </div>
        <div slot="footer" class="dialog-footer" style="opacity:1">
          <el-button style="background:#b5b29c;float:left;width:40%" @click="isShowMarkPage = false">取 消</el-button>
          <el-button style="background:#0000ff;float:right;width:40%" type="primary" @click="userReview">评论</el-button>
        </div>
      </el-dialog>
      <!-- 评论的评论界面 -->
      <el-dialog
        width="100%"
        top="40%"
        :visible.sync="isShowReviewPage"
        :modal="false"
        :append-to-body="true"
        :show-close="false"
        style=""
        >
        <div style="margin-top:-48px;width:100%;height:100%">
          <el-input
            type="textarea"
            :rows="6"
            placeholder="请输入评论内容"
            v-model="reviewedReview"
            style="font-size:15px"
          >
          </el-input>
        </div>
        <div slot="footer" class="dialog-footer" style="opacity:1">
          <el-button style="background:#b5b29c;float:left;width:40%" @click="isShowReviewPage = false">取 消</el-button>
          <el-button style="background:#0000ff;float:right;width:40%" type="primary" @click="addReviewPlus">评论</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {addPraise, getReview, addReview, addPlusReview, addCollection} from '@/api'
import {XHeader, Icon} from 'vux'

export default {
  components: {
    XHeader,
    Icon
  },
  name: 'messageDetail',
  data () {
    return {
      reviewList: [],
      currentReview: {},
      goodNumber: 100,
      currentDate: '2019-11-12',
      isShowMarkPage: false,
      isShowReviewPage: false,
      showMarkerPage: false,
      reviewedReview: '',
      reviews: '',
      reviewStyle: {
        borderRadius: '20px',
        height: 'auto',
        background: '#879294',
        maxHeight: '145px',
        overflow: 'auto',
        marginBottom: '10px',
        padding: '5px'
      }
    }
  },
  computed: {
    message () {
      return this.$store.getters.getCurrentMessage
    }
  },
  created () {
    this.getReviewData()
  },
  methods: {
    getReviewData () {
      var messageVO = {}
      messageVO.messageId = this.message.messageId
      getReview(messageVO).then((response) => {
        this.reviewList = response.data.data
      })
    },
    backspace () {
      this.$router.go(-1)
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
    showMarkerList () {
      this.showMarkerPage = !this.showMarkerPage
    },
    showMarkPage () {
      if (localStorage.hasOwnProperty('userName')) {
        this.showMarkerPage = true
        this.isShowMarkPage = true
      } else {
        this.$message({
          message: '请先登录!',
          type: 'success',
          center: true
        })
        this.$router.push({path: '/login'})
      }
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
    addPraisePoint (message) {
      message.praisePoint++
      var messageVO = {}
      messageVO.messageId = message.messageId
      addPraise(messageVO)
    },
    userReview () {
      if (this.reviews) {
        var reviewDO = {}
        reviewDO.userId = this.$store.getters.getUserData.id
        reviewDO.reviewContent = this.reviews
        reviewDO.reviewedMessageId = this.message.messageId
        addReview(reviewDO).then((response) => {
          var review = response.data.data
          review.userName = this.$store.getters.getUserData.userName
          review.headImg = this.$store.getters.getUserData.headImg
          review.reviewPlusList = []
          this.reviewList.unshift(review)
          this.message.reviewNumber++
        })
        this.isShowMarkPage = false
        this.reviews = ''
      } else {
        this.$message({
          message: '请输入评论内容！',
          type: 'warn',
          center: true
        })
      }
    },
    showPlusMarkPage (review) {
      if (localStorage.hasOwnProperty('userName')) {
        this.isShowReviewPage = true
        this.currentReview = review
      } else {
        this.$message({
          message: '请先登录!',
          type: 'success',
          center: true
        })
        this.$router.push({path: '/login'})
      }
    },
    addReviewPlus () {
      if (this.reviewedReview) {
        var reviewDO = {}
        reviewDO.userId = this.$store.getters.getUserData.id
        reviewDO.reviewContent = this.reviewedReview
        reviewDO.reviewedMessageId = this.currentReview.reviewedMessageId
        reviewDO.reviewedReviewId = this.currentReview.reviewId
        addPlusReview(reviewDO).then((response) => {
          var reviewPlus = {}
          var data = response.data.data
          reviewPlus.userId = data.userId
          reviewPlus.userName = this.$store.getters.getUserData.userName
          reviewPlus.reviewId = data.reviewId
          reviewPlus.reviewContent = data.reviewContent
          reviewPlus.reviewedReviewId = data.reviewedReviewId
          for (var ii in this.reviewList) {
            if (this.reviewList[ii].reviewId === reviewPlus.reviewedReviewId) {
              this.reviewList[ii].reviewPlusList.unshift(reviewPlus)
            }
          }
        })
        this.isShowReviewPage = false
        this.reviewedReview = ''
      } else {
        this.$message({
          message: '请输入评论内容！',
          type: 'warn',
          center: true
        })
      }
    }
  }
}
</script>

<style>
.review{
border-radius:20px;
height:auto;
background:#879294;
max-height:145px;
overflow: auto;
margin-bottom:10px;
padding:5px;
}
.reviewPlus{
height:auto;
margin-top:5px;
margin-left:10%;
width:80%;
max-height:500px;
overflow: hidden
}
</style>
