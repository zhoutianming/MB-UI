import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home'
import Login from '@/views/login'
import AddMessage from '@/views/addMessage'
import EditMessage from '@/views/editMessage'
import UserDetail from '@/views/userDetail'
import UserSelf from '@/views/userSelf'
import MessageDetail from '@/views/messageDetail'
import Person from '@/views/personCenter'
import Care from '@/views/carePerson'
import PersonalCollection from '@/views/personalCollection'
// import Ha from '@/views/ho'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/add',
      name: 'addMessage',
      component: AddMessage
    },
    {
      path: '/edit',
      name: 'editMessage',
      component: EditMessage
    },
    {
      path: '/userDetail',
      name: 'userDetail',
      component: UserDetail
    },
    {
      path: '/userSelf',
      name: 'userSelf',
      component: UserSelf
    },
    {
      path: '/messageDetail',
      name: 'messageDetail',
      component: MessageDetail
    },
    {
      path: '/person',
      name: 'person',
      component: Person
    },
    {
      path: '/personalCollection',
      name: 'personalCollection',
      component: PersonalCollection
    },
    {
      path: '/care',
      name: 'care',
      component: Care
    }
  ]
})
