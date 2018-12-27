<template>
    <div>
        <div class="searchBar">
            <van-row class="test-row">
                <van-col span="3">
                    <img :src="locationIcon" alt="定位" class="locationIcon">
                </van-col>
                <van-col span="16">
                    <input type="text" class="searchInput">
                </van-col>
                <van-col span="5">
                    <van-button size="mini">查找</van-button>
                </van-col>
            </van-row>
        </div>
        <!-- 轮播图 -->
        <div class="swipeArea">
            <van-swipe :autoplay="3000">
                <van-swipe-item v-for="(item,index) in bannerPicArr" :key="index">
                    <!-- 图片懒加载 -->
                    <img v-lazy="item.image" alt="" width="100%">
                </van-swipe-item>
            </van-swipe>
        </div>
        <!-- type bar -->
        <div class="typeBar">
            <div v-for="(item, index) in category" :key="index">
                <img v-lazy="item.image" alt="" width="90%">
                <span>{{item.mallCategoryName}}</span>
            </div>
        </div>
        <!-- adBanner -->
        <div class="adBanner">
            <img v-lazy="adBanner" alt="" width="100%">
        </div>
        <!-- recommend goods area -->
        <div class="recommendArea">
            <div class="recommendTittle">
                商品推荐
            </div>
            <div class="recommendBody">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(item,index) in recommendGoods" :key="index">
                        <div class="recommendItem">
                            <img :src="item.image" alt="" width="80%">
                            <div>{{item.goodsName}}</div>
                            <div>￥{{item.price | moneyFilter}}(￥{{item.mallPrice | moneyFilter}})</div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>

        <FloorComponent
            :floorData="floor1"
            :floorTittle="floorName0"
        ></FloorComponent>
        <FloorComponent
            :floorData="floor2"
            :floorTittle="floorName1"
        ></FloorComponent>
        <FloorComponent
            :floorData="floor3"
            :floorTittle="floorName2"
        ></FloorComponent>

        <!-- hot area -->
        <div class="hot-area">
            <div class="hot-tittle">热卖商品</div>
            <div class="hot-goods">
                <van-list>
                    <van-row gutter="20">
                        <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
                            <GoodsInfo
                                :goodsImage="item.image"
                                :goodsName="item.name"
                                :goodsPrice="item.price"
                                :goodsId="item.goodsId"
                            ></GoodsInfo>
                       </van-col>
                    </van-row>
                </van-list>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import FloorComponent from '../component/FloorComponent.vue';
// import Register from '../component/Register.vue';
import GoodsInfo from '../component/GoodsInfoComponent.vue';
import {toMoney} from '@/filter/moneyFilter.js'
import url from '@/serviceAPI.config.js'
    export default {
        data() {
            return {
                msg: 'ShoppingMall',
                locationIcon:require('../../assets/img/location.png'),
                bannerPicArr:[],
                category:{},
                adBanner:'',
                recommendGoods:[],
                swiperOption:{
                    slidesPerView:'3',
                },
                floor1:[],
                floor2:[],
                floor3:[],
                floorName0:'',
                floorName1:'',
                floorName2:'',
                // 热卖商品
                hotGoods:[],
            }
        },
        components: {
            swiper,
            swiperSlide,
            FloorComponent,
            GoodsInfo,
            // Register
        },
        filters:{
            moneyFilter(money){
                return toMoney(money)
            }
        },
        created(){
            var that = this;
            axios({
                url:url.getShoppingMallInfo,
                methods:'get',
            }).then(res =>{
                console.log(res.data);
                if (res.status === 200) {
                    this.category = res.data.data.category;
                    this.adBanner = res.data.data.advertesPicture.PICTURE_ADDRESS;
                    this.bannerPicArr = res.data.data.slides;
                    this.recommendGoods = res.data.data.recommend;
                    this.floor1 = res.data.data.floor1;
                    this.floor2 = res.data.data.floor2;
                    this.floor3 = res.data.data.floor3;
                    this.floorName0 = res.data.data.floorName.floor1;
                    this.floorName1 = res.data.data.floorName.floor2;
                    this.floorName2 = res.data.data.floorName.floor3;
                    this.hotGoods = res.data.data.hotGoods;
                }
                
            }).catch(err => {
                console.log(err);
            })
        }
    }
</script>

<style scoped>
/*  搜索 */
    .locationIcon{
        width: 80%;
        padding: 0.2rem 0 0 0.2rem;
    }
    .searchBar{
        height: 2.2rem;
        background: #e5017d;
        line-height: 2.2rem;
        overflow: hidden;
    }
    .searchInput{
        width: 100%;
        height: 1.3rem;
        border:0;
        border-bottom: 1px solid #fff!important;
        background: #e5017d;
        color: #fff;
    }
    /* banner */
    .swipeArea{
        width: 100%;
        /* height: 8rem; */
        clear: both;
        max-height: 15rem;
        overflow: hidden;
    }

    .typeBar{
        background: #fff;
        margin: 0.3rem 0.3rem;
        border-radius: 0.3rem;
        font-size: 14px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
    }
    .typeBar img{
        width: 3rem;
        height: 3rem;
    }
    .typeBar div{
        /* display: flex; */
        padding: 0.3rem;
        font-size: 12px;
        text-align: center;
        flex: 1;
        
    }
    .recommendArea{
        background: #fff;
        margin-top: 0.3rem;
    }
    .recommendTittle{
        border-bottom: 1px solid #eee;
        font-size: 14px;
        padding: 0.2rem;
        color: #e5017d;
        text-align: left;
    }
    .recommendBody{
        border-bottom: 1px solid #eee;
    }
    .recommendItem{
        width: 99%;
        border-right: 1px solid #eee;
        font-size: 12px;
        text-align: center;
    }
    /* .swiper-slide{
        width: 33%!important;
    } */
    .hot-area{
        text-align: center;
        font-size: 14px;
        height: 1.8rem;
        line-height: 1.8rem;
    }
    .hot-goods{
        height: 130rem;
        overflow: hidden;
        background: #fff;
    }
</style>