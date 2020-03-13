<template>
<div class="detail">
    <music-list :list="singList" :data="songData"/>
</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import {getSingerDetail,Music} from '../../network/detail'
import MusicList from 'components/project/MusicList.vue'
@Component({
    components:{
        MusicList
    }
})
export default class SingerDetail extends Vue{
    name = ''
    songData: any[] = []
    singList: object = {}
    created () {
         const logo = `http://y.gtimg.cn/music/photo_new/T001R150x150M000${this.$route.params.id}.webp`
        getSingerDetail(this.$route.params.id).then(res=>{ 
                this.songData = res.data.data
                res.data.data.splice(0,1).forEach((item: any,index: number)=>{
                        if(item.musicData.singer){
                            if(item.musicData.singer.length == 1){
                                const name = item.musicData.singer[index].name
                               this.name = name
                            }
                        }
                 
                })
            this.$nextTick(()=>{
            this.singList = new Music(logo,this.name,[])
        })            
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