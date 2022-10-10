<template>
    <div class="monitor">
        <div>
            <Layout />
        </div>
        <!--推荐列表-->
        <el-row class="center">{{recommendList[0].title}}</el-row>
        <el-row :gutter="20" class="monitor-header">
            <el-col :xs="24" :sm="24" :md="14" :lg="18" :xl="18">
                <el-row class="monitor-cart-box-two" :gutter="20">
                    <el-col :span="24">
                        <div class="monitor-cart-name">
                            <div class="monitor-cart-name-left">
                                <div class="monitor-cart-name-left-icon">
                                    <Count class="monitor-cart-name-left-icon-s" />
                                </div>
                                公文详情
                            </div>
                        </div>
                    </el-col>
                    <el-left class="left">
                        <el-card>
                            <div slot="header">
                                <span class="second_title">正文</span>
                            </div>
                        <div style="overflow:auto; height:750px;white-space:pre-wrap">
                            {{recommendList[0].content}}
                        </div>
                        </el-card>
                    </el-left>
                    <el-row class="right">
                        <el-table :data="recommendTableList" style="width: 100%">
                        <el-table-column prop="key" label="" width="300">
			            </el-table-column>
			            <el-table-column prop="value" label="" width="300">
			            </el-table-column>
                        </el-table>
                        </el-row>
                </el-row>
            </el-col>
        </el-row>
       
        <!--推荐-->
        <el-row :gutter="20" class="monitor-header">
            <el-col :xs="24" :sm="24" :md="14" :lg="18" :xl="18">
                <el-row class="monitor-cart-box" :gutter="20">
                    <el-col :span="24">
                        <div class="monitor-cart-name">
                            <div class="monitor-cart-name-left">
                                <div class="monitor-cart-name-left-icon">
                                    <Count class="monitor-cart-name-left-icon-s" />
                                </div>
                                相似公文
                            </div>
                        </div>
                    </el-col>
                    <el-row class="recommend">
            <el-card class="itemList" >
				<el-col slot="header" class="title" @click.native="recommend(recommendList[0].recommend_1_id)">{{recommendList[0].recommend_1_title}}</el-col>
				<el-row class="type">类别：{{recommendList[0].recommend_1_business_type}}</el-row>
				<el-row class="issue">发文机关：{{recommendList[0].recommend_1_publish_org}}</el-row>
				<el-row class="date">发布日期：{{recommendList[0].recommend_1_publish_time}}</el-row>
            </el-card>
            <el-card class="itemList" >
				<el-col slot="header" class="title" @click.native="recommend(recommendList[0].recommend_2_id)">{{recommendList[0].recommend_2_title}}</el-col>
				<el-row class="type">类别：{{recommendList[0].recommend_2_business_type}}</el-row>
				<el-row class="issue">发文机关：{{recommendList[0].recommend_2_publish_org}}</el-row>
				<el-row class="date">发布日期：{{recommendList[0].recommend_2_publish_time}}</el-row>
            </el-card>
            <el-card class="itemList" >
				<el-col slot="header" class="title" @click.native="recommend(recommendList[0].recommend_3_id)">{{recommendList[0].recommend_3_title}}</el-col>
				<el-row class="type">类别：{{recommendList[0].recommend_3_business_type}}</el-row>
				<el-row class="issue">发文机关：{{recommendList[0].recommend_3_publish_org}}</el-row>
				<el-row class="date">发布日期：{{recommendList[0].recommend_3_publish_time}}</el-row>
            </el-card>
            <el-card class="itemList" >
				<el-col slot="header" class="title" @click.native="recommend(recommendList[0].recommend_4_id)">{{recommendList[0].recommend_4_title}}</el-col>
				<el-row class="type">类别：{{recommendList[0].recommend_4_business_type}}</el-row>
				<el-row class="issue">发文机关：{{recommendList[0].recommend_4_publish_org}}</el-row>
				<el-row class="date">发布日期：{{recommendList[0].recommend_4_publish_time}}</el-row>
            </el-card>
            <el-card class="itemList" >
				<el-col slot="header" class="title" @click.native="recommend(recommendList[0].recommend_5_id)">{{recommendList[0].recommend_5_title}}</el-col>
				<el-row class="type">类别：{{recommendList[0].recommend_5_business_type}}</el-row>
				<el-row class="issue">发文机关：{{recommendList[0].recommend_5_publish_org}}</el-row>
				<el-row class="date">发布日期：{{recommendList[0].recommend_5_publish_time}}</el-row>
            </el-card>
                    </el-row>
                </el-row>
            </el-col>
        </el-row>
        
    </div>
