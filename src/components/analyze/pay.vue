<template>
    <div class="index-pay">
        <div class="index-pay-box">
            <span class="index-pay-box-name">通用公文统计</span>
            <div class="index-pay-box-select">
            </div>
            <div class="index-pay-box-charts">
                <ve-pie :data="chartData" :colors="colors"></ve-pie>
            </div>    
        </div>           
    </div>
</template>

<script>
export default {
    data(){
        return {
            colors : ['#59a4ff','#ffbd2a', '#b37feb', '#4ace82', '#ff745c','#26d0ff','#f6cc00','#c04ee6','#3ed7ad','#ff957c'],
            chartData:{  
                columns: ['类目', '数量'],
                rows: [
                    { '类目': '报告', '数量': 1 },
                    { '类目': '公告', '数量': 62 },
                    { '类目': '函', '数量': 65 },
                    { '类目': '决定', '数量': 45 },
                    { '类目': '命令', '数量': 61 },
                    { '类目': '批复', '数量': 130 },
                    { '类目': '通报', '数量': 10 },
                    { '类目': '通告', '数量': 43 },
                    { '类目': '通知', '数量': 804 },
                    { '类目': '意见', '数量': 114 },
                ]
            }
        }
    }
}
</script>
<style scoped>
.index-pay{
    width: 100%;
    height: auto;
    background: #ffffff;
    border-radius: 5px;
    padding: 15px;
    box-sizing: border-box;
}
.index-pay-box{
    width: 100%;
    /* height: 200px; */
    border:  1px solid #E6E6E6;
    position: relative;
    padding: 20px 15px;
    box-sizing: border-box;
}
.index-pay-box-name{
    position: absolute;
    width: 100px;
    height: 30px;
    background: #ffffff;
    display: inline-block;
    text-align: center;
    line-height: 30px;
    font-size: 13px;
    color: #000000;
    left: 25px;
    top: -15px;
}
.index-pay-box-select{
    width: 100%;
    height: 40px;
    /* background: burlywood; */
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 10px;
}
.index-pay-box-charts{
    width: 100%;
    height: 350px;
    /* background: chocolate; */
}
</style>