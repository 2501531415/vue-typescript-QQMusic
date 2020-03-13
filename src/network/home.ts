// 获取轮播图
import {request} from './request'
export function getBanner(){
    return request({
        url:'/banner'
    })
}
// 获取热门推荐
export function getRecommend(pageSize: number){
    return request({
        url:'/songList/hot',
        params:{
            pageSize
        }
    })
}
// 获取歌手列表
export function getSinger(){
    return request({
        url:'/artist/list'
    })
}
export class Singer{
    public singerId: number
    public singerName: string
    public avatarUrl: string
    public singerMid: string
    constructor(id: number,name: string,pic: string,mid: string){
        this.singerId =id
        this.singerName = name
        this.avatarUrl = pic
        this.singerMid = mid
    }
}
// 排行榜
export function getTopList(id: number){
    return request({
        url:'/topList',
        params:{
            id:id,
            page:0,
            pageSize:30,

        }
    })
}
// 搜索
export function SearchThing(keyword: string){
    return request({
        url:'/search',
        params:{
            keyword:keyword,
            type:'song'
        }
    })
}