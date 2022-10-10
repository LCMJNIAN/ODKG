<template>
    
    <div class="goodsindex">
        <!-- 搜索条件 -->
        <el-row :gutter="20" class="goodsindex-queryInfo">
			<el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4">
				<el-input class="goodsindex-queryInfo-li-one" v-model="queryInfo.query" clearable @clear="explore" size="small" 
					placeholder="请输入公文名称"></el-input>
			</el-col>
				<el-select v-model="queryInfo.business_type" placeholder="业务分类选择" clearable="true">
    				<el-option
      				v-for="item in business_type"
    				:key="item.value"
      				:label="item.label"
      				:value="item.value">
    				</el-option>
 				</el-select>
				<el-select v-model="queryInfo.publish_org" placeholder="发文机关选择" clearable="true">
    				<el-option
      				v-for="item in publish_org"
    				:key="item.value"
      				:label="item.label"
      				:value="item.value">
    				</el-option>
 				</el-select>

				<el-select v-model="queryInfo.general_type" placeholder="通用分类选择" clearable="true">
    				<el-option
      				v-for="item in general_type"
    				:key="item.value"
      				:label="item.label"
      				:value="item.value">
    				</el-option>
 				</el-select>
			<el-col :xs="6" :sm="4" :md="3" :lg="2" :xl="2">
				<el-button type="primary" :plain="true" class="goodsindex-queryInfo-li-two" size="small" @click="explore">搜索</el-button>
			</el-col>
		</el-row>
        <!--列表-->
        <div class="exploreList">
            <el-card v-for="item in exploreLists.slice((queryInfo.page - 1)*queryInfo.pageSize, queryInfo.page*queryInfo.pageSize)" :key="item" class="itemList" >
				<el-col slot="header" class="title" @mouseover.native="show(item)" @mouseout.native="outShow(item)" @mousemove="move" @click.native="recommend(item.id)">{{item.title}}</el-col>
				<div v-show="item.isShow" class="hover_container" >
					<span class="hover_item">通用类别：{{item.general_type}}</span>
					<span class="hover_item">索引号：{{item.index_id}}</span>
					<span class="hover_item">发文字号：{{item.publish_id}}</span>
					<span class="hover_item">发文机关：{{item.publish_org}}</span>
					<span class="hover_item">分类：{{item.type}}</span>
					<span class="hover_item">成文日期：{{item.create_time}}</span>
					<span class="hover_item">发布日期：{{item.publish_time}}</span>
					<el-divider></el-divider>
					<span v-if="item.subject && item.subject.length > 30">
						<span class="hover_item">主体：{{item.subject.substr(0,30) + '...'}}</span>
					</span>
					<span v-else>
						<span class="hover_item">主体：{{item.subject}}</span>
					</span>
					<span v-if="item.object && item.object.length > 30">
						<span class="hover_item">客体：{{item.object.substr(0,30) + '...'}}</span>
					</span>
					<span v-else>
						<span class="hover_item">客体：{{item.object}}</span>
					</span>
					<span class="hover_item">来源: {{item.source}}</span>
					<span class="hover_item">地点: {{item.place}}</span>
					<span v-if="item.purpose && item.purpose.length > 30">
						<span class="hover_item">目的：{{item.purpose.substr(0,30) + '...'}}</span>
					</span>
					<span v-else>
						<span class="hover_item">目的：{{item.purpose}}</span>
					</span>
					<span class="hover_item">完成时间：{{item.finish_time}}</span>
				</div>
				<el-collapse v-model="activeNames" @change="handleChange">
					<el-collapse-item>
						<el-row class="content" style="white-space: pre-wrap;">{{item.content}}</el-row>
  					</el-collapse-item>
				</el-collapse>
				<el-row class="type">类别：{{item.business_type}}</el-row>
				<el-row class="issue">发文机关：{{item.publish_org}}</el-row>
				<el-row class="date">发布日期：{{item.finish_time}}</el-row>
            </el-card>
        </div>
        <el-row :gutter="20" class="goodsindex-list">
			<el-col :span="24" class="goodsindex-page-box">
				<el-pagination @size-change="handleSizeChange"
					@current-change="handleCurrentChange" :current-page="queryInfo.page" :page-sizes="[5, 10, 20, 50, 100]"
					:page-size="queryInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="exploreLists.length">
				</el-pagination>
			</el-col>
		</el-row>
    </div>
    
		
    

