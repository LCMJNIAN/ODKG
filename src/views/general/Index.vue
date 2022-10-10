<template>
	<div class="goodsindex">
		<!-- 上传文件 -->
		<!-- <el-row :gutter="20" class="keycode-Info">
			<el-col :xs="6" :sm="4" :md="3" :lg="2" :xl="2" :offset="1">
				<el-button type="primary" class="keycode-Info-li" size="small" @click="keyCodeShow = true">上传文件
				</el-button>
			</el-col>
		</el-row> -->
		<!-- 添加或编辑关键词 -->
		<!-- <el-dialog title="添加关键词" :visible.sync="keyCodeShow">
			<el-form :model="keyCodeForm" :rules="keyCodeRules" ref="keyCodeForm">
				<el-form-item label="名称" :label-width="keyCodeWidth" prop="name">
					<el-input v-model="keyCodeForm.name" autocomplete="off" placeholder="请输入文件名称"></el-input>
				</el-form-item>
				<el-upload class="upload" action="#" drag multiple :headers="headers" :auto-upload="false"
					:file-list="fileList" :on-change="handleChange">
					<i class="el-icon-upload"></i>
					<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
				</el-upload>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="keyCodeSubmit('keyCodeForm')" type="primary">上 传</el-button>
			</div>
		</el-dialog> -->
		<el-upload class="upload-demo" action="/api/upload" :on-preview="handlePreview"
			:on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed"
			accept=".zip,.txt" name="file" :on-success="onSuccess">
			<el-button size="small" type="primary">点击上传</el-button>
			<div slot="tip" class="el-upload__tip">只能上传zip/txt文件</div>
		</el-upload>
		<!-- 搜索条件 -->
		<el-row :gutter="20" class="goodsindex-queryInfo">
			<!-- 商品名称搜索 -->
			<el-col :xs="8" :sm="6" :md="6" :lg="4" :xl="4">
				<el-input class="goodsindex-queryInfo-li-one" v-model="queryInfo.name" clearable size="small"
					placeholder="请输入公文名称"></el-input>
			</el-col>
			<el-col :xs="6" :sm="4" :md="3" :lg="2" :xl="2">
				<el-button type="primary" class="goodsindex-queryInfo-li-two" size="small">搜索</el-button>
			</el-col>

		</el-row>
		<!-- 检索结果 -->
		<el-row :gutter="20">
			<el-col :span="24">
				<el-table :data="tableData.slice((queryInfo.page - 1)*queryInfo.pageSize, queryInfo.page*queryInfo.pageSize)" size='small' style="width: 100%" :default-sort="{prop:'create_time', order:'descending'}">

					<el-table-column prop="file_name" label="名称" width="150" align="center">
					</el-table-column>
					<!-- <el-table-column prop="task_id" label="任务" width="150">
					</el-table-column> -->
					<el-table-column prop="file_path" label="文件路径" width="500" align="center">
					</el-table-column>
					<el-table-column prop="create_time" label="创建时间" width="160" :sortable="true" align="center">
					</el-table-column>
					<el-table-column prop="address" label="操作" align="center">
						<template slot-scope="scope">
							<el-button size="small" :plain="true" @click="sendRequest(scope.row.task_id, scope.row.file_path)">快速抽取</el-button>
							<el-button size="small" :plain="true" type="success" @click="checkResult(scope.row.task_id)">查看结果</el-button>
							<el-button size="small" :plain="true" type="primary" @click="downloadFile(scope.row.task_id)">下载文件</el-button>
							<el-button size="small" :plain="true" type="danger" @click="deleteTaskId(scope.row.task_id, scope.row)">删除任务</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-col>
		</el-row>
		<!--结果展示-->
		<el-dialog :visible.sync="resultShow" customClass="customWidth">
			<el-row :gutter="20" class="result-list">
				<el-col :span="24">
					<el-table :data="resultData" size='small' style="width: 100%">
						<el-table-column prop="general_result.标题" label="标题" width="300">
						</el-table-column>
						<el-table-column prop="general_result.公文类型" label="公文类型" width="50">
						</el-table-column>
						<el-table-column prop="general_result.索引号" label="索引号" width="150">
						</el-table-column>
						<el-table-column prop="general_result.分类" label="分类" width="120">
						</el-table-column>
						<el-table-column prop="general_result.发文机关" label="发文机关" width="100">
						</el-table-column>
						<el-table-column prop="general_result.成文日期" label="成文日期" width="100">
						</el-table-column>
						<el-table-column prop="general_result.发文字号" label="发文字号" width="150">
						</el-table-column>
						<el-table-column prop="content" label="正文" width="550">
							<template slot-scope="scope">
								<span v-if="scope.row.content && scope.row.content.length > 44">
									<el-popover placement="top-start" title="正文" width="500" trigger="hover">
										<div>{{scope.row.content}}</div>
										<span slot="reference">{{scope.row.content.substr(0,44) + '...'}}</span>
									</el-popover>
								</span>
								<span v-else>{{scope.row.content}}</span>
							</template>
						</el-table-column>

					</el-table>
				</el-col>
			</el-row>
		</el-dialog>
		<!-- 分页 -->
		<el-row :gutter="20" class="goodsindex-list">
			<el-col :span="24" class="goodsindex-page-box">
				<el-pagination @size-change="handleSizeChange"
					@current-change="handleCurrentChange" :current-page="queryInfo.page" :page-sizes="[5, 10, 20, 50, 100]"
					:page-size="queryInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
				</el-pagination>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import axios from 'axios'
	import qs from "qs"
	axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";

	export default {
		data() {
			return {
				queryInfo: {
					name: '',
					type: '',
					page: 1,
					pageSize: 5
				},
				tableData: [],
				resultData: [{
					content:null,
					general_result:{
						标题:null,
					公文类型:null,
					索引号:null,
					分类:null,
					发文机关:null,
					成文日期:null,
					发文字号:null,
					}
				}],
				tempTableData:{
					task_id:null,
					file_path:null,
					file_name:null,
					create_time:null
				},
				deleteTaskIdParams:{
					task_id:null,
					task_type:null
				},
				resultShowParams: {
					task_id: null,
					batch_size: null,
					batch_num: null
				},
				sendRequestParams: {
					task_id: null,
					file_path: null,
				},
				keyCodeShow: false,
				resultShow: false,
				keyCodeForm: {
					name: '',
					remarks: ''
				},
				keyCodeRules: {
					name: [{
							required: true,
							message: '请输入文件名称',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 5,
							message: '长度在 1 到 5 个字符',
							trigger: 'blur'
						}
					]
				},
				keyCodeWidth: '120px',
			}
		},
		created() {
			this.getTask();
		},
		methods: {
			// // 检查归档状态
			// checkStatus(task_id) {
			// 	axios.get("http://10.160.181.146:5000/classification/status", {
			// 		params: {
			// 			task_id: task_id
			// 		}
			// 	}).then(result => {
			// 		let resData = result.data.data;
			// 		if(resData == "预测成功"){
			// 			this.$message({
			// 			message:'预测成功',
			// 			type:'success'
			// 			})
			// 		}
			// 		else {
			// 			this.$message.error('预测失败');
			// 		}
			// 	})
			// },
			// 发送抽取请求
			sendRequest(task_id, file_path) {
				const params = {
					...this.sendRequestParams
				};
				params.task_id = task_id;
				params.file_path = file_path;
				axios.post("/api/general/extract", params).then(result => {
					this.$message('请求已发送');
				})
			},
			// 查看抽取结果
			checkResult(task_id) {
				this.resultShow = true;
				const params = {
					...this.resulrShowParams
				};
				params.task_id = task_id;
				params.batch_size = "20";
				params.batch_num = "1";
				axios.post("/api/general/result", params).then(result => {
					console.log(result.data.message);
					this.resultData = result.data.data;
				})
			},
			//下载文件
			downloadFile(task_id = 300, task_type = "通用抽取") {
				axios.get("/api/download", {
					params: {
						task_id,
						task_type
					},
					responseType: "blob",
				}).then((res) => {
					const task_id=res.config.params.task_id||300
					let link = document.createElement('a')
					link.href = window.URL.createObjectURL(new Blob([res.data]))
					link.target = '_blank'
					let filename = `任务${task_id}结果通用抽取.csv`
					link.download = decodeURI(filename) // 下载的文件名称
					document.body.appendChild(link) // 添加创建的 a 标签 dom节点
					link.click() // 下载
					document.body.removeChild(link) // 移除节点
					// 	console.log(res.headers["content-disposition"]);
					// 	let blob = new Blob([res.data]);
					// 	let url = window.URL.createObjectURL(blob);
					// 	let a = document.createElement("a");
					// 	a.href = url;
					// 	a.download = decodeURI(
					// 		res.headers["content-disposition"]
					// 		.split("=")
					// 		.map((item, index) => {
					// 			if (index === 0) return null;
					// 			else return item;
					// 		})
					// 		.filter((element) => {
					// 			return element;
					// 		})
					// 		.join("=")
					// 	);
					// 	a.click();
					// 	window.URL.revokeObjectURL(url);
				})
			},
			submitUpload() {
				this.$refs.upload.submit();

			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			onSuccess(response, file, fileList) {
				const tempData = {...this.tempTableData};
				tempData.task_id = response.task_id;
				tempData.file_path = response.file_path;
				tempData.file_name = response.file_name;
				tempData.create_time = response.create_time;
				this.tableData.push(tempData);
			},
			// 删除任务
			deleteTaskId(task_id, item) {
				this.tableData = this.tableData.filter(o => o.task_id != item.task_id);
				const params = {...this.deleteTaskIdParams};
				params.task_id = task_id;
				params.task_type = "通用抽取";
				axios.post("/api/delete", params).then(result => {
					console.log(result.data.message);
				})
				this.$message({
					message:"任务删除成功",
					type:'success'
				})
			},
			// 分页
			handleCurrentChange(page) {
				this.queryInfo.page = page;
			},
			handleSizeChange(size) {
				this.queryInfo.pageSize = size;
			},

			// 获取任务
			getTask() {
				axios.get("/api/get_all", {
					params: {
						task_type: "通用抽取"
					}
				}).then(result => {
					this.tableData = result.data.data;
				})
				// const params = {...this.queryParams};
				// params.task_id = 100;
				// params.batch_size = "1";
				// params.batch_num = "5";
				// axios.post("http://10.160.181.146:5000/classification/result",params).then(result=>{
				//     console.log(result.data.message);
				//     this.tableData = result.data.data;
				// }
				// )
				// axios.get("http://10.160.181.146:5000/classification/status",qs.stringify({
				//     task_id:"100",
				// })).then(result=>{
				//     alert(result.data.message);
				//     this.tableData = result.data;
				// }
				// )
				// axios.post("http://10.160.181.146:5000/classification",qs.stringify({
				//     file_path:"/home/app/test_data/test_data_10.zip",
				//     task_id:"103",
				// })).then(result=>{
				//     alert(result.message);
				// }
				// )

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
	}

	.goodsindex-queryInfo-li-one {
		width: 100%;
		height: auto;
		margin-left: 200%;

	}

	.goodsindex-queryInfo-li-two {
		width: 100%;
		height: auto;
		margin-left: 470%;
	}

	/* 列表 */
	.goodsindex-list {
		width: 100%;
		height: auto;
		margin-bottom: 20px;
		
	}

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
	.customWidth{
    	width:80%;
	}
</style>
