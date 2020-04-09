<template>
	<div>
		<div>{{id ? '编辑' : '创建'}}物品</div>
		<el-form ref="form" :model="form" @submit.native.prevent="save" label-width="100px">
			<el-form-item label="物品名称">
				<el-input v-model="form.name" placeholder="" size="mini"></el-input>
			</el-form-item>
			<el-form-item label="物品图片">
				<el-upload
					class="avatar-uploader"
					:action="$http.defaults.baseURL + '/upload'"
					:show-file-list="false"
					:on-success="handleAvatarSuccess"
					:before-upload="beforeAvatarUpload">
					<img v-if="form.url" :src="form.url" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
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
			form: {},
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
				res = await this.$http.put(`/rest/items/${this.id}`, this.form)
			} else {
				res = await this.$http.post('/rest/items', this.form)
			}
			console.log('post res', res)
			this.$router.push('/items/list')
			this.$message({
				type: 'success',
				message: '保存成功！'
			})
		},
		async getCategoryById() {
			const res = await this.$http.get(`/rest/items/${this.id}`)
			console.log('res', res)
			this.form = res.data
		},
		handleAvatarSuccess(res) {
			console.log('res', res)
			// this.form.url = res.url
			this.$set(this.form, 'url', res.url)
		},
		beforeAvatarUpload(file) {
			const isJPG = file.type === 'image/jpeg';
			const isLt2M = file.size / 1024 / 1024 < 2;

			if (!isJPG) {
				this.$message.error('上传头像图片只能是 JPG 格式!');
			}
			if (!isLt2M) {
				this.$message.error('上传头像图片大小不能超过 2MB!');
			}
			return isJPG && isLt2M;
		},
	}
}
</script>

<style>
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
	width: 178px;
	height: 178px;
	line-height: 178px;
	text-align: center;
}
.avatar {
	width: 178px;
	height: 178px;
	display: block;
}
</style>