</template>
<script>
    import axios from 'axios'
	import qs from "qs"
	import colleague from '../../components/Index/colleague.vue'
	axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";
    export default {
  	components: { colleague },
        data() {
            return {
                queryInfo: {
                    query:"",
					page: 1,
					pageSize: 5,
					general_type:"",
					business_type:"",
					publish_org:""
				},
				x:0,
				y:0,
				positionStyle:{top:'20px',left:'20px'},
                exploreLists:[
                ],
				activeNames: ['1'],
				exploreParams:{
					batch_size:null,
					batch_num:null,
					keyword:null,
					general_type:null,
					business_type:null,
					publish_org:null,
				},
				business_type:[
				{
          			value: '核安全',
          			label: '核安全'
        		}, {
          			value: '社会安全',
          			label: '社会安全'
        		}, {
          			value: '网络安全',
         			label: '网络安全'
        		}, {
          			value: '军事批复',
          			label: '军事批复'
        		}, {
          			value: '人事任命',
          			label: '人事任命'
       			 }, {
          			value: '战功命令',
          			label: '战功命令'
       			 }, {
          			value: '征兵通知',
          			label: '征兵通知'
       			 }, {
          			value: '创新改革',
          			label: '创新改革'
       			 }, {
          			value: '国防科技',
          			label: '国防科技'
       			 }, {
          			value: '航空探月',
          			label: '航空探月'
       			 }, {
          			value: '新能源',
          			label: '新能源'
       			 }, {
          			value: '政府类型公文',
          			label: '政府类型公文'
       			 },
				],
				general_type:[
				{
          			value: '报告',
          			label: '报告'
        		}, {
          			value: '公告',
          			label: '公告'
        		}, {
          			value: '通知',
         			label: '通知'
        		}, {
          			value: '函',
          			label: '函'
        		}, {
          			value: '意见',
          			label: '意见'
       			 },
					{
          			value: '决定',
          			label: '决定'
       			 },
					{
          			value: '命令',
          			label: '命令'
       			 },
					{
          			value: '批复',
          			label: '批复'
       			 },
					{
          			value: '通报',
          			label: '通报'
       			 },
					{
          			value: '通告',
          			label: '通告'
       			 },
				],
				publish_org:[
				{
          			value: '国家核安全局',
          			label: '国家核安全局'
        		}, {
          			value: '生态环境部',
          			label: '生态环境部'
        		}, {
          			value: '工业和信息化部',
         			label: '工业和信息化部'
        		}, {
          			value: '国防科工局',
          			label: '国防科工局'
        		}, {
          			value: '国务院、中央军委',
          			label: '国务院、中央军委'
       			 }
				],
				value: ''
            }
        },
        created(){
            this.getResultFirst();
        },
        methods:{
            handleCurrentChange(page) {
				this.queryInfo.page = page;
			},
			handleSizeChange(size) {
				this.queryInfo.pageSize = size;
			},
            getResultFirst(){
                // this.exploreLists = list;
				// for(var i = 0;i<this.exploreLists.length;i++)
				// {
				// 	this.exploreLists[i].标题 = Object.entries(this.exploreLists.标题[i]);
				// 	console.log(typeof this.exploreLists[i].标题)
				// }


				axios.get("/api/explore/init",{
					params: {
						batch_size:20,
						batch_num:1
					}
				}).then((res)=>{
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
					}
					this.exploreLists = tempLists;
						for(var i= 0;i<this.exploreLists.length;i++)
					{
						this.exploreLists[i].isOpen = false;
					}
				})
				
				
            },
            async explore() {
                console.log(this.queryInfo.query);
				console.log(this.queryInfo.business_type);
				console.log(this.queryInfo.general_type);
				console.log(this.queryInfo.publish_org);
				var query = this.queryInfo.query;
				var business_type = this.queryInfo.business_type;
				var general_type = this.queryInfo.general_type;
				var publish_org = this.queryInfo.publish_org;
				if (query == "")
					query = null;
				if (business_type == "")
					business_type = null;
				if (general_type == "")
					general_type = null;
				if (publish_org == "")
					publish_org = null;
				if(query == null && business_type == null && general_type == null && publish_org == null)
				{
					this.getResultFirst();
					this.$message({
						message:"搜索成功",
						type:'success'
					})
				}

				else {
					const params = {...this.exploreParams};
					params.batch_num = 1;
					params.batch_size = 50;
					params.business_type = business_type;
					params.general_type = general_type;
					params.keyword = query;
					params.publish_org = publish_org;
					axios.post("/api/explore",params).then((res) => {
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
					}
					this.exploreLists = tempLists;
						for(var i= 0;i<this.exploreLists.length;i++)
					{
						this.exploreLists[i].isOpen = false;
					}
					})
					this.$message({
						message:"搜索成功",
						type:'success'
					})
				}
				
                // this.exploreLists = explore;
            },
			open(index) {
				this.exploreLists[index].isOpen = true;
			},
			handleChange(val) {
        		console.log(val);
      		},
			show(item) {
				if(!item.isShow) {
					this.$set(item,'isShow', false);
					item.isShow = !item.isShow;
 				}
				else {
					item.isShow = !item.isShow;
				}
			},
			outShow(item) {
				if(!item.isShow) {
					this.$set(item,'isShow', false);
				}
				else {
					item.isShow = !item.isShow;
				}
			},
			move(event) {
        		this.x=event.pageX;
        		this.y=event.pageY;
        		this.positionStyle={top: this.x + 'px',left: this.y + 'px'};
     	 	},
			recommend(ID) {
				// this.$router.push({ path: '/recommend', query: { id:ID }});
				let href = this.$router.resolve({path:'/recommend', query:{id:ID}});
				window.open(href.href, '_blank');
			}
        }
    }
