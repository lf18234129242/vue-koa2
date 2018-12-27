<template>
    <div>
        <swiper :options="swiperOption" class="swiper">
            <swiper-slide class="text">
                <div>写入大量内容</div>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
    export default {
        data() {
            return {
                swiperOption: {
                    direction:'vertical',
                    slidesPerView:'auto',
                    freeMode:true,
                    mousewheel:true,
                }
            }
        },
        components: {
            swiper,
            swiperSlide
        },
    }
</script>

<style scoped>
    .swiper{
        height: 300px;
        overflow: hidden;
    }
    .text{
        font-size: 18px;
        text-align: left;
        padding: 30px;
        box-sizing: border-box;
        height: auto;
    }
</style>