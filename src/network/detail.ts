import {request} from './request'

// 获取热门歌单详情

export function getRecommendDetail(id: string){
    return request({
        url:'/songList',
        params:{
            id
        }
    })
}
export class Music{
    public logo: string
    public name: string
    public songlist: any[]
    constructor(logo: string,name: string,list: any[]){
        this.logo = logo
        this.name = name
        this.songlist = list
    }
}
// 获取歌手歌曲详情
export function getSingerDetail(id: string){
    return request({
        url:'/song/artist',
        params:{
            id
        }
    })
}
export class SongDetail{
    public songName: string
    public singer: string
    public imgUrl: string
    public audioUrl: string
    public mid: string
    public sid: string
    constructor(name: string,singer: string,mid: string,sid: string){
        this.songName = name
        this.singer = singer
        this.mid = mid
        this.sid = sid
        this.imgUrl = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${sid}.jpg?max_age=2592000`
        this.audioUrl = `https://v1.itooi.cn/tencent/url?id=${mid}&quality=320`
    }
}
// 获取歌词
export function getLyric(id: string){
    return request({
        url:'/lrc',
        params:{
            id
        }
    })
}