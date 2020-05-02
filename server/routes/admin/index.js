module.exports = app => {
	const express = require('express')
	const jwt = require('jsonwebtoken')
	const assert = require('http-assert')

	const router = express.Router({
		mergeParams: true
	})

	// 创建分类
	router.post('/', async (req, res) => {
		const model = await req.Model.create(req.body)
		res.send(model)
	})


	// 查询分类列表
	router.get('/', async (req, res) => {
		const queryOptions = {}
		if (req.Model.modelName === 'Category') {
			queryOptions.populate = 'parent'
		}
		const items = await req.Model.find().setOptions({}).limit(10)
		res.send(items)
	})

	// 查询单个分类
	router.get('/:id', async (req, res) => {
		const model = await req.Model.findById(req.params.id)
		res.send(model)
	})

	// 修改单个分类
	router.put('/:id', async (req, res) => {
		const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
		res.send(model)
	})

	//删除单个分类
	router.delete('/:id', async (req, res) => {
		const model = await req.Model.findByIdAndDelete(req.params.id, req.body)
		res.send(model)
	})

	// 登陆校验中间件
	const authMiddleWare = require('../../middleWare/auth')

	// 资源获取中间件
	// const resourceMiddleWare = async (req, res, next) => {
	// 	const modelName = require('inflection').classify(req.params.resource)
	// 	req.Model = require(`../../models/${modelName}`)
	// 	next()
	// }
	const resourceMiddleWare = require('../../middleWare/resource')

	app.use('/admin/api/rest/:resource', authMiddleWare(), resourceMiddleWare(), router)

	// 上传文件
	const multer = require('multer')
	const upload = multer({ dest: __dirname + '/../../uploads' })
	app.post('/admin/api/upload', authMiddleWare(), upload.single('file'), async (req, res) => {
		const file = req.file
		file.url = `http://localhost:3000/uploads/${file.filename}`
		res.send(file)
	})

	// 登陆路由
	app.post('/admin/api/login', async (req, res) => {
		const { username, password } = req.body
		// 1.找用户
		const AdminUser = require('../../models/AdminUser')
		const user = await AdminUser.findOne({
			username: username
		}).select('+password')
		console.log('user', user)
		assert(user, 422, '该用户不存在')
		// if (!user) {
		// 	return res.status(422).send({
		// 		message: '该用户不存在'
		// 	})
		// }
		// 2.校验密码
		const isValid = require('bcrypt').compareSync(password, user.password)
		console.log('pass', isValid)
		assert(isValid, 422, '密码错误')

		// if (!isValid) {
		// 	return res.status(422).send({
		// 		message: '密码错误'
		// 	})
		// }
		// 3.返回token
		const token = jwt.sign({ id: user._id}, app.get('secret'))
		res.send({token})
	})

	app.use(async (err, req, res, next) => {
		res.status(err.statusCode).send({
			message: err.message
		})
	})

}