</script>

<style scoped>
	.goodsindex {
		width: 100%;
		min-height: 100%;
		padding: 15px;
		box-sizing: border-box;
	}

	/* 搜索 */
	.goodsindex-queryInfo {
		margin-bottom: 20px;
		margin-left: 50%;
        margin-top: 30px;
	}

	.goodsindex-queryInfo-li-one {
		width: 100%;
		height: auto;
		margin-left: 45%

	}

	.goodsindex-queryInfo-li-two {
		width: 100%;
		height: 40px;
		margin-left: 900%;
	}

	/* 列表 */

	/* 分页 */
	.goodsindex-page-box {
		width: 100%;
		height: auto;
		display: flex;
		justify-content: flex-end;
		margin-top: 20px;
	}

	.keycode-Info {
		width: 100%;
		margin-bottom: 15px;
	}

	.keycode-Info-li {
		margin-left: 1290%;
		margin-top: 15px;
	}

	.upload-demo {
		/* float: right; */
	}
	.title {
		max-width: 60%px;
  		font-size: 16px;
  		color: #0058a6;
		margin-bottom: 1%;
	}
	.content {
		font-size: 14px;
  		color: #0058a6;
		margin-top: 1%;
	}
	.type {
		font-size:12px;
		color: #0058a6;
		float: left;
		margin-right: 2%;
		margin-bottom: 1%;
		margin-top: 1%;
	}
	.issue {
		font-size:12px;
		color: #0058a6;
		float: left;
		margin-right: 2%;
		margin-bottom: 1%;
		margin-top: 1%;
	}
	.date {
		font-size:12px;
		color: #0058a6;
		float: left;
		margin-right: 2%;
		margin-bottom: 1%;
		margin-top: 1%;
	}
	.itemList {
		margin-top: 3%;
		margin-right: 3%;
		margin-left: 3%;
	}
	.hover_container{
		position: absolute;
        max-width: 250px;
        height: auto;
		background-color: rgb(250, 248, 250);
        border: 1px solid #ccc;
        border-radius: 8px;
        left: 80%;
        top: 25%;
        z-index: 99;
		font-size: 14px;
    }
	.hover_item {
		display: block;
		padding-bottom: 1.5%;
		margin-left: 3%;
		margin-right: 3%;
		padding-top: 1.5%;
	}
	
</style>
<style>
	.el-popover {
		font-size: 10px;
		min-width: 50%;
		background: #303133;
  		color: #fff;
		max-width:30%;
    	padding-bottom: 5px!important;
    	display: -webkit-box;
    	overflow: hidden;
    	text-overflow: ellipsis;
    	-webkit-line-clamp: 30;
    	-webkit-box-orient: vertical;
		overflow-y:scroll;
		overflow-x:hidden;

	}
	.el-collapse-item__header {
		height: 15px;
		border-bottom: 1px solid #fff;
	}
	.el-input--small .el-input__inner {
		height: 40px;
		line-height: 40px;
	}
	.el-card__header {
		border-bottom: 1px solid #fff;
	}
</style>