</template>
<script>
    import Layout from '../../components/Headers/Recommend.vue'
    import axios from 'axios'
	import qs from "qs"
	axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";
    export default {
        data() {
            return{
                recommendList:[],
                recommendParams:{
                    id:null,
                },
                recommendTableList:[],
                number:[0,1,2,3,4]
            }
        },
        created(){
            this.getRecommend();
        },
        methods:{
            getRecommend(){
                var id = this.$route.query.id;
                const params = {...this.recommendParams};
                params.id = parseInt(id);
                axios.post("/api/recommend", params).then((res) => {
                    var tempLists = res.data.data;
					for(var i=0;i<tempLists.length;i++){
						tempLists[i].create_time = tempLists[i].create_time.toString();
						tempLists[i].finish_time = tempLists[i].finish_time.toString();
						tempLists[i].general_type = tempLists[i].general_type.toString();
						tempLists[i].index_id = tempLists[i].index_id.toString();
						tempLists[i].place = tempLists[i].place.toString();
						tempLists[i].publish_id = tempLists[i].publish_id.toString();
						tempLists[i].publish_org = tempLists[i].publish_org.toString();
						tempLists[i].publish_time = tempLists[i].publish_time.toString();
						tempLists[i].purpose = tempLists[i].purpose.toString();
						tempLists[i].source = tempLists[i].source.toString();
						tempLists[i].subject = tempLists[i].subject.toString();
						tempLists[i].object = tempLists[i].object.toString();
						tempLists[i].theme = tempLists[i].theme.toString();
						tempLists[i].title = tempLists[i].title.toString();
						tempLists[i].type = tempLists[i].type.toString();
                        // tempLists[i].content = tempLists[i].content.replace(/\n\n/g, '\n');

					}
                    this.recommendList = tempLists;
                    console.log(this.recommendList[0].content)
                    this.recommendTableList.push({
                        key:"通用类别",
                        value:this.recommendList[0].general_type
                    });
                    this.recommendTableList.push({
                        key:"业务类别",
                        value:this.recommendList[0].business_type
                    });
                    this.recommendTableList.push({
                        key:"索引号",
                        value:this.recommendList[0].index_id
                    });
                    this.recommendTableList.push({
                        key:"发文字号",
                        value:this.recommendList[0].publish_id
                    });
                    this.recommendTableList.push({
                        key:"发文机关",
                        value:this.recommendList[0].publish_org
                    });
                    this.recommendTableList.push({
                        key:"分类",
                        value:this.recommendList[0].type
                    });
                    this.recommendTableList.push({
                        key:"成文日期",
                        value:this.recommendList[0].create_time
                    });
                    this.recommendTableList.push({
                        key:"发布日期",
                        value:this.recommendList[0].publish_time
                    });
                    this.recommendTableList.push({
                        key:"主体",
                        value:this.recommendList[0].subject
                    });
                    this.recommendTableList.push({
                        key:"客体",
                        value:this.recommendList[0].object
                    });
                    this.recommendTableList.push({
                        key:"地点",
                        value:this.recommendList[0].place
                    });
                    this.recommendTableList.push({
                        key:"来源",
                        value:this.recommendList[0].source
                    });
                    this.recommendTableList.push({
                        key:"目的",
                        value:this.recommendList[0].purpose
                    }); 
                    this.recommendTableList.push({
                        key:"完成时间",
                        value:this.recommendList[0].finish_time
                    });
                    console.log(tempLists)
                })
            },
            recommend(ID) {
                let href = this.$router.resolve({path:'/recommend', query:{id:ID}});
				window.open(href.href, '_blank');
            },

        },
        components:{
            Layout
        }
    }
