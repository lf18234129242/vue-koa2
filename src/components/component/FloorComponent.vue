<template>
    <div>
        <div class="floor">
            <div class="floorTittle">{{floorTittle}}</div>
            <div class="floorAnomaly">
                <div class="floorOne">
                    <img :src="floorData0.image" alt="" width="100%">
                </div>
                <div>
                    <div class="floorTwo">
                        <img :src="floorData1.image" alt="" width="100%">
                    </div>
                    <div class="floorThree">
                        <img :src="floorData2.image" alt="" width="100%">
                    </div>
                </div>
            </div>
            <div class="floorRule">
                <div v-for="(item, index) in floorData.slice(3)" :key="index">
                    <img :src="item.image" alt="" width="100%">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                floorData0: {},
                floorData1: {},
                floorData2: {},
            }
        },
        props:['floorData','floorTittle'],
        watch:{
            floorData:(newVal,oldVal) => {
                this.floorData0 = newVal[0];
                this.floorData1 = newVal[1];
                this.floorData2 = newVal[2];
            },
            floorTittle:(newVal,oldVal) => {
                this.floorTittle = newVal;
            }
        }
    }
</script>

<style scoped>
    .floorTittle{
        width: 100%;
        height: 1.8rem;
        font-size: 14px;
        line-height: 1.8rem;
        text-align: center;
        background: #eee;
    }
    .floorAnomaly{
        width: 100%;
        display: flex;
        flex-direction: row;
        background: #fff;
        border-bottom: 1px solid #ddd;
    }
    .floorAnomaly div{
        width: 10rem;
        box-sizing: border-box;
    }
    .floorOne{
        border-right: 1px solid #ddd;
    }
    .floorTwo{
        border-bottom: 1px solid #ddd;
    }
    .floorRule{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        background: #fff;
    }
    .floorRule div{
        box-sizing: border-box;
        width: 10rem;
        border-bottom: 1px solid #ddd;
    }
    .floorRule div:nth-child(odd){
        border-right: 1px solid #ddd;
    }
</style>