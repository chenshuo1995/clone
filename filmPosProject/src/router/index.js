import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'//登录页面
import home from '@/components/home/home'//主页面
import movieTickets from '@/components/home/childs/movieTickets'//影票
import movieTicketsFilm from '@/components/home/childs/childs/movieTicketsFilm'//影票影片
import movieTicketsScreen from '@/components/home/childs/childs/movieTicketsScreen'//影票影片
import goods from '@/components/home/childs/goods'//卖品
import cart from '@/components/home/childs/cart'//购物车
import selectSeat from '@/components/selectseat/selectSeat'//选座
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      component: home,
      children:[
        //影票 
        {
          path:'movieTickets',
          // name:'movieTickets',
          component:movieTickets,
          children:[
            //影片 
            {
              path:'movieTicketsFilm',
              name:'movieTicketsFilm',
              component:movieTicketsFilm
            },
            //影厅
            {
              path:'movieTicketsScreen',
              name:'movieTicketsScreen',
              component:movieTicketsScreen
            },
            {
              path: '/',
              redirect:"/home/movieTickets/movieTicketsFilm"
            }
          ]
        },
        //卖品
        {
          path:'goods',
          name:'goods',
          component:goods
        },
        //购物车
        {
          path:'cart',
          name:'cart',
          component:cart
        },
        {
          path: '/',
          redirect:"/home/movieTickets"
        } 
      ]
    },
    {
      path:'/selectSeat',
      name:'selectSeat',
      component:selectSeat
    },
    {
      path: '/',
      redirect:"/login"
    } 
  ]
})
