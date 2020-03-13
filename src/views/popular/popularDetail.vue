<template>
<div class="detail">
    <music-list :list="rankObj" :rankData="rankInfo"/>
</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import {getTopList} from '../../network/home'
import MusicList from 'components/project/MusicList.vue'
@Component({
    components:{
        MusicList
    }
})
export default class PopularDetail extends Vue{
     private rankInfo: object[] = []
     private rankObj = {}
        private TopList: object[] =  [ {name:"热歌榜", code: 26, imgUrl: "https://y.gtimg.cn/music/photo_new/T003R300x300M000003z4qz24duh4e.jpg?max_age=2592000"}, {name:"新歌榜", code: 27, imgUrl:"https://y.gtimg.cn/music/photo_new/T003R300x300M000002izC1E4VpLbo.jpg?max_age=2592000"},
         {name:"抖音排行榜", code: 28, imgUrl: "https://y.gtimg.cn/music/photo_new/T003R300x300M000004fXCmh15h479.jpg?max_age=2592000"}, {name:"流行指数榜", code: 4, imgUrl:"http://y.gtimg.cn/music/photo_new/T003R300x300M000003Rkxu503my2J.jpg?max_age=2592000"}, {name:"飙升榜", code: 62, imgUrl: "https://y.gtimg.cn/music/photo_new/T003R300x300M0000037anhP0bphTN.jpg?max_age=2592000"},
          {name:"内地榜", code: 5, imgUrl: "https://y.gtimg.cn/music/photo_new/T003R300x300M0000018pUgB4DJqzQ.jpg?max_age=2592000"},
           {name:"中国香港榜", code: 59, imgUrl:"https://y.gtimg.cn/music/photo_new/T003R300x300M000002tqq9N0y1qgW.jpg?max_age=2592000"}, {name:"中国台湾榜", code: 61, imgUrl:"https://y.gtimg.cn/music/photo_new/T003R300x300M000001Zxqtr25wvwU.jpg?max_age=2592000"}, ]
    mounted () {
        const data = this.TopList.findIndex((item: any)=>item.code == parseInt(this.$route.params.id))
       this.rankObj = this.TopList[data]
        this._getTopList(parseInt(this.$route.params.id))
    }
    _getTopList(id: number){
       getTopList(id).then(res=>{
           this.rankInfo.push(res.data.data)
       })
    }
}
</script>
<style lang="stylus" scoped>
.detail{
    position fixed
    left 0
    right 0
    bottom 0
    top 0
    z-index 100
    background #eee
}
</style>