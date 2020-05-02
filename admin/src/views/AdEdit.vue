<template>
	<div>
		<div>{{id ? '编辑' : '创建'}}广告位</div>
		<el-form ref="form" :model="form" @submit.native.prevent="save" label-width="100px">
			<el-form-item label="广告位名称">
				<el-input v-model="form.name" placeholder="" size="mini"></el-input>
			</el-form-item>
			<el-form-item label="广告详情">
				<el-button type="text" @click="form.items.push({})"><i class="el-icon-plus"></i>新增</el-button>
					<el-row type="flex" style="flex-wrap: wrap">
						<el-col :md="24" v-for="(item, index) in form.items" :key="index">
							<el-form-item label="跳转链接">
								<el-input v-model="item.url"></el-input>
							</el-form-item>
							<el-form-item label="图标" style="margin-top: 10px">
								<el-upload
									class="avatar-uploader"
									:action="$http.defaults.baseURL + '/upload'"
									:show-file-list="false"
									:on-success="res => $set(item, 'image', res.url)">
									<img v-if="item.image" :src="item.image" class="avatar">
									<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
							</el-form-item>
							<el-form-item>
								<el-button type="danger" size="mini" @click="form.items.splice(i, 1)">删除</el-button>
							</el-form-item>
						</el-col>
					</el-row>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" native-type="submit">提交</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			form: {
				items: []
			},
		}
	},
	props: {
		id: {
			type: String
		}
	},
	mounted() {
		this.id && this.getCategoryById()
	},
	methods: {
		async save() {
			let res = ''
			if (this.id) {
				res = await this.$http.put(`/rest/ads/${this.id}`, this.form)
			} else {
				res = await this.$http.post('/rest/ads', this.form)
			}
			console.log('post res', res)
			this.$router.push('/ads/list')
			this.$message({
				type: 'success',
				message: '保存成功！'
			})
		},
		async getCategoryById() {
			const res = await this.$http.get(`/rest/ads/${this.id}`)
			console.log('res', res)
			this.form = res.data
		}
	}
}
</script>

<style scoped>
.avatar-uploader .el-upload {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
}
.avatar-uploader .el-upload:hover {
	border-color: #409EFF;
}
.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	/* width: 128px; */
	height: 128px;
	line-height: 128px;
	text-align: center;
}
.avatar {
	/* min-width: 128px; */
	width: auto;
	height: 128px;
	display: block;
}
</style>