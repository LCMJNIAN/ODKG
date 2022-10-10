<template>
    <div class="index-pay">
        <div class="index-pay-box">
            <span class="index-pay-box-name">业务要素抽取</span>
           
            <div class="index-pay-box-select">
            </div>
             
            <div class="index-pay-box-charts">
                <el-table
                    :data="tableData"
                    style="width: 100%"
                    :row-class-name="tableRowClassName">
                <el-table-column
                    prop="generalElement"
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
            
        </div>           
    </div>
</template>

<script>
export default {
    data(){
        return {
           tableData:[
            {
                generalElement:"主体",
                markNum:1280,
                extractNum:1056,
                extractTrueNum:988,
                accuracy:93.5,
                recall:77.1,
                f1:84.5
            },
            
            {
                generalElement:"客体",
                markNum:3631,
                extractNum:2481,
                extractTrueNum:2076,
                accuracy:83.6,
                recall:57.1,
                f1:67.9
            },
            {
                generalElement:"目的",
                markNum:1475,
                extractNum:921,
                extractTrueNum:858,
                accuracy:93.1,
                recall:58.1,
                f1:71.6
            },
            {
                generalElement:"地点",
                markNum:203,
                extractNum:225,
                extractTrueNum:197,
                accuracy:87.5,
                recall:"97.0",
                f1:"92.0"
            },
            
            {
                generalElement:"来源",
                markNum:199,
                extractNum:225,
                extractTrueNum:198,
                accuracy:"88.0",
                recall:99.5,
                f1:93.4
            },
            {
                generalElement:"完成时间",
                markNum:914,
                extractNum:755,
                extractTrueNum:725,
                accuracy:"96.0",
                recall:79.3,
                f1:86.8
            },
            {
                generalElement:"总体",
                markNum:7702,
                extractNum:5663,
                extractTrueNum:5042,
                accuracy:89.3,
                recall:65.6,
                f1:73.3
            },
           ]
        }
    },
    methods:{
        tableRowClassName({ row, rowIndex }) {
      console.log(rowIndex) // 每一行的索引
      if (rowIndex === 6) {
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
<style>
.el-table .warning-row {
	background: #e2eeca !important;
}

.el-table .warning-row:hover>td {
	background: #a1aad4 !important;
}
</style>