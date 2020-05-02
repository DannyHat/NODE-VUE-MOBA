<template>
	<div>
		<div>{{id ? '编辑' : '创建'}}管理员</div>
		<el-form ref="form" :model="form" @submit.native.prevent="save" label-width="100px">
			<el-form-item label="用户名">
				<el-input v-model="form.username" placeholder="" size="mini"></el-input>
			</el-form-item>
			<el-form-item label="密码">
				<el-input v-model="form.password" placeholder="" size="mini"></el-input>
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
				res = await this.$http.put(`/rest/admin_users/${this.id}`, this.form)
			} else {
				res = await this.$http.post('/rest/admin_users', this.form)
			}
			console.log('post res', res)
			this.$router.push('/admin_users/list')
			this.$message({
				type: 'success',
				message: '保存成功！'
			})
		},
		async getCategoryById() {
			const res = await this.$http.get(`/rest/admin_users/${this.id}`)
			console.log('res', res)
			this.form = res.data
		}
	}
}
</script>

<style>

</style>