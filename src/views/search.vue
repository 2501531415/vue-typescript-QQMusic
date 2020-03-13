<template>
<div class="search">
<van-search v-model="value" placeholder="搜索歌曲、歌手" @search="onSearch" @input="onSearch"/>
<div class="content">
    <scroll :probeType="2" class="wrapper" v-if="searchList">
        <div v-for="(item,index) in searchList.list" :key="index" class="search-item" @click="goToPlay(item)">
        <van-icon name="music" />
        {{item.singer[0].name}}-{{item.songname_hilight}}
    </div>
    </scroll>
</div>
</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import {Search} from 'vant'
import {SearchThing} from '../network/home'
import {Icon} from 'vant'
import {SongDetail} from '../network/detail'
import scroll from 'components/common/scroll/scroll.vue'
import {Mutation} from 'vuex-class'
@Component({
    components:{
        [Search.name]:Search,
        [Icon.name]:Icon,
        scroll
    }
})
export default class SearchView extends Vue{
    @Mutation private addPlayerList: any
    value = ''
    private searchList: object[] = []
    onSearch(){
        SearchThing(this.value).then(res=>{
            this.searchList = res.data.data
        })
        .catch(err=>{
            this.searchList = []
        })
    }
    goToPlay(item: any){
        const data = new SongDetail(item.songname,item.singer[0].name,item.songmid,item.albummid)
        this.addPlayerList(data)
    }

}
</script>
<style lang="stylus" scoped>
.wrapper{
    overflow hidden
    height:calc(100vh - 44px - 46px - 54px)
}
.content{
    display flex
    flex-direction column
    padding 0px 10px
    font-size 12px
}
.search-item{
    padding 10px 0px
}
</style>