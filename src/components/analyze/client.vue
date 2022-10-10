<template>
    <div class="index-client">
        <div class="index-client-box">
            <span class="index-client-box-name">业务公文统计</span>
            <div class="index-client-box-select">
            </div>
            <div class="index-client-box-charts">
                <ve-pie :data="chartData" :colors="colors_two"></ve-pie>
            </div>    
        </div>           
    </div>
</template>

<script>
export default {
    data(){
        return {
            colors_two : ['#59a4ff','#ffbd2a', '#b37feb', '#4ace82', '#ff745c','#26d0ff','#f6cc00','#c04ee6','#3ed7ad','#ff957c','#59bfff','#88d73e'],
            chartData:{
                
                columns: ['类目', '数量'],
                rows: [
                    { '类目': '安全-核安全', '数量': 397 },
                    { '类目': '安全-社会安全', '数量': 28 },
                    { '类目': '安全-网络安全', '数量': 35 },
                    { '类目': '军事-军事批复', '数量': 116 },
                    { '类目': '军事-人事任命', '数量': 9 },
                    { '类目': '军事-战功命令', '数量': 59 },
                    { '类目': '军事-征兵通知', '数量': 7 },
                    { '类目': '科技-创新改革', '数量': 198 },
                    { '类目': '科技-国防科技', '数量': 29 },
                    { '类目': '科技-航空探月', '数量': 3 },
                    { '类目': '科技-新能源', '数量': 40 },
                    { '类目': '政府类型公文', '数量': 414 },
                ]
            }
        }
    }
}
</script>
<style scoped>
.index-client{
    width: 100%;
    height: auto;
    background: #ffffff;
    border-radius: 5px;
    padding: 15px;
    box-sizing: border-box;
}
.index-client-box{
    width: 100%;
    /* height: 200px; */
    border:  1px solid #E6E6E6;
    position: relative;
    padding: 20px 15px;
    box-sizing: border-box;
}
.index-client-box-name{
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
.index-client-box-select{
    width: 100%;
    height: 40px;
    /* background: burlywood; */
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 10px;
}
.index-client-box-charts{
    width: 100%;
    height: 350px;
    /* background: chocolate; */
}
</style>