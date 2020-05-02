<template>
	<div>
		<div>{{id ? '编辑' : '创建'}}英雄</div>
		<el-form ref="form" :model="form" @submit.native.prevent="save" label-width="100px">
			<el-tabs v-model="skills" type="border-card">
				<el-tab-pane label="基础信息" name="name">
					<el-form-item label="英雄名称">
						<el-input v-model="form.name" placeholder="" size="mini"></el-input>
					</el-form-item>
					<el-form-item label="英雄图片">
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
					<el-form-item label="英雄称号">
						<el-input v-model="form.title" placeholder="" size="mini"></el-input>
					</el-form-item>
					<el-form-item label="英雄类型">
						<el-select v-model="form.categories" placeholder="" multiple >
							<el-option
								v-for="item in options"
								:key="item._id"
								:label="item.name"
								:value="item._id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="难度">
						<el-rate v-model="form.scores.difficult" :max="9" show-score></el-rate>
					</el-form-item>
					<el-form-item label="技能">
						<el-rate v-model="form.scores.skills" :max="9" show-score></el-rate>
					</el-form-item>
					<el-form-item label="攻击">
						<el-rate v-model="form.scores.attack" :max="9" show-score></el-rate>
					</el-form-item>
					<el-form-item label="生存">
						<el-rate v-model="form.scores.survive" :max="9" show-score></el-rate>
					</el-form-item>
					<el-form-item label="顺风出装">
						<el-select v-model="form.items1" placeholder="" multiple >
							<el-option
								v-for="item in items"
								:key="item._id"
								:label="item.name"
								:value="item._id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="逆风出装">
						<el-select v-model="form.items2" placeholder="" multiple >
							<el-option
								v-for="item in items"
								:key="item._id"
								:label="item.name"
								:value="item._id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="使用技巧">
						<el-input v-model="form.usageTips" placeholder="" type="textarea"></el-input>
					</el-form-item>
					<el-form-item label="对抗技巧">
						<el-input v-model="form.battleTips" placeholder="" type="textarea"></el-input>
					</el-form-item>
					<el-form-item label="团战思路">
						<el-input v-model="form.teamTips" placeholder="" type="textarea"></el-input>
					</el-form-item>
				</el-tab-pane>
				<el-tab-pane label="技能信息" name="skills">
					<el-button type="text" @click="form.skills.push({})"><i class="el-icon-plus"></i>新增</el-button>
					<el-row type="flex" style="flex-wrap: wrap">
						<el-col :md="12" v-for="(item, index) in form.skills" :key="index">
							<el-form-item label="名称">
								<el-input v-model="item.name" placeholder=""></el-input>
							</el-form-item>
							<el-form-item label="图标">
								<el-upload
									class="avatar-uploader"
									:action="$http.defaults.baseURL + '/upload'"
									:show-file-list="false"
									:on-success="res => $set(item, 'icon', res.url)"
									:before-upload="beforeAvatarUpload">
									<img v-if="item.icon" :src="item.icon" class="avatar">
									<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
							</el-form-item>
							<el-form-item label="描述">
								<el-input v-model="item.description" type="textarea"></el-input>
							</el-form-item>
							<el-form-item label="提示">
								<el-input v-model="item.tips" type="textarea"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button type="danger" size="mini" @click="form.skills.splice(i, 1)">删除</el-button>
							</el-form-item>
						</el-col>
					</el-row>
				</el-tab-pane>
			</el-tabs>
			
			<el-form-item style="margin-top: 1rem">
				<el-button type="primary" native-type="submit">提交</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			skills: 'skills',
			form: {
				scores: {
					difficult: 0,
					skills: 0,
					attack: 0,
					survive: 0
				},
				skills: []
			},
			options: [],
			categories: '',
			items: []
		}
	},
	props: {
		id: {
			type: String
		}
	},
	mounted() {
		this.id && this.getHeroById()
		this.getCategories()
		this.getItems()
	},
	methods: {
		async save() {
			let res = ''
			if (this.id) {
				res = await this.$http.put(`/rest/heros/${this.id}`, this.form)
			} else {
				res = await this.$http.post('/rest/heros', this.form)
			}
			console.log('post res', res)
			this.$router.push('/heros/list')
			this.$message({
				type: 'success',
				message: '保存成功！'
			})
		},
		async getHeroById() {
			const res = await this.$http.get(`/rest/heros/${this.id}`)
			console.log('res', res)
			// res.data.categories = res.data.categories.join(',')
			this.form = {...this.form, ...res.data}
		},
		async getCategories() {
			const res = await this.$http.get(`/rest/categories`)
			console.log('res', res)
			this.options = res.data
		},
		async getItems() {
			const res = await this.$http.get(`/rest/items`)
			console.log('res', res)
			this.items = res.data
		},
		handleAvatarSuccess(res) {
			console.log('res', res)
			// this.form.url = res.url
			this.$set(this.form, 'url', res.url)
		},
		handleIconSuccess(res) {
			console.log('res', res)
			this.$set(this.form.skills)
		},
		beforeAvatarUpload(file) {
			// const isJPG = file.type === 'image/jpeg' || file.type === 'png' || file.type === 'PNG';
			const isLt2M = file.size / 1024 / 1024 < 2;

			// if (!isJPG) {
			// 	this.$message.error('上传头像图片只能是 JPG 格式!');
			// }
			if (!isLt2M) {
				this.$message.error('上传头像图片大小不能超过 2MB!');
			}
			return isLt2M;
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
	width: 128px;
	height: 128px;
	line-height: 128px;
	text-align: center;
}
.avatar {
	width: 128px;
	height: 128px;
	display: block;
}
</style>