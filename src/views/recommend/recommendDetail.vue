<template>
<div class="detail" ref="detail">
<music-list :list="singList"/>
</div>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator'
import {getRecommendDetail,Music} from '../../network/detail'
import MusicList from 'components/project/MusicList.vue'
@Component({
    components:{
        MusicList
    }
})
export default class ClassName extends Vue{
    singList: object = {}
    mounted () {
        getRecommendDetail(this.$route.params.id).then(res=>{
            this.singList = new Music(res.data.data[0].logo,res.data.data[0].dissname,res.data.data[0].songlist)
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