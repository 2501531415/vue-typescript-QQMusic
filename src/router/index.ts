import Vue from 'vue'
import VueRouter from 'vue-router'
const recommend = ()=>import('views/recommend.vue')
const singer = ()=>import('views/singer.vue')
const popular = ()=>import('views/popular.vue')
const search = ()=>import('views/search.vue')
const recommendDetail =()=>import('views/recommend/recommendDetail.vue')
const singerDetail =()=>import('views/singer/singerDetail.vue')
const popularDetail =()=>import('views/popular/popularDetail.vue')

Vue.use(VueRouter)

const router = new VueRouter({
    routes:[
        {path:'/',redirect:'/recommend'},
        {path:'/recommend',component:recommend,children:[
            {path:'/recommend/:id',component:recommendDetail}
        ]},
        {path:'/singer',component:singer,children:[
            {path:'/singer/:id',component:singerDetail}
        ]},
        {path:'/search',component:search},
        {path:'/popular',component:popular,children:[
            {path:'/popular/:id',component:popularDetail}
        ]}
    ]
})
export default router