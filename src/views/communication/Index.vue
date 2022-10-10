<template>
  <el-carousel :interval="5000" arrow="always" height="100vh">
    <el-carousel-item v-for="(item,index) in imageBox" :key="index" @click.native="linkTo(item.link)">
        <div class="button" @click.stop="downLoad">
          <el-button  float="right">使用说明文档</el-button>
        </div>
        <p class="title_id">{{item.id}}</p>
        <br>
        <p class="option-select">操作方式：</p>
        <ul class="option">
            <li class="optionOne">{{item.optionOne}}</li>
            <li class="optionTwo">{{item.optionTwo}}</li>
            <li class="optionThree">{{item.optionThree}}</li>
            <li class="optionForth">{{item.optionForth}}</li>
        </ul>
    </el-carousel-item>
  </el-carousel>
</template>
<script>
export default{
    data(){
        return{
            imageBox:[
                {link:"../pigeonhole/Index",id:"归档", optionOne:"1. 点击左上角的点击上传按钮上传符合规定文件，生成归档任务",optionTwo:"2. 在任务列表中点击发送请求按钮，执行公文的归档操作", optionThree:"3. 在任务列表中点击查看结果按钮，查询公文的归档结果", optionForth:"4. 在任务列表中点击下载文件按钮，以.csv格式下载归档文件"},
                {link:"../business/Index",id:"业务抽取", optionOne:"1. 点击左上角的点击上传按钮上传符合规定文件，生成归档任务",optionTwo:"2. 在任务列表中点击发送请求按钮，执行公文的归档操作", optionThree:"3. 在任务列表中点击查看结果按钮，查询公文的归档结果", optionForth:"4. 在任务列表中点击下载文件按钮，以.csv格式下载归档文件"},
                {link:"../general/Index",id:"通用抽取",  optionOne:"1. 点击左上角的点击上传按钮上传符合规定文件，生成抽取任务",optionTwo:"2. 在任务列表中点击发送请求按钮，执行要素抽取操作",optionThree:"3. 在任务列表中点击查看结果按钮，查询公文的抽取信息",optionForth:"4. 在任务列表中点击下载文件按钮，以.csv格式下载抽取文件"},
            ]
        }
    },
    methods:{
        linkTo(link) {
            this.$router.push(link);
        },
        downLoad() {
          let a = document.createElement('a');
	        let evt = document.createEvent('MouseEvents');
	        a.download = '操作文档';
	        a.href = './document/tip.docx';
	        evt.initEvent('click',true,true);
	        a.dispatchEvent(evt);
	        window.URL.revokeObjectURL(a.href);
        },
    }
}
</script>
<style>

  .title_id{
    color: black;
    font: 800;
    font-size: 30px;
    margin-top: 7%;
    margin-left:  45%;
  }
  .option {
    margin-left:  33%;
    font-size: 20px;
    margin-top: 35px;
    font: 800;
  }
  .option-select {
    margin-left:  25%;
    font-size: 23px;
    margin-top: 20px;
    font: 800;
  }
  .optionOne {
    margin-bottom: 35px;
  }
  .optionTwo {
    margin-bottom: 35px;
  }
  .optionThree {
    margin-bottom: 35px;
  }
  .optionForth {
    margin-bottom: 35px;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-image: url("../assets/solution1.jpg");
    background-size:1600px 800px;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-image: url("../assets/solution2.jpg");
    background-size:1600px 800px;
  }
  .button {
    float: right;
    margin-top: 20px;
    margin-right: 20px;
    
  }
  .el-button {
    /* background-color:antiquewhite; */
    border-radius: 8px;
    border-color: black;
  }
</style>