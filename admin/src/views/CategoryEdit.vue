<template>
	<div>
		<div>{{id ? '编辑' : '创建'}}分类</div>
		<el-form ref="form" :model="form" @submit.native.prevent="save" label-width="100px">
			<el-form-item label="上级分类">
				<el-select v-model="form.parent" size="mini">
					<el-option v-for="parent in parents" :key="parent._id" 
						:label="parent.name" :value="parent._id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="分类名称">
				<el-input v-model="form.name" placeholder="" size="mini"></el-input>
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
			parents: []
		}
	},
	props: {
		id: {
			type: String
		}
	},
	mounted() {
		this.getParents()
		this.id && this.getCategoryById()
	},
	methods: {
		async getParents() {
			const res = await this.$http.get(`/rest/categories`)
			console.log('res', res)
			this.parents = res.data
		},
		async save() {
			let res = ''
			if (this.id) {
				res = await this.$http.put(`/rest/categories/${this.id}`, this.form)
			} else {
				res = await this.$http.post('/rest/categories', this.form)
			}
			console.log('post res', res)
			this.$router.push('/categories/list')
			this.$message({
				type: 'success',
				message: '保存成功！'
			})
		},
		async getCategoryById() {
			const res = await this.$http.get(`/rest/categories/${this.id}`)
			console.log('res', res)
			this.form = res.data
		}
	}
}
</script>

<style>

</style>