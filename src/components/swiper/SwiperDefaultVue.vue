<template>
    <div>
        <swiper>
            <swiper-slide>
                
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
                slide: [1,2,3,4,5,6]
            }
        },
        components: {
            swiper,
            swiperSlide
        },
    }
</script>

<style scoped>

</style>