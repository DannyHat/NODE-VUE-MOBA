module.exports = options => {
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  const AdminUser = require('../models/AdminUser')

  return async (req, res, next) => {
		const token = String(req.headers.authorization || '').split(' ').pop()
		console.log('token', token)
		assert(token, 401, '用户不存在')
		const { id } = jwt.verify(token, req.app.get('secret'))
		req.user = await AdminUser.findById(id)
		assert(req.user, 401, '请先登录')
		await next()
	}
}