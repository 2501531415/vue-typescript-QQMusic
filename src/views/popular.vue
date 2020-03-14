<template>
<div class="popular" :class="[singStatus?'sing':'']">
    <div class="popular-list" v-for="(item,index) in rankInfo" :key="index" @click="goToDetail(item.code)">
        <img :src="item.imgUrl" alt="">
        <div class="content">
            <ul class="text">
                <li v-for="(item1,indey) in item.list" :key="indey">{{indey+1}}{{item1.name}}-{{item1.singer[0].name}}</li>  
            </ul>
        </div>
    </div>
    <router-view></router-view>
</div>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator'
import {Getter} from 'vuex-class'
import {getTopList} from '../network/home'

@Component
export default class Popular extends Vue{
        private rankInfo: object[] = []
        @Getter private currentSong: any
        private TopList: object[] =  [ {name:"热歌榜", code: 26, imgUrl: "https://y.gtimg.cn/music/photo_new/T003R300x300M000003z4qz24duh4e.jpg?max_age=2592000"}, {name:"新歌榜", code: 27, imgUrl:"https://y.gtimg.cn/music/photo_new/T003R300x300M000002izC1E4VpLbo.jpg?max_age=2592000"},
         {name:"抖音排行榜", code: 28, imgUrl: "https://y.gtimg.cn/music/photo_new/T003R300x300M000004fXCmh15h479.jpg?max_age=2592000"}, {name:"流行指数榜", code: 4, imgUrl:"http://y.gtimg.cn/music/photo_new/T003R300x300M000003Rkxu503my2J.jpg?max_age=2592000"}, {name:"飙升榜", code: 62, imgUrl: "https://y.gtimg.cn/music/photo_new/T003R300x300M0000037anhP0bphTN.jpg?max_age=2592000"},
          {name:"内地榜", code: 5, imgUrl: "https://y.gtimg.cn/music/photo_new/T003R300x300M0000018pUgB4DJqzQ.jpg?max_age=2592000"},
           {name:"中国香港榜", code: 59, imgUrl:"https://y.gtimg.cn/music/photo_new/T003R300x300M000002tqq9N0y1qgW.jpg?max_age=2592000"}, {name:"中国台湾榜", code: 61, imgUrl:"https://y.gtimg.cn/music/photo_new/T003R300x300M000001Zxqtr25wvwU.jpg?max_age=2592000"}, ]
    mounted () {
        this._getTopList()
    }
    _getTopList(){
        this.TopList.forEach((item: any,index)=>{
             getTopList(item.code).then((res: any)=>{
                item.list = (res.data.data.splice(0,3))
                this.rankInfo.push(item)

       })
    })
    }
    goToDetail(id: number){
        this.$router.push(`/popular/${id}`)
    }
    get singStatus(){
        if(this.currentSong.mid){
            return true
        }else{
            return false
        }
    }
}
</script>
<style lang="stylus" scoped>
.popular{
    height calc(100vh - 44px - 46px)
    overflow auto
}
.sing{
    height calc(100vh - 44px - 46px - 46px)
}
.popular-list{
    display flex
    padding 10px 15px
}
.content{
    width: 100%;
    background-color: #eee;
}
.popular-list img{
    width 66px
    height 66px
}
.text{
    margin 5px 10px
    overflow: hidden
    text-overflow:ellipsis
    white-space: nowrap
}   
.text li {
    font-size 11px
    margin-top 3px

}
    
</style>