</script >
<style scoped>
    .monitor{
    background: #F5F7F9;
    padding: 25px;
    box-sizing: border-box;
    width: 100%;
    min-height: 100%;
}
.center {
    text-align: center;
    font-size: 24px;
    margin-top:2%;
    margin-bottom: 2%;
}
.monitor-header{
    border: 1px solid #E6E6E6;
    background: #ffffff;
    border-radius: 5px;
    margin-bottom: 20px;
    width: 100%;
    margin-top: 20px;
}
.monitor-header-two{
    border: 1px solid #E6E6E6;
    background: #ffffff;
    border-radius: 5px;
    margin-bottom: 20px;
    width: 80%;
}
.monitor-header-three{
    border: 1px solid #E6E6E6;
    background: #ffffff;
    border-radius: 5px;
    margin-bottom: 20px;
    width: 80%;
}
.monitor-cart-name{
    width: 100%;
    height: 50px;
    /* background: yellow; */
    margin-bottom: 20px;
    border-bottom: 1px solid #E6E6E6;
    display: flex;
    justify-content: space-between;
}
.right {
    float: right;
    margin-bottom: 2%;
    margin-right: 5%;
}
.left {
    float: left;
    margin-bottom: 2%;
    margin-left: 5%;
    max-width: 40%;
    max-height: 100%;
}
.el-textarea__inner {
    min-width: 300px;
}
.monitor-cart-name-left{
    width: 160px;
    height: 100%;
    /* background: blueviolet; */
    line-height: 42px;
    color: #5C5C5C;
    font-size: 16px;
    font-weight: bold;
    display: flex;
    align-items: center;
}
.el-card__body, .el-main {
    max-width: 30px;
}
.monitor-cart-name-left-icon{
    width: 30px;
    height: 30px;
    background: #F7EEFF;
    border-radius: 2px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
}
.monitor-cart-name-left-icon-s{
    width: 20px;
    height: 20px;
    color: blueviolet;
    fill: currentColor;
}
.monitor-cart-name-right{
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.monitor-cart-name-right-list{
    width: 60px;
    height: 50px;
    /* background: chartreuse; */
    text-align: center;
    line-height: 50px;
    color: #515A6E;
    font-size: 14px;
    cursor: pointer;
}
.monitor-cart-name-right-list:hover{
    color: #2D8CF0;
}
.monitor-cart-box{
    /* background: chocolate; */
    width: 100%;
    height: 600px;
    padding: 10px 15px 0;
    box-sizing: border-box;
    /* border: 1px solid #E6E6E6; */
    background: #ffffff;
    border-radius: 5px;
    margin-bottom: 20px;
}
.monitor-cart-probability{
    /* background: cornflowerblue; */
    width: 100%;
    height: 210px;
    padding: 20px 15px 0px;
    box-sizing: border-box;
}
.monitor-cart-probability-box{
    width: 100%;
    height: 80%;
    /* border: 1px solid #515A6E; */
    border-radius: 5px;
}
.monitor-cart-probability-name{
    width: 100%;
    height: 20%;
    text-align: center;
    line-height: 34px;
    /* background: chartreuse; */
    color: #515A6E;
    font-size: 14px;
    cursor: pointer;
}
.monitor-visitors{
    width: 100%;
    height: 400px;
}
.monitor-visitors-scale{
    display: flex;
    justify-content: space-between;
}
.monitor-visitors-left{
    width: 60%;
    height: 100%;
}
.monitor-visitors-right{
    width: 40%;
    height: 100%;
    /* background: chocolate; */
    padding: 20px;
    box-sizing: border-box;
}
.monitor-visitors-right-list{
    width: 100%;
    height: 40px;
    /* background: cyan; */
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.monitor-visitors-right-list-icon{
    width: 15px;
    height: 15px;
    color: #666666;
    fill: currentColor;
}
.monitor-visitors-right-list-name{
    width: 120px;
    /* background: darkgoldenrod; */
    height: 40px;
    line-height: 40px;
    font-size: 12px;
    color: #595959;
    padding-left: 10px;
    box-sizing: border-box;
}
.monitor-visitors-right-list-number{
    flex: 1;
    /* background: yellowgreen; */
    height: 40px;
    line-height: 40px;
    font-size: 12px;
    color: #8C8C8C;
    padding-left: 10px;
    box-sizing: border-box;
    text-align: right;
    padding-right: 15px;
}
.monitor-header-users{
    width: 100%;
    height: auto;
    padding: 0px 10px;
    box-sizing: border-box;
}
.monitor-header-users-time{
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    color: #515A6E;
    text-align: center;
    margin-bottom: 10px;
}
.monitor-header-users-number{
    width: 100%;
    height: 58px;
    text-align: center;
    font-size: 40px;
    line-height: 58px;
    color: #515A6E;
    font-weight: bold;
}
.monitor-header-users-message{
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 12px;
    color: #515A6E;
    text-align: center;
}
/* 用户数 */
.monitor-header-users-icon{
    width: 100%;
    height: 50px;
    text-align: center;
    /* background: chocolate; */
    display: flex;
    justify-content: center;
    align-items: center;
}
.monitor-header-users-icon-s{
    width: 36px;
    height: 36px;
    fill: currentColor;
    color: #2399FA;
}
/* 评论 */
.monitor-header-comment{
    width: 100%;
    height: auto;
}
.monitor-header-comment .monitor-header-comment-list:nth-last-child(1){
    border-bottom-color: transparent;
}
.monitor-header-comment-list{
    width: 100%;
    height: 120px;
    display: flex;
    box-sizing: border-box;
    border-bottom: 1px solid #E8EAEC;
}
.monitor-header-comment-list-li{
    width: 33%;
    height: 120px;
}
.monitor-header-comment-list-li-number{
    font-weight: bold;
    font-size: 30px;
    color: #515A6E;
    line-height: 120px;
    text-align: center;
}
.monitor-header-comment-list-li-icon{
    width: 50px;
    height: 50px;
    color: #FBD971;
    fill: currentColor;
}
.monitor-header-comment-list-li-tag{
    display: flex;
    /* background: cyan; */
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}
.monitor-header-comment-list-li-tag-text{
    width: 100%;
    height: 35px;
    text-align: center;
    line-height: 35px;
    color: #808695;
    font-size: 14px;
}
.monitor-header-comment-list-li-percentage{
    height: 100%;
    line-height: 120px;
    color: #36C17B;
    font-size: 18px;
    text-align: center;
}
.el-col-lg-18 {
  width: 100%;
}
.itemList {
    margin-bottom: 1%;
}
.type {
    float: left;
    margin-bottom: 1%;
    font-size: 12px;
}
.issue {
    float: left;
    margin-bottom: 1%;
    font-size: 12px;
    margin-left: 1.5%;
}
.date {
    float: left;
    margin-bottom: 1%;
    font-size: 12px;
    margin-left: 1.5%;
}
.title {
    font-size: 14px;
}
.monitor-cart-box {
    margin-left:-20px;
    margin-right:-20px;
}
</style>