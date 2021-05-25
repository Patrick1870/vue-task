import Vue from 'vue'
import Router from 'vue-router'
import Home from './../pages/Home.vue'
import ViewUser from './../pages/ViewUser.vue'

Vue.use(Router)

export default new Router({
    routes: [
      { path: '/', component: Home }, 
      { path: '/view/', component: ViewUser, props: {user: null} },
    ]
})
