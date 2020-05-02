<template>
	<div>
		<div>{{id ? '编辑' : '创建'}}文章</div>
		<el-form ref="form" :model="form" @submit.native.prevent="save" label-width="100px">
			<el-form-item label="所属分类">
				<el-select v-model="form.categories" size="mini" multiple >
					<el-option v-for="category in categories" :key="category._id" 
						:label="category.name" :value="category._id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="文章标题">
				<el-input v-model="form.title" placeholder="" size="mini"></el-input>
			</el-form-item>
			<el-form-item>
				<vue-editor v-model="form.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" native-type="submit">提交</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
export default {
	data() {
		return {
			form: {
				categories: []
			},
			categories: []
		}
	},
	components: {
		VueEditor
	},
	props: {
		id: {
			type: String
		}
	},
	mounted() {
		this.getCategories()
		this.id && this.getCategoryById()
	},
	methods: {
		async getCategories() {
			const res = await this.$http.get(`/rest/categories`)
			console.log('res', res)
			this.categories = res.data
		},
		async save() {
			let res = ''
			if (this.id) {
				res = await this.$http.put(`/rest/articles/${this.id}`, this.form)
			} else {
				res = await this.$http.post('/rest/articles', this.form)
			}
			console.log('post res', res)
			this.$router.push('/articles/list')
			this.$message({
				type: 'success',
				message: '保存成功！'
			})
		},
		async getCategoryById() {
			const res = await this.$http.get(`/rest/articles/${this.id}`)
			console.log('res', res)
			this.form = res.data
		},
		async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
			let formData = new FormData()
			formData.append("file", file)

			const res = await this.$http.post('/upload', formData)
			Editor.insertEmbed(cursorLocation, "image", res.data.url)
			resetUploader()
		}
	}
}
</script>

<style>

</style>