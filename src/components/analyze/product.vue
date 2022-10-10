<template>
    <div class="index-pay">
        <div class="index-pay-box">
            <span class="index-pay-box-name">通用要素抽取</span>
            <div class="index-pay-box-charts">
                <el-table
                    :data="tableData"
                    style="width: 100%"
                    :row-class-name="tableRowClassName">
                <el-table-column
                    prop="businessElement"
                    label="要素类型"
                    width="80"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="markNum"
                    label="标记数量"
                    width="80"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="extractNum"
                    label="抽取数量"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="extractTrueNum"
                    label="正确数量"
                    width="90"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="accuracy"
                    label="精确率(%)"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="recall"
                    label="召回率(%)"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="f1"
                    label="F1值(%)"
                    width="70"
                    align="center">
                </el-table-column>
                </el-table>
            </div>
                        <div class="index-pay-box-select">
            </div>
                        <div class="index-pay-box-select">
            </div>
                        <div class="index-pay-box-select">
            </div>  
            <div class="index-pay-box-select">
            </div>  
        </div>           
    </div>
</template>

<script>
export default {
    data(){
        return {
           tableData:[
            {
                businessElement:"标题",
                markNum:401,
                extractNum:401,
                extractTrueNum:381,
                accuracy:"95.0",
                recall:"95.0",
                f1:"95.0"
            },
            {
                businessElement:"分类",
                markNum:225,
                extractNum:225,
                extractTrueNum:310,
                accuracy:"100.0",
                recall:"100.0",
                f1:"100.0"
            },
            {
                businessElement:"主题词",
                markNum:61,
                extractNum:61,
                extractTrueNum:61,
                accuracy:"100.0",
                recall:"100.0",
                f1:"100.0"
            },
             {
                businessElement:"索引号",
                markNum:205,
                extractNum:205,
                extractTrueNum:205,
                accuracy:"100.0",
                recall:"100.0",
                f1:"100.0"
            },
            {
                businessElement:"发文字号",
                markNum:401,
                extractNum:385,
                extractTrueNum:384,
                accuracy:99.7,
                recall:95.7,
                f1:97.7
            },
            {
                businessElement:"发文机关",
                markNum:401,
                extractNum:389,
                extractTrueNum:373,
                accuracy:"95.8",
                recall:"93.0",
                f1:"94.4"
            },
            {
                businessElement:"发布日期",
                markNum:401,
                extractNum:102,
                extractTrueNum:102,
                accuracy:"100.0",
                recall:25.4,
                f1:40.6
            },
            {
                businessElement:"成文日期",
                markNum:187,
                extractNum:271,
                extractTrueNum:102,
                accuracy:37.6,
                recall:54.5,
                f1:44.5
            },
           
            
            
            {
                businessElement:"公文类型",
                markNum:401,
                extractNum:294,
                extractTrueNum:277,
                accuracy:94.2,
                recall:"69.0",
                f1:79.7
            },
            {
                businessElement:"总体",
                markNum:2768,
                extractNum:2333,
                extractTrueNum:2110,
                accuracy:90.4,
                recall:76.2,
                f1:82.7
            },
           ]
        }
    },
    methods:{
        tableRowClassName({ row, rowIndex }) {
      console.log(rowIndex) // 每一行的索引
      if (rowIndex === 9) {
        return 'warning-row'
      }
      return ''